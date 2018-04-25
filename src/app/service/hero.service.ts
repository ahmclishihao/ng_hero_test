import { Injectable } from '@angular/core';
import {Hero} from "../model/hero";
import {HEROES} from "../model/heros";

import { Observable } from 'rxjs';
import { of } from "rxjs/observable/of";
import {MessageService} from "./message.service";



@Injectable()
export class HeroService {

  constructor(private messageService: MessageService) { }

  /**
   * 获取英雄列表
   * @returns {Hero[]}
   */
  getHeroes(): Observable<Hero[]> {
    this.messageService.add("正在召唤您的英雄。。。。");
    return of(HEROES);
  }

}
