var SqlString = require('sqlstring');

function getsql(url, post){
    sqlString = "";
    
    //
    var jsonParsed = JSON.parse(post); 
    //
    uid = jsonParsed.userId;
    title = jsonParsed.title;
    duty_id = jsonParsed.id;
    if(uid === undefined){
        uid = 123;
    }

    //2、get the op
    if(url == "/api/add"){
        sqlString = SqlString.format('INSERT INTO myduty (user_id, title) VALUES (?,?)',[uid, title]);
    }
    if(url == "/api/update"){
        sqlString = SqlString.format('update myduty set title = ? where id = ?',[title, duty_id]);
    }
    if(url == "/api/delete"){
        sqlString = SqlString.format('delete from myduty where id = ?',[duty_id]);
    }
    if(url == "/api/query"){
        sqlString = SqlString.format('SELECT * from myduty where user_id = ?',[uid]);
    }

    return sqlString;
}

exports.getsql = getsql;