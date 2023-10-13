const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');
uuid();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

let count = 2;

let items = [
    {
        id: uuid(),
        count: 1,
        item: "Milk"
    },
    {
        id: uuid(),
        count: 2,
        item: "Ghee"
    }
];

// Show the list
app.get('/', (req, res) => {
    res.render('index', { items });
})

// Adding new item
app.get('/', (req, res) => {
    res.render('index');
})

app.post('/', (req, res) => {
    console.log(req.body);
    let { item } = req.body;
    count++;
    items.push({ id: uuid(), count, item });
    res.redirect('/');
})

// Deleting an item
app.delete('/:id', (req, res) => {
    let { id } = req.params;
    // console.log(id, count);
    items = items.filter(i => i.id !== id);
    count--;
    res.redirect('/');
})

app.listen(3000, () => {
    console.log("Server Running at Port 3000");
})