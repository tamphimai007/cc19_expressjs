// import package
const express = require("express");
const cors = require("cors");
const app = express();
const productsRoute = require("./routes/products");
const handleError = require("./middlewares/error");

// code....
// middlewares
app.use(express.json()); // for read json data
app.use(cors()); // allows cross domain

// routing
app.use("/api", productsRoute);

// handing Error
app.use(handleError);

const PORT = 5000;
// Start Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
