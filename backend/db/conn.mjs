import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const connString = process.env.ATLAS_URI || "";

console.log(connString);

const client = new MongoClient(connString);

let conn;
try {
    conn = await client.connect();
    console.log("MONGO is connected.");
}
catch(e){
    console.error(e);
}

let db = conn.db("users");

export default db;