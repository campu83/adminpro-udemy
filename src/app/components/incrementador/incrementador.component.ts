import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    console.log('Leyenda', this.leyenda);
    console.log('Progreso', this.progreso);
  }

  cambiarValor( valor: number ) {
    this.progreso = this.progreso + valor;

    if (this.progreso >= 100 ) {
      this.progreso = 100;
    } else if (this.progreso <= 0 ) {
      this.progreso = 0;
    }

    this.cambioValor.emit( this.progreso );

    this.txtProgress.nativeElement.focus();
  }

  onChanges( newValue: number ) {
    // const elemHTML: any = document.getElementsByName('progreso')[0]; Esta solucion no vale, mejor coger
    // el child para hacer referencia a un elemento, ya que si tenemos dos componentes iguales es un problema.
    if (newValue >= 100 ) {
      this.progreso = 100;
    } else if (newValue <= 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    // elemHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit( this.progreso );
  }
}
