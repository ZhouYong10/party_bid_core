
function render_sign_ups(name){
    var activities = Activity.getActivities();
    activities = _.values(activities);
    var activity = _.findWhere(activities,{name:name});
    return activity.sign_ups;
}