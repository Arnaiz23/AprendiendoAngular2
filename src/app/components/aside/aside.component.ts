import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  public texto!: string;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  buscar(){
    this._router.navigate(["/buscar", this.texto]);
  }

}
