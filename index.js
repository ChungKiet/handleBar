const express = require('express')
const expressHbs = require('express-handlebars');
const app = express();
const path = require('path');

const hbs = expressHbs.create({
   layoutsDir: path.join(__dirname, 'views/layouts'),
   extname: 'hbs',
   defaultLayout: 'layout'
});

const { categories, products } = require('./data')

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'code')));

app.get('/', (req, res)=> {
   res.render('index');
})

app.get('/task1', (req, res)=> {
   res.render('task1');
})

app.get('/task2', (req, res)=> {
   res.render('task2');
})

app.get('/task3', (req, res)=> {
   let category = req.query.cat || 0;
   res.locals.categories = categories;
   res.locals.products = products;
   if (category){
      res.locals.products = products.filter(item => item.category == category);
   }
   res.render('task3');
})

app.get('/task4', (req, res)=> {
   res.render('task4');
})

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), () => {
   console.log(`server is running on the ${app.get('port')}`);
   console.log(path.join(__dirname, 'code'),{
      index: 'index.htm'
   })
})