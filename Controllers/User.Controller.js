const Cart = require("../Models/Cart.model.js");
const Product = require("../Models/Product.model.js");
const User = require("../Models/User.model.js");

const getCart = async (req, res, next) => {
  const { id } = req.user;

  try {
    const cart = await Cart.findOne({ userId: id });
    res.json({ cart, message: "Cart found successfully" });
  } catch (error) {
    return next(error);
  }
};

const addProductToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const { id } = req.user;

  const cart = await Cart.findOne({ userId: id });
  if (!cart) {
    try {
      const newCart = new Cart({
        userId: id,
        products: [
          {
            productId,
            quantity,
          },
        ],
      });
      await newCart.save();
    } catch (error) {
      return next(error);
    }
  } else {
    try {
      const index = cart.products.findIndex(
        (product) => product.productId === productId
      );
      if (index === -1) {
        cart.products.push({
          productId,
          quantity,
        });
      } else {
        cart.products[index].quantity += quantity;
      }
      await cart.save();
    } catch (error) {
      return next(error);
    }
  }
  res.json({ message: "Product added to cart successfully" });
};

const removeProductFromCart = async (req, res, next) => {
  const { productId } = req.body;
  const { id } = req.user;

  const cart = await Cart.findOne({ userId: id });
  if (!cart) return next(new Error("Cart not found"));

  const index = cart.products.indexOf(productId);
  if (index === -1) return next(new Error("Product not found"));

  cart.products.splice(index, 1);
  await cart.save();

  res.json({ message: "Product removed from cart successfully" });
};

const updateProductQuantity = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const { id } = req.user;

  const cart = await Cart.findOne({ userId: id });
  if (!cart) return next(new Error("Cart not found"));

  const index = cart.products.indexOf(productId);
  if (index === -1) return next(new Error("Product not found"));

  cart.products[index].quantity = quantity;
  await cart.save();

  res.json({ message: "Product quantity updated successfully" });
};

module.exports = {
  getCart,
  addProductToCart,
  removeProductFromCart,
  updateProductQuantity,
};
