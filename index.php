<!DOCTYPE html>

<html lang="en-US">
  <head>
		<style>
			.navbar ul {
					list-style-type: none;
					margin: 0;
					padding: 0;
					overflow: hidden;
					background-color: rgb(0, 0, 0);
			}

			.navbar .leftBar {
					float: left;
					border-right:1px solid #bbb;
			}

			.navbar .rightBar{
					float: right;
					border-left:1px solid #bbb;
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
					background-color: #111;
			}

			.navbar .active {
					background-color: #4CAF50;
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
				<li><a class="rightBar" href="index.php">Sign in</a></li>
			</ul>
		</dev>

		<dev>
			<h1>Home Page</h1>
			<h2>Description:</h2>
				<p>
					This is Image Gallery website. Here you can see all kind of photos divided into categories. 
				</p>
			</dev>
	</body>
		

</html>
