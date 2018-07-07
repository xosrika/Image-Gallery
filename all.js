"use strict";

document.addEventListener("click", function (event) {
  var targetId = event.target.id;

  if (targetId == "cancelSignUp") {
    document.getElementById('signupform').style.display = 'none';
  }

  if (targetId == "submitSignUp") {
    var userName = document.getElementById("signupUsr").value;
    var userPassword = document.getElementById("signupPsw").value;
    var userRepPassword = document.getElementById("signupRepPsw").value;

    if (userPassword == userRepPassword) {
      signupUser(userName, function () {
        if (currentUser == null) {
          document.getElementById("signuptext").innerHTML = "<b>This user exists!</b>";
        } else {
          document.getElementById('signupform').style.display = 'none';
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
    var _userName = document.getElementById("loginUsr").value;
    var _userPassword = document.getElementById("loginPsw").value;
    var foundElem = false;
    foundElem = loginUser(_userName, _userPassword, function () {
      if (currentUser == null) {
        document.getElementById("logintext").innerHTML = "<b>Wrong username or password!</b>";
      } else {
        document.getElementById('loginform').style.display = 'none';
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
      var bla = document.getElementById("mainPicture");
      var image = bla.src.substring(31);
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
      var _bla = document.getElementById("mainPicture");

      var _image = _bla.src.substring(31);

      currentUser.addVote(_image, 1);
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
      var _bla2 = document.getElementById("mainPicture");

      var _image2 = _bla2.src.substring(31);

      currentUser.addVote(_image2, -1);
      currentTopCatalog.goToNextImagePage();
    }
  }

  if (targetId == "topLikeImage") {
    if (currentUser == null) {
      document.getElementById('signupform').style.display = 'none';
      document.getElementById('loginform').style.display = 'block';
      document.getElementById("logintext").innerHTML = "<b></b>";
    } else {
      var _bla3 = document.getElementById("mainPicture");

      var _image3 = _bla3.src.substring(31);

      currentUser.addVote(_image3, 1);
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

"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
} // window.addEventListener("hashchange", funcRef, false);


var root = "http://localhost/Image-Gallery/index.html";
var useHash = false; // Defaults to: false

var hash = '#'; // Defaults to: '#'

var router = new Navigo(null, false);
router.on({
  'home': function home() {
    var elem = document.getElementsByClassName("content")[0];
    elem.innerHTML = homePageTemplate();
  },
  'categories/:id/': function categoriesId(params) {
    getGallery(params.id, function () {
      currentCatalog = new Catalog(currentGalery, allCategories.getCategory(params.id).title);
      currentCatalog.loadCatalog();
    });
  },
  'categories': function categories() {
    // alert("categories")
    var elem = document.getElementsByClassName("content")[0];
    elem.innerHTML = categoriesPageTemplate();
    getCategories(function () {
      var cat = document.getElementsByClassName("column middle")[0];

      for (var i = 0; i < allCategories.getLength(); i++) {
        cat.innerHTML += categoryTemplate(allCategories.getCategory(i));
      }
    });
  },
  'image/../images/:category/:source/:id': function imageImagesCategorySourceId(params) {
    var elem = document.getElementsByClassName("content")[0];
    currentCatalog.currentPicture = parseInt(params.id);
    elem.innerHTML = imageTemplate(params.category, params.source);
  },
  'top/:attitude/images/:cat/:src/:id/:votes': function topAttitudeImagesCatSrcIdVotes(params) {
    var elem = document.getElementsByClassName("content")[0];
    currentTopCatalog.currentPicture = parseInt(params.id);
    var src = "images/".concat(params.cat, "/").concat(params.src);
    elem.innerHTML = topImageTemplate(src, params.votes, params.attitude);
  },
  'disliked': function disliked() {
    getTopImages(false, function () {
      currentTopCatalog.loadCatalog();
    });
  },
  'liked': function liked() {
    getTopImages(true, function () {
      currentTopCatalog.loadCatalog();
    });
  }
}).resolve();
router.notFound(function () {
  console.log("Not found");
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
    console.log('Fetch Error :-S', err);
  });
}

var AllCategories =
/*#__PURE__*/
function () {
  function AllCategories(categoryArray) {
    _classCallCheck(this, AllCategories);

    this.data = categoryArray;
  }

  _createClass(AllCategories, [{
    key: "getLength",
    value: function getLength() {
      return this.data.length;
    }
  }, {
    key: "getCategory",
    value: function getCategory(index) {
      return this.data[index];
    }
  }]);

  return AllCategories;
}();

var allCategories = null;
"use strict";

function catalogTemplate(title) {
  var html = "\n\t\t\t\t<h1 class=\"categoryName\">".concat(title, "</h1>\t\t\t\n\n\t\t\t\t<div id=\"catalogHolder\" class=\"catalogHolder group\" >\n\t\t\t\t\t<div id=\"catalog\"  class=\"catalog\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div id=\"btnLeft\"  class=\"catalogBtn left\" >\n\t\t\t\t\t</div>\n\t\t\t\t\t<div id=\"btnRight\" class=\"catalogBtn right\">\n\t\t\t\t\t</div>\t\t\n\t\t\t\t</div>\n\t\t\t\t");
  return html;
}

"use strict";

function categoriesPageTemplate() {
  var html = "\n\t\t\t\t\t<div class=\"column side\">\n\t\t\t\t\t\t<h2>Side</h2>\n\t\t\t\t\t\t<p></p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"column middle\">\n\t\t\t\t\t\t<h1>Categories</h1>\n\n\t\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"column side\">\n\t\t\t\t\t\t<h2>Side</h2>\n\t\t\t\t\t\t<p></p>\n\t\t\t\t\t</div>\n\t\t\t\t";
  return html;
}

"use strict";

function categoryTemplate(data) {
  var html = "\n\t\t\t\t\t<div class=\"gallery\">\n\t\t\t\t\t\t<a href=\"#categories/".concat(data.id, "/\">\n\t\t\t\t\t\t\t<img src=").concat(data.image, " alt=\"Mountains\">\n\t\t\t\t\t\t</a>\n\t\t\t\t\t\t<div class=\"desc\">").concat(data.title, "</div>\n\t\t\t\t\t</div>\n\t\t\t\t");
  return html;
}

"use strict";

function homePageTemplate() {
  var html = "\n\t\t\t\t\t<div class=\"column side\">\n\t\t\t\t\t\t<h2>Side</h2>\n\t\t\t\t\t\t<p></p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"column middle\">\n\t\t\t\t\t\t<h1>Home Page</h1>\n\t\t\t\t\t\t<h2>Description:</h2>\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\tThis is Image Gallery website. Here you can see all kind of photos divided into categories. \n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"column side\">\n\t\t\t\t\t\t<h2>Side</h2>\n\t\t\t\t\t\t<p></p>\n\t\t\t\t\t</div>\n\t\t\t\t";
  return html;
}

"use strict";

function imageTemplate(category, name) {
  var img = "images/".concat(category, "/").concat(name);
  var html = "\n\t\t\t\t\t<h1 class=\"categoryNameForSingleImage\">".concat(category, "</h1>\t\t\t\n\n\t\t\t\t\t<div class=\"group\">\n\t\t\t\t\t\t\n\t\t\t\t\t\t\t<img class=\"singleImage\" id=\"mainPicture\" src=\"").concat(img, "\">\n\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\n\t\t\t\t\t\t\t\n\t\t\t\t");

  if (currentUser != null && currentUser.hasVoted(img)) {
    var voteText = "You have already liked this picture";

    if (currentUser.getVote(img) == -1) {
      voteText = "You have already disliked this picture";
    }

    html += "\n\n\t\t\t\t<h3 id=\"voteText\">".concat(voteText, "</h3>\t\n\t\t\t\t<div id=\"actions\">\n\t\t\t\t\t<div class=\"center\">\n\t\t\t\t\t\t<img id=\"nextImage\" class=\"action_buttons\" src=\"images/next.png\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\n\t\t\t</div>");
  } else {
    html += "\n\t\t\t\t<div id=\"actions\">\n\t\t\t\t\t<div class=\"left\">\n\t\t\t\t\t\t<img id=\"likeImage\" class=\"action_buttons\" src=\"images/accept.png\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"right\">\n\t\t\t\t\t\t<img id=\"dislikeImage\" class=\"action_buttons\" src=\"images/reject.png\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"center\">\n\t\t\t\t\t\t<img id=\"nextImage\" class=\"action_buttons\" src=\"images/next.png\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\n\t\t\t</div>";
  }

  return html;
}

"use strict";

function topImageTemplate(src, votes, attitude) {
  var title = "";

  if (attitude == "true") {
    title = "This Picture Has Got ".concat(votes, " Likes");
  } else {
    title = "This Picture Has Got ".concat(votes, " Dislikes");
  }

  var html = "\n\t\t\t\t\t<h1 class=\"categoryNameForSingleImage\">".concat(title, "</h1>\t\t\t\n\n\t\t\t\t\t<div class=\"group\">\n\t\t\t\t\t\t\n\t\t\t\t\t\t\t<img class=\"singleImage\" id=\"mainPicture\" src=\"").concat(src, "\">\t\t\t\t\t\t\n\t\t\t\t\t\t\n\n\t\t\t\t\t\t\t\n\t\t\t\t");

  if (currentUser != null && currentUser.hasVoted(src)) {
    var voteText = "You have already liked this picture";

    if (currentUser.getVote(src) == -1) {
      voteText = "You have already disliked this picture";
    }

    html += "\n\n\t\t\t\t<h3 id=\"voteText\">".concat(voteText, "</h3>\t\n\t\t\t\t<div id=\"actions\">\n\t\t\t\t\t<div class=\"center\">\n\t\t\t\t\t\t<img id=\"topNextImage\" class=\"action_buttons\" src=\"images/next.png\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\n\t\t\t</div>");
  } else {
    html += "\n\t\t\t\t<div id=\"actions\">\n\t\t\t\t\t<div class=\"left\">\n\t\t\t\t\t\t<img id=\"topLikeImage\" class=\"action_buttons\" src=\"images/accept.png\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"right\">\n\t\t\t\t\t\t<img id=\"topDislikeImage\" class=\"action_buttons\" src=\"images/reject.png\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"center\">\n\t\t\t\t\t\t<img id=\"topNextImage\" class=\"action_buttons\" src=\"images/next.png\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\n\t\t\t</div>";
  }

  return html;
}

"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Catalog =
/*#__PURE__*/
function () {
  function Catalog(galery, title) {
    _classCallCheck(this, Catalog);

    this.galery = galery;
    this.leftdiff = 1;
    this.elem = null;
    this.currentPicture = null;
    this.title = title;
  }

  _createClass(Catalog, [{
    key: "loadCatalog",
    value: function loadCatalog() {
      var content = document.getElementsByClassName("content")[0];
      content.innerHTML = catalogTemplate(this.title);
      this.elem = document.getElementById("catalog");
      this.displayCatalog();
    }
  }, {
    key: "displayCatalog",
    value: function displayCatalog() {
      var len = this.galery.getLengthOfGallery();
      this.elem.innerHTML = "";
      this.elem = document.getElementById("catalog");

      for (var i = 0; i < len; i++) {
        var style = "left:".concat(i + i * 33, "%; background-image: url('images/").concat(this.galery.getGalleryImages()[i], "');");
        this.elem.innerHTML += this.getImageDiv(style, this.galery.getGalleryImages()[i], i);
      }
    }
  }, {
    key: "getImageDiv",
    value: function getImageDiv(style, link, index) {
      var result = "<a href=\"#image/".concat(link, "/").concat(index, "\"> <div class=\"catalogImageEntry\" style=\"").concat(style, "\"></div></a>");
      return result;
    }
  }, {
    key: "leftOneStep",
    value: function leftOneStep() {
      var start = Date.now();
      var elem = this.elem;
      var timer = setInterval(function () {
        var timePassed = Date.now() - start;
        var old = parseInt(elem.style.left, 10);

        if (isNaN(old)) {
          old = 0;
        }

        elem.style.left = old - 1 + "%";
        if (timePassed > 1000) clearInterval(timer);
      }, 30);
    }
  }, {
    key: "rightOneStep",
    value: function rightOneStep() {
      var start = Date.now();
      var elem = this.elem;
      var timer = setInterval(function () {
        var timePassed = Date.now() - start;
        var old = parseInt(elem.style.left, 10);

        if (isNaN(old)) {
          old = 0;
        }

        elem.style.left = old + 1 + "%";
        if (timePassed > 1000) clearInterval(timer);
      }, 30);
    }
  }, {
    key: "moveCatalogLeft",
    value: function moveCatalogLeft() {
      if (Math.abs(this.leftdiff) == this.galery.getLengthOfGallery() - 3) {
        return;
      }

      this.leftOneStep();
      this.leftdiff--;
    }
  }, {
    key: "moveCatalogRight",
    value: function moveCatalogRight() {
      if (this.leftdiff == 2) {
        return;
      }

      this.rightOneStep();
      this.leftdiff++;
    }
  }, {
    key: "goToNextImagePage",
    value: function goToNextImagePage() {
      this.currentPicture++;
      if (this.currentPicture != this.galery.getGalleryImages().length) window.location.href = "".concat(root, "#image/").concat(this.galery.getGalleryImages()[this.currentPicture], "/").concat(this.currentPicture, ">");else window.location.href = "".concat(root, "#categories");
    }
  }]);

  return Catalog;
}();

var currentCatalog = null;
"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Gallery =
/*#__PURE__*/
function () {
  function Gallery(list) {
    _classCallCheck(this, Gallery);

    this.photos = list;
  }

  _createClass(Gallery, [{
    key: "getGalleryImages",
    value: function getGalleryImages() {
      return this.photos;
    }
  }, {
    key: "getLengthOfGallery",
    value: function getLengthOfGallery() {
      return this.photos.length;
    }
  }]);

  return Gallery;
}();

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

var currentGalery = null;
"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var TopCatalog =
/*#__PURE__*/
function () {
  function TopCatalog(imageList, title, attitude) {
    _classCallCheck(this, TopCatalog);

    this.imageList = imageList;
    this.leftdiff = 1;
    this.elem = null;
    this.currentPicture = null;
    this.title = title;
    this.attitude = attitude;
  }

  _createClass(TopCatalog, [{
    key: "loadCatalog",
    value: function loadCatalog() {
      var content = document.getElementsByClassName("content")[0];
      content.innerHTML = catalogTemplate(this.title);
      this.elem = document.getElementById("catalog");
      this.displayCatalog();
      document.getElementById("btnLeft").id = "btnTopLeft";
      document.getElementById("btnRight").id = "btnTopRight";
    }
  }, {
    key: "displayCatalog",
    value: function displayCatalog() {
      var len = this.imageList.length;
      this.elem.innerHTML = "";
      this.elem = document.getElementById("catalog");

      for (var i = 0; i < len; i++) {
        var style = "left:".concat(i + i * 33, "%; background-image: url('").concat(this.imageList[i][0], "');");
        this.elem.innerHTML += this.getImageDiv(style, this.imageList[i], i);
      }
    }
  }, {
    key: "getImageDiv",
    value: function getImageDiv(style, img, index) {
      var result = "<a href=\"#top/".concat(this.attitude, "/").concat(img[0], "/").concat(index, "/").concat(img[1], "\"> <div class=\"catalogImageEntry\" style=\"").concat(style, "\"></div></a>");
      return result;
    }
  }, {
    key: "leftOneStep",
    value: function leftOneStep() {
      var start = Date.now();
      var elem = this.elem;
      var timer = setInterval(function () {
        var timePassed = Date.now() - start;
        var old = parseInt(elem.style.left, 10);

        if (isNaN(old)) {
          old = 0;
        }

        elem.style.left = old - 1 + "%";
        if (timePassed > 1000) clearInterval(timer);
      }, 30);
    }
  }, {
    key: "rightOneStep",
    value: function rightOneStep() {
      var start = Date.now();
      var elem = this.elem;
      var timer = setInterval(function () {
        var timePassed = Date.now() - start;
        var old = parseInt(elem.style.left, 10);

        if (isNaN(old)) {
          old = 0;
        }

        elem.style.left = old + 1 + "%";
        if (timePassed > 1000) clearInterval(timer);
      }, 30);
    }
  }, {
    key: "moveCatalogLeft",
    value: function moveCatalogLeft() {
      if (Math.abs(this.leftdiff) == this.imageList.length - 3) {
        return;
      }

      this.leftOneStep();
      this.leftdiff--;
    }
  }, {
    key: "moveCatalogRight",
    value: function moveCatalogRight() {
      if (this.leftdiff == 2) {
        return;
      }

      this.rightOneStep();
      this.leftdiff++;
    }
  }, {
    key: "goToNextImagePage",
    value: function goToNextImagePage() {
      this.currentPicture++;

      if (this.currentPicture != this.imageList.length) {
        var src = this.imageList[this.currentPicture][0];
        var id = this.currentPicture;
        var votes = this.imageList[this.currentPicture][1];
        window.location.href = "".concat(root, "#top/").concat(this.attitude, "/").concat(src, "/").concat(id, "/").concat(votes);
      } else {
        if (this.attitude) {
          window.location.href = "".concat(root, "#liked");
        } else {
          window.location.href = "".concat(root, "#disliked");
        }
      }
    }
  }]);

  return TopCatalog;
}();

var currentTopCatalog = null;

function getTopImages(attitude, callback) {
  fetch('data/votes.json').then(function (response0) {
    response0.json().then(function (response) {
      var dicImage = {};
      response.votes.forEach(function (item) {
        if (item.vote == "1" && attitude == true || item.vote == "-1" && attitude == false) {
          if (dicImage[item.image] !== undefined) dicImage[item.image]++;else dicImage[item.image] = 1;
        }
      });
      var sorted = returnSortedDict(dicImage);
      var title = "";

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
  var items = Object.keys(dict).map(function (key) {
    return [key, dict[key]];
  }); // Sort the array based on the second element

  items.sort(function (first, second) {
    return second[1] - first[1];
  });
  return items;
}

"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var User =
/*#__PURE__*/
function () {
  function User(username) {
    _classCallCheck(this, User);

    this.username = username;
    this.votes = {};
  }

  _createClass(User, [{
    key: "addVote",
    value: function addVote(pictureId, action) {
      //should be some kind of saving in back.
      this.votes[pictureId] = action;
    }
  }, {
    key: "hasVoted",
    value: function hasVoted(pictureId) {
      //should be some kind of checking in back.
      return pictureId in this.votes;
    }
  }, {
    key: "getVote",
    value: function getVote(pictureId) {
      return parseInt(this.votes[pictureId]);
    }
  }]);

  return User;
}();

function loginUser(userName, userPassword, callback) {
  fetch('data/users.json').then(function (response0) {
    response0.json().then(function (response) {
      var found = false;
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
      var found = false;
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

var currentUser = null;