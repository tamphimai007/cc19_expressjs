# Server

## Step 1 Create Project

```bash
npm init -y
```

## Step 2 Install package ...

```bash
npm install express cors nodemon morgan
```

## Step 3 Create server.js

```js
// import package
const express = require("express");
const app = express();

// Start Server
app.listen(5000, () => console.log(`Server is running on port 5000`));
```

## Step 4 edit package.json

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon server.js"
  },
```

update middlewares

```js
// import package
const express = require("express");
const cors = require("cors");
const app = express();

// code....
// middlewares
app.use(express.json()); // for read json data
app.use(cors()); // allows cross domain

const PORT = 5000;
// Start Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
```

## Step 5 Routing

create folder routes
/routes/products.js

```js
const express = require("express");
const router = express.Router();

// ENDPOINT http://localhost:5000/api/products
router.get("/products", (req, res) => {
  res.json({ message: "Hello, GET" });
});

module.exports = router;
```

update server.js

```js
// import package
const express = require("express");
const cors = require("cors");
const app = express();
const productsRoute = require("./routes/products");

// code....
// middlewares
app.use(express.json()); // for read json data
app.use(cors()); // allows cross domain

// routing
app.use("/api", productsRoute);

const PORT = 5000;
// Start Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
```

## Step 6 Routing update GET,POST, PUT, DELETE

```js
const express = require("express");
const router = express.Router();

// ENDPOINT http://localhost:5000/api/products
router.get("/products", (req, res) => {
  res.json({ message: "Hello, GET" });
});

router.get("/product/:id", (req, res) => {
  res.json({ message: "Hello, GET Product id" });
});

router.post("/products", (req, res) => {
  res.json({
    message: "Hello, POST",
  });
});

router.put("/product/:id", (req, res) => {
  res.json({ message: "Hello, PUT" });
});

router.delete("/product/:id", (req, res) => {
  res.json({ message: "Hello, Delete" });
});

module.exports = router;
```

## Step 7 Controllers

```js
// File Controller / logic

exports.listProducts = (req, res) => {
  res.json({ message: "Hello, List Products" });
};

exports.readProduct = (req, res) => {
  res.json({ message: "Hello, GET Product id" });
};

exports.createProduct = (req, res) => {
  res.json({ message: "Hello, POST" });
};

exports.updateProduct = (req, res) => {
  res.json({ message: "Hello, PUT" });
};

exports.deleteProduct = (req, res) => {
  res.json({ message: "Hello, Delete" });
};
```

update route

```js
// File Routing เก็บ Endpoint ของ Server
const express = require("express");
const router = express.Router();
// import controller
const productController = require("../controllers/products");

// ENDPOINT http://localhost:5000/api/products
router.get("/products", productController.listProducts);
router.get("/product/:id", productController.readProduct);
router.post("/products", productController.createProduct);
router.put("/product/:id", productController.updateProduct);
router.delete("/product/:id", productController.deleteProduct);

router.get("/product/filter", productController.filterProduct);

module.exports = router;
```

#### filter

route

```js
router.get("/products/filter", productController.filterProduct);
```

controller

```js
exports.filterProduct = (req, res) => {
  const { category, minPrice, maxPrice } = req.query;
  console.log(category, minPrice, maxPrice);
  res.json({ message: "Hello, Filter" });
};
```

test Postman

```plaintext
http://localhost:5000/api/products/filter?category=notebook&minPrice=1000&maxPrice=20000
```

## Step 8 Middlewares

create folder middleware/auth.js

```js
exports.auth = (req, res, next) => {
  if (true) {
    console.log("Hello middlewares");
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
```

update /routes/products.js

```js
// import middlewares
const { auth } = require("../middlewares/auth");

// ENDPOINT http://localhost:5000/api/products
router.get("/products", auth, productController.listProducts);
```

## Step 9 handleError

/middlewares/error.js

```js
const handleError = (err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Something Wrong!!!" });
};

module.exports = handleError;
```

update server.js

```js
// import
const handleError = require("./middlewares/error");

// handing Error
app.use(handleError);
```

## Step 10 test in controllers

```js
exports.listProducts = (req, res) => {
  // Step 1
  throw new Error();
  // Step 2
  throw new Error("Jukkruuuu");
  // Step 3
  const error = new Error("Jukkruu");
  error.statusCode = 400;
  throw error;
  res.json({ message: "Hello, GET Products" });
};
```

## Step 10.1 createError

create folder utils/createError.js

```js
const createError = (code, message) => {
  // code body
  const error = new Error(message);
  error.statusCode = code;

  throw error;
};

module.exports = createError;
```

update controller

```js
exports.listProducts = (req, res) => {
  // Step 1
  if (true) {
    return createError(400, "email is required");
  }
  res.json({ message: "Hello, GET Products" });
};
```

## Step 10 Try.. Catch

```js
exports.listProducts = (req, res) => {
  try {
    // console.log(test);
    res.json({ message: "Hello, List Products" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error!!" });
  }
};
```

vs

```js
exports.listProducts = (req, res, next) => {
  // Step 1
  try {
    if (true) {
      return createError(400, "Password is wrong!!");
    }
    res.json({ message: "Hello ListProducts" });
  } catch (error) {
    next(error);
  }
};
```
