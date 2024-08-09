
import express from "express";

const app = express();
const urlPrefix = '/api';

let example = app;

example.use(express.json());

example.get(urlPrefix+'/', (req,res) => {
    res.end("It's working, no more crying.");
});

example.get(urlPrefix+'/test', (req,res) => {
    res.end("Testing the /test endpoint.");
});

example.get(urlPrefix+'/orders', (req,res) => {
    const orders = [
        {
            id: "1",
            names: "Orange"
        },
        {
            id: "2",
            names: "Apple"
        },
        {
            id: "3",
            names: "Pear"
        },
        {
            id: "4",
            names: "Banana"
        },
    ]
    res.json(
        {
            message: "Fruits",
            orders: orders
        }
    )
})

export default app;