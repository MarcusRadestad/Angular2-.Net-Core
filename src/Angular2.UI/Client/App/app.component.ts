import { Component }       from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HeroService }     from './hero.service';
import { HeroesComponent } from './heroes.component';
import { DashboardComponent } from './dashboard.component';

@Component({
    selector: 'my-app', 
    template: `   
    <h1>{{title}}</h1>  
      <nav> 
        <a [routerLink]="['Dashboard']">Dashboard</a>  
        <a [routerLink]="['Heroes']">Heroes</a> 
      </nav>    
    <router-outlet></router-outlet>
  `,
    directives: [ROUTER_DIRECTIVES],  
    providers: [
        ROUTER_PROVIDERS,
        HeroService        
    ]   
}) 
@RouteConfig([  
        { 
            path: '/dashboard',
            name: 'Dashboard',
            component: DashboardComponent, 
            useAsDefault: true
        },
    {
        path: '/heroes',
        name: 'Heroes',    // must begin with a capital letter
        component: HeroesComponent
    },
])
export class AppComponent {
    title = 'Tour of Heroes';
}