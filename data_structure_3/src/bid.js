
function Bid(num){
    this.name = "竞价"+num;
    this.biddings = [];
}

function create_new_bid(key){
    var bids = JSON.parse(localStorage.bids);
    var bid = new Bid(key);
    bids.push(bid);
    localStorage.bids = JSON.stringify(bids);
}

function render_bids(id){
    return _.where(JSON.parse(localStorage.bids),{activity_id:id});
}

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

function render_biddings(id,bidName){
    var bid = _.findWhere(JSON.parse(localStorage.bids),{activity_id:id,name:bidName});
    var priceUsers = sortBiddings(bid.biddings);
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
            user = user.hadSignUp(JSON.parse(localStorage.sign_ups));
            user.price = minUser.price;
            temp.push(user);
            return temp;
        }
    }
}

function bid(user){
    var messageToUser;
    switch(localStorage.is_bidding){
        case "true":
            var sign_ups = JSON.parse(localStorage.sign_ups);
            var signUser = user.hadSignUp(sign_ups);
            if(signUser){
                user.name = signUser.name;
                user.activity_id = localStorage.current_activity;
                user.bid_id = localStorage.current_bid;
                if(!user.hadPrice()){
                    var bids = JSON.parse(localStorage.bids);
                    var bid = _.findWhere(bids,{name:localStorage.current_bid,activity_id:localStorage.current_activity});
                    var index = _.indexOf(bid);
                    bid.biddings = _.where(JSON.parse(localStorage.biddings),{activity_id:localStorage.current_activity,bid_id:localStorage.current_bid});
                    bids[index] = bid;
                    localStorage.bids = JSON.stringify(bids);
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