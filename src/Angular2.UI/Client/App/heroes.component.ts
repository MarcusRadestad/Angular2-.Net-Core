import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';

@Component({
    selector: 'my-heroes',
    directives: [HeroDetailComponent],
    templateUrl: 'app/heroes.component.html',
    styleUrls: ['app/heroes.component.css']
})
export class HeroesComponent implements OnInit {
    title = 'Tour of Heroes';
    selectedHero: Hero;
    hero: Hero = {
        id: 1,
        name: ' Hello asdasd  7'
    };

    constructor(
        private heroService: HeroService,
        private router: Router) { }

    public heroes: Hero[];

    ngOnInit() {
        this.getHeroes();
    }

    onSelect = (hero: Hero) => {
        this.selectedHero = hero;
    }

    getHeroes() {
        this.heroService.getHeroes().then((result: Hero[]) => {
            this.heroes = result;
            var r = "sad";
        });
    }

    gotoDetail() {
        this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
    }
}


