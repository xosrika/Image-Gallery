class User {
  constructor(username) {
    this.username = username;
  }



  addVote(action, pictureId){
    let newLine = `{"user" : "${currentUser.username}", "picture" : "${pictureId}", "action" : "${action}"}`
  } 

}


let currentUser = null;