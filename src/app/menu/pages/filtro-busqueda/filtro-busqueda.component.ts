import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-filtro-busqueda',
  templateUrl: './filtro-busqueda.component.html',
  styles: [`
   .ancho{
    width: 200px;
   }
  `
  ]
})
export class FiltroBusquedaComponent implements OnInit {

  search = new FormControl('');


  constructor() { }

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        debounceTime(200)
      )
      .subscribe( valor => {
      this.searchEmitter.emit(valor)
      this.correoEmitter.emit(valor) 
    })
  }

  

  @Output('search') searchEmitter = new EventEmitter<string>();

  @Output('correoSearch') correoEmitter = new EventEmitter<string>();
 
}
