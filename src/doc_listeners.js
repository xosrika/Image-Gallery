document.addEventListener("click", function(event){

  
  let targetId = event.target.id;

  if(targetId == "cancelSignUp"){
    document.getElementById('signupform').style.display='none';
    
  }

  if(targetId == "submitSignUp"){
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

  if(targetId == "signUpShower"){
    document.getElementById('loginform').style.display='none';
    document.getElementById('signupform').style.display='block';
    document.getElementById("signuptext").innerHTML = "<b></b>";

  }

  if(targetId == "cancelLogIn"){
    document.getElementById('loginform').style.display='none';
    
  }

  if(targetId == "submitLogIn"){

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

  if(targetId == "logInShower"){
    document.getElementById('signupform').style.display='none';
    document.getElementById('loginform').style.display='block';
    document.getElementById("logintext").innerHTML = "<b></b>";

  }

  if(targetId == "logout"){
    currentUser = null;
    changeNavbar(false);
  }


  if(targetId == "btnLeft"){  
    currentCatalog.moveCatalogLeft();
  }

  if(targetId == "btnRight"){
    currentCatalog.moveCatalogRight();
  }

  if(targetId == "btnTopLeft"){  
    currentTopCatalog.moveCatalogLeft();
  }

  if(targetId == "btnTopRight"){
    currentTopCatalog.moveCatalogRight();
  }



  if(targetId == "nextImage"){
    currentCatalog.goToNextImagePage();
  }

  if(targetId == "dislikeImage"){
    if(currentUser == null){
      document.getElementById('signupform').style.display='none';
      document.getElementById('loginform').style.display='block';
      document.getElementById("logintext").innerHTML = "<b></b>";
    } else{

      let bla = (document.getElementById("mainPicture"));
      let image = (bla.src).substring(31);
      currentUser.addVote(image, -1);
      currentCatalog.goToNextImagePage();
    }
  }

  if(targetId == "likeImage"){
    if(currentUser == null){
      document.getElementById('signupform').style.display='none';
      document.getElementById('loginform').style.display='block';
      document.getElementById("logintext").innerHTML = "<b></b>";
    } else{
      let bla = (document.getElementById("mainPicture"));
      let image = (bla.src).substring(31);
      currentUser.addVote(image, 1);
      currentCatalog.goToNextImagePage();
    }

  }

  if(targetId == "topNextImage"){
    currentTopCatalog.goToNextImagePage();
  }

  if(targetId == "topDislikeImage"){
    if(currentUser == null){
      document.getElementById('signupform').style.display='none';
      document.getElementById('loginform').style.display='block';
      document.getElementById("logintext").innerHTML = "<b></b>";
    } else{

      let bla = (document.getElementById("mainPicture"));
      let image = (bla.src).substring(31);
      currentUser.addVote(image, -1);
      currentTopCatalog.goToNextImagePage();
    }
  }

  if(targetId == "topLikeImage"){
    if(currentUser == null){
      document.getElementById('signupform').style.display='none';
      document.getElementById('loginform').style.display='block';
      document.getElementById("logintext").innerHTML = "<b></b>";
    } else{
      let bla = (document.getElementById("mainPicture"));
      let image = (bla.src).substring(31);
      currentUser.addVote(image, 1);
      currentTopCatalog.goToNextImagePage();
    }

  }

  
});



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