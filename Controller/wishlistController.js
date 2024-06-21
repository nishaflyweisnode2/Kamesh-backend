const Wishlist = require('../Models/wishlistModel');
const User = require('../Models/userModel');
const Product = require('../Models/carModel');

exports.addWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id; // Assuming you have user authentication middleware

    // Check if the user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the product is already in the user's wishlist
    const wishlist = await Wishlist.findOne({ user: userId });

    if (wishlist) {
      if (wishlist.products.includes(productId)) {
        return res.status(400).json({ message: 'Product is already in the wishlist' });
      }
      wishlist.products.push(productId);
      await wishlist.save();
    } else {
      const newWishlist = new Wishlist({ user: userId, products: [productId] });
      await newWishlist.save();
    }

    return res.status(200).json({ success: true, message: 'Product added to wishlist' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

exports.removeWishlist = async (req, res) => {
    try {
      const { productId } = req.params;
      const userId = req.user._id; // Assuming you have user authentication middleware
  
      // Check if the user exists
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the user has a wishlist
      const wishlist = await Wishlist.findOne({ user: userId });
  
      if (!wishlist) {
        return res.status(404).json({ message: 'Wishlist not found for this user' });
      }
  
      // Check if the product is in the user's wishlist
      const productIndex = wishlist.products.indexOf(productId);
  
      if (productIndex === -1) {
        return res.status(400).json({ message: 'Product not found in the wishlist' });
      }
  
      // Remove the product from the wishlist
      wishlist.products.splice(productIndex, 1);
  
      await wishlist.save();
  
      return res.status(200).json({ success: true, message: 'Product removed from the wishlist' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  };

  exports.myWishlist = async (req, res) => {
    try {
      const userId = req.user._id; // Assuming you have user authentication middleware
  
      // Find the user's wishlist and populate it with product details
      const wishlist = await Wishlist.findOne({ user: userId }).populate('products user');
  
      if (!wishlist) {
        return res.status(404).json({ message: 'Wishlist not found for this user' });
      }
      res.status(200).json({ message: "wishlist", status: 200, data: wishlist });
  
      // return res.status(200).json({ success: true, wishlist });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  };