import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/service/article.service';
import { urlGlobal } from 'src/app/service/global';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css']
})
export class ArticleNewComponent implements OnInit {

  public article!: Article;

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
    private _router: Router
  ) {
    this.article = new Article("", null, "", "", null);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this._articleService.newArticle(this.article).subscribe(
      response =>{
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
