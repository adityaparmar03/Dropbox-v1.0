var mysql = require('mysql');

function create_connection(){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "dropbox"
      });
      return con;
     }   

function execute_query(query){
  return new Promise(function(resolve, reject) {
 
    var connection = create_connection();
    connection.query(query, function (err,result) {
        if (err) {
            return reject(err);
        }
        resolve(true);
    });
    connection.end()
});
  
}
function execute_query_with_ID(query){
    return new Promise(function(resolve, reject) {
   
      var connection = create_connection();
      connection.query(query, function (err,result) {
          if (err) {
              return reject(err);
          }
          
          resolve(result.insertId);
  
      });
      connection.end()
  });
}
function execute_read_query(query){
  
  return new Promise(function(resolve, reject) {
    var connection = create_connection();
    connection.query(query, function (err,rows,fields) {
    
        if (err) {
            return reject(err);
        }
        resolve(rows);
    });
    connection.end()
  });

  }
  
module.exports={
   
    create_connection:create_connection,
    execute_query:execute_query,
    execute_query_with_ID:execute_query_with_ID,
    execute_read_query:execute_read_query
   
}