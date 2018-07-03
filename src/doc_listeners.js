document.addEventListener("click", function(event){
  

  if(event.target.id == "cancelSignUp"){
    document.getElementById('signupform').style.display='none';
    
  }

  if(event.target.id == "submitSignUp"){
    let userName = document.getElementById("signupUsr").value;
    let userPassword = document.getElementById("signupPsw").value;
    let userRepPassword = document.getElementById("signupRepPsw").value;


    if(userPassword == userRepPassword){
      signupUser(userName, function(){
        if(currentUser == null){
          document.getElementById("signuptext").innerHTML = "<b>This user exists!</b>";
        }else{
          document.getElementById('signupform').style.display='none';
          changeNavbar(true);
        } 
      });
    } else{
      document.getElementById("signuptext").innerHTML = "<b>Passwords does not match!</b>";
    }

  }

  if(event.target.id == "signUpShower"){
    document.getElementById('loginform').style.display='none';
    document.getElementById('signupform').style.display='block';
    document.getElementById("signuptext").innerHTML = "<b></b>";

  }

  if(event.target.id == "cancelLogIn"){
    document.getElementById('loginform').style.display='none';
    
  }

  if(event.target.id == "submitLogIn"){

    let userName = document.getElementById("loginUsr").value;
    let userPassword = document.getElementById("loginPsw").value;

    let foundElem = false;

    foundElem = loginUser(userName, userPassword, function(){
      if(currentUser == null){
        document.getElementById("logintext").innerHTML = "<b>Wrong username or password!</b>";
      }else{
        document.getElementById('loginform').style.display='none';
        changeNavbar(true);
      }

    });



  }

  if(event.target.id == "logInShower"){
    document.getElementById('signupform').style.display='none';
    document.getElementById('loginform').style.display='block';
    document.getElementById("logintext").innerHTML = "<b></b>";

  }

  if(event.target.id == "logout"){
    currentUser = null;
    changeNavbar(false);
  }


  if(event.target.id == "btnLeft"){  
    currentCatalog.moveCatalogLeft();
  }

  if(event.target.id == "btnRight"){
    currentCatalog.moveCatalogRight();
  }

  
});

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


function mostedLikedImages(callback){
  fetch('data/votes.json')
      .then(
        function(response0) {
            response0
              .json()
              .then(function(response) {
                let dicLike = {}

                let dicNotLike = {}

                response.votes.forEach(function(item){
                  
                  if(item.vote == "1"){  
                    if (dicLike[item.image] !== undefined)               
                      dicLike[item.image] ++;
                    else 
                      dicLike[item.image] = 1  
                  } else{
                    if (dicNotLike[item.image] !== undefined)               
                      dicNotLike[item.image] ++;
                    else 
                      dicNotLike[item.image] = 1  
                    
                  }
                  
                })

                itemsLiked = returnSortedDict(dicLike);
                itemsNotLiked = returnSortedDict(dicNotLike);

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

function returnSortedDict(dict){
  // Create items array
  var items = Object.keys(dict).map(function(key) {
    return [key, dict[key]];
  });

  // Sort the array based on the second element
  items.sort(function(first, second) {
    return second[1] - first[1];
  });

  return items;
}

let itemsLiked;
let itemsNotLiked;


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
                    console.log("found");
                    currentUser = new User(userName);
                    
                    if (typeof callback == 'function') {
                      callback.call(null);
                    }
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



function changeNavbar(userIsSet){
  if(userIsSet){
    document.getElementById('logout').style.display='block';
    document.getElementById('signUpShower').style.display='none';
    document.getElementById('logInShower').style.display='none';
  } else{
    document.getElementById('logout').style.display='none';
    document.getElementById('signUpShower').style.display='block';
    document.getElementById('logInShower').style.display='block';
  }

}