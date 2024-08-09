
import express from "express";

const app = express();
const urlPrefix = '/api';

app.disable('x-powered-by');

app.use(express.json());

app.get(urlPrefix+'/', (req,res) => {
    res.end("It's working, no more crying.");
});

app.get(urlPrefix+'/test', (req,res) => {
    res.end("Testing the /test endpoint.");
});

app.get(urlPrefix+'/orders', (req,res) => {
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