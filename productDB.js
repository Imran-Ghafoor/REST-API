require("dotenv").config();
const connectDb = require("./utils/db")

const ProductJson = require("./products.json")

const Product = require("./models/products-model")

const start = async () => {
    try {
        await connectDb(process.env.MONGODB_URI);
        await Product.deleteMany();
        await Product.create(ProductJson);
        console.log("successfulll");

    } catch (error) {
        console.log(error);

    }
}
start();