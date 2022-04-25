import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'; // tokens
import { Observable } from 'rxjs'; // operator

import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero$!: Observable<Hero>;

  constructor(
    private route: ActivatedRoute, // для получения параметров маршрута,
    // извлечения id hero из параметров и извлечения hero для отображения
    // при переходе из HeroListComponent
    private router: Router,
    private service: HeroService
  ) {}

  // При переходе от HeroListComponent к HeroDetailComponent вы подписывались на
  // map параметров маршрута Observable и делали ее доступной для HeroDetailComponent
  // в службе ActivatedRoute, который внедрили в конструктор HeroDetailComponent

  ngOnInit() {
    console.log(this.route)
    this.hero$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getHero(params.get('id')!))
    );
  }

  gotoHeroes(hero: Hero) {
    const heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/superheroes', { id: heroId, foo: 'foo' }]);
  }
}
