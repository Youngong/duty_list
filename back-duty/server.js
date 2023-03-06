const pool = require("./pgsql"); // 导入连接池
var checkfunctions = require("./checkparam.js");
var sqlfunctions = require("./sql-op.js");
var Result = require("./result.js");
var http = require('http');

http.createServer(function (request, response) {

    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: application/json
    //response.writeHead(200, {'Content-Type': 'application/json'});
    response.setHeader("Access-Control-Allow-Origin", "*"); // 设置可访问的源
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    response.setHeader("content-type", "application/json;charset=utf-8")

    var post = '';   
    
    if (request.url != '/api/query' &&  request.url != '/api/update' && request.url != '/api/add' && request.url != '/api/delete') {
        console.log(request.url);
        response.statusCode = 404;
        response.end();
        return;
    }

    request.on('error', (err) => {
        console.error(err);
        response.statusCode = 400;
        response.end();
        return;
      });
 
    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    request.on('data', function(chunk){    
        post += chunk;
    });

    res = new Result();
    res.errorCode=1000;
    res.errorMsg = "success";
    res.data = "[]";
 
    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    request.on('end', function(){    
        // 解析json
        if(!checkfunctions.checkparam(request.url, post)){
            res.errorCode = 1001;
            res.errorMsg = "param error!";
            console.error("param error!");
            console.error(JSON.stringify(res));
            response.end(JSON.stringify(res));
            return;
        }

        var sqlString = sqlfunctions.getsql(request.url, post);
        if(sqlString === ""){
            res.errorCode = 1002;
            res.errorMsg = "service error!";
            console.error("get sql error!");
            response.end(JSON.stringify(res));
            return;
        }

        //数据库操作---
        pool.connect(function(err, client, done) {
            if(err) {
                console.error('db connect error!', err);
                res.errorCode = 1003;
                res.errorMsg = "db connect error!";
                response.end(JSON.stringify(res));
                return;
            }

            client.query(sqlString , function(err, result) {
                done();// release conn（return to conn pool）
                if(err) {
                    console.error('conn query error!', err);
                    res.errorCode = 1004;
                    res.errorMsg = "db query error!";
                    response.end(JSON.stringify(res));
                    return;
                }

                if(request.url == "/api/query"){
                    res.data = result.rows;
                }
                console.log(sqlString);
                console.log('query success!');
                response.end(JSON.stringify(res));
            });
        });
    });

}).listen(8888);


// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');