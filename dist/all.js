document.addEventListener("click", function (event) {

  let targetId = event.target.id;

  if (targetId == "cancelSignUp") {
    document.getElementById('signupform').style.display = 'none';
  }

  if (targetId == "submitSignUp") {
    let userName = document.getElementById("signupUsr").value;
    let userPassword = document.getElementById("signupPsw").value;
    let userRepPassword = document.getElementById("signupRepPsw").value;

    if (userPassword == userRepPassword) {
      signupUser(userName, function () {
        if (currentUser == null) {
          document.getElementById("signuptext").innerHTML = "<b>This user exists!</b>";
        } else {
          document.getElementById('signupform').style.display = 'none';
          document.getElementById("signupUsr").value = "";
          document.getElementById("signupPsw").value = "";
          document.getElementById("signupRepPsw").value = "";
          changeNavbar(true);
        }
      });
    } else {
      document.getElementById("signuptext").innerHTML = "<b>Passwords does not match!</b>";
    }
  }

  if (targetId == "signUpShower") {
    document.getElementById('loginform').style.display = 'none';
    document.getElementById('signupform').style.display = 'block';
    document.getElementById("signuptext").innerHTML = "<b></b>";
  }

  if (targetId == "cancelLogIn") {
    document.getElementById('loginform').style.display = 'none';
  }

  if (targetId == "submitLogIn") {

    let userName = document.getElementById("loginUsr").value;
    let userPassword = document.getElementById("loginPsw").value;

    let foundElem = false;

    foundElem = loginUser(userName, userPassword, function () {
      if (currentUser == null) {
        document.getElementById("logintext").innerHTML = "<b>Wrong username or password!</b>";
      } else {
        document.getElementById('loginform').style.display = 'none';
        document.getElementById("loginUsr").value = "";
        document.getElementById("loginPsw").value = "";
        changeNavbar(true);
      }
    });
  }

  if (targetId == "logInShower") {
    document.getElementById('signupform').style.display = 'none';
    document.getElementById('loginform').style.display = 'block';
    document.getElementById("logintext").innerHTML = "<b></b>";
  }

  if (targetId == "logout") {
    currentUser = null;
    changeNavbar(false);
  }

  if (targetId == "btnLeft") {
    currentCatalog.moveCatalogLeft();
  }

  if (targetId == "btnRight") {
    currentCatalog.moveCatalogRight();
  }

  if (targetId == "btnTopLeft") {
    currentTopCatalog.moveCatalogLeft();
  }

  if (targetId == "btnTopRight") {
    currentTopCatalog.moveCatalogRight();
  }

  if (targetId == "nextImage") {
    currentCatalog.goToNextImagePage();
  }

  if (targetId == "dislikeImage") {
    if (currentUser == null) {
      document.getElementById('signupform').style.display = 'none';
      document.getElementById('loginform').style.display = 'block';
      document.getElementById("logintext").innerHTML = "<b></b>";
    } else {

      let bla = document.getElementById("mainPicture");
      let image = bla.src.substring(31);
      currentUser.addVote(image, -1);
      currentCatalog.goToNextImagePage();
    }
  }

  if (targetId == "likeImage") {
    if (currentUser == null) {
      document.getElementById('signupform').style.display = 'none';
      document.getElementById('loginform').style.display = 'block';
      document.getElementById("logintext").innerHTML = "<b></b>";
    } else {
      let bla = document.getElementById("mainPicture");
      let image = bla.src.substring(31);
      currentUser.addVote(image, 1);
      currentCatalog.goToNextImagePage();
    }
  }

  if (targetId == "topNextImage") {
    currentTopCatalog.goToNextImagePage();
  }

  if (targetId == "topDislikeImage") {
    if (currentUser == null) {
      document.getElementById('signupform').style.display = 'none';
      document.getElementById('loginform').style.display = 'block';
      document.getElementById("logintext").innerHTML = "<b></b>";
    } else {

      let bla = document.getElementById("mainPicture");
      let image = bla.src.substring(31);
      currentUser.addVote(image, -1);
      currentTopCatalog.goToNextImagePage();
    }
  }

  if (targetId == "topLikeImage") {
    if (currentUser == null) {
      document.getElementById('signupform').style.display = 'none';
      document.getElementById('loginform').style.display = 'block';
      document.getElementById("logintext").innerHTML = "<b></b>";
    } else {
      let bla = document.getElementById("mainPicture");
      let image = bla.src.substring(31);
      currentUser.addVote(image, 1);
      currentTopCatalog.goToNextImagePage();
    }
  }
});

