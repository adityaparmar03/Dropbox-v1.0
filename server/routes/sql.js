var mysql = require('mysql');

function create_connection(){
    var con = mysql.createConnection({
        host: "localhost2",
        user: "root",
        password: "root",
        database: "dropbox"
      });
      return con;
     }   

function execute_query(query){
  return new Promise(function(resolve, reject) {
    // The Promise constructor should catch any errors thrown on
    // this tick. Alternately, try/catch and reject(err) on catch.
    var connection = create_connection();
    connection.query(query, function (err,result) {
        // Call reject on error states,
        // call resolve with results
        if (err) {
            return reject(err);
        }
        resolve(true);
    });
});
  
}
function execute_read_query(query){
  
    var myquery = query;
    var con = create_connection();
  
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      con.query(myquery, function (err, result) {
        if (err) throw err;
          return result;
          console.log("query Executed... !");
      });
    });
  }
  
module.exports={
   
    create_connection:create_connection,
    execute_query:execute_query,
    execute_read_query:execute_read_query
   
}