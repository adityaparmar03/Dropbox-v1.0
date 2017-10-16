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
            var userdata="CREATE TABLE  IF NOT EXISTS `dropbox`.`userdata` (\
              `userid` int(11) NOT NULL AUTO_INCREMENT,\
              `email` varchar(45) DEFAULT NULL,\
              `password` varchar(200) DEFAULT NULL,\
              `salt` varchar(200) DEFAULT NULL,\
              `firstname` varchar(45) DEFAULT NULL,\
              `lastname` varchar(45) DEFAULT NULL,\
              `aboutme` varchar(300) DEFAULT NULL,\
              `interests` varchar(300) DEFAULT NULL,\
              PRIMARY KEY (`userid`),\
              UNIQUE KEY `email_UNIQUE` (`email`)\
            ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1"
            

            var content = "CREATE TABLE  IF NOT EXISTS `dropbox`.`content` (\
              `contentid` int(11) NOT NULL AUTO_INCREMENT,\
              `originalname` mediumtext,\
              `virtualname` mediumtext,\
              `date` tinytext,\
              `type` varchar(45) DEFAULT NULL,\
              `star` varchar(45) DEFAULT 'NO',\
              `userid` int(11) DEFAULT NULL,\
              PRIMARY KEY (`contentid`)\
            ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1"
            
            var mapping = "CREATE TABLE  IF NOT EXISTS  `dropbox`.`mapping` (\
              `mappingid` int(11) NOT NULL AUTO_INCREMENT,\
              `folderid` int(11) DEFAULT NULL,\
              `contentid` int(11) DEFAULT NULL,\
              `contenttype` varchar(45) DEFAULT NULL,\
              `star` varchar(45) DEFAULT 'NO',\
              PRIMARY KEY (`mappingid`)\
            ) ENGINE=InnoDB DEFAULT CHARSET=latin1"
            
            var contentmapping = "CREATE TABLE  IF NOT EXISTS `dropbox`.`content_mapping` (\
              `conent_mapping_id` int(11) NOT NULL AUTO_INCREMENT,\
              `parent_content_id` int(11) DEFAULT NULL,\
              `child_content_id` int(11) DEFAULT NULL,\
              `shared` varchar(45) DEFAULT 'Only you',\
              `userid` int(11) DEFAULT NULL,\
              PRIMARY KEY (`conent_mapping_id`)\
            ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1"
            
            var activitylog = "CREATE TABLE  IF NOT EXISTS `dropbox`.`activity_log` (\
              `activity_log_id` int(11) NOT NULL AUTO_INCREMENT,\
              `msg` varchar(200) DEFAULT NULL,\
              `date` varchar(45) DEFAULT NULL,\
              `userid` int(11) DEFAULT NULL,\
              PRIMARY KEY (`activity_log_id`)\
            ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1"

             con.query(userdata, function (err, result) {
              if (err) throw err;
              console.log("Table userdata created");
            });
              con.query(content, function (err, result) {
                if (err) throw err;
                console.log("Table content created");
              });
                con.query(activitylog, function (err, result) {
                  if (err) throw err;
                  console.log("Table activitylog created");
                });
                  con.query(contentmapping, function (err, result) {
                    if (err) throw err;
                    console.log("Table contentmapping created");
                  });
                    con.query(mapping, function (err, result) {
                      if (err) throw err;
                      console.log("Table mapping created");
                    });
            //File table   
              
            });
          })
  }
module.exports={
    create_database_tables:create_database_tables 
}