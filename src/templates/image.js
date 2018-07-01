function imageTemplate(category, name){
	var html = `
					<h1 class="categoryNameForSingleImage">Winter</h1>			

					<div class="group">
						
							<img class="singleImage" src="images/${category}/${name}">
						
					</div>
				`;	 

	return html;			

}