const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + "/views/partials");

// Add the route handlers here:

app.get('/', (req, res) => {
    res.status(200).render('index');
});

app.get('/beers', async (req, res) => {
  try {
    const beer = await punkAPI.getBeers();
    res.status(200).render('beers', {beer});
  } catch {
    res.send(console.error());
  }
});

app.get('/random-beer', async (req, res) => {
  try {
    const beerArr = await punkAPI.getRandom();
    const beer = await beerArr[0]
    res.status(200).render('randomBeer', {beer});
  } catch {
    res.send(console.error());
  }
});

app.get('/:id', async (req, res) => {
  try {
    const beerArr = await punkAPI.getBeer(req.params.id);
    const beer = await beerArr[0]
    res.status(200).render("randomBeer", {beer});
  } catch {
    res.send(console.error());
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
