<!DOCTYPE html>

<html lang="en-US">
  <head>
		<style>
			* {
					box-sizing: border-box;
			}
			body {margin:0;}
			.navbar ul {
				
					position: fixed;
					top: 0;
					width: 100%;
					list-style-type: none;
					margin: 0;
					padding: 0;
					overflow: hidden;
					background-color: rgb(0, 0, 0);
			}

			.navbar .leftBar {
					float: left;
					border-right:1px solid #696969;
			}

			.navbar .rightBar{
					float: right;
					border-left:1px solid #696969;
			}

			.navbar li:last-child {
					border-right: none;
			}

			.navbar li a {
					display: block;
					color: white;
					text-align: center;
					padding: 14px 16px;
					text-decoration: none;
			}

			.navbar li a:hover:not(.active) {
					background-color: #696969;
			}

			.navbar .active {
					background-color: #1E90FF;
			}

			
			.column {
					float: left;
					padding: 10px;
			}
			.column.side {
					width: 10%;
			}
	
			.column.middle {
					width: 80%;
			}
			
			
			.row:after {
				content: "";
				display: table;
				clear: both;
			}
			

			div.gallery {
				margin: 5px;
				border: 1px solid #ccc;
				float: left;
				width: 180px;
			}

			div.gallery:hover {
				border: 1px solid #777;
			}

			div.gallery img {
				width: 100%;
				height: auto;
			}

			div.desc {
				padding: 15px;
				text-align: center;
			}

		</style>
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
		<div style="padding:20px;margin-top:30px;height:1500px;">

	<div class="row">
		<div class="column side">
			<h2>Side</h2>
			<p></p>
		</div>
		<div class="column middle">
			<h1>Categories</h1>
		
			<div class="gallery">
			<a target="_blank" href="winter.jpg">
				<img src="winter.jpg" alt="Trolltunga Norway" width="300" height="200">
			</a>
			<div class="desc">Add a description of the image here</div>
			</div>

			<div class="gallery">
			<a target="_blank" href="winter.jpg">
				<img src="winter.jpg" alt="Forest" width="600" height="400">
			</a>
			<div class="desc">Add a description of the image here</div>
			</div>

			<div class="gallery">
			<a target="_blank" href="winter.jpg">
				<img src="winter.jpg" alt="Northern Lights" width="600" height="400">
			</a>
			<div class="desc">Add a description of the image here</div>
			</div>

			<div class="gallery">
			<a target="_blank" href="winter.jpg">
				<img src="winter.jpg" alt="Mountains" width="600" height="400">
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
