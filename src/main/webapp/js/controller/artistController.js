define(['jquery', 'underscore', 'when'], function($, _, when) {

	var controller = function() {

			function addImage(imageUrl) {
				return '<img src=' + imageUrl + ' />';
			}
			var renderTopArtists = function(artist) {
					$('<li><span>Navn: ' + artist.name + '</span>' + addImage(artist.image) + '</li>').appendTo(controller.elem);
				};

			var fetchTopArtists = function(callback) {
					$.ajax({
						url: '/api/topartists.json',
						dataType: 'json',
						success: function(artists) {
							_.each(artists, function(artist) {
								callback(artist);
							});
						},
						error: function(dog) {
							$('<li>Ooops!</li>').appendTo(controller.elem);
						}

					});
				};

			// Public functions
			return {
				init: function(elem) {
					controller.elem = $(elem);
					return this;
				},
				render: function() {
					$(controller.elem).empty();

					// !!!
					$('<ul>').appendTo(controller.elem);
					fetchTopArtists(renderTopArtists);
					$('</ul>').appendTo(controller.elem);

					// SJEKK HTML!
				}
			};
		};


	// init function
	return function(elem, options) {
		return Object.create(controller()).init(elem, options);
	};

});