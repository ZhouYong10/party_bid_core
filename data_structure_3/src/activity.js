function Activity(name){
    this.name = name;
}

Activity.getActivities = function(){
    return JSON.parse(localStorage.getItem('activities'));
};

Activity.prototype.create = function(){
    var activities = Activity.getActivities();
    var generator = localStorage.activity_id_generator;
    this.id = generator ;
    activities.unshift(this);
    localStorage.activities = JSON.stringify(activities);
    localStorage.activity_id_generator = parseInt(generator) + 1;
    localStorage.current_activity = this.id;
};