function changeNavbar(userIsSet) {
  if (userIsSet) {
    document.getElementById('logout').style.display = 'block';
    document.getElementById('signUpShower').style.display = 'none';
    document.getElementById('logInShower').style.display = 'none';
  } else {
    document.getElementById('logout').style.display = 'none';
    document.getElementById('signUpShower').style.display = 'block';
    document.getElementById('logInShower').style.display = 'block';
  }
}
// window.addEventListener("hashchange", funcRef, false);


let root = "http://localhost/Image-Gallery/index.html";
let useHash = false; // Defaults to: false
let hash = '#'; // Defaults to: '#'
let router = new Navigo(null, false);

router.on({

  'home': function () {

    let elem = document.getElementsByClassName("content")[0];
    elem.innerHTML = homePageTemplate();
  },

  'categories/:id/': function (params) {

    getGallery(params.id, function () {

      currentCatalog = new Catalog(currentGalery, allCategories.getCategory(params.id).title);
      currentCatalog.loadCatalog();
    });
  },

  'categories': function () {
    // alert("categories")
    let elem = document.getElementsByClassName("content")[0];
    elem.innerHTML = categoriesPageTemplate();

    getCategories(function () {
      let cat = document.getElementsByClassName("column middle")[0];

      for (let i = 0; i < allCategories.getLength(); i++) {
        cat.innerHTML += categoryTemplate(allCategories.getCategory(i));
      }
    });
  },

  'image/../images/:category/:source/:id': function (params) {
    let elem = document.getElementsByClassName("content")[0];
    currentCatalog.currentPicture = parseInt(params.id);
    elem.innerHTML = imageTemplate(params.category, params.source);
  },

  'top/:attitude/images/:cat/:src/:id/:votes': function (params) {
    let elem = document.getElementsByClassName("content")[0];
    currentTopCatalog.currentPicture = parseInt(params.id);

    let src = `images/${params.cat}/${params.src}`;

    elem.innerHTML = topImageTemplate(src, params.votes, params.attitude);
  },

  'disliked': function () {

    getTopImages(false, function () {

      currentTopCatalog.loadCatalog();
    });
  },

  'liked': function () {

    getTopImages(true, function () {

      currentTopCatalog.loadCatalog();
    });
  }

}).resolve();

router.notFound(function () {

  let elem = document.getElementsByClassName("content")[0];
  elem.innerHTML = errorPageTemplate(`Page path: ${window.location.href} was not found by router.`);
});

function getCategories(callback) {
  fetch('data/categories.json').then(function (response0) {
    response0.json().then(function (response) {

      allCategories = new AllCategories(response.categories);

      if (typeof callback == 'function') {
        callback.call(null);
      }
    });
  }).catch(function (err) {
    console.log("Fetch Error :-S");
    // let elem = document.getElementsByClassName("content")[0];
    // elem.innerHTML = errorPageTemplate(`Fetch Error :-S, ${err}`); 
  });
}

class AllCategories {

  constructor(categoryArray) {
    this.data = categoryArray;
  }

  getLength() {
    return this.data.length;
  }

  getCategory(index) {
    return this.data[index];
  }
}

let allCategories = null;
class Catalog {

  constructor(galery, title) {
    this.galery = galery;
    this.leftdiff = 1;
    this.elem = null;
    this.currentPicture = null;
    this.title = title;
  }

  loadCatalog() {
    let content = document.getElementsByClassName("content")[0];
    content.innerHTML = catalogTemplate(this.title);
    this.elem = document.getElementById("catalog");

    this.displayCatalog();
  }

  displayCatalog() {
    let len = this.galery.getLengthOfGallery();

    this.elem.innerHTML = "";

    this.elem = document.getElementById("catalog");

    for (let i = 0; i < len; i++) {
      let style = `left:${i + i * 33}%; background-image: url(\'images/${this.galery.getGalleryImages()[i]}\');`;
      this.elem.innerHTML += this.getImageDiv(style, this.galery.getGalleryImages()[i], i);
    }
  }

