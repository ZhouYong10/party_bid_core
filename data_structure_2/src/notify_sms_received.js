function notify_sms_received(sms_json){
    var messageToUser;
    var userPhone;

    var message;
    var flag;

    var messages = sms_json.messages;
    for(var x = 0; x < messages.length; x++){

        userPhone = messages[x].phone;

        message = messages[x].message.replace(/\s+/g,"");

        flag = message.substring(0,2).toLowerCase();

        switch(flag){
            case "bm":


            case "jj":


            default:
                messageToUser = "发生错误，请检查短信格式是否正确。";
        }

        console.log(userPhone, messageToUser);
    }
}