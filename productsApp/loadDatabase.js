const mongoose = require('mongoose');
const product = require('./models/product');
mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected");
    })
    .catch((err) => {
        console.log(err);
    })

// const p = new product({
//     name: 'Ruby grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })

// p.save().then(rec => {
//     console.log(rec);
// })
//     .catch((err) => {
//         console.log("error occurred: ", err);
//     })

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic mini seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'diary'
    }
]
product.insertMany(seedProducts).then((res) => {
    console.log(res);
})
    .catch(err => {
        console.log(err);
    })
