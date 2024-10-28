const mongoose = require("mongoose");

const serviceschema = new mongoose.Schema({
	image: { type: String, required: true },
	servicename: { type: String, required: true },
});
const Service = mongoose.model("services", serviceschema);
module.exports = Service;
