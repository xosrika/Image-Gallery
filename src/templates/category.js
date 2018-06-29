function categoryTemplate(data){
	var html = `
					<div class="gallery">
						<a target="_blank" href="images/winter.jpg">
							<img src=${data.image} alt="Mountains">
						</a>
						<div class="desc">${data.title}</div>
					</div>
				`;	 

	return html;			

}