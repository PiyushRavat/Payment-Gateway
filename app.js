const express = require('express');
const stripe = require('stripe')('sk_test_WXmBGcfjcRMvLZk4rlyVMxKa');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const app =express();

//handlebar
app.set('view engine','hbs');
app.set('views',__dirname +'/views');

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//static folder
app.use(express.static(`${__dirname}/public`));

//index router
app.get('/',(req,res)=>{
	res.render('index');
});

app.get('/paysuccess',(req,res)=>{
	res.render('paysuccess');
});

app.post('/charge',(req,res)=>{
	var token = req.body.stripeToken;
	var chargeAmount = req.body.chargeAmount;
	var charge = stripe.charges.create({
		amount: chargeAmount,
		currency: "usd",
		source: token
	},(err,charge)=>{
		console.log(err);
		if(err ==="StripeCardError"){
			if(err.type === "StripeCardError"){
				console.log("Your Card is Decliend..!");
			}
			// console.log("Your Card is Decliend..!");
		}
	});
	res.redirect('/paysuccess')
});


app.listen(4000, ()=>{
	console.log('Server Started At 4000');
});