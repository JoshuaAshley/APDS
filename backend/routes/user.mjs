import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
//import ExpressBrute from "express-brute";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

// var store = ExpressBrute.MemoryStore();
// var bruteForce = new ExpressBrute(store);

router.post("/signup", async (req,res) => {
    const password = bcrypt.hash(req.body.password, 10)
    let newDocument = {
        name: req.body.name,
        password: (await password).toString()
    };
    let collection = await db.collection("users");
    let result = await collection.insertOne(newDocument);

    console.log(password);

    res.send(result).status(200);
})

router.post('/login', async (req, res) => {
    const { name, password } = req.body;

    try {
        const collection = db.collection('users');
        const user = await collection.findOne({ name });

        if (user) {
            
            const passwordMatch = await bcrypt.compare(password, user.password)

            if (passwordMatch) {
                const token = jwt.sign({username: req.body.name, password: req.body.password}, "this_secret_should_be_longer_than_it_is", {expiresIn: "1h"});
                res.status(200).json({message: "Authentication successful", token: token, name: req.body.name});
                console.log("Your new token is " + token);
            }
            else{
                res.status(400).json({ message: "Authentication failed" });
            }

        } else {
            res.status(400).json({ message: "Authentication failed" });
        }  
    } catch (e) {
        console.error('Error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
    });
  
  export default router