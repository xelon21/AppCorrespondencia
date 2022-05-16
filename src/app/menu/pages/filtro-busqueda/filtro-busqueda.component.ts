import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-filtro-busqueda',
  templateUrl: './filtro-busqueda.component.html',
  styles: [`
   
  `
  ]
})
export class FiltroBusquedaComponent implements OnInit {

  search = new FormControl('');
  
  constructor() { }

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe( valor => {
      this.searchEmitter.emit(valor)
      this.correoEmitter.emit(valor)
    })

  }

  @Output('search') searchEmitter = new EventEmitter<string>();

  @Output('correoSearch') correoEmitter = new EventEmitter<string>();


}
