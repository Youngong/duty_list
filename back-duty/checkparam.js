function checkparam(url, post){
    //check the uid’s correct...
    //to be continued
    //
    //

    if(post == ""){
        return false;
    }

    //parse the json
    var jsonParsed = JSON.parse(post); 
    //get the column
    uid = jsonParsed.userId;
    title = jsonParsed.title;
    duty_id = jsonParsed.id;
    if(uid === undefined){
        //to be continued
    }
    if(title !== undefined && title.length > 100){
        //string too long
        console.error("title is too long!");
        return false;
    }

    //2、get the op
    if(duty_id === undefined && (url == "/api/update" || url == "/api/delete")){
        console.error("duty_id is null");
        return false;
    }

    return true;
}

exports.checkparam = checkparam;