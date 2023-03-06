var pg = require("pg");
 
//db config
var config = {
    database:"postgres",   //db name
    user:"postgres",       //username
    password:"1234",       //password
    port:5432,             //port
    //
    max:20, // max db connections
    idleTimeoutMillis:3000 // max square time: 3s
};
 
//create conenction pool
var pool = new pg.Pool(config);

module.exports = pool;