  getImageDiv(style, link, index) {
    let result = `<a href="#image/${link}/${index}"> <div class="catalogImageEntry" style="${style}"></div></a>`;
    return result;
  }

  leftOneStep() {
    let start = Date.now();
    let elem = this.elem;
    let timer = setInterval(function () {
      let timePassed = Date.now() - start;

      let old = parseInt(elem.style.left, 10);

      if (isNaN(old)) {
        old = 0;
      }
      elem.style.left = old - 1 + "%";

      if (timePassed > 1000) clearInterval(timer);
    }, 30);
  }

  rightOneStep() {

    let start = Date.now();
    let elem = this.elem;
    let timer = setInterval(function () {
      let timePassed = Date.now() - start;

      let old = parseInt(elem.style.left, 10);

      if (isNaN(old)) {
        old = 0;
      }
      elem.style.left = old + 1 + "%";

      if (timePassed > 1000) clearInterval(timer);
    }, 30);
  }
  moveCatalogLeft() {
    if (Math.abs(this.leftdiff) == this.galery.getLengthOfGallery() - 3) {
      return;
    }
    this.leftOneStep();
    this.leftdiff--;
  }

  moveCatalogRight() {

    if (this.leftdiff == 2) {
      return;
    }

    this.rightOneStep();
    this.leftdiff++;
  }

  goToNextImagePage() {
    this.currentPicture++;
    if (this.currentPicture != this.galery.getGalleryImages().length) window.location.href = `${root}#image/${this.galery.getGalleryImages()[this.currentPicture]}/${this.currentPicture}>`;else window.location.href = `${root}#categories`;
  }

}

let currentCatalog = null;
class Gallery {

  constructor(list) {
    this.photos = list;
  }

  getGalleryImages() {
    return this.photos;
  }

  getLengthOfGallery() {
    return this.photos.length;
  }
}

function getGallery(index, callback) {
  fetch('data/category_images.json').then(function (response0) {
    response0.json().then(function (response) {

      currentGalery = new Gallery(response.category_images[index]);

      if (typeof callback == 'function') {
        callback.call(null);
      }
    });
  }).catch(function (err) {
    console.log('Fetch Error :-S', err);
  });
}

let currentGalery = null;
class TopCatalog {

  constructor(imageList, title, attitude) {
    this.imageList = imageList;
    this.leftdiff = 1;
    this.elem = null;
    this.currentPicture = null;
    this.title = title;
    this.attitude = attitude;
  }

  loadCatalog() {
    let content = document.getElementsByClassName("content")[0];
    content.innerHTML = catalogTemplate(this.title);
    this.elem = document.getElementById("catalog");

    this.displayCatalog();

    document.getElementById("btnLeft").id = "btnTopLeft";
    document.getElementById("btnRight").id = "btnTopRight";
  }

  displayCatalog() {
    let len = this.imageList.length;

    this.elem.innerHTML = "";

    this.elem = document.getElementById("catalog");

    for (let i = 0; i < len; i++) {
      let style = `left:${i + i * 33}%; background-image: url(\'${this.imageList[i][0]}\');`;

      this.elem.innerHTML += this.getImageDiv(style, this.imageList[i], i);
    }
  }

  getImageDiv(style, img, index) {
    let result = `<a href="#top/${this.attitude}/${img[0]}/${index}/${img[1]}"> <div class="catalogImageEntry" style="${style}"></div></a>`;
    return result;
  }

  leftOneStep() {
    let start = Date.now();
    let elem = this.elem;
    let timer = setInterval(function () {
      let timePassed = Date.now() - start;

      let old = parseInt(elem.style.left, 10);

      if (isNaN(old)) {
        old = 0;
      }
      elem.style.left = old - 1 + "%";

      if (timePassed > 1000) clearInterval(timer);
    }, 30);
  }

