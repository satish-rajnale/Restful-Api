var express = require("express");
var tshirtRoute = express.Router();

const colors = {
    one:{
        1:"1stred",
        2:"2ndred",
        3:"3rdred",
        4:"4thred",
        5:"5thred",
},
    two:{
        1:"1styellow",
        2:"2ndyellow",
        3:"3rdyellow",
        4:"4thyellow",
        5:"5thyellow",
},
    three:{
        1:"1stwhite",
        2:"2ndwhite",
        3:"3rdwhite",
        4:"4thwhite",
        5:"5thwhite",
}

}

function valueByObjId(){
    let retriever = [];
    let {one,two,three} = colors;
    let a = Object.values(one);
    let b = Object.values(two);
    let c = Object.values(three);
    let result = retriever.concat(a).concat(b).concat(c)
    

}




tshirtRoute.get("/color", (req,res,next) =>{
    res.status(200).json(valueByObjId());
})

tshirtRoute.get("/colorsPickbyid", (req,res)=>{
    // const id = req.query.id;
    // res.status(200).send(colors[id]);

    let id = req.query.id;
    for(id in colors){
        res.status(200).send(colors[id])};

   
})


module.exports =tshirtRoute;