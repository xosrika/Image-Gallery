function topImageTemplate(src, votes, attitude){
	
	let title = "";
	if(attitude == "true"){
		title = `This Picture Has Got ${votes} Likes`;
	} else{
		title = `This Picture Has Got ${votes} Dislikes`;
	}

	let html = `
					<h1 class="categoryNameForSingleImage">${title}</h1>			

					<div class="group">
						
							<img class="singleImage" id="mainPicture" src="${src}">						
						

							
				`;
	if(currentUser != null && currentUser.hasVoted(src)){
		let voteText = "You have already liked this picture";
		if(currentUser.getVote(src) == -1){
			voteText = "You have already disliked this picture";
		}

		html += `

				<h3 id="voteText">${voteText}</h3>	
				<div id="actions">
					<div class="center">
						<img id="topNextImage" class="action_buttons" src="images/next.png">
					</div>
				</div>


			</div>`;
	} else {
		html += `
				<div id="actions">
					<div class="left">
						<img id="topLikeImage" class="action_buttons" src="images/accept.png">
					</div>
					<div class="right">
						<img id="topDislikeImage" class="action_buttons" src="images/reject.png">
					</div>
					<div class="center">
						<img id="topNextImage" class="action_buttons" src="images/next.png">
					</div>
				</div>


			</div>`
	}			
				

	return html;			

}