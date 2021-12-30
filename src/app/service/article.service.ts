import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { urlGlobal } from './global';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) { 
    this.url = urlGlobal;
  }

  getArticles(last: any = null):Observable<any>{

    var articles = "articles";

    if(last != null){
      var articles = "articles/true";
    }

    return this._http.get(this.url+articles);
  }

  newArticle(article: any):Observable<any>{
    let headers = new HttpHeaders().set("Content-type","application/json");
    let articulo = JSON.stringify(article);
    return this._http.post(this.url+"save",article,{headers: headers});
  }

  search(search: any):Observable<any>{
    return this._http.get(this.url+"search/"+search);
  }

  update(id: any, article: any):Observable<any>{
    let headers = new HttpHeaders().set("Content-type","application/json");
    let newArticle = JSON.stringify(article);
    return this._http.put(this.url+"article/"+id, newArticle, {headers: headers});
  }

  delete(id: any):Observable<any>{
    return this._http.delete(this.url+"article/"+id);
  }
}
