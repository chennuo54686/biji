// var mongoClient = require("mongodb").MongoClient
// var url = "mongodb://127.0.0.1:27017"
// function ConnectDB(callback) {
//     //连接数据库
//     mongoClient.connect(url, (err, db) => {
//         //创建数据库
//         var dbName = db.db("adminuser")
//         if (err) {
//             //报错后抛出err返回空
//             callback(err, null)
//         }
//         //成功后执行回调函数
//         callback(err, db, dbName)
//     })
// }
// exports.add = function (collectionName, json, callback) {
//     ConnectDB(function (err, db, dbName) {
//         dbName.collection(collectionName).insert(json, function (err) {
//             if (err) {
//                 callback(err, null)
//             }
//             callback(err, result)
//             db.colse()
//         })
//     })
// }
// exports.find = function (collectionName, json, callback) {
//     ConnectDB(function (err, db, dbName) {
//         //因为插入数据里面的形式是以数组的方式存在的
//         dbName.collection(collectionName).find(json).toArray(function (err, result) {
//             if (err) {
//                 callback(err, null)
//             }
//             callback(err, result)
//             db.colse()
//         })
//     })
    
// }
// exports.del = function (collectionName, json, callback) {
//     ConnectDB(function (err, db, dbName) {
//         dbName.collection(collectionName).deleteOne(json, function (err) {
//             if (err) {
//                 callback(err, null)
//             }
//             callback(err, result)
//             db.colse()
//         })
//     })
// }
// exports.gai = function (collectionName, json, json1, callback) {
//     ConnectDB(function (err, db, dbName) {
//         dbName.collection(collectionName).updateOne(json, json1, function (err) {
//             if (err) {
//                 callback(err, null)
//             }
//             callback(err, result)
//             db.colse()
//         })
//     })
// }

var mongoClient=require("mongodb").MongoClient;
var url="mongodb://127.0.0.1:27017"
function ConnectDB(callback){
    mongoClient.connect(url,(err,db)=>{
        // url 连接地址  err   
        var dbName=db.db("adminuser")
        // 创建数据库
        if(err){
            // 如果有错
            callback(err,null)
            // 返回
        }
        callback(err,db,dbName,callback)
        // db   dbName指名称 callback
    })
}
exports.add=function(collectionName,json,callback){
    ConnectDB(function(err,mongo,dbName){
        dbName.collection(collectionName).insert(json,function(err,result){
            if(err){
                callback(err.null)
            }
            callback(err,result)
            mongo.close()
        })
    })
}
exports.find=function(collectionName,json,callback){
    ConnectDB(function(err,mongo,dbName){
        // 因为插入数据里面是一数组形式存在
        dbName.collection(collectionName).find(json).toArray(function(err,result){
            if(err){
                callback(err,null)
            }
            callback(err,result)
            mongo.close()
        })
    })
}

exports.del=function(collectionName,json,callback){
    ConnectDB(function(err,mongo,dbName){
        dbName.collection(collectionName).deleteOne(json,function(err,result){
            if(err){
                callback(err.null)
            }
            callback(err,result)
            mongo.close()
        })
    })
}
exports.gai=function(collectionName,json,json1,callback){
    ConnectDB(function(err,mongo,dbName){
        dbName.collection(collectionName).updateMany(json,json1,function(err,result){
            if(err){
                callback(err.null)
            }
            callback(err,result)
            mongo.close()
        })
    })
}
