var express = require("express")
var app = express()
var db = require("./db.js")
var router = express.Router()
var bodyParser = require("body-parser")
app.use(bodyParser.json())
//处理post中字符串的请求
app.use(bodyParser.urlencoded({ extended: false }))
//使用路由
app.use(router)
/*
    跨域处理
    1.代理 node-http-proxy
    2.jsonp  get
    3.设置 请求响应头
    4.cors   get
*/
router.all("*",(req,res,next)=>{
    //允许所有域名进行访问
    res.header("Access-Control-Allow-origin","*")
    //定义请求头类型
    res.header("Access-Control-Allow-Headers","content-type")
    //定义跨域访问的请求方式
    res.header("Access-Control-Allow-Method","GET","POST","PATCH","PUT","OPTIONS","DELETE")
    //判断
    next()
})
//注册接口
router.post("/register", (req, res) => {
    var regUser = {
        username: req.body.username,
        password: req.body.password,
        createAt: new Date(),
        updataAt: new Date(),
        phone: req.body.phone,
        email: req.body.email,
        tokenId: 1
    }
    db.add("userData", regUser, (err, result) => {
        if (err) {
            throw err
        }
        res.send({ "success": "ok" })
    })
})
//登录接口
router.get("/login", (req, res) => {
    /*
        1.接收前端传输过来的值  query
        2.根据前端的值与数据库里面的用户数据进行对比（find）
            2.1判断是否存在用户
            2.2再与数据里的数据进行对比
            2.3一致时返回成功
        3.前端进行登录成功的跳转
    */
    //接收前端传输的值
    var userData = {
        username: req.query.username,
        password: req.query.password
    }
    //进行数据库的检索
    db.find("userData", userData, (err, result) => {
        if (result.length == 0) {
            res.send({ "error": "无此用户" })
        } else if (result.length != 0 && result[0].username == req.query.username && result[0].password == req.query.password) {
           //如果造成跨域，通过jsonp请求成功未返回数据需要
           //后端返回callback
            res.send({ "success": "登录成功" })
        }
    })
})
app.listen(3000)