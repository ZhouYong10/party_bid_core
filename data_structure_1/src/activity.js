function Activity(name){
    this.name = name;
    this.sign_ups = [];
    this.bids = [];
}

function findIndexByName(objArray,name){
    for(var x = 0; x < objArray.length; x++){
        if(objArray[x]['name'] == name){
            return x;
        }
    }
    return -1;
}

Activity.getActivities = function(){
    return JSON.parse(localStorage.getItem("activities")) || [];
};

Activity.saveActivity = function(activity){
    var activities = Activity.getActivities();
    var index = findIndexByName(activities,activity.name);
    if(index != -1){
        activities[index] = activity;
    }else{
        activities.unshift(activity);
    }
    localStorage.activities = JSON.stringify(activities);
};

Activity.prototype.create = function(){
    Activity.saveActivity(this);
};

Activity.prototype.active = function(){
    localStorage.current_activity = this.name;
};

Activity.findByName = function(name){
    return _.findWhere(Activity.getActivities(),{name:name});
};