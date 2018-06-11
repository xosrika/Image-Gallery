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
			<li><a class="leftBar active" href="index.php">Home Page</a></li>
			<li><a class="leftBar" href="index.php">Categories</a></li>
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
			<h1>Categories</h1>
		
			<div class="gallery">
				<a target="_blank" href="images/winter.jpg">
					<img src="images/winter.jpg" alt="Trolltunga Norway" >
				</a>
				<div class="desc">Add a description of the image here</div>
			</div>

			<div class="gallery">
				<a target="_blank" href="images/winter.jpg">
					<img src="images/winter.jpg" alt="Forest" >
				</a>
				<div class="desc">Add a description of the image here</div>
			</div>

			<div class="gallery">
				<a target="_blank" href="images/winter.jpg">
					<img src="images/winter.jpg" alt="Northern Lights">
				</a>
				<div class="desc">Add a description of the image here</div>
			</div>

			<div class="gallery">
				<a target="_blank" href="images/winter.jpg">
					<img src="images/winter.jpg" alt="Mountains">
				</a>
				<div class="desc">Add a description of the image here</div>
			</div>
		</div>
		<div class="column side">
			<h2>Side</h2>
			<p></p>
		</div>
	</div>
	</body>
		

</html>
