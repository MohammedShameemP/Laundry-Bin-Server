const mongoose=require("mongoose")

const bannerschema = new mongoose.Schema({
    image: { type: String, required: true },
});

const Banner= mongoose.model('banners', bannerschema);

module.exports = Banner