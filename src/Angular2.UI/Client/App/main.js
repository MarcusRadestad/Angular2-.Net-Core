///<reference path="./../../typings/browser/ambient/es6-shim/index.d.ts"/>
System.register(['@angular/core', '@angular/http', 'angular2-in-memory-web-api', './in-memory-data.service', '@angular/platform-browser-dynamic', './app.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1, angular2_in_memory_web_api_1, in_memory_data_service_1, platform_browser_dynamic_1, app_component_1, http_2;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (angular2_in_memory_web_api_1_1) {
                angular2_in_memory_web_api_1 = angular2_in_memory_web_api_1_1;
            },
            function (in_memory_data_service_1_1) {
                in_memory_data_service_1 = in_memory_data_service_1_1;
            },
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }],
        execute: function() {
            platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
                http_2.HTTP_PROVIDERS,
                core_1.provide(http_1.XHRBackend, { useClass: angular2_in_memory_web_api_1.InMemoryBackendService }),
                core_1.provide(angular2_in_memory_web_api_1.SEED_DATA, { useClass: in_memory_data_service_1.InMemoryDataService }) // in-mem server data
            ]);
        }
    }
});
//# sourceMappingURL=main.js.map