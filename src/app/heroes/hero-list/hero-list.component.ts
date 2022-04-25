// TODO: Feature Componetized like CrisisCenter
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  selectedId = 0;

  constructor(
    private service: HeroService,
    private route: ActivatedRoute //чтобы вернутся из HeroDetailComponent
  ) {}

  // Свойство ActivatedRoute.paramMap представляет собой наблюдаемую map параметров маршрута.
  // paramMap создает новую map значений, которая включает id, когда пользователь переходит к компоненту
  // В ngOnInit() вы подписываетесь на эти значения, устанавливаете selectedId и получаете hero

  ngOnInit() {
    this.heroes$ = this.route.paramMap.pipe( // При изменении map paramMap получает параметр id из измененных параметров
      switchMap(params => { // Он сглаживает Observable<Hero>, который возвращает HeroService, и отменяет предыдущие ожидающие запросы.
        this.selectedId = parseInt(params.get('id')!, 10);
        console.log('+++++++  params +++++++', this.selectedId)
        return this.service.getHeroes(); //при загрузке срабатывает
      })
    );
  }
}
