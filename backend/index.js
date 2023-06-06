const express = require("express")
require("dotenv").config();
const app = express();
const userRoutes = require("./Routes/userRoutes")
const productRoutes = require("./Routes/productRoutes")
const orderRoutes = require("./Routes/orderRoutes")
const deliveryRoute = require("./Routes/deliveryRoute")
const cartRouter = require('./Routes/CartRoutes')
const billingRouter = require('./Routes/BillingRoutes')
const bodyparser = require('body-parser')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { v4: uuid } = require('uuid');
const cors = require('cors')

app.use(express.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use("/user" , userRoutes);
app.use("/product" , productRoutes);
app.use("/order" , orderRoutes);
app.use("/delivery" , deliveryRoute);
app.use('/cart', cartRouter)
app.use('/billing', billingRouter)
//app.use("/article" , articleRoutes);
//app.use("/all" , allRoutes);

app.use(cors())   

app.post('/checkout', async (request, response) => {
   

    let error, status

      const {product, token} = request.body



try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
  
    const idempotency_key = uuid();
  
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: "Purchased the Computer Table",
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_linel,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotencyKey: idempotency_key,
      }
    );
  
    console.log("Charge:", { charge });
    status = "success";
    response.json({ charge });
  } catch (error) {
    console.log("Error:", error);
    status = "failure";
    response.json({ status });
  }
  
})


const mongoose = require("mongoose")
 
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected")
}).catch(err=>{
    console.log(err)
})


app.listen(process.env.PORT || 3000 , ()=>{
    console.log(`App Listning on Port ${process.env.PORT}`)
})


