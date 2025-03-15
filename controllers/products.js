const Product = require("../models/products-model");


const getAllProducts = async (req, res) => {
    const { company, name, featured, sort, select } = req.query;
    const queryObject = {};

    if (company) {
        queryObject.company = company;
    }
    if (featured) {
        queryObject.featured = featured;

    }
    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }

    let apiResult = Product.find(queryObject);
    if (sort) {
        let sortFix = sort.split(",").join(" ");
        apiResult = apiResult.sort(sortFix);
    }

    // select = name,company 
    if (select) {
        // let selectFix = select.replace(",", " ");
        let selectFix = select.split(",").join(" ");
        apiResult = apiResult.select(selectFix);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;

    let skip = (page - 1) * limit;

    apiResult = apiResult.skip(skip).limit(limit);

    console.log(queryObject);

    const Products = await apiResult;
    res.status(200).json({ Products, nbHits: Products.length });




    // await res.status(200).json({ myAPIData });
}

const getAllProductsTesting = async (req, res) => {
    const testData = await Product.find(req.query).select("name company");
    await res.status(200).json(testData);
}

module.exports = { getAllProducts, getAllProductsTesting }