function categoryTemplate(data){
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