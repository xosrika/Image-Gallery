  
  
 var imageCatalog = [ "../images/winter/winter1.jpg", "../images/winter/winter2.jpg", "../images/winter/winter3.jpg", "../images/winter/winter4.jpg", "../images/winter/winter5.jpg", "../images/winter/winter6.jpg", "../images/winter/winter7.jpg", "../images/winter/winter8.jpg" ];
  
  
 function pageLoaded(){
	 displayCatalog();
 }
 
 
 function displayCatalog(){
	 var catalog = document.getElementById("catalog");
	 catalog.innerHTML="";
	 
	 for(var i=0; i<imageCatalog.length; i++){
		 var style = 'left:'+(i+i*33) + '%; background-image: url(\'images/'+imageCatalog[i]+'\');';
		 catalog.innerHTML += getImageDiv(style);
	 } 
 }
 
 
 function getImageDiv(style){
	 var result = '<div class="catalogImageEntry" style="'+style+'">';
		'</div>';
	 return result;
 }
 
 

var slidesMovedCount = 1; 

function leftOneStep(elem) {
	let start = Date.now();
	console.log("blu started");
	let timer = setInterval(function() {
	  let timePassed = Date.now() - start;

	  let old =  parseInt(elem.style.left, 10);

	  if(isNaN(old)){
		  old = 0;
	  }		
	  console.log(old);
	  elem.style.left = old - 1 + "%";

	  if (timePassed > 1000) clearInterval(timer);

	}, 29);
  }

 function rightOneStep(elem) {
	let start = Date.now();
	console.log("blu started");
	let timer = setInterval(function() {
	  let timePassed = Date.now() - start;

	  let old =  parseInt(elem.style.left, 10);

	  if(isNaN(old)){
		  old = 0;
	  }		
	  console.log(old);
	  elem.style.left = old + 1 + "%";

	  if (timePassed > 1000) clearInterval(timer);

	}, 29);
  }


function moveCatalogLeft(){	  
	if(Math.abs(slidesMovedCount) == imageCatalog.length-3){
		return;
	}
	
	let elem = document.getElementById("catalog");

	leftOneStep(elem);
	slidesMovedCount--;
}

function moveCatalogRight(){
	
	if(slidesMovedCount == 2){
		return;
	}	
	
	let elem = document.getElementById("catalog");
	rightOneStep(elem);
	slidesMovedCount++;
}









