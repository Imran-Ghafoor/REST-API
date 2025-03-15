require("dotenv").config();
const express = require("express");
const app = express();
const products_route = require("./router/products");
const connectDb = require("./utils/db");
const PORT = 5000;


app.get("/", (req, res) => {
    res.send("Hi Im from Server")
});

app.use("/api/products", products_route)



const start = async () => {
    await connectDb()
    app.listen(PORT, () => {
        console.log(`${PORT} YES IM CONNECTED`);
    })
}
start();





