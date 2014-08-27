function User(name,phone){
    this.name = name;
    this.phone = phone;
}

function render_sign_ups(id){
    return _.where(JSON.parse(localStorage.sign_ups),{activity_id:id});
}

User.prototype.hadSignUp = function(sign_ups){
    return _.findWhere(sign_ups,{phone:this.phone,activity_id:localStorage.current_activity})
};

User.prototype.hadPrice = function(){
    var biddings = JSON.parse(localStorage.biddings);
    if(_.findWhere(biddings,{phone:this.phone,bid_id:this.bid_id})){
        return true;
    }else{
        biddings.push(this);
        localStorage.biddings = JSON.stringify(biddings);
        return false;
    }
};

User.prototype.signUp = function(){
    var messageToUser;
    switch(localStorage.is_signing_up){
        case "true":
            var sign_ups = JSON.parse(localStorage.sign_ups);
            if(this.hadSignUp(sign_ups)){
                messageToUser = "You've signed up, you can not duplicate registration.";
            }else{
                this.activity_id = localStorage.current_activity;
                sign_ups.push(this);
                localStorage.sign_ups = JSON.stringify(sign_ups);
                messageToUser = "Congratulations, your application is successful.";
            }
            break;
        case "false":
            messageToUser = "Sorry, registration has ended.";
            break;
        default:
            messageToUser = "Registration has not yet started, please wait.";
    }
};