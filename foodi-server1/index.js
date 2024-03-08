const express = require("express");
const app = express();
const port = process.env.PORT || 6001;
const cors = require("cors");
require("dotenv").config();
const jwt = require('jsonwebtoken');
// console.log(process.env.ACCESS_TOKEN_SECRET)
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());

const stripe = require("stripe")('sk_test_51OngHjSCy0AIfngsMpEUW81y0anJSJ6A73tEu6pfMWaemOAMppgFrmi6inDAeCd4QGfi031ktbUXs7aDhK18ofRy00Zz8pxEsA');

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

  app.post('/jwt',async(req,res)=>{
    const user = req.body;
    const token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
      expiresIn:'1hr'
    })
    res.send({token})

  })

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
const userRoutes = require('./api/routes/userRoutes')
app.use("/menu", menuRoutes);
app.use("/carts", cartRoutes);
app.use("/users",userRoutes)



  // // Create a PaymentIntent with the order amount and currency
  // const paymentIntent = await stripe.paymentIntents.create({
  //   amount: calculateOrderAmount(items),
  //   currency: "inr",
  //   // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
  //   automatic_payment_methods: {
  //     enabled: true,
  //   },
  // });

  // res.send({
  //   clientSecret: paymentIntent.client_secret,
  // });


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
