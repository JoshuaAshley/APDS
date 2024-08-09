import https from 'https';
import fs from 'fs';
import app from './app.mjs';
import posts from "./routes/post.mjs";
import users from "./routes/user.mjs";
import cors from "cors";
import express from "express";

const port = 3001;

const options = {
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
};

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});

// Register the routes
app.use("/post", posts);
app.route("/post", posts);
app.use("/user", users);
app.route("/user", users);

// Create the HTTPS server with the provided options
let server = https.createServer(options, app);

console.log(`Server running on port ${port}`);

// Start the server
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});