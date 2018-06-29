function catalogTemplate(){
	var html = `
				<h1 class="categoryName">Winter</h1>			

				<div id="catalogHolder" class="catalogHolder group" >
					<div id="catalog"  class="catalog">
					</div>
					<div id="btnLeft"  class="catalogBtn left"  onclick="moveCatalogLeft();"   >
					</div>
					<div id="btnRight" class="catalogBtn right" onclick="moveCatalogRight();"  >
					</div>		
				</div>
				`;	 

	return html;			

}