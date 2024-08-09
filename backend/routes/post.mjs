import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
    let collection = await db.collection("posts");
    let results = await collection.find({}).toArray();
    res.status(200).send(results);
});

router.post("/upload", async (req, res) => {
    console.log(req.body);

    let newDocument = {
        user: req.body.user,
        name: req.body.name,
        image: req.body.image
    };

    let collection = await db.collection("posts");
    let result = await collection.insertOne(newDocument);
    res.status(200).send(result);
});

router.patch("/:id", async (req, res) => {
    const query = {_id: new ObjectId(req.params.id) };

    const updates = {
        $set: {
            user: req.body.user,
            name: req.body.name,
            image: req.body.image
        }
    }

    let collection = await db.collection("posts");
    let result = await collection.updateOne(query, updates);
    res.status(200).send(result);
});

router.delete("/:id", async (req, res) => {
    try {
        const query = {_id: new ObjectId(req.params.id) };

        const collection = db.collection("posts");
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch (error) {
        console.error("Error resetting the posts collection:", error);
        res.status(500).send({ message: "Failed to reset the collection", error });
    }
});

router.delete("/reset", async (req, res) => {
    try {
        let collection = await db.collection("posts");

        // Remove all documents from the collection
        let deleteResult = await collection.deleteMany({});

        console.log(`Deleted ${deleteResult.deletedCount} documents from the collection`);

        // Respond with a success status
        res.status(204).send(); // 204 No Content means the request was successful but there's no content to send back
    } catch (error) {
        console.error("Error resetting the posts collection:", error);
        res.status(500).send({ message: "Failed to reset the collection", error });
    }
});


export default router;