const Product = require('../Models/productSchema');
// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('seller','name');
    console.log(products)
    res.json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSellerProducts = async (req, res) => {
  const {id}=req.decoded
  const seller=id
  try {
    const product = await Product.find({seller:seller});
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  const { name, price,image,totalQuantity} = req.body;
  const{id}=req.decoded
  const seller=id
  try {
    const product = new Product({ name, price, seller,image,totalQuantity });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a product * Seller  and Admin
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {name,price,totalQuantity} = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, price,totalQuantity},
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product Seller and Admin
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a comment to a product *Buyer
const addComment = async (req, res) => {
  const { id } = req.params;
  const {content } = req.body;
  const {user}=req.decoded.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.comments.push({ user, content });
    await product.save();
    res.status(201).json(product.comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add a rating to a product *Buyer
const addRating = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  const user=req.decoded.id
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.ratings.push({ user, value });
    await product.save();
    res.status(201).json(product.ratings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addComment,
  addRating,
  getSellerProducts
};
