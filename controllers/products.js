// File Controller / logic

const createError = require("../utils/createError");

exports.listProducts = (req, res, next) => {
  // Step 1
  try {
    if(true){
        return createError(400,'Password is wrong!!')
    }
    res.json({ message: "Hello ListProducts" });
  } catch (error) {
    next(error);
  }
};

exports.readProduct = (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.json({ message: "Hello, GET Product id" });
};

exports.createProduct = (req, res) => {
  res.json({ message: "Hello, POST" });
};

exports.updateProduct = (req, res) => {
  res.json({ message: "Hello, PUT" });
};

exports.deleteProduct = (req, res) => {
  res.json({ message: "Hello, Delete" });
};

exports.filterProduct = (req, res) => {
  const { category, minPrice, maxPrice } = req.query;
  console.log(category, minPrice, maxPrice);
  res.json({ message: "Hello, Filter" });
};
