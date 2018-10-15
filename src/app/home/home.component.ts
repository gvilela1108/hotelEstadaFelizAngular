import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private tipo:string;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.tipo = localStorage.getItem("idTipoFuncionario");
    
    if (this.tipo == null || this.tipo == undefined) {
      this.router.navigate(['']);
    }
  }

}
