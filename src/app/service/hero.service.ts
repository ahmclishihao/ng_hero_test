import {Injectable} from '@angular/core';
import {Hero} from "../model/hero";
import {HEROES} from "../model/heros";

import {Observable} from 'rxjs';
import {of} from "rxjs/observable/of";

import {HttpClient,HttpHeaders} from "@angular/common/http"

import {MessageService} from "./message.service";


@Injectable()
export class HeroService {

  /**
   * URL to web api
   * @type {string}
   */
  private heroesUrl = '/api/heroes';

  constructor(private messageService: MessageService,
              private http: HttpClient) {}

  /**
   * 获取英雄列表
   * @returns {Hero[]}
   */
  getHeroes(): Observable<Hero[]> {
    this.messageService.add("正在召唤您的英雄。。。。");
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`欢迎来到召唤师峡谷，编号：${id}的英雄`);
    return of(HEROES.find(hero=>hero.id == id));
  }

  /**
   * 记录日志
   * @param {string} msg
   */
  private log(msg: string): void{
    this.messageService.add(`HeroService: ${msg}`);
  }

}
