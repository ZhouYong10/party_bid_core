function Bid(num){
    this.name = "竞价" + num;
    this.biddings = [];
}

function transform_biddings_to_view_model(activityName,bidName){
    var activity = Activity.findByName(activityName);
    var bid = _.findWhere(activity.bids,{name:bidName});
    var biddings = Bid.sortBiddings(bid.biddings);
    var temp = [];
    for(var x = 0; x < biddings.length-2; x++){
        if(x == 0 && biddings[x].price - biddings[x+1].price < 0){
            temp.push(biddings[x]);
            return temp;
        }
        if(x != 0 && biddings[x].price - biddings[x+1].price < 0 && biddings[x+1].price - biddings[x+2].price < 0){
            temp.push(biddings[x+1]);
            return temp;
        }
        if(x == biddings.length-3 && biddings[x+1].price - biddings[x+2].price < 0){
            temp.push(biddings[x+2]);
            return temp;
        }
    }
    return undefined;
}

function transform_bids_to_view_model(name){
    var activity = Activity.findByName(name);
    return activity.bids;
}

function create_new_bid(activityName){
    var activity = Activity.findByName(activityName);
    var bids = activity.bids;
    bids.push(new Bid(bids.length + 1));
    Activity.saveActivity(activity);
}

Bid.sortBiddings = function(biddings){
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
};


Bid.hadBid = function(bid,phone){
    return _.findWhere(bid.biddings,{phone:phone})
};

Bid.bid = function(signUp){
    var messageToUser;
    var activity = Activity.findByName(localStorage.current_activity);
    switch(localStorage.is_bidding){
        case "true":
            var hadSign = signUp.hadSignUp(activity);
            if(hadSign){
                signUp.name = hadSign.name;
                var bids = activity.bids;
                var index = findIndexByName(bids,localStorage.current_bid);
                var bid = bids[index];
                if(!Bid.hadBid(bid,signUp.phone)){
                    bid.biddings.push(signUp);
                    Activity.saveActivity(activity);
                    messageToUser = "Congratulations, bidding successfully.";
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
    return messageToUser;
};


