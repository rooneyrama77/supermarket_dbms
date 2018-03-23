var express = require('express');
var mysql = require('mysql');

var app=express();

var swig=require('swig');
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.json());      


app.get('/bill', function(req,res) {
	var x = req.query.value;
	res.render('rama3',{ val : x } );

});

app.get('/bill1', function(req,res) {
	var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cibicool",
  database: "supermarket"
});
	var inp=req.query.value;
	con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
	console.log(inp);
	var sql="insert into payment values("+inp+","+"1001)";
	con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
});
	res.send("payment Successful" );
});

});


app.get('/', function (req, res) {

res.sendFile('rama.html', {root: __dirname });

});


app.get('/rama1.html', function (req, res) {

res.sendFile('rama1.html', {root: __dirname });

});
app.get('/ramalogin.jpg', function (req, res) {

res.sendFile('ramalogin.jpg', {root: __dirname });

});

app.get('/ramalogingif.gif', function (req, res) {

res.sendFile('ramalogingif.gif', {root: __dirname });

});



app.post('/login', function (req, res) {

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cibicool",
  database: "supermarket"
});
var username1=req.body.uname;
var password1=req.body.psw;
username1 = "'" + username1 + "'";
password1  = "'" + password1 + "'";
console.log(username1);
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "select * from login where username="+username1+" and password="+password1; 
	var resu=0;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
	resu=result.length;
	var x = 0;
     if(resu)
     res.render('rama2',{ val : 0, val1 : x  } );
    else
	res.sendFile('error.html',{root: __dirname });
  });
});
});


app.post('/signup', function (req, res) {

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cibicool",
  database: "supermarket"
});
var username1=req.body.uname;
var password1=req.body.psw;
var password2=req.body.psw1;
username1 = "'" + username1 + "'";
password1  = "'" + password1 + "'";
password2 = "'" + password2 + "'";
console.log(username1);
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
	if(password1 != password2)
		res.sendFile('error.html',{root: __dirname });
	else
	{
  var sql = "select * from login where username="+username1+" and password="+password1; 
	var resu=0;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
	resu=result.length;
     if(resu)
     res.sendFile('error.html',{root: __dirname });
    else
	{
	var sql1 = "insert into login values("+username1+","+password1+")";
	 con.query(sql1, function (err, result) {
    if (err) throw err;
    console.log(result);
	res.sendFile('rama.html',{root: __dirname });
  });
	}
});
}
});
});



app.post('/set_price',function (req,res) {
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cibicool",
  database: "supermarket"
});
var text=req.body.wgt;
var sql1 = "select prod_price from product where prod_name='"+text+"'";
	 con.query(sql1, function (err, result) {
    if (err) throw err;
   // console.log(result[0].prod_price);
var x = Number(req.body.psw1);
console.log(x);
//console.log(Number(x) + 5);
var y = Number(result[0].prod_price);
var z = Number(x + y);
//console.log(x);
res.render('rama2' , { val : y , val1 : z });
 });
});


var server = app.listen(8083, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port);
});
