define(['jquery', 'underscore', 'when'], function($, _, when) {

	var controller = function() {
			var currentHtml = '';

			function htmlBuilder(html) {
				currentHtml += html;
			}

			function addImage(imageUrl) {
				return '<img src=' + imageUrl + ' />';
			}
			var renderTopArtists = function(artist) {
					htmlBuilder('<li><span>Navn: ' + artist.name + '</span>' + addImage(artist.image) + '</li>');
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
							htmlBuilder('<li>Ooops!</li>');
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
					htmlBuilder('<ul>');
					fetchTopArtists(renderTopArtists);
					htmlBuilder('</ul>');
					$(currentHtml).appendTo(controller.elem);
					// SJEKK HTML!
				}
			};
		};


	// init function
	return function(elem, options) {
		return Object.create(controller()).init(elem, options);
	};

});