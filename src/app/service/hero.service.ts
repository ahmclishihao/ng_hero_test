import {Injectable} from '@angular/core';
import {Hero} from '../model/hero';

import {Observable} from 'rxjs';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {HttpClient, HttpHeaders} from '@angular/common/http';

import {MessageService} from './message.service';


@Injectable()
export class HeroService {

  /**
   * URL to web api
   * @type {string}
   */
  private heroesUrl = '/api/heroes';

  private heroUrl = '/api/hero';

  constructor(private messageService: MessageService,
              private http: HttpClient) {}

  /**
   * 获取英雄列表
   * @returns {Hero[]}
   */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heros=>this.log(`正在召唤群英。。。。`)),
        catchError(this.handleError('召唤群英', [])));
  }

  /**
   * 根据id获取英雄信息
   * @param {number} id
   * @returns {Observable<Hero>}
   */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(hero=>this.log(`欢迎来到召唤师峡谷，编号：${hero.id}的英雄`)),
      catchError(this.handleError<Hero>('召唤英雄')));
  }

  /**
   * 更新英雄
   * @param {Hero} newHero
   * @returns {Observable<any>}
   */
  updateHero(newHero: Hero): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({'Content-Type':'application/json'})
    };
    return this.http.put(this.heroUrl,newHero,httpOption)
        .pipe(tap(_=>this.log(`正在重塑英雄 ${newHero.name}`)),
        catchError(this.handleError<any>(`重塑英雄`)));
  }

  /**
   * 添加新的英雄
   * @param {Hero} newHero
   * @returns {Observable<Hero>}
   */
  createHero(newHero: Hero):Observable<Hero>{
    const httpOption = {
      headers: new HttpHeaders({'Content-Type':'application/json'})
    };
    return this.http.post(this.heroUrl,newHero,httpOption)
      .pipe(tap((hero:Hero) => this.log(`正在创造新的英雄:${newHero.name}`)),
        catchError(this.handleError<Hero>(`创造英雄`)));
  }

  /**
   * 删除英雄
   */
  deleteHero(hero:Hero | number):Observable<any>{
    const heroId = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroUrl}/${heroId}`;
    return this.http.delete(url).pipe(
      tap(_=>this.log(`编号：${heroId} 已经阵亡`)),
      catchError(this.handleError<Hero>(`英雄阵亡`))
    );
  }

  /**
   * 根据名称搜索英雄
   * @param {string} heroName
   * @returns {Observable<Hero[]>}
   */
  searchHero(heroName:string):Observable<Hero[]>{
    heroName = heroName.trim();
    if(!heroName){
      return of([]);
    }
    const url = `${this.heroUrl}?name=${heroName}`;
    return this.http.get<Hero[]>(url).pipe(tap(heroes=>this.log(`正在删选英雄`)));
  }







  /**
   * 处理异常
   * @param {string} operation
   * @param {T} result
   * @returns {(error: any) => Observable<T>}
   */
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`( ⊙ o ⊙ )啊！ ${operation}时卡住了、、、${error.message}`);
      return of(result as T);
    };
  }

  /**
   * 记录日志
   * @param {string} msg
   */
  private log(msg: string): void {
    this.messageService.add(`HeroService: ${msg}`);
  }

}
