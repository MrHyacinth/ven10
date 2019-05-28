const express = require('express');
const Product = require('./ProductsModel');
const router = express.Router();

router.get('/products', (req, res) => {
  Product
    .find({}, (err, result) => {
      if(err){
        console.log(err);
        res.status(500).json({ body: err });
      } else{
        console.log(result);
        res.json(result);
      }
    });
});

router.get('/product/:id', (req, res) => {
  const { id } = req.params;

  Product.findOne({ _id: id }, (err, result) => {
    if (err) {
      res.status(500).json({ body: err });
    } else {
      res.json(result);
    }
  });
});

router.post('/products/', (req, res) => {
  const data = req.body;
  
  const product = new Product(data);

  product.save((err, result) => {
    if (err) {
      res.status(500).json({ body: err });
    } else {
      res.json(result);
    }
  });
});



module.exports = router;
