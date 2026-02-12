
// export const getProducts = (req, res) => {
//     res.status(200).json([]); // phele yeh kiya tha empty array return karne ke liye, ab hum database se products fetch karenge aur return karenge
// };

import Product from "../models/product.js";

export const getProducts = async (req, res) => {
    try {
      // OLD (no search support)
      // const products = await Product.find();
      // res.status(200).json(products);

      const { search } = req.query;

      const query = search
        ? {
            $or: [
              { name: { $regex: search, $options: "i" } },
              { brand: { $regex: search, $options: "i" } },
            ],
          }
        : {};

      const products = await Product.find(query);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products", error });
    }
};

export const createProduct = async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: "Failed to create product", error });
    }
  };

export const getProductById = async (req, res) => {//read product by id
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ message: "Invalid product id", error });
    }
  };

export const updateProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate( // (id, update, options) 
        req.params.id,
        req.body,
        { new: true, runValidators: true }//with runValidators: true, it will reject invalid updates, and with new: true, it will return the updated document instead of the old one
      );
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ message: "Failed to update product", error });
    }
  };

export const deleteProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted" });
    } catch (error) {
      res.status(400).json({ message: "Failed to delete product", error });
    }
  };
