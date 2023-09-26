const express = require('express')
const app = express()
const path = require('path')
var fs = require('fs');
const cheerio = require('cheerio');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const $ = cheerio.load(fs.readFileSync('/Users/mealadebadi/Documents/Self-Study/views/collection.ejs'));
const baf = cheerio.load(fs.readFileSync('/Users/mealadebadi/Documents/Self-Study/views/baf.ejs'))

app.set('view engine', 'ejs')

var top = "/images/white-square-background-56v690fpm25a3o6s.jpg"
var bottom = "/images/white-square-background-56v690fpm25a3o6s.jpg"
var shoe = "/images/white-square-background-56v690fpm25a3o6s.jpg"

app.get("/", (req, res) =>{
    res.render('index')
})


app.get("/collection", (req, res) =>{
    res.render('collection')
})

app.get("/baf", (req, res) =>{
    res.render('baf', {
        top: top,
        bottom: bottom,
        shoe: shoe
    })



})
app.post("/collection", (req, res) => {
    const allImages = []
   for (let i = 0; ($('.clothes').find('img').eq(i).attr('src')) != undefined; i++){
        const curImg = [$('.clothes').find('img').eq(i).attr('id'), $('.clothes').find('img').eq(i).attr('src'), $('.clothes').find('img').eq(i).attr('value')]
        allImages.push(curImg)
    } 
    for (let i=0; i<allImages.length; i++){
        if (req.body.button == allImages[i][0]){
            if (allImages[i][2] == "top"){
               top = allImages[i][1]
            }
            if (allImages[i][2] == "bottom"){
                bottom = allImages[i][1]
            }
            if (allImages[i][2] == "shoe"){
                shoe = allImages[i][1]
            }
        }
        
    }  
})


app.listen(3000)
