const express = require("express");
const router = express.Router();
const axios = require("axios");

// helpers
const TokenVerify = require("../helpers/validtoken");

router.get("/store", TokenVerify, async (req, res) => {
  try {
    let productsFormat = [];
    const response = await axios.get(
      "https://despachos.telemercados.cl/api/catalog_system/pub/products/search"
    );

    for (products in response.data) {
      productsFormat.push({
        id: response.data[products].productId,
        name: response.data[products].productName,
        brand: response.data[products].brand,
        description: response.data[products].description,
        image: response.data[products].items[0].images[0].imageUrl,
        price: response.data[products].items[0].sellers[0].commertialOffer.Price
      });
    
    }
          return res.status(200).json({
            productsCount: productsFormat.length,
            data: productsFormat
          });  
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error 500",
      error: err,
    });
  }
});

module.exports = router;
