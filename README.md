🏡 StaySphere
StaySphere is a full-stack web application inspired by Airbnb that allows users to explore, create, and review property listings across various destinations. Built with Node.js, Express, MongoDB, and EJS, it features user authentication, authorization, and cloud image storage.


✨ Features
=> 🏠 Property Listings: Browse listings, view detailed information (pricing, description, location), create new listings, and update or delete existing ones.
=> 🔐 User Authentication & Authorization: Secure user registration, login, and logout powered by Passport.js. Only listing owners can edit/delete their properties.
=> ⭐ Reviews & Ratings: Logged-in users can leave ratings and comments on properties. Review owners can delete their own reviews.
=> 🖼️ Cloud Image Uploads: Image upload and management integrated with Cloudinary via Multer.
=> 💬 Flash Notifications: Real-time feedback alerts for actions like successful login, listing creation, or errors.
=> 📱 Responsive Design: Styled using Bootstrap 5 for clean mobile and desktop layouts.


🛠️ Tech Stack

1. Backend
=> Node.js & Express.js — Server environment & RESTful routing
=> MongoDB Atlas with Mongoose — NoSQL database & object modeling
=> Passport.js (passport-local, passport-local-mongoose) — Authentication logic
=> express-session + connect-mongo — Session management and persistent storage

2. Frontend
=> EJS & ejs-mate — Server-side templating engine and layout management
=> Bootstrap 5 & Custom CSS — Responsive layout and custom styling
=> Vanilla JavaScript — Form validation and dynamic UI updates

3. Storage & Deployment
=> Multer + Cloudinary — Image parsing and cloud media hosting
=> Render — Live web application deployment


📂 Project Structure

StaySphere/
├── controllers/          # Route controller functions (listings, reviews, users)
├── models/               # Mongoose schemas (Listing, User, Review)
├── routes/               # Express routing endpoints
├── views/                # EJS UI templates
│   ├── layouts/          # Boilerplate layout structure (boilerplate.ejs)
│   ├── includes/         # Reusable partials (navbar, footer, flash alerts)
│   ├── listings/         # Listing views (index, show, new, edit)
│   └── users/            # Auth views (login, signup)
├── public/               # Client-side static assets (CSS, JS)
├── utils/                # Helper functions (wrapAsync, expressError)
├── middleware.js         # Authentication, ownership & Joi validation middleware
├── schema.js             # Joi validation schemas
├── app.js                # Express app entry point
└── init/                 # Database initialization scripts and sample data


⚙️ Installation & Setup
Prerequisites
=> Node.js (v18+)
=> MongoDB Atlas account (or local MongoDB instance)
=> Cloudinary account
=> Google Gemini API key


Steps
1. Clone the repository:

=> Bash
      git clone https://github.com/Tannu2029/StaySphere.git
      cd StaySphere

2. Install dependencies
bash
   npm install

3. Set up environment variables Create a .env file in the root directory:
env
   ATLASDB_URL=your_mongodb_atlas_connection_string
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   GEMINI_API_KEY=your_gemini_api_key

4. Seed the database (optional)
bash
   node init/index.js

5. Run the app
bash
   node app.js or nodemon app.js

6. Visit http://localhost:8080 in your browser 🎉


🔒 Security Notes

=> .env is excluded via .gitignore — never commit real credentials
=> Passwords are hashed and salted via passport-local-mongoose
=> Session data is stored securely in MongoDB via connect-mongo


🚀 Deployment

This project is deployed on Render, connected directly to this GitHub repository for continuous deployment. 
Environment variables are configured in the Render dashboard to match the .env structure above.


🤝 Contributing
Contributions are welcome! Feel free to fork this repo, open issues, or submit pull requests.


📄 License
This project is open source and available for educational purposes.


👤 Author
Tannu Sagar
GitHub: @Tannu2029
