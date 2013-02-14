define(['jquery', 'underscore', 'when'], function($, _, when) {

	var controller = function() {

			function addImage(imageUrl) {
				return '<img src=' + imageUrl + ' />';
			}

			function renderTopArtists(artist) {
				$('<li><span>Navn: ' + artist.name + '</span>' + addImage(artist.image) + '</li>').appendTo('ul');
			}

			var fetchTopArtists = function() {
					$.ajax({
						url: '/api/topartists.json',
						dataType: 'json',
						success: function(artists) {
							_.each(artists, function(artist) {
								renderTopArtists(artist);
							});
						},
						error: function(dog) {
							$('<li>Ooops!</li>').appendTo('ul');
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

					$('<ul></ul>').appendTo(controller.elem);
					fetchTopArtists();
				}
			};
		};


	// init function
	return function(elem, options) {
		return Object.create(controller()).init(elem, options);
	};

});