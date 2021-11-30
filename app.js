var express = require('express');
const app = express();
const port = process.env.PORT||9000;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
//const mongourl = "mongodb://localhost:27017"
const mongourl = "mongodb+srv://divya_123:divya123@cluster0.pbtgo.mongodb.net/eduaug?retryWrites=true&w=majority"

var db;

//get
app.get('/',(req,res) => {
    res.send("Welcome to Node Api1")
})

//list of cities
app.get('/location',(req,res) =>{
    db.collection('location').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

//list of restaurant
app.get('/restaurant',(req,res) =>{
    db.collection('restaurant').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

//list of QuickSearches
app.get('/quicksearch',(req,res) =>{
    db.collection('mealtype').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

//list of restaurants wrt city
//params example
/*app.get('/restaurant/:cityId',(req,res) =>{
    var cityId=req.params.cityId;
    console.log("cityId>>>>",cityId)
    db.collection('restaurant').find({city:cityId}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)    
    })
})*/

// query example
app.get('/restaurant',(req,res) =>{
    var cityId = req.query.cityId?req.query.cityId:2;
    db.collection('restaurant').find({city:cityId}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

MongoClient.connect(mongourl, (err,client) => {
    if(err) console.log("Error While Connecting");
    db = client.db('eduaug');
    app.listen(port,()=>{
        console.log(`listening on port no ${port}`)
    });
})