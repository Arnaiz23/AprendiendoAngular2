import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/service/article.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public articles!: Article[];
  public search!: string;

  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      let search = params["search"];
      this.search = search;

      this._articleService.search(search).subscribe(
        response =>{
          if(response.articles){
            this.articles = response.articles;
          }else{
            this.articles = [];
          }
        },
        error =>{
          console.log(error);
          this.articles = [];
        }
      )
    })
  }

}
