const mongoose = require('mongoose');
const Campground = require('../models/campground');
const { descriptors, places } = require('./seedHelpers');
const cities = require('./cities');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    // we're connected!
    console.log("DB connected");
});

const clearDb = async () => {
    await Campground.deleteMany({});
}

const sampleData = array => array[Math.floor(Math.random() * array.length)]

const populateData = async () => {
    for (let i = 0; i < 100; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sampleData(descriptors)} ${sampleData(places)}`,
            image: 'https://source.unsplash.com/collection/8862306/800X600',
            description: 'nada',
            price: Math.floor(Math.random() * 20) + 10
        })
        await camp.save();
        console.log(camp);
    }
}

const seedDB = async () => {
    // clear the existing contents before adding fresh ones.
    await clearDb();
    //create random Data
    await populateData();
    console.log("Db data dump complete.")

}

seedDB().then(() => {
    db.close();
})