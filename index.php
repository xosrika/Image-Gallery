<!DOCTYPE html>

<html lang="en-US">
  <head>
		
		<link rel="stylesheet" href="scc/catalog.css">
		<link rel="stylesheet" href="scc/sign_up.css">
		<link rel="stylesheet" href="scc/styles.css">	
		<link rel="stylesheet" href="scc/image.css">


    <meta charset="utf-8">
		<meta name="description" content="This is the home page of image gallery site. 
		Here you can see all kind of photos divided into categories.">
    <title>Image Gallery</title>
  </head>
  <body>
		
	<dev class="navbar">
		<ul>
			<li><a class="leftBar" href="#home">Home Page</a></li>
			<li><a class="leftBar" href="#categories">Categories</a></li>
			<li><a class="rightBar" id="logInShower">Log In</a></li>
			<li><a class="rightBar" id="signUpShower">Sign Up</a></li>
		</ul>
	</dev>
	
	<div class="content">
					<div class="column side">
						<h2>Side</h2>
						<p></p>
					</div>
					<div class="column middle">
						<h1>Home Page</h1>
						<h2>Description:</h2>
						<p>
							This is Image Gallery website. Here you can see all kind of photos divided into categories. 
						</p>
					</div>
					<div class="column side">
						<h2>Side</h2>
						<p></p>
					</div>
	</div>



	<div id="signupform" class="modal">
		<form class="modal-content">
			<div class="container">
				<h3>Sign Up</h3>
				
				<hr>
				<label for="email"><b>Username</b></label>
				<input type="text" placeholder="Enter Username" name="username" id="signupUsr" required>

				<label for="psw"><b>Password</b></label>
				<input type="password" placeholder="Enter Password" name="psw" id="signupPsw" required>

				<label for="psw-repeat"><b>Repeat Password</b></label>
				<input type="password" placeholder="Repeat Password" name="psw-repeat" id="signupRepPsw" required>
				
				<div class="clearfix">
					<button type="button" class="cancelbtn" id="cancelSignUp">Cancel</button>
					<button type="button" class="signupbtn" id="submitSignUp">Sign Up</button>
				</div>
			</div>
		</form>
	</div>


	<div id="loginform" class="modal group">
		<form class="modal-content">
			<div class="container">
				<h3>Log In</h3>
				
				<hr>
				<label for="email"><b>Username</b></label>
				<input type="text" placeholder="Enter Username" name="username" id="loginUsr" required>

				<label for="psw"><b>Password</b></label>
				<input type="password" placeholder="Enter Password" name="psw" id="loginPsw" required>
				
				<div class="clearfix">
					<button type="button" class="cancelbtn" id="cancelLogIn">Cancel</button>
					<button type="button" class="signupbtn" id="submitLogIn">Log In</button>
				</div>
			</div>
		</form>
	</div>






	
	<script src="https://unpkg.com/navigo@6.0.2/lib/navigo.min.js"></script>
	<script src="src/data/catalog_images.js"></script>
	<script src="src/templates/categories.js"></script>
	<script src="src/templates/category.js"></script>
	<script src="src/templates/catalog.js"></script>
	<script src="src/classes/catalog.js"></script>
	<script src="src/classes/gallery.js"></script>
	<script src="src/templates/image.js"></script>  
	<script src="src/templates/home.js"></script>


	<script src="src/doc_listeners.js"></script> 
	
	<script src="src/router.js"></script>  
	</body>
		

</html>
