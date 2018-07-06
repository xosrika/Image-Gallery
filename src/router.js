// window.addEventListener("hashchange", funcRef, false);


let root = "http://localhost/Image-Gallery/index.html";
let useHash = false; // Defaults to: false
let hash = '#'; // Defaults to: '#'
let router = new Navigo(null, false);



router
  .on({
    
    'home': function () {
     
      let elem = document.getElementsByClassName("content")[0];
      elem.innerHTML = homePageTemplate();    
    },

    'categories/:id/' : function (params) {
      
      getGallery(params.id,  function(){
     
        currentCatalog = new Catalog(currentGalery, allCategories.getCategory(params.id).title);
        currentCatalog.loadCatalog();
      })

      

    },

    'categories': function () {
      // alert("categories")
      let elem = document.getElementsByClassName("content")[0];
      elem.innerHTML = categoriesPageTemplate(); 
      

      getCategories(function(){
        let cat = document.getElementsByClassName("column middle")[0];

        for(let i =0; i<allCategories.getLength(); i++){
          cat.innerHTML += categoryTemplate(allCategories.getCategory(i));
        }
      })

     
    },
    
    'image/../images/:category/:source/:id' : function (params){
      let elem = document.getElementsByClassName("content")[0];
      currentCatalog.currentPicture = parseInt(params.id);
	    elem.innerHTML = imageTemplate(params.category, params.source);    
    },

    'top/:attitude/images/:cat/:src/:id/:votes' : function (params){
      let elem = document.getElementsByClassName("content")[0];
      currentTopCatalog.currentPicture = parseInt(params.id);

      let src = `images/${params.cat}/${params.src}`;

      elem.innerHTML = topImageTemplate(src, params.votes, params.attitude);    
    },

    'disliked': function () {
      
      getTopImages(false,  function(){
     
        currentTopCatalog.loadCatalog();
      })
    },
    
    'liked': function () {
     
      getTopImages(true,  function(){
     
        currentTopCatalog.loadCatalog();
      })
    },

    


   
  })
  .resolve();

  router.notFound(function () {
    console.log("Not found");
  });



  function getCategories(callback){
    fetch('data/categories.json')
        .then(
          function(response0) {
              response0
                .json()
                .then(function(response) {               

                  allCategories = new AllCategories(response.categories);
                
                
                  if (typeof callback == 'function') {
                    callback.call(null);
                  }
  
                });
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
  }

class AllCategories {
    
    constructor(categoryArray) {
      this.data = categoryArray;
    }
    
    getLength(){
      return this.data.length;
    }

    getCategory(index){
      return this.data[index];
    }
}


let allCategories = null;