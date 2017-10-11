var mysql = require('mysql');

function create_database_tables(){
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root"
    });
    
    con.connect(function(err) {
          if (err) throw err;
          console.log("Connected!");
          con.query("CREATE DATABASE IF NOT EXISTS dropbox", function (err, result) {
            if (err) throw err;
            console.log("Database created");
            //Table Create
            //userdata table 
            var userdata="CREATE TABLE IF NOT EXISTS `dropbox`.`userdata` ( \
              `userid` INT NOT NULL AUTO_INCREMENT,\
              `email` VARCHAR(45) NULL,\
              `password` VARCHAR(45) NULL,\
              `firstname` VARCHAR(45) NULL,\
              `lastname` VARCHAR(45) NULL,\
              `aboutme` VARCHAR(300) NULL,\
              `interests` VARCHAR(300) NULL,\
              PRIMARY KEY (`userid`));"
  
             con.query(userdata, function (err, result) {
              if (err) throw err;
              console.log("Table userdata created");
              
            //File table   
              
            });
          });
        });
  }
module.exports={
    create_database_tables:create_database_tables 
}