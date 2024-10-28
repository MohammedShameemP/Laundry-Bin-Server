const express = require("express");
const Product = require("../models/product");

exports.createProducts = async (req, res) => {
	console.log(req.body);
	// console.log(req.file.location);

	try {
		const { name, price } = req.body;
		const image = req.file.location;

		const existingproduct = await Product.findOne({ name: name, price: price });
		console.log("existingproduct=", existingproduct);
		if (existingproduct) {
			res.status(400).json({ error: true, status: false, message: "Product is already exist" });
			console.log("Product is already exist");
			return;
		}
		const product = new Product({
			image,
			name,
			price,
		});
		await product.save();
		res.status(200).json({ error: false, status: true, message: "Product created successfully" });
	} catch (error) {
		console.log("server error=", error);
		res.status(500).json({ error: true, status: false, message: "server error" });
	}
};

exports.allProducts = async (req, res) => {
	try {
		const allProducts = await Product.find();

		res.status(200).json({ error: false, status: true, message: "All products are listed", data: allProducts });
	} catch (error) {
		res.status(500).json({ error: true, status: false, message: "server error" });
	}
};

exports.editProduct = async (req, res) => {
	console.log('req body =',req.body);
	const { id } = req.query;
	const { name, price } = req.body;
	try {
		if (req.file) {
			const image = req.file.location;
			const editedProduct = await Product.findByIdAndUpdate(id, { name, image, price });
		}else{
            
			const editedProduct = await Product.findByIdAndUpdate(id, { name, price });
        }

		res.status(200).json({ error: false, status: true, message: "Product edit successfully" });
		console.log("Product edit successfully" );                 
	} catch (error) {

        console.log("server error =",error);
		res.status(500).json({ error: true, status: false, message: "server error" });
	}
};

exports.deleteProduct=async(req,res)=>{
	console.log(req.body);
	try {
		const {id}=req.query;
		console.log(id);
		const deletingProduct=await Product.findByIdAndDelete(id)
		if(deletingProduct){
			res.status(200).json({error:false,status:true,message:"Product deleted successfully"})
			console.log("log Product deleted successfully");
		}
		else{
			res.status(500).json({error:true,status:false,message:"Product is not found"})
			
		}

		
	} catch (error) {
		
		res.status(400).json({error:true,status:false,message:"server error"})
		
	}
}