var express = require('express');
var stripe = require('stripe')('sk_test_y3hsLQIMprwNvK7DESZbOEno');
var bodyParser = require('body-parser');
var expresshandle = require('express-handlebars');


var app= express();


//=============================handlebars middleware==================================================
app.engine('handlebars',expresshandle({defaultLayout:'main'}) );
app.set('view engine', 'handlebars');

//=============================Body parser middleware ================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//=============================set static folder================================================
app.use(express.static('${__dirname}/public'));
//index route 

app.get("/", function(req,res){
    res.render('index');
});

// app.get("/success", function(req,res){
//     res.render('success');
// });

//=============================Charge Route================================================
app.post("/charge", function(req,res){
   const amount =2500; 
   stripe.customers.create({
       email:req.body.stripeEmail,
       source:req.body.stripeToken
   })
   .then(customer => stripe.charges.create({
       amount,
       description:'Web Dev Ebook',
       currency:'usd',
       customer:customer.id
   }))
   .then(charge=> res.render('success'));
});

const port = process.env .PORT ||5000;

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The website has started!") 
});