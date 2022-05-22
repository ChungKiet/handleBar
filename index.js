const express = require('express')
const path = require('path')
const expressHbs = require('express-handlebars');
const { extname } = require('path');

const app = express();

const hbs = expressHbs.create({
    layoutsDir: path.join(__dirname, 'views/layouts'),
    extname: 'hbs',
    defaultLayout: 'layout'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname, 'Handlebars-StaticFiles')))

app.get('/', (req,res)=>{
   res.render('index')
})

const {zodiacs } = require('./data')
app.get('/task4', (req,res)=>{
    res.locals.zodiacs = zodiacs;
    res.render('task4')
})

app.get('/task4/:name', (req,res)=>{
    res.locals.zodiac = zodiacs.filter(item=>item.name == req.params.name)[0]
    res.render('task4-details')
})

app.set('port', process.env.PORT || 5000)

app.listen(app.get('port'), () => {
    console.log(`server is running on port ${app.get('port')}`)
})