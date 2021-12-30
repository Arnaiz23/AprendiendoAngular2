import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/service/article.service';
import { urlGlobal } from 'src/app/service/global';
import swal from 'sweetalert';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  public article!: Article;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _articleService: ArticleService,
    private _router: Router
  ) { 
    this.url = urlGlobal;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      let id = params['id'];

      this._articleService.getArticle(id).subscribe(
        response =>{
          this.article = response.article;
        },
        error =>{
          console.log(error);
        }
      )
    });
  }

  eliminar(id: string){
    swal({
      title: "¿Estas seguro?",
      text: "Una vez elimines este artículo, ya no estara disponible",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("El articulo ha sido eliminado", {
          icon: "success",
        });
        this._articleService.delete(id).subscribe(
          response =>{
            this._router.navigate(['/blog']);
          },
          error =>{
            console.log(error);
          }
        )
      } else {
        swal("El articulo esta a salvo");
      }
    });
    
  }

}
