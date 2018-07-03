// window.addEventListener("hashchange", funcRef, false);


var root = "http://localhost/Image-Gallery/index.php";
var useHash = false; // Defaults to: false
var hash = '#'; // Defaults to: '#'
var router = new Navigo(null, false);

router
  .on({
    
    'home': function () {
     
      let elem = document.getElementsByClassName("content")[0];
      elem.innerHTML = homePageTemplate();    
    },

    'categories/:id/' : function (params) {
      
      let listOfPhotos = AllCatalogImages[params.id];
      let galery = new Gallery(listOfPhotos);
      currentCatalog = new Catalog(galery);

      currentCatalog.loadCatalog();

    },

    'categories': function () {
      // alert("categories")
      let elem = document.getElementsByClassName("content")[0];
      elem.innerHTML = categoriesPageTemplate(); 
    
      var json = {

        "image" : "images/winter.jpg",
        "title" : "Winter Pictures",
        "id" : 0
      }
      for(let i =0; i<8; i++){
        let cat = document.getElementsByClassName("column middle")[0];
        cat.innerHTML += categoryTemplate(json);
      }
    },
    
    'image/../images/:category/:source' : function (params){
      let elem = document.getElementsByClassName("content")[0];
	    elem.innerHTML = imageTemplate(params.category, params.source);    
    },

    
    // '*':function(){
    //   alert("not good");
      
    //   // var elem = document.getElementsByTagName("h1")[0];
    //   // elem.style.color = "blue"; 
    // }
  })
  .resolve();

  router.notFound(function () {
    console.log("Not found");
  });
