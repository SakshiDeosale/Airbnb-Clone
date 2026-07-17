# 🏡 WanderLust – Airbnb Clone

WanderLust is a full-stack web application inspired by Airbnb that allows users to explore, create, edit, and review property listings. The application provides secure user authentication, interactive maps, image uploads, and a responsive user interface.

---

## 🚀 Features

- 🔐 User Authentication (Sign Up, Login, Logout)
- 🏠 Create, Read, Update, and Delete (CRUD) Listings
- 📸 Upload listing images using Cloudinary
- 🗺️ Interactive maps with Leaflet and LocationIQ
- ⭐ Add and delete reviews with ratings
- 👤 Authorization for listings and reviews
- 🔍 Search and browse property listings
- 📱 Responsive design using Bootstrap
- ⚠️ Server-side validation and error handling
- 🌐 RESTful routing

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- EJS

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- Passport.js
- Passport Local
- Express Session

### Other Tools
- Cloudinary
- Multer
- Map API (LocationIQ)
- Leaflet.js
- Joi Validation
- Express Flash
- Method Override

---

## 📂 Project Structure

```
WanderLust/
│
├── models/
├── routes/
├── controllers/
├── middleware.js
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── views/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── includes/
├── utils/
├── app.js
├── cloudConfig.js
├── schema.js
├── package.json
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/wanderlust.git
```

### 2. Navigate to the project folder

```bash
cd wanderlust
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

Add the following environment variables:

```env
ATLASDB_URL=your_mongodb_connection_string

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

SECRET=your_session_secret

MAP_TOKEN=your_locationiq_api_key
```

---

## ▶️ Run the Application

```bash
node app.js
```

or

```bash
npm start
```

If using Nodemon:

```bash
nodemon app.js
```

Open your browser and visit:

```
http://localhost:8080/listings
```

---

## 📸 Screenshots

Add screenshots here.

Example:

- Home Page
- Listing Details
- Create Listing
- Login Page
- Map View

---

## 🌟 Future Enhancements

- Wishlist functionality
- Booking system
- Payment integration
- User profiles
- Advanced search filters
- Messaging between users
- Admin dashboard

---

## 📚 Learning Outcomes

This project helped in gaining hands-on experience with:

- RESTful APIs
- Authentication & Authorization
- MongoDB Database Design
- MVC Architecture
- File Uploads
- Cloud Storage
- Map Integration
- CRUD Operations
- Session Management
- Deployment

---

## 👩‍💻 Author

**Sakshi Deosale**

- GitHub: https://github.com/SakshiDeosale
- LinkedIn: https://www.linkedin.com/in/sakshideosale/

---

## 📄 License

This project is developed for educational and learning purposes.
