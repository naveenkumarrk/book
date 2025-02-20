const Book = require("../models/db.js");

// const getBooks = async (req, res) => {
//     const page = parseInt(req.query.p, 5) || 0;
//     const booksPerPage = 5;
//     try {
//       const books = await Book.find({})
//         .skip(page * booksPerPage)
//         .limit(booksPerPage);
//       res.status(200).json(books);
//     } catch (error) {
//       res.status(500).json({
//         message: "No products Found"
//       });
//     }
//   };

const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "rating";
    let genre = req.query.genre || "All";

    const genreOptions = await Book.distinct("genres", { genres: { $ne: null } });

    genre === "All"
      ? (genre = [...genreOptions])
      : (genre = req.query.genre.split(","));
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};

    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    const books = await Book.find({ title: { $regex: search, $options: "i" } })
      .where("genres")
      .in([...genre])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Book.countDocuments({
      genres: { $in: [...genre] },
      title: { $regex: search, $options: "i" },
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      genres: genreOptions,
      books,
    };

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const createBook = async (req, res) => {
  try {
    const product = await Book.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error in adding Books",
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      res.status(404).json({ message: "not found" });
    }
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
