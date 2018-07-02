document.addEventListener("click", function(event){
  

  if(event.target.id == "cancelSignUp"){
    document.getElementById('signupform').style.display='none';
  }

  if(event.target.id == "submitSignUp"){
    console.log("HEREEEE");
    mostedLikedImages(function(){
      console.log(itemsLiked);
      console.log(itemsNotLiked);
    });
  }

  if(event.target.id == "signUpShower"){
    document.getElementById('loginform').style.display='none';
    document.getElementById('signupform').style.display='block';
  }

  if(event.target.id == "cancelLogIn"){
    document.getElementById('loginform').style.display='none';
    
  }

  if(event.target.id == "submitLogIn"){

    let userName = document.getElementById("loginUsr").value;
    let userPassword = document.getElementById("loginPsw").value;

    let foundElem = false;

    foundElem = loginUser(userName, userPassword);



  }

  if(event.target.id == "logInShower"){
    document.getElementById('signupform').style.display='none';
    document.getElementById('loginform').style.display='block';
  }


  if(event.target.id == "btnLeft"){  
    currentCatalog.moveCatalogLeft();
  }

  if(event.target.id == "btnRight"){
    currentCatalog.moveCatalogRight();
  }

  
});


function loginUser(userName, userPassword) {
  fetch('data/users.json')
      .then(
        function(response0) {
            response0
              .json()
              .then(function(response) {
                
                response.data.forEach(function(item){
                  
                  if(item.username == userName && item.password == userPassword){
                    console.log("found");
                    return true;       
                    
                  }
                })
               return false;
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