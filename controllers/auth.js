const express = require("express");
// const { userToken } = require("./token");
const bcrypt = require('bcrypt');
const Admin = require("../models/admin");




exports.adminLogin = async (req, res) => {
    console.log("req.body",req.body);

    const { username, password } = req.body;
    try {

    
        const admin = await Admin.findOne({username, password } );

        console.log("admin is=",admin);
        if(admin){
            console.log("Admin found");

            res.status(200).json({error:false,status:true,message:"Admin login successfully",data:admin});
            console.log("Admin login");
            return;
        }
        res.status(400).json({ error: true, message: "Admin not found" });
        console.log("Admin not login");




        
    }
     catch (error) {
        res.status(501).json({ error });
    }
};


