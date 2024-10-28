const mongoose = require("mongoose");

const usersschema = new mongoose.Schema({
	username: { type: String, required: true },
	emailorphonenumber: { type: String, required: true },
	
	// active:{type:Boolean,default:true}

});

const User = mongoose.model("users", usersschema);


module.exports = User;