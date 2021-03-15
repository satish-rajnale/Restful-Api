const express = require("express");
const app = express();
const tshirts = require("./components/tshirts");

app.use(express.json());


const PORT = 8080;

app.use('/t', tshirts);
app.get('/tshirt', (req, res) => {
    res.status(200).send({
        tshirt: "Red",
        size: "large"
    })
})

app.post("/tshirt/:id", (req, res) => {
    const id = req.params.id;
    const { logo } = req.body;

    if (!logo) { res.status(418).send({ message: "Need a logo here" }) };

    res.send({
        tshirt: `For id ${id} logo sent is ${logo}`
    })
})



app.listen(PORT, () => console.log(`live on port ${PORT}`));