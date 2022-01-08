//element fetch
var datas ={
    cities:"",
}

// call express module 
var axios = require("axios").default;
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
//app.set('public engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));



//weather api call 
const getWeatherApi= (city)=>{
    var options = {
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather',
        params: {
          q: city,
          lat: '0',
          lon: '0',
          id: '2172797',
          lang: 'null',
          units: 'metric',
          mode: 'json'
        },
        headers: {
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key': '4f191f8d8cmsh2be3808d5986143p1cabc6jsn38a2aed72f54'
        }
      };
    var weatherData = axios.request(options);
    return weatherData.then(items => (items.data));
};

var items ={
};
//get method

app.get("/",(req,res)=>{
    let path = __dirname + "/view/index.ejs";
    var data = getWeatherApi(city="Lahore");
    items = data;
    data.then((items)=>{
        const {main,weather,name,coord,clouds,wind}= items;
        // const iconpath = 'http://openweathermap.org/img/wn/'+items.weather.icon +'@2x.png';
        res.render(path,{data:{main:main,weather:weather[0],name,clouds:clouds,wind:wind,extention:"@2x.png"}});
    })
})
//post method
app.post("/",(req,res)=>{
    if (req.body.cityName) {
        let city = req.body.cityName;
        datas.cities=city;
        let path = __dirname + "/view/index.ejs";
        var data = getWeatherApi(city);
        items = data;
        data.then((items)=>{
            const {main,weather,name,coord,clouds,wind}= items;
        // const iconpath = 'http://openweathermap.org/img/wn/'+ items.weather[0].icon +'@2x.png';
        //     console.log(items.weather[0].icon);
            res.render(path,{data:{main:main,weather:weather[0],name,clouds:clouds,wind:wind,extention:"@2x.png"}});
        })
    }
    else{
        console.log("Plz enter some city name");
    }
})


app.listen(PORT,(err)=>{
    err ? 
    console.log("Error in server setup") :
    console.log("Server listening on Port" + + PORT);
})