  rightOneStep() {

    let start = Date.now();
    let elem = this.elem;
    let timer = setInterval(function () {
      let timePassed = Date.now() - start;

      let old = parseInt(elem.style.left, 10);

      if (isNaN(old)) {
        old = 0;
      }
      elem.style.left = old + 1 + "%";

      if (timePassed > 1000) clearInterval(timer);
    }, 30);
  }
  moveCatalogLeft() {
    if (Math.abs(this.leftdiff) == this.imageList.length - 3) {
      return;
    }
    this.leftOneStep();
    this.leftdiff--;
  }

  moveCatalogRight() {

    if (this.leftdiff == 2) {
      return;
    }

    this.rightOneStep();
    this.leftdiff++;
  }

  goToNextImagePage() {
    this.currentPicture++;
    if (this.currentPicture != this.imageList.length) {
      let src = this.imageList[this.currentPicture][0];
      let id = this.currentPicture;
      let votes = this.imageList[this.currentPicture][1];
      window.location.href = `${root}#top/${this.attitude}/${src}/${id}/${votes}`;
    } else {
      if (this.attitude) {
        window.location.href = `${root}#liked`;
      } else {
        window.location.href = `${root}#disliked`;
      }
    }
  }

}

let currentTopCatalog = null;

function getTopImages(attitude, callback) {
  fetch('data/votes.json').then(function (response0) {
    response0.json().then(function (response) {
      let dicImage = {};

      response.votes.forEach(function (item) {

        if (item.vote == "1" && attitude == true || item.vote == "-1" && attitude == false) {
          if (dicImage[item.image] !== undefined) dicImage[item.image]++;else dicImage[item.image] = 1;
        }
      });

      let sorted = returnSortedDict(dicImage);

      let title = "";

      if (attitude == false) {
        title = "Mosted Disliked Pictures";
      } else {
        title = "Mosted Liked Pictures";
      }
      currentTopCatalog = new TopCatalog(sorted, title, attitude);

      if (typeof callback == 'function') {
        callback.call(null);
      }
    });
  }).catch(function (err) {
    console.log('Fetch Error :-S', err);
  });
}

function returnSortedDict(dict) {
  // Create items array
  let items = Object.keys(dict).map(function (key) {
    return [key, dict[key]];
  });

  // Sort the array based on the second element
  items.sort(function (first, second) {
    return second[1] - first[1];
  });

  return items;
}
class User {
  constructor(username) {
    this.username = username;
    this.votes = {};
  }

  addVote(pictureId, action) {
    //should be some kind of saving in back.

    this.votes[pictureId] = action;
  }

  hasVoted(pictureId) {
    //should be some kind of checking in back.

    return pictureId in this.votes;
  }

  getVote(pictureId) {

    return parseInt(this.votes[pictureId]);
  }

}

function loginUser(userName, userPassword, callback) {
  fetch('data/users.json').then(function (response0) {
    response0.json().then(function (response) {
      let found = false;
      response.data.forEach(function (item) {

        if (item.username == userName && item.password == userPassword) {
          currentUser = new User(userName);

          fillCurrentUserVotes(callback);

          found = true;
          return;
        }
      });
      if (found == false) {
        currentUser = null;

        if (typeof callback == 'function') {
          callback.call(null);
        }
      }
    });
  }).catch(function (err) {
    console.log('Fetch Error :-S', err);
  });
}

function fillCurrentUserVotes(callback) {
  fetch('data/votes.json').then(function (response0) {
    response0.json().then(function (response) {
      response.votes.forEach(function (item) {
        if (item.user == currentUser.username) {
          currentUser.votes[item.image] = item.vote;
        }
      });

      if (typeof callback == 'function') {
        callback.call(null);
      }
    });
  }).catch(function (err) {
    console.log('Fetch Error :-S', err);
  });
}

function signupUser(userName, callback) {
  fetch('data/users.json').then(function (response0) {
    response0.json().then(function (response) {
      let found = false;
      response.data.forEach(function (item) {

        if (item.username == userName) {
          found = true;
          currentUser = null;
          if (typeof callback == 'function') {
            callback.call(null);
          }
          return;
        }
      });
      if (found == false) {
        currentUser = new User(userName);
        if (typeof callback == 'function') {
          callback.call(null);
        }
      }
    });
  }).catch(function (err) {
    console.log('Fetch Error :-S', err);
  });
}

