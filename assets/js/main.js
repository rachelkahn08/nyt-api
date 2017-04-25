console.log("Hello World from main.js!");


$('form').on('submit', function(e) {
	e.preventDefault();

	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

	url += '?' + $.param({
		'api-key': "6b707c57206c4f7dac0e57be81153996",
		'q': $('input').val()
	});

	$.ajax({
		url: url,
		method: 'GET',
		}).done(function(result) {
		  
			$('.results') ? newResults() : postResults(result);

		function newResults() {
				$('.results').remove();
				postResults(result);
				console.log('new results');
			}
		  
		}).fail(function(err) {
		  throw err;
	});

	function postResults(result){

		console.log('post results');

		var resultsContainer = document.createElement("div");
			resultsContainer.classList.add("results");

		var items = result.response.docs;
			
		for (var i = items.length - 1; i >= 0; i--) {
			date = items[i].pub_date;
			url = items[i].web_url;
			headline = items[i].headline.main;

			var postContainer = document.createElement("div");
				$(postContainer).append("<a href=" + url + " class='headline'>" + "<h1>" + headline + "</h1>"); 
			
			var dateContainer = document.createElement("p");
				dateContainer.innerHTML = date;

			$(postContainer).append(dateContainer);

			resultsContainer.append(postContainer);
		}

		document.body.appendChild(resultsContainer);
	}

	

});


