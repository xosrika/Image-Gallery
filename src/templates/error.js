function errorPageTemplate(error_code){
	let html = `
					<div class="column side">
						
					</div>
					<div class="column middle">
						<h1>Error Occurred</h1>
						<h2>Something went wrong:</h2>
						<p>
							${error_code} 
						</p>
					</div>
					<div class="column side">
						
					</div>
				`;	 

	return html;			

}