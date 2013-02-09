define(['jquery', 'underscore', 'controller/petController'], function($, _, petControllerInit) {

    var controller = function() {

            // Private functions



            // Public functions
            return {
                init: function(elem) {
                    controller.elem = $(elem);
                    controller.petController = petControllerInit("#pets");
                    return this;
                },
                run: function() {
                    controller.petController.renderPets();
                }
            };
        };


    // init function
    return function(elem, options) {
        return Object.create(controller()).init(elem, options);
    };

});
