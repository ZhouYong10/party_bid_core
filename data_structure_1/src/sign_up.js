function Sign_up(name,phone){
    this.name = name;
    this.phone = phone;
}

Sign_up.prototype.hadSignUp = function(activity){
    return _.findWhere(activity.sign_ups,{phone:this.phone})
};

Sign_up.prototype.signUp = function(){
    var activity = Activity.findByName(localStorage.current_activity);
    switch(localStorage.is_signing_up){
        case "true":
            if(this.hadSignUp(activity)){
                return "You've signed up, you can not duplicate registration.";
            }
            activity.sign_ups.push(this);
            Activity.saveActivity(activity);
            return "Congratulations, your application is successful!";
        case "false":
            return "Sorry, registration has ended.";
        default:
            return "Registration has not yet started, please wait....";
    }
};