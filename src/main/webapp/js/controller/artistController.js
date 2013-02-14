define(['jquery', 'underscore', 'when'], function($, _, when) {

	var controller = function() {

			// // Private functions
			// var resolvePetWithId9And10 = function() {
			// 		$('<ul>').appendTo(controller.elem);

			// 		var promise1 =  $.ajax({
			// 			url: '/api/artist9.json',
			// 			dataType: 'json'
			// 		});
			// 		var promise2 = $.ajax({
			// 			url: '/api/artist10.json',
			// 			dataType: 'json'
			// 		});

			// 		when.all([promise1, promise2]).then(function (artists) {
			// 			$('<ul>').appendTo(controller.elem);
			// 			_.each(artists, function(artist) {
			// 				$('<li>Navn: ' + artist.name + '</li>').appendTo(controller.elem);
			// 			});
			// 			$('</ul>').appendTo(controller.elem);
			// 		});

			// 	};

			// Public functions
			return {
				init: function(elem) {
					controller.elem = $(elem);
					return this;
				},
				renderPets: function() {
					$(controller.elem).empty();
					resolvePetWithId9And10();
				}
			};
		};


	// init function
	return function(elem, options) {
		return Object.create(controller()).init(elem, options);
	};

});