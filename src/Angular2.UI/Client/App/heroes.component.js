System.register(['./hero-detail.component', './hero.service', '@angular/core', '@angular/router-deprecated'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var hero_detail_component_1, hero_service_1, core_1, router_deprecated_1;
    var HeroesComponent;
    return {
        setters:[
            function (hero_detail_component_1_1) {
                hero_detail_component_1 = hero_detail_component_1_1;
            },
            function (hero_service_1_1) {
                hero_service_1 = hero_service_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            }],
        execute: function() {
            HeroesComponent = (function () {
                function HeroesComponent(heroService, router) {
                    var _this = this;
                    this.heroService = heroService;
                    this.router = router;
                    this.title = 'Tour of Heroes';
                    this.hero = {
                        id: 1,
                        name: ' Hello asdasd  7'
                    };
                    this.onSelect = function (hero) {
                        _this.selectedHero = hero;
                    };
                }
                HeroesComponent.prototype.ngOnInit = function () {
                    this.getHeroes();
                };
                HeroesComponent.prototype.getHeroes = function () {
                    var _this = this;
                    this.heroService.getHeroes().then(function (result) {
                        _this.heroes = result;
                        var r = "sad";
                    });
                };
                HeroesComponent.prototype.gotoDetail = function () {
                    this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
                };
                HeroesComponent = __decorate([
                    core_1.Component({
                        selector: 'my-heroes',
                        directives: [hero_detail_component_1.HeroDetailComponent],
                        templateUrl: 'app/heroes.component.html',
                        styleUrls: ['app/heroes.component.css']
                    }), 
                    __metadata('design:paramtypes', [hero_service_1.HeroService, router_deprecated_1.Router])
                ], HeroesComponent);
                return HeroesComponent;
            }());
            exports_1("HeroesComponent", HeroesComponent);
        }
    }
});
//# sourceMappingURL=heroes.component.js.map