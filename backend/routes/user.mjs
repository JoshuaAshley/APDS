import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
//import ExpressBrute from "express-brute";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

// var store = ExpressBrute.MemoryStore();
// var bruteForce = new ExpressBrute(store);

router.post("/signup", async (req, res) => {
    try {
        const collection = await db.collection("users");

        // Check if a user with the same name already exists
        const existingUser = await collection.findOne({ name: req.body.name });

        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Hash the password
        const password = await bcrypt.hash(req.body.password, 10);

        // Create a new user document
        let newDocument = {
            name: req.body.name,
            password: password // No need to use .toString()
        };

        // Insert the new user into the collection
        let result = await collection.insertOne(newDocument);

        // Send back the result with a success status
        res.status(200).json({ message: "User registered successfully", result });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

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