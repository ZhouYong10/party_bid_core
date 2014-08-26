function User(name,phone){
    this.name = name;
    this.phone = phone;
}

User.prototype.hadSignUp = function(activity){
    return _.findWhere(activity.sign_ups,{phone:this.phone})
};

User.prototype.signUp = function(){
    var messageToUser;
    switch(localStorage.is_signing_up){
        case "true":
            var activities = Activity.getActivities();
            var activity = activities[localStorage.current_activity_id];
            if(this.hadSignUp(activity)){
                messageToUser = "You've signed up, you can not duplicate registration.";
            }else{
                activity.sign_ups.push(this);
                Activity.refresh(localStorage.current_activity_id,activity);
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

User.prototype.hadPrice = function(activity){
    var biddings = activity.biddings;
    var priceUsers = biddings[localStorage.current_bid];
    return _.findWhere(priceUsers,{phone:this.phone});
};