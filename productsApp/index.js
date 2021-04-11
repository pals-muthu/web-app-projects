const express = require('express');
const app = express();
const path = require('path');
// const bodyParser = require('body-parser');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));
// create application/json parser
// const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
// const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose');
const Product = require('./models/product');
mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected");
    })
    .catch((err) => {
        console.log(err);
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));

const categories = ['fruit', 'vegetable', 'diary'];

// Default Page - should be at the end
// app.get('*', (req, res, next) => { 
//     console.log("Default page has been hit");
//     // res.send("Default Page");
//     // next();
// })

app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        // console.log(products);
        res.render('./products/index', { products, category });
    }
    else {
        const products = await Product.find({});
        // console.log(products);
        res.render('./products/index', { products, category: 'All' });
    }
})

//This needs to be before the :id
app.get('/products/new', (req, res) => {
    console.log("new Product");
    res.render('./products/newProduct', { categories });
})

app.post('/products', async (req, res) => {
    console.log("request body:", req.body.name);
    const resp = await Product.create({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    });
    console.log(resp);
    res.redirect('/products');
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const curProduct = await Product.findById(id);
    res.render('./products/productPage', { curProduct });
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const curProduct = await Product.findById(id);
    res.render('./products/editProduct', { curProduct, categories });
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const curProduct = await Product.findByIdAndUpdate(id, {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    }, { runValidators: true }
    );
    res.redirect(`/products/${id}`);
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const curProduct = await Product.findByIdAndDelete(id);
    res.redirect(`/products`);
})

app.listen("4000", () => {
    console.log("listening on port 4000");
})