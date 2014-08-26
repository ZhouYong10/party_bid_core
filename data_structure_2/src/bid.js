
function sortBiddings(biddings){
    for(var x = 0; x < biddings.length-1; x++){
        for(var y = x+1; y < biddings.length; y++){
            if(biddings[x].price - biddings[y].price > 0){
                var temp = biddings[x];
                biddings[x] = biddings[y];
                biddings[y] = temp;
            }
        }
    }
    return biddings;
}

function transform_biddings_to_view_model(key,bidName){
    var activity = Activity.getActivities()[key];
    var priceUsers = (activity.biddings)[bidName];
    priceUsers = sortBiddings(priceUsers);
    var temp = [];
    var minUser = null;
    for(var x = 0; x < priceUsers.length-2; x++){
        if(x == 0 && priceUsers[x].price - priceUsers[x+1].price < 0){
            minUser = priceUsers[x];
        }
        if(x != 0 && priceUsers[x].price - priceUsers[x+1].price < 0 && priceUsers[x+1].price - priceUsers[x+2].price < 0){
            minUser = priceUsers[x+1];
        }
        if(x == priceUsers.length-3 && priceUsers[x+1].price - priceUsers[x+2].price < 0){
            minUser = priceUsers[x+2];
        }
        if(minUser){
            var user = new User("",minUser.phone);
            user = user.hadSignUp(activity);
            user.price = minUser.price;
            temp.push(user);
            return temp;
        }
    }
}

function transform_bids_to_view_model(key){
    var activity = Activity.getActivities()[key];
    return _.map(activity.bids,function(obj){
        return {name:obj};
    });
}

function create_new_bid(key){
    var activities = Activity.getActivities();
    var activity = activities[key];
    var bidName = "竞价" + (activity.bids.length+1);
    activity.bids.push(bidName);
    activity.biddings[bidName] = [];
    Activity.refresh(key,activity);
}

function bid(user){
    var messageToUser;
    switch(localStorage.is_bidding){
        case "true":
            var activity = (Activity.getActivities())[localStorage.current_activity_id];
            var signUser = user.hadSignUp(activity);
            if(signUser){
                if(!user.hadPrice(activity)){
                    user.name = signUser.name;
                    var priceUsers = (activity.biddings)[localStorage.current_bid];
                    priceUsers.push(user);
                    Activity.refresh(localStorage.current_activity_id,activity);
                }else{
                    messageToUser = "You have bid, you can not repeat bid.";
                }
            }else{
                messageToUser = "Sorry, you did not sign up, you can not participate in the auction.";
            }
            break;
        case "false":
            messageToUser = "Sorry bidding has ended.";
            break;
        default:
            messageToUser = "Bidding has not yet started, please wait. . .";
    }
}