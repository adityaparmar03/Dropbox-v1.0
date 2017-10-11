var express = require('express');
var router = express.Router();
var multer = require('multer');
var glob = require('glob');

var sql = require('./sql')
var insert = "INSERT INTO ";
var files ="`dropbox`.`files` ";

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

   var userid= [];
   userid[0]=req.body.userid;
   var file_original_name = req.file.originalname;
   var file_virtual_name = req.file.filename;

   var insert_file = insert+files+"(`originalname`, \
   `virtualname`, `createddate`, `userid`) \
    VALUES ('"+file_original_name+"','"+file_virtual_name+"','"+date+"','"+userid+"');"

   sql.execute_query(insert_file).then(function(rows) {
    if(rows){
        res.json({
            originalname: file_original_name,
            filename: file_virtual_name,
            members:userid,
            status:"success",
            msg:"File has uploaded."
        });
    }
  }).catch((err) => setImmediate(() => { 
    throw err;
    res.json({
      status:"error",
      msg:"File is not uploaded."
    })
  })); 

   
});

module.exports = router;

//Ref: https://medium.com/ecmastack/uploading-files-with-react-js-and-node-js-e7e6b707f4ef