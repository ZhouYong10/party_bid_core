function render_sign_ups(name){
    var activity = Activity.findByName(name);
    return activity.sign_ups;
}