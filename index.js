const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");
const path = require("path");
const errorMiddleware = require("./middleware/error");
const cors = require('cors');  
const morgan = require("morgan");



const app = express();
app.use(morgan('dev'));
app.use(cors());

dotenv.config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// import all routes
const auth = require("./routes/auth");
const products = require("./routes/product");
const payment = require("./routes/payment");
const order = require("./routes/order");

app.use("/api/v1", auth);
app.use("/api/v1", products);
app.use("/api/v1", payment);
app.use("/api/v1", order);


// connecting to database
connectDatabase();

// Setting up cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Middleware to handle error
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
