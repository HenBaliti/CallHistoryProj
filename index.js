const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

const uri = "mongodb+srv://baliti:zm01qpla@cluster0.lqcwyd8.mongodb.net/?retryWrites=true&w=majority";

//Connecting to the DB - Function
async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB Success");
    } catch (err) {
        console.log(err);
    }
}


//Connecting
connect();

//SCHEMA
const sch = {
    phoneNum: String,
    phoneDate: Date,
    id: Number
}
const mongoModel = mongoose.model("CallHistory", sch);

/////////////////
////// API's ////
/////////////////


// GET REQUEST - getting the 5 last calls from the DB
app.get("/api", async (req,res) => {
    try {
        const allCalls = await mongoModel.find({}).sort({phoneDate: 'desc'}).limit(5);
        res.json(allCalls);
    } catch (error) {
    res.json(error);
    }
})

// POST REQUEST - posting a new call to the DB
app.post("/postApi", async (req,res) => {
    console.log("-- Post Function --");

    const data = new mongoModel({
        id: req.body.id,
        phoneDate: req.body.phoneDate,
        phoneNum: req.body.phoneNum
    });

    const val = await data.save();
    res.send("Posted a new call");
})


app.listen(8000, ()=>{
    console.log("Server is running on port 8000");
})

