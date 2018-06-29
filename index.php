<!DOCTYPE html>

<html lang="en-US">
  <head>
    <link rel="stylesheet" href="styles.css">	
    <meta charset="utf-8">
		<meta name="author" content="Chris Mills">
		<meta name="description" content="This is the home page of image gallery site. 
		Here you can see all kind of photos divided into categories.">
    <title>Image Gallery</title>
  </head>
  <body>
		
	<dev class="navbar">
		<ul>
			<li><a class="leftBar" href="#home">Home Page</a></li>
			<li><a class="leftBar" href="#categories">Categories</a></li>
			<li><a class="rightBar" href="index.php">Log In</a></li>
			<li><a class="rightBar" href="index.php">Sign Up</a></li>
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

	
	<script src="https://unpkg.com/navigo@6.0.2/lib/navigo.min.js"></script>
	<script src="src/templates/categories.js"></script>
	<script src="src/templates/category.js"></script> 
	<script src="src/templates/home.js"></script>  
	<script src="src/router.js"></script>  
	</body>
		

</html>
