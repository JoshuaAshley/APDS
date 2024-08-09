import https from 'https';
import fs from 'fs';
import app from './app.mjs';
import posts from "./routes/post.mjs";
import users from "./routes/user.mjs";
import cors from "cors";
import express from "express";

// Define your allowed origins
const allowedOrigins = ['*'];

const port = 3001;

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true // If you need to support cookies or authorization headers
};

// Apply CORS middleware with the configured options
app.use(cors(corsOptions));
app.use(express.json());

// Register the routes
app.use("/post", posts);
app.use("/user", users);

// Create the HTTPS server with the provided options
const options = {
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
};

let server = https.createServer(options, app);

console.log(`Server running on port ${port}`);

// Start the server
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
