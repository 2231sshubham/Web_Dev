// All the required dependencies are included with the folders

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

app=express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
  res.sendFile(__dirname + "\\index.html");
});

app.post("/",function(req,res){
  const query = req.body.city
  console.log(query);
  const apiKey = '' //Fetch and enter your API key from openweathermap.com
  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query +'&appid='+ apiKey +'&units=metric'

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weather = JSON.parse(data)
      const temp = weather.main.temp
      const des = weather.weather[0].description
      const icon = 'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '.png'
      res.write("<p>The weather is " + des + "</p>")
      res.write("<h1> The temprature at " + query + " is " + temp + "deg</h1>");
      res.write("<img src=" + icon + " style='background-color:violet'>");
      res.send();
    })
  })
})

app.listen(3000,function(){
  console.log("Server started.");
});
