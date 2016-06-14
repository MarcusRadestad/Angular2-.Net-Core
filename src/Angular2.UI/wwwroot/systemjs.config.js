
/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        '@angular': 'lib/@angular',
        'angular2-in-memory-web-api': 'lib/angular2-in-memory-web-api',
        //'rxjs': 'libs/rxjs'
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        //'rxjs': { defaultExtension: 'js' },
        'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js'}
    };

    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'http',
        'platform-browser', 
        'platform-browser-dynamic',
        'router',
        'router-deprecated',
        'testing',
        'upgrade',
    ];

    // Add package entries for angular packages
    ngPackageNames.forEach(function (pkgName) {
        packages['@angular/' + pkgName] = {
            main: pkgName + '.umd.js',
            defaultExtension: 'js'
        };
    });

    var config = {
        map: map,
        packages: packages,
        meta: { '*.js': { scriptLoad: true } }
    }

    // filterSystemConfig - index.html's chance to modify config before we register it.
    //if (global.filterSystemConfig) { global.filterSystemConfig(config); }    

    System.config(config);
})(this);