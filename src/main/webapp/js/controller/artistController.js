define(['jquery', 'underscore', 'when'], function($, _, when) {

    var controller = function() {

            function addImage(imageUrl) {
                return '<img src=' + imageUrl + ' />';
            }

            function renderTopArtists(artists) {
                _.each(artists, function(artist) {
                    $('<li><span>Navn: ' + artist.name + '</span>' + addImage(artist.image) + '</li>').appendTo('ul');
                });
                return artists;
            }

            function renderSimilarArtists(allSimilarArtists) {
                _.each(allSimilarArtists, function(similarArtists) {
                    var mbid = similarArtists.artistMbid;
                    _.each(similarArtists.similar, function(artist) {
                        $('<div>Navn: ' + artist.name + ':' + artist.match + '</div>').appendTo('li#' + mbid);
                    });
                });
            }

            var fetchTopArtists = function() {
                    return $.ajax({
                        url: '/api/topartists.json',
                        dataType: 'json'
                    });
                };

            function fetchSimilarArtist(artist) {
                return $.ajax({
                    url: '/api/similar-' + artist.mbid + '.json',
                    dataType: 'json'
                });
            }

            var loadAllSimilarArtists = function(artists) {
                // TODO: Implement me with when all
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
                    .then(renderTopArtists)
                    .then(function(artists) {
                        //TODO: Implement me
                    });
                }
            };
        };


    // init function
    return function(elem, options) {
        return Object.create(controller()).init(elem, options);
    };

});