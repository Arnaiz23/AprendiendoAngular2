import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/service/article.service';
import { urlGlobal } from 'src/app/service/global';
import { ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {

  public article!: Article;
  public url: string;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .jpeg, .gif",
    maxSize: 50,
    uploadAPI: {
      url: urlGlobal + "upload-image"
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    fileNameIndex: true,
    autoUpload: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu imagen para el articulo',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
  };

  constructor(
    private _articleService: ArticleService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.article = new Article("", null, "", "", null);
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

  onSubmit() {
    this._articleService.newArticle(this.article).subscribe(
      response =>{
        swal({
          title: "Buen trabajo!!!",
          text: "El articulo ha sido editado exitosamente",
          icon: "success",
        });
        this._router.navigate(["/blog"]);
      },
      error =>{
        console.log(error)
        this._router.navigate(["/blog"]);
      }
    )
  }

  imageUpload(event:any){
    let nombreImagen = event.body.image;

    this.article.image = nombreImagen;
  }

}
