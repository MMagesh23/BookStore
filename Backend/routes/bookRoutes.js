const express = require("express");
const bookController = require("../controllers/bookController");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.use(verifyToken);

router.post("/books", bookController.createBook);
router.get("/books", bookController.getAllBooks);
router.get("/books/:id", bookController.getBookById);
router.put("/books/:id", bookController.updateBook);
router.delete("/books/:id", bookController.deleteBook);

module.exports = router;
