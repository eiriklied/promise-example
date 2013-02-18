define(['jquery', 'underscore', 'when'], function($, _, when) {

    var controller = function() {

            function addImage(imageUrl) {
                return '<img src=' + imageUrl + ' />';
            }

            function renderTopArtist(artist) {
                $('<li><span>Navn: ' + artist.name + '</span>' + addImage(artist.image) + '</li>').appendTo('ul');
            }

            function renderTopArtists(artists) {
                _.each(artists, function(artist) {
                    renderTopArtist(artist);
                });
            }

            var fetchTopArtists = function() {
                return $.ajax({
                    url: '/api/topartists.json',
                    dataType: 'json'
                });
            };

            var fetchTopArtistsError = function(){
                console.debug('couldnt fetch artists..')
            }

            /** Hack below here! **/
            var renderUl = function() {
                // TODO: Make me use deferred with when
                var deferred = when.defer(); 
                
                function appendUl() {
                    $('<ul></ul>').appendTo(controller.elem);
                    deferred.resolve();
                }
                setTimeout(function() {
                    appendUl();
                }, 1500);

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
                    // TODO: Run in sequence
                    renderUl()
                        .then(fetchTopArtists)
                        .then(renderTopArtists, fetchTopArtistsError);
                }
            };
        };


    // init function
    return function(elem, options) {
        return Object.create(controller()).init(elem, options);
    };

});