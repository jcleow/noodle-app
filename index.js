import express from 'express';
import read from './jsonFileStorage.js';

const app = express();

const PORT = 3004;
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Route to individual Recipe page
app.get('/recipe/:index', (request, response) => {
  read('data.json', (data) => {
    const { index: recipeIndex } = request.params;

    // Note that number in recipe/:index is NOT zero-indexed
    const recipeViewObj = data.recipes[recipeIndex - 1];
    response.render('recipe', recipeViewObj);
  });
});

// Route to index page
app.get('/', (request, response) => {
  read('indexData.json', (data) => {
    const indexViewObj = data.links;
    response.render('index', indexViewObj);
  });
});

// Route to categories
app.get('/category/:type', (request, response) => {
  read('categoryData.json', (data) => {
    const { type } = request.params;
    const categoryViewObj = data.links[type];
    response.render('index', categoryViewObj);
  });
});

app.listen(PORT);
