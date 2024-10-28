const express =require("express");
const app =express();
const connectDB = require("./config/database");
const bodyParser = require('body-parser');

const cors =require('cors');
const cookieParser=require('cookie-parser')
const {register}= require('./router/router')
const env =require('dotenv').config();



const PORT = 4007;

app.use(cors());
app.use(bodyParser.json());
    

app.use(express.json());
connectDB();
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const authUser=require('./router/router')
app.use('/api',authUser);




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
