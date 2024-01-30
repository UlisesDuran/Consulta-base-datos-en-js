
var express = require('express');
const mysql = require('mysql');
const fastcsv = require('fast-csv');

const app = express();

const fs = require('fs');
const ws = fs.createWriteStream("facturas.csv");

const conection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'gilro',
    database: 'carter'
}) 

app.get("/exportcsv", (req, res) =>{
    conection.query("SELECT * FROM fico_facturas", function(err, data){
        if(err) throw err

        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData", jsonData);

        fastcsv.write(jsonData, {headers:true})
        .on("finish", function(){
            console.log("write to facturas.csv successfully!");
        }).pipe(ws);
    })
})

app.listen(3000, function(){
    console.log("Node app is running")
})


   