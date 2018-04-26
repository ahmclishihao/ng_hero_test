import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../model/hero';
import {Location} from '@angular/common';
import {HeroService} from '../service/hero.service';
import {ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input()
  hero: Hero;

  constructor(private location: Location,
              private heroService: HeroService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {

  }

}
