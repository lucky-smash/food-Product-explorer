import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      brand: { type: String },
      category: { type: String },
      imageUrl: { type: String },
    },
    { timestamps: true }
  );

export default mongoose.model("Product", productSchema);