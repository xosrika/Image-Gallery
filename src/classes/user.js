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


let currentUser = null;