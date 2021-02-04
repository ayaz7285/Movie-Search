const express= require('express')
const request=require('request')
const app= express()

const dotenv=require('dotenv')
dotenv.config()

app.set("view engine", "ejs")

app.use('/public', express.static('public'))


app.get("/",(req, res)=>{
    res.render("Home")
})

app.get("/aboutme", (req,res)=>{
    res.render("AboutMe")
})

app.get("/result", (req, res)=>{
    const query = req.query.search;
    const url = "http://www.omdbapi.com/?apikey=6cae4c9b&s=" + query;
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body)
            if(data.Response==='False'){
                res.send("Movie Not Found");
            }else{
                res.render("Result", {data:data});    
            }
        }else{
            res.send('Error');
        }
    });
});

app.get("/result/:id", (req, res)=>{
    const url = "http://www.omdbapi.com/?apikey=6cae4c9b&i=" + req.params.id;
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body)
            //console.log(data);
            if(data.Response==='False'){
                res.send("Movie Not Found");
            }else{
                //res.send(data);
                res.render("Info", {movie: data});    
            }
        }else{
            res.send('Error');
        }
    });
});




app.listen(process.env.PORT, ()=>{
    console.log("Server has started")   // this will start a local server.
})