let currentUser = null;
function catalogTemplate(title) {
	let html = `
				<h1 class="categoryName">${title}</h1>			

				<div id="catalogHolder" class="catalogHolder group" >
					<div id="catalog"  class="catalog">
					</div>
					<div id="btnLeft"  class="catalogBtn left" >
					</div>
					<div id="btnRight" class="catalogBtn right">
					</div>		
				</div>
				`;

	return html;
}
function categoriesPageTemplate() {
	let html = `
					<div class="column side">
						
					</div>
					<div class="column middle">
						<h1>Categories</h1>

						
					</div>
					<div class="column side">
						
					</div>
				`;

	return html;
}
function categoryTemplate(data) {
	let html = `
					<div class="gallery">
						<a href="#categories/${data.id}/">
							<img src=${data.image} alt="Mountains">
						</a>
						<div class="desc">${data.title}</div>
					</div>
				`;

	return html;
}
function errorPageTemplate(error_code) {
	let html = `
					<div class="column side">
						
					</div>
					<div class="column middle">
						<h1>Error Occurred</h1>
						<h2>Something went wrong:</h2>
						<p>
							${error_code} 
						</p>
					</div>
					<div class="column side">
						
					</div>
				`;

	return html;
}
function homePageTemplate() {
	let html = `
					<div class="column side">
						
					</div>
					<div class="column middle">
						<h1>Home Page</h1>
						<h2>Description:</h2>
						<p>
							This is Image Gallery website. Here you can see all kind of photos divided into categories. 
						</p>
					</div>
					<div class="column side">
						
					</div>
				`;

	return html;
}
function imageTemplate(category, name) {
	let img = `images/${category}/${name}`;

	let html = `
					<h1 class="categoryNameForSingleImage">${category}</h1>			

					<div class="group">
						
							<img class="singleImage" id="mainPicture" src="${img}">

							
							
						

							
				`;
	if (currentUser != null && currentUser.hasVoted(img)) {
		let voteText = "You have already liked this picture";
		if (currentUser.getVote(img) == -1) {
			voteText = "You have already disliked this picture";
		}

		html += `

				<h3 id="voteText">${voteText}</h3>	
				<div id="actions">
					<div class="center">
						<img id="nextImage" class="action_buttons" src="images/next.png">
					</div>
				</div>


			</div>`;
	} else {
		html += `
				<div id="actions">
					<div class="left">
						<img id="likeImage" class="action_buttons" src="images/accept.png">
					</div>
					<div class="right">
						<img id="dislikeImage" class="action_buttons" src="images/reject.png">
					</div>
					<div class="center">
						<img id="nextImage" class="action_buttons" src="images/next.png">
					</div>
				</div>


			</div>`;
	}

	return html;
}
function topImageTemplate(src, votes, attitude) {

	let title = "";
	if (attitude == "true") {
		title = `This Picture Has Got ${votes} Like`;
	} else {
		title = `This Picture Has Got ${votes} Dislike`;
	}

	if (parseInt(votes) > 1) title += 's';

	let html = `
					<h1 class="categoryNameForSingleImage">${title}</h1>			

					<div class="group">
						
							<img class="singleImage" id="mainPicture" src="${src}">						
						

							
				`;
	if (currentUser != null && currentUser.hasVoted(src)) {
		let voteText = "You have already liked this picture";
		if (currentUser.getVote(src) == -1) {
			voteText = "You have already disliked this picture";
		}

		html += `

				<h3 id="voteText">${voteText}</h3>	
				<div id="actions">
					<div class="center">
						<img id="topNextImage" class="action_buttons" src="images/next.png">
					</div>
				</div>


			</div>`;
	} else {
		html += `
				<div id="actions">
					<div class="left">
						<img id="topLikeImage" class="action_buttons" src="images/accept.png">
					</div>
					<div class="right">
						<img id="topDislikeImage" class="action_buttons" src="images/reject.png">
					</div>
					<div class="center">
						<img id="topNextImage" class="action_buttons" src="images/next.png">
					</div>
				</div>


			</div>`;
	}

	return html;
}
//# sourceMappingURL=all.js.map
