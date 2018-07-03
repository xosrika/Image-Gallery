function imageTemplate(category, name){
	console.log("image drow");
	var html = `
					<h1 class="categoryNameForSingleImage">${category}</h1>			

					<div class="group">
						
							<img class="singleImage" src="images/${category}/${name}">

							
							
						

							<div id="actions">
								<div class="left">
									<img id="likeImage" class="action_buttons" src="images/accept.png">
								</div>
								<div class="right">
									<img id="dislikeImage" class="action_buttons" src="images/reject.png">
								</div>
								<div class="center">
									<img id="nextImage" class="action_buttons" src="images/accept.png">
								</div>
							</div>

						
					</div>
				`;	 

	return html;			

}