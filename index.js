const express = require('express')
const expressHbs = require('express-handlebars');
const app = express();
const path = require('path');
const bodyParser=require('body-parser');


const hbs = expressHbs.create({
   layoutsDir: path.join(__dirname, 'views/layouts'),
   partialsDir:path.join(__dirname, 'views/partials'),
   extname: 'hbs',
   defaultLayout: 'layout'
});

const { categories, products } = require('./data')

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'code')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.get('/', (req, res)=> {
   res.render('index');
})

const {emotions} = require('./data')
app.get('/task1', (req, res)=> {
   res.render('task1', {emotions});
})

app.get('/task2', (req, res)=> {
   let salary=parseFloat(req.query.salary||0);
   res.locals.jars=[salary*55/100,salary*10/100,salary*5/100,salary*10/100,salary*10/100,salary*10/100];
   res.render('task2');
})


app.post('/task2', (req, res)=> {
   let salary=parseFloat(req.body.salary||0);
   res.locals.jars=[salary*55/100,salary*10/100,salary*5/100,salary*10/100,salary*10/100,salary*10/100];
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