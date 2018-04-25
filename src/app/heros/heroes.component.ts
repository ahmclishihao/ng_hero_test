import { Component, OnInit } from '@angular/core';
import { Hero} from "../model/hero";
import {HeroService} from "../service/hero.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;

  heroes:Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.selectedHero = new Hero();
    this.selectedHero.id = 0;
    this.selectedHero.name = "归零机甲";
    this.getHeroes();
  }

  onSelectedItem(hero:Hero): void{
    this.selectedHero = hero;
  }

  getHeroes(): void{
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

}
