# STAYSPHERE 🏡

A full-stack property listing and booking platform built with the MERN-style stack — **MongoDB, Express, EJS, Node.js** — where users can list, browse, and book properties.

## ✨ Features

- 🏠 Create, view, edit, and delete property listings
- 🔐 User authentication and authorization (Passport.js — sign up, log in, log out)
- 📸 Image upload and storage via Cloudinary
- ✅ Server-side data validation using Joi
- 💬 Flash messages for user feedback (success/error notifications)
- 🗂️ Session management with MongoDB-backed sessions (connect-mongo)
- 🤖 AI-assisted features (integrated via OpenAI / Google Gemini APIs)

## 🛠️ Tech Stack

**Backend:** Node.js, Express.js  
**Database:** MongoDB, Mongoose  
**Templating:** EJS, EJS-Mate  
**Authentication:** Passport.js, Passport-Local, Passport-Local-Mongoose  
**File Uploads:** Multer, Cloudinary, Multer-Storage-Cloudinary  
**Validation:** Joi  
**AI Integration:** OpenAI SDK, Google GenAI SDK  
**Session/Flash:** express-session, connect-mongo, connect-flash, cookie-parser

## 📁 Project Structure

```
StaySphere/
├── controllers/      # Route logic / business logic
├── init/             # Database seeding / initialization
├── models/           # Mongoose schemas
├── public/           # Static assets (CSS, JS, images)
├── routes/           # Express route definitions
├── utils/            # Helper utilities
├── views/            # EJS templates
├── app.js            # Main application entry point
├── cloudConfig.js    # Cloudinary configuration
├── middleware.js     # Custom middleware
├── schema.js         # Joi validation schemas
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v24.16.0 or compatible)
- MongoDB (local instance or Atlas cluster)
- Cloudinary account (for image storage)

### Installation

1. Clone the repository
```bash
   git clone https://github.com/Tannu2029/StaySphere.git
   cd StaySphere
```

2. Install dependencies
```bash
   npm install
```

3. Create a `.env` file in the root directory and add the following:
```env
   ATLASDB_URL=your_mongodb_connection_string
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   SECRET=your_session_secret
   OPENAI_API_KEY=your_openai_api_key
   GEMINI_API_KEY=your_google_genai_api_key
```

4. Start the application
```bash
   node app.js
```

5. Open your browser and visit: http://localhost:8080/

## 📝 Usage

- Sign up for a new account or log in
- Browse existing property listings
- Create a new listing with images, price, location, and description
- Edit or delete your own listings
- Leave reviews on listings

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo, open issues, and submit pull requests.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Tannu2029**  
GitHub: [@Tannu2029]
(https://github.com/Tannu2029)
