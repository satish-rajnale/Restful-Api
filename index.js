const express = require("express");
const app = express();
const tshirts = require("./components/tshirts");

app.use(express.json());

const PORT = 8080;

app.use("/t", tshirts);
app.get("/tshirt", (req, res) => {
  var obj ={
    "title": "The Basics - Networking",
    "description": "Your app fetched this from a remote endpoint!",
    "movies": [
      { "id": "1", "title": "Star Wars", "releaseYear": "1977" },
      { "id": "2", "title": "Back to the Future", "releaseYear": "1985" },
      { "id": "3", "title": "The Matrix", "releaseYear": "1999" },
      { "id": "4", "title": "Inception", "releaseYear": "2010" },
      { "id": "5", "title": "Interstellar", "releaseYear": "2014" }
    ]
  }
  res.status(200).send(obj);
});

const localStore = [];

app.post("/tshirt/:id", (req, res) => {
  const id = req.params.id;
  const {reqKey, reqVal} = req.body;
  var data =  {key: reqKey, val: reqVal};
  localStore.push(data)
  console.log(localStore)
  res.send(localStore);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
