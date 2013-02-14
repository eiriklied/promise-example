define(['jquery', 'underscore', 'when'], function($, _, when) {

    var controller = function() {
            function logerror(oops) {
                console.log(oops);
            }

            function addImage(imageUrl) {
                return '<img src=' + imageUrl + ' />';
            }

            function fetchSimilarArtist(artist) {
                return $.ajax({
                    url: '/api/similar-' + artist.mbid + '.json',
                    dataType: 'json'
                });
            }

            function renderSimilarArtists(allSimilarArtists) {
                _.each(allSimilarArtists, function(similarArtists) {
                    var mbid = similarArtists.artistMbid;
                    _.each(similarArtists.similar, function(artist) {
                        $('<div>Navn: ' + artist.name + ':' + artist.match + '</div>').appendTo('li#' + mbid);
                    });
                });
            }

            function renderTopArtists(artists) {
                _.each(artists, function(artist) {
                    $('<li id="' + artist.mbid + '"><span>Navn: ' + artist.name + '</span>' + addImage(artist.image) + '</li>').appendTo('ul');
                });
                return artists;
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
                    }, 1000);
                    return deferred.promise;
                };

            var loadAllSimilarArtists = function(artists) {
                var similarArtistDeferred = [];
                        _.each(artists, function(artist) {
                            similarArtistDeferred.push(fetchSimilarArtist(artist));
                        });
                return when.all(similarArtistDeferred);
            };

            // Public functions
            return {
                init: function(elem) {
                    controller.elem = $(elem);
                    return this;
                },
                render: function() {
                    $(controller.elem).empty();
                    when(renderUl()).then(fetchTopArtists).then(renderTopArtists).then(function(artists) {
                        loadAllSimilarArtists(artists).then(renderSimilarArtists);
                        
                    });
                }
            };
        };


    // init function
    return function(elem, options) {
        return Object.create(controller()).init(elem, options);
    };

});