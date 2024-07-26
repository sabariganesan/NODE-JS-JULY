import Product from "../modal/product.modal.js";

export const addProduct = async (request, response) => {
  try {
    const { name, category, price, desc } = request.body;
    const product = new Product({
      name,
      category,
      desc,
      price,
    });
    await product.save();
    response.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error", error });
  }
};

export const findAllProduct = async (_, response) => {
  try {
    const product = await Product.find({});
    response.status(200).json({ message: "Success", data: product });
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error", error });
  }
};
