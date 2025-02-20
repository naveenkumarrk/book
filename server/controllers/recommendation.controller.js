const Book = require("../models/db.js");

const getRecommendations = async (req, res) => {
  try {
    const { genre, author } = req.body; 

    if (!genre && !author) {
      return res.status(400).json({
        message: "Please provide at least one search parameter (author or genre).",
      });
    }

    let matchQuery = {};
    if (genre && genre.trim() !== "") {
      matchQuery.genres = { $regex: genre, $options: "i" };
    }
    if (author && author.trim() !== "") {
      matchQuery.author = { $regex: author, $options: "i" };
    }

    const recommendations = await Book.aggregate([
      { $match: matchQuery },
      { $sort: { rating: -1 } },
      { $project: { title: 1, author: 1, genres: 1, rating: 1 } },
      { $limit: 10 },
    ]);

    if (recommendations.length === 0) {
      return res.status(404).json({
        message: "No recommendations found based on your preferences.",
      });
    }

    res.status(200).json(recommendations);
  } catch (error) {
    console.error("Error in getRecommendations:", error.message);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports = { getRecommendations };
