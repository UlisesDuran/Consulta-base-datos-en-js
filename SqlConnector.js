
const mysql = require('mysql');
const fastcsv = require('fast-csv');

const fs = require('fs');
const ws = fs.createWriteStream("facturas.csv");

const conection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'gilro',
    database: 'carter'
}) 


conection.query("SELECT * FROM fico_facturas", function(err, data){
    if(err) throw err

    const jsonData = JSON.parse(JSON.stringify(data));
    console.log("jsonData", jsonData);

    fastcsv.write(jsonData, {headers:true})
    .on("finish", function(){
        console.log("write to facturas.csv successfully!");
    }).pipe(ws);
})

conection.end();



