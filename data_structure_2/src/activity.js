function Activity(name){
    this.name = name;
    this.sign_ups = [];
    this.bids = [];
    this.biddings = {};
}

Activity.getActivities = function(){
    return JSON.parse(localStorage.getItem("activities")) || {} ;
};

Activity.prototype.create = function(){
    var activityIdGenerator = localStorage.activity_id_generator;
    var activityIds = JSON.parse(localStorage.activity_ids);
    var activities = Activity.getActivities();
    activities[activityIdGenerator] = this;
    activityIds.push(activityIdGenerator);
    localStorage.activity_id_generator = parseInt(activityIdGenerator) + 1;
    localStorage.activity_ids = JSON.stringify(activityIds);
    localStorage.activities = JSON.stringify(activities);
    localStorage.current_activity_id = activityIdGenerator;
};

Activity.refresh = function(key,activity){
    var activities = Activity.getActivities();
    activities[key] = activity;
    localStorage.activities = JSON.stringify(activities);
};