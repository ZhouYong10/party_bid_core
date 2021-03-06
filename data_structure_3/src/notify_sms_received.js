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
                var user = new User(message.substring(2),userPhone);
                user.signUp();
                break;
            case "jj":
                var bidUser = new User("",userPhone);
                bidUser.price = message.substring(2);
                bid(bidUser);
                break;
            default:
                messageToUser = "发生错误，请检查短信格式是否正确。";
        }
        console.log(userPhone, messageToUser);
    }
}