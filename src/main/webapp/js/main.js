requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'libs/jquery/jquery-1.9.0',
        underscore: 'libs/underscore/underscore-1.2.3'
    },
    shim: {
        'app': {
            deps: ['jquery', 'underscore'],
            exports: 'app'
        }
    }
});


requirejs(['jquery', 'underscore', 'app'], function($, _, App) {
    var app = new App("#main");
    $(document).ready(function() {
        app.run();
    });
});