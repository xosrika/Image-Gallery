function catalogTemplate(title){
	var html = `
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