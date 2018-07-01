document.addEventListener("click", function(event){
  

  if(event.target.id == "cancelSignUp"){
    document.getElementById('signupform').style.display='none';
  }

  if(event.target.id == "submitSignUp"){
  }

  if(event.target.id == "signUpShower"){
    document.getElementById('loginform').style.display='none';
    document.getElementById('signupform').style.display='block';
  }

  if(event.target.id == "cancelLogIn"){
    document.getElementById('loginform').style.display='none';
    
  }

  if(event.target.id == "submitLogIn"){
  }

  if(event.target.id == "logInShower"){
    document.getElementById('signupform').style.display='none';
    document.getElementById('loginform').style.display='block';
    console.log("showSign");
  }


  
});