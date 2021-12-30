import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';

import { ArticleService } from 'src/app/service/article.service';
import { urlGlobal } from 'src/app/service/global';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  @Input() articles!: Article[];
  public url: string;

  constructor() { 
    this.url = urlGlobal;
  }

  ngOnInit(): void {
    
  }

}
