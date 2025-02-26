const dbConnect = require("./dbConnect.js");
const express = require("express");
const cors = require("cors");
const app = express();

// MongoDB Connection
dbConnect()

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const allowedOrigins = [
    'http://localhost:5173',
    'https://book-umkz.vercel.app',
    'https://book-umkz-naveen-kumar-rks-projects.vercel.app'
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));
  
// Routes
const booksRoute = require("./routes/book.route.js");
const recommendationRoutes = require("./routes/recommendation.route.js");

app.use("/books", booksRoute);
app.use("/recommendations", recommendationRoutes);


const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app; 
