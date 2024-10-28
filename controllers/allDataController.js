const express = require("express");
const User = require("../models/users");
const Banner = require("../models/banner");
const Service = require("../models/service");

exports.users = async (req, res) => {
	const users = await User.find();
	try {
		if (users) {
			res.status(200).json({ error: false, status: true, message: "users available", data: users });
		} else {
			res.status(400).json({ error: true, status: false, message: "users not available" });
		}
	} catch (error) {
		res.status(400).json({ error: true, status: false, message: "server error" });
	}
};
exports.banner = async (req, res) => {
	const banners = await Banner.find();
	try {
		if (banners) {
			res.status(200).json({ error: false, status: true, message: "users available", data: banners });
		} else {
			res.status(400).json({ error: true, status: false, message: "users not available" });
		}
	} catch (error) {
		res.status(400).json({ error: true, status: false, message: "server error" });
	}
};

exports.createService = async (req, res) => {
	console.log("body", req.body);
	console.log("file", req.file);
	try {
		const {  name } = req.body;
		const image = req.file.location
		const existingService = await Service.findOne({ servicename: name });
		console.log({ existingService });
		if (existingService) {
			res.status(400).json({ error: true, status: false, message: "service already exist" });
			return;
		}
		const service = new Service({
			image,
			servicename: name,
		});
		await service.save();
		res.status(200).json({ error: false, status: true, message: "services saved", data: service });
		console.log("services saved");
	} catch (error) {
		console.log("server error", error);
		res.status(500).json({ error: true, status: false, message: "server error" });
	}
};

exports.allservice = async (req, res) => {
	try {
		const allServices = await Service.find();
		res.status(200).json({ error: false, status: true, message: "all services available", data: allServices });
	} catch (error) {
		console.log('server error',error);
		res.status(500).json({ error: true, status: false, message: "services not available" });
	}
};

exports.editservice = async (req, res) => {
	try {
		console.log(req.body);
		const { name } = req.body;
		const { id } = req.query;
		if (req.file) {
			const image = req.file.location;

			const editedService = await Service.findByIdAndUpdate(id, { image, servicename:name });
			console.log(editedService);
		} else {
			const editedService = await Service.findByIdAndUpdate(id, { servicename:name });
		}
		res.status(200).json({ error: false, status: true, message: "service edited" });
	} catch {
		res.status(500).json({ error: true, status: false, message: "server error" });
	}
};

exports.deleteService = async (req, res) => {
	try {
		const { id } = req.query;

		if (id) {
			const deletedService = await Service.findByIdAndDelete(id);

			if (deletedService) {
				console.log(deletedService);
				res.status(200).json({ error: false, status: true, message: "Service deleted" });
			} else {
				res.status(404).json({ error: true, status: false, message: "Service not found" });
			}
		} else {
			res.status(400).json({ error: true, status: false, message: "Service ID not provided" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, status: false, message: "Server error" });
	}
};
