define(['jquery', 'underscore', 'when'], function($, _) {

	var controller = function() {

			// Private functions
			var resolvePetWithId9And10 = function() {
					$('<ul>').appendTo(controller.elem);

					$.ajax({
						url: 'http://petstore.swagger.wordnik.com/api/pet.json/9?api_key=special-key',
						dataType: 'json',
						success: function(pet) {
							$('<li>Navn: ' + pet.name + '</li>').appendTo(controller.elem);
							$.ajax({
								url: 'http://petstore.swagger.wordnik.com/api/pet.json/10?api_key=special-key',
								dataType: 'json',
								success: function(pet) {
									$('<li>Navn: ' + pet.name + '</li>').appendTo(controller.elem);
									$('</ul>').appendTo(controller.elem);
								},
								error: function(dog) {
									$('<li>Ooops!</li>').appendTo(controller.elem);
									$('</ul>').appendTo(controller.elem);
								}
							});

						},
						error: function(dog) {
							$('<li>Ooops!</li>').appendTo(controller.elem);
							$('</ul>').appendTo(controller.elem);
						}
					});



				};

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