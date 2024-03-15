const express = require("express");
const app = express();
const port = process.env.PORT || 6001;
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
// console.log(process.env.ACCESS_TOKEN_SECRET)
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


// mongodb conncetion using mongoosse

//sg804595
// fAh8M4FZJyiInRZa

//  mongoose.connect( `mongodb+srv://sg804595:<password>@demo-foodi-client.jtnnl47.mongodb.net/?retryWrites=true&w=majority`);
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-foodi-client.jtnnl47.mongodb.net/demo-foodi-client?retryWrites=true&w=majority`
  )
  .then(console.log("Mongodb connected"))
  .catch((error) => console.log("error connecting to mongodb", error));

// jwt token authentication

app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });
  res.send({ token });
});

// // verify jwt token using middleware
// //middleware using 3 parameter
//   const verifyToken = (req,res,next) =>{
//     // console.log(req.headers.authorization)
//     if(!req.headers.authorization){
//       return res.status(401).send({message:"Unauhtorized access"})
//     }
//     const token = req.headers.authorization.split(' ')[1];
//     // console.log(token)
//     jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded) => {
//       if(err){
//         return res.status(401).send({message:"token is invalid"})
//       }
//       req.decoded = decoded;
//       next();
//     })
//   }

// import routes here

const menuRoutes = require("./api/routes/menuRoutes");
const cartRoutes = require("./api/routes/cartRoutes");
const userRoutes = require("./api/routes/userRoutes");
const paymentRoutes = require("./api/routes/paymentRoutes");
const adminStats = require("./api/routes/adminStats");
const orderStats = require("./api/routes/orderStats");



app.use("/menu", menuRoutes);
app.use("/carts", cartRoutes);
app.use("/users", userRoutes);
app.use('/payments', paymentRoutes);
app.use('/adminStats', adminStats);
app.use('/orderStats', orderStats);



// // stripe
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
