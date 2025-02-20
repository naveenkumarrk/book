
const dbConnect = require("./dbConnect.js");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// MongoDB Connection
dbConnect()

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
