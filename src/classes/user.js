class User {
  constructor(username) {
    this.username = username;
    this.votes = {};
  }



  addVote(pictureId, action){
    //should be some kind of saving in back.

    this.votes[pictureId] = action;
  }
  
  hasVoted(pictureId){
    //should be some kind of checking in back.

    return pictureId in this.votes;
  }

  getVote(pictureId){

    return parseInt(this.votes[pictureId]);
  }

}

function loginUser(userName, userPassword, callback){
  fetch('data/users.json')
      .then(
        function(response0) {
            response0
              .json()
              .then(function(response) {
                let found = false;
                response.data.forEach(function(item){
                  
                  if(item.username == userName && item.password == userPassword){
                    currentUser = new User(userName);
                    
                    fillCurrentUserVotes(callback);

                    found = true
                    return;
                    
                  }
                }
                
              )
              if(found == false){
                currentUser = null;

                if (typeof callback == 'function') {
                  callback.call(null);
                }
              }
               

              });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
}


function fillCurrentUserVotes(callback){
  fetch('data/votes.json')
      .then(
        function(response0) {
            response0
              .json()
              .then(function(response) {
                response.votes.forEach(function(item){
                  if( item.user == currentUser.username ){
                     currentUser.votes[item.image] = item.vote;
                  } 
                 
                }
                
              )
              
              if (typeof callback == 'function') {
                callback.call(null);
              }

              });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
}

function signupUser(userName, callback) {
  fetch('data/users.json')
      .then(
        function(response0) {
            response0
              .json()
              .then(function(response) {
                let found = false; 
                response.data.forEach(function(item){
                  
                  if(item.username == userName){
                    found = true;       
                    currentUser = null;
                    if (typeof callback == 'function') {
                      callback.call(null);
                    }
                    return;
                  }
                })
                if(found == false){
                  currentUser = new User(userName);
                  if (typeof callback == 'function') {
                    callback.call(null);
                  }
                }
              });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
}


let currentUser = null;