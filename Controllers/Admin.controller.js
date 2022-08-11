const Product = require("../Models/Product.model");
const validation = require("../Utility/Validation");

const addProduct = async (req, res, next) => {
  const { name, price, description, images, tags } = req.body;

  const { error } = validation.productPostValidation({
    name,
    price,
    description,
    images,
    tags,
  });
  if (error) return next(error.details[0]);

  try {
    const product = new Product({ name, price, description, images });
    await product.save();
    res.json({ message: "Product created successfully" });
  } catch (error) {
    return next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json({ products, message: "Products found successfully" });
  } catch (error) {
    return next(error);
  }
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.json({ product, message: "Product found successfully" });
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, price, description, images, tags } = req.body;

  const { error } = validation.productPostValidation({
    name,
    price,
    description,
    images,
    tags,
  });
  if (error) return next(error.details[0]);

  try {
    const product = await Product.findByIdAndUpdate(id, {
      name,
      price,
      description,
      images,
      tags,
    });
    res.json({ product, message: "Product updated successfully" });
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    res.json({ product, message: "Product deleted successfully" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
