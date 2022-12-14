const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const { v4: uuidv4 } = require("uuid");
const Razorpay = require('razorpay');
const crypto = require("crypto");



router.post("/bookcar", async (req, res) => {
    
  try {
       req.body.transactionId = "12345";
      const newbooking = new Booking(req.body);
      await newbooking.save();

      //pushing bookiedTimeSlots to car
      const car= await Car.findOne({_id : req.body.car})
      car.bookedTimeSlots.push(req.body.bookedTimeSlots)
      await  car.save()
     res.send("Your booking is successfull");
     
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

  router.get("/getallbookings", async(req, res) => {

    try {

        const bookings = await Booking.find().populate('car')
        res.send(bookings)
        
    } catch (error) {
        return res.status(400).json(error);
    }
  
});

module.exports = router;
