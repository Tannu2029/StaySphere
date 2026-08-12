if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']); 

const express = require("express");
const app = express(); 
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expressError.js");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const Listing = require("./models/listing.js");

// Google Gen AI Setup
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Import Routers
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const dbURL = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(dbURL);
}

main()
  .then(() => {
    console.log("Connected to DB!");
  })
  .catch((err) => {
    console.log("DB Connection Error:", err);
  });

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
  mongoUrl: dbURL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("ERROR in MONGO SESSION STORE", err);
});

// Session Configuration
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
       expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
       maxAge: 7 * 24 * 60 * 60 * 1000,
       httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash & Current User Locals Middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// --- Gemini AI Assistant Route ---
app.post("/geminiai", async (req, res) => {
  try {
    const { message } = req.body;

    // Fetch top listings from database for context
    const listings = await Listing.find({}).limit(10);
    const context = listings
      .map((l) => `${l.title} in ${l.location}, ${l.country} for ₹${l.price}/night`)
      .join("; ");

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are StaySphere's travel assistant. Current available listings: ${context}. Answer this user query concisely and helpfully: "${message}"`,
    });

    res.json({ reply: response.text });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ reply: "Sorry, I am having trouble fetching recommendations right now." });
  }
});

// Routes Setup
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter); 

// Catch-All 404 Route
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {
  console.log("Server is listening to port 8080");
});