const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors({
  origin:['http://localhost:3000','*'],
  methods:['GET','POST','PUT','DELETE'],    credentials:true
}));
app.use(express.json());


const dbConnectFunc = require("./db/dbIntegration");

const AuthRoute = require("./routes/AuthRoute");
const PublicRoute = require("./routes/PublicRoute");
const PrivateRoute = require("./routes/PrivateRoute");
const UserCrudRoute = require("./routes/UserCrudRoute");
const ProductCrudRoute = require("./routes/ProductCrudRoute");
const InvoiceCrudRoute = require("./routes/InvoiceCrudRoute");

const AuthCheck = require("./middlewares/AuthCheck");
const port = process.env.port || 4400;

app.use("/api/public", PublicRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/private", AuthCheck, PrivateRoute);
app.use("/api/crud/user", AuthCheck, UserCrudRoute);
app.use("/api/crud/product", AuthCheck, ProductCrudRoute);
app.use("/api/crud/invoice", AuthCheck, InvoiceCrudRoute);

dbConnectFunc()
  .then(() =>
  app.listen(port,()=>{
    console.log(`Listens on: ${port}`)
})
  )
  .catch((e) => console.log(e.message, " ERR-index.js"));
