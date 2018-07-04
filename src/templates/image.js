function imageTemplate(category, name){
	let img = `images/${category}/${name}`;
	
	let html = `
					<h1 class="categoryNameForSingleImage">${category}</h1>			

					<div class="group">
						
							<img class="singleImage" id="mainPicture" src="${img}">

							
							
						

							
				`;
	if(currentUser != null && currentUser.hasVoted(img)){
		let voteText = "You have already liked this picture";
		if(currentUser.getVote(img) == -1){
			voteText = "You have already disliked this picture";
		}

		html += `

				<h3 id="voteText">${voteText}</h3>	
				<div id="actions">
					<div class="center">
						<img id="nextImage" class="action_buttons" src="images/next.png">
					</div>
				</div>


			</div>`;
	} else {
		html += `
				<div id="actions">
					<div class="left">
						<img id="likeImage" class="action_buttons" src="images/accept.png">
					</div>
					<div class="right">
						<img id="dislikeImage" class="action_buttons" src="images/reject.png">
					</div>
					<div class="center">
						<img id="nextImage" class="action_buttons" src="images/next.png">
					</div>
				</div>


			</div>`
	}			
				

	return html;			

}