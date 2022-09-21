const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random400 = Math.floor(Math.random() * 400);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '6329bdeeab44e706044e5064',   //OBJECT ID IN USERS COLLECTIONS IN MONGODB
            location: `${cities[random400].city}, ${cities[random400].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random400].longitude,
                    cities[random400].latitude   
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dlwm8kypc/image/upload/v1663737908/YelpCamp/szm91jwl187vwdxgndrm.jpg',
                    filename: 'YelpCamp/szm91jwl187vwdxgndrm'
                },
                {
                    url: 'https://res.cloudinary.com/dlwm8kypc/image/upload/v1663737912/YelpCamp/llb2t4mqmfw7tiwojmel.jpg',
                    filename: 'YelpCamp/llb2t4mqmfw7tiwojmel'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})