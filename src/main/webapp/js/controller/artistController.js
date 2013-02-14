define(['jquery', 'underscore', 'when'], function($, _, when) {

    var controller = function() {

            function addImage(imageUrl) {
                return '<img src=' + imageUrl + ' />';
            }

            function renderTopArtists(artists) {
                _.each(artists, function(artist) {
                    $('<li><span>Navn: ' + artist.name + '</span>' + addImage(artist.image) + '</li>').appendTo('ul');
                });
            }

            var fetchTopArtists = function() {
                    return $.ajax({
                        url: '/api/topartists.json',
                        dataType: 'json'
                    });
                };

            var renderUl = function() {
                    var deferred = when.defer();
                    function resolve() {
                        deferred.resolve($('<ul></ul>').appendTo(controller.elem));
                    }
                    setTimeout(function() {
                        resolve();
                    }, 3000);
                    return deferred.promise;
                };

            // Public functions
            return {
                init: function(elem) {
                    controller.elem = $(elem);
                    return this;
                },
                render: function() {
                    $(controller.elem).empty();
                    when(renderUl())
                    .then(fetchTopArtists)
                    .then(renderTopArtists);
                }
            };
        };


    // init function
    return function(elem, options) {
        return Object.create(controller()).init(elem, options);
    };

});