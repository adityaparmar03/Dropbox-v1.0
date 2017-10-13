var express = require('express');
var router = express.Router();
var multer = require('multer');
var glob = require('glob');

var sql = require('./sql')
var insert = "INSERT INTO ";
var content ="`dropbox`.`content` ";
var content_mapping ="`dropbox`.`content_mapping` ";

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/files/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+"_"+file.originalname)
    }
});

var upload = multer({storage:storage});

/* GET users listing. */
router.get('/', function (req, res, next) {
    var resArr = [];

    glob("public/files/*", function (er, files) {

        var resArr = files.map(function (file) {
            var imgJSON = {};
            imgJSON.img = 'files/'+file.split('/')[2];
            imgJSON.cols = 2  ;
            return imgJSON;
        });

        console.log(resArr);
        res.status(200).send(resArr);
    });

});

router.post('/', upload.single('myfile'), function (req, res, next) {

   
   function twoDigits(d) {
        if(0 <= d && d < 10) return "0" + d.toString();
        if(-10 < d && d < 0) return "-0" + (-1*d).toString();
        return d.toString();
    }
    
    Date.prototype.toMysqlFormat = function() {
        return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
    };
     
    var date = Date().toString();

   var userid=req.body.userid;
   
   var type = "file"
   var folderid =req.body.folderid;
   var file_original_name = req.file.originalname;
   var file_virtual_name = req.file.filename;

   var insert_file = insert+content+"(`originalname`, \
   `virtualname`, `date`,`type`, `userid`) \
    VALUES ('"+file_original_name+"','"+file_virtual_name+"','"+date+"','"+type+"','"+userid+"');"
 
   sql.execute_query(insert_file).then(function(rows) {
    if(rows){
        var getfileid = "SELECT max(contentid) as contentid from "+content+"where userid ="+userid;
         
        sql.execute_read_query(getfileid).then(function(rows) {
        if(rows.length > 0){
            var fileid = rows[0].contentid;
            var maptofolder = insert+content_mapping+ "(`parent_content_id`,\
            `child_content_id`, `userid`) VALUES ('"+folderid+"', '"+fileid+"', '"+userid+"')"
             sql.execute_query(maptofolder).then(function(rows) {
                if(rows){
                    var content = {contentid:fileid,
                        originalname:file_original_name,
                        virtualname:file_virtual_name,
                        date:date,
                        type:type}
                    res.json({
                        content:content,
                        status:"success",
                        msg:"File is successfully uploaded."
                    });
                }
            })
        }  
    })
 }
})
.catch((err) => setImmediate(() => { 
    throw err;
    res.json({
      status:"error",
      msg:"File is not uploaded."
    })
  })); 

   
});

router.post('/createfolder', function (req, res, next) {
    
       
       function twoDigits(d) {
            if(0 <= d && d < 10) return "0" + d.toString();
            if(-10 < d && d < 0) return "-0" + (-1*d).toString();
            return d.toString();
        }
        
        Date.prototype.toMysqlFormat = function() {
            return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
        };
         
        var date = Date().toString();
        var userid=req.body.userid;
        var type = "folder";
        var parent =req.body.folderid;
        var folder_original_name =req.body.foldername;
        var folder_virtual_name = req.body.foldername;
    
       var insert_file = insert+content+"(`originalname`, \
       `virtualname`, `date`,`type`, `userid`) \
        VALUES ('"+folder_original_name+"','"+folder_virtual_name+"','"+date+"','"+type+"','"+userid+"');"
     
       sql.execute_query(insert_file).then(function(rows) {
        if(rows){
            var getfileid = "SELECT max(contentid) as contentid from "+content+"where userid ="+userid;
             
            sql.execute_read_query(getfileid).then(function(rows) {
            if(rows.length > 0){
                var child = rows[0].contentid;
                var maptofolder = insert+content_mapping+ "(`parent_content_id`,\
                `child_content_id`, `userid`) VALUES ('"+parent+"', '"+child+"', '"+userid+"')"
                 sql.execute_query(maptofolder).then(function(rows) {
                    if(rows){
                        var content = {contentid:child,
                            originalname:folder_original_name,
                            virtualname:folder_virtual_name,
                            date:date,
                            type:type}
                        res.json({
                            content:content,
                            status:"success",
                            msg:"Folder is successfully created."
                        });
                    }
                })
            }  
        })
     }
    })
    .catch((err) => setImmediate(() => { 
        throw err;
        res.json({
          status:"error",
          msg:"File is not uploaded."
        })
      })); 
    
       
    });

module.exports = router;

//Ref: https://medium.com/ecmastack/uploading-files-with-react-js-and-node-js-e7e6b707f4ef