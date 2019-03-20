import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';
// Mas info de rxjs en http://reactivex.io/documentation/operators.html

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    // this.regresaObservable() con esto nos suscribimos
    // con esto nos suscribimos con la posibilidad de reintentar 2 veces más en caso de error
    // this.regresaObservable().pipe( retry(2))
    // this.regresaObservable() // con esto nos suscribimos
    this.subscription = this.regresaObservable3()
    .subscribe(
      numero => console.log( 'Obs.next ', numero ),  // Primer callback es el next
      error => console.error('Error en el obs', error), // El segundo es el error
      () => console.log('El observador termino!') // El tercero es cuando ha terminado el observer
    );

   }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La página se va a cerrar');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<number> {

    return new Observable( (observer: Subscriber<number>) => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador ++;

        observer.next( contador );

        if ( contador === 3 ) {
          clearInterval( intervalo ); // limpia el intervalo, lo que significa que si reintenta empezara por 1.
          observer.complete(); // ejecuta la finalizacion del intervalo
        }

        if ( contador === 2 ) {
          //  clearInterval( intervalo );
          observer.error('Auxilio!'); // ejecuta el error del intervalo. El error solo se imprime en el caso
          // de que se hayan terminado la ejecución incluyendo los reintentos en el caso de que los hubiera.
        }

      }, 1000);
    });
  }

  /**
   * En este caso vemos como "transformar" la respuesta de un observable que nos devuelve un objeto.
   */
  regresaObservable2(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador ++;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        if ( contador === 3 ) {
          clearInterval( intervalo ); // limpia el intervalo, lo que significa que si reintenta empezara por 1.
          observer.complete(); // ejecuta la finalizacion del intervalo
        }

       /* if ( contador === 2 ) {
          //  clearInterval( intervalo );
          observer.error('Auxilio!'); // ejecuta el error del intervalo. El error solo se imprime en el caso
          // de que se hayan terminado la ejecución incluyendo los reintentos en el caso de que los hubiera.
        }*/

      }, 1000);
    }).pipe(
      map( resp => resp.valor )
      /*map( resp => {
        return resp.valor;
      })*/
    );
  }

  /**
   * Añadimos el operador filter para decidir cuando comunicamos o no.
   */
  regresaObservable3(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador ++;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        /*if ( contador === 3 ) {
          clearInterval( intervalo ); // limpia el intervalo, lo que significa que si reintenta empezara por 1.
          observer.complete(); // ejecuta la finalizacion del intervalo
        }*/

       /* if ( contador === 2 ) {
          //  clearInterval( intervalo );
          observer.error('Auxilio!'); // ejecuta el error del intervalo. El error solo se imprime en el caso
          // de que se hayan terminado la ejecución incluyendo los reintentos en el caso de que los hubiera.
        }*/

      }, 1000);
    }).pipe(
      map( resp => resp.valor ),
      filter( (valor, index) => {
        // console.log('Filter', valor, index);
        return ( (valor % 2) === 1 );
       /* if ( (valor % 2) === 1 ) {
          // impar
          return true;
        } else { //par
          return false;
        }*/
      })
      /*map( resp => {
        return resp.valor;
      })*/
    );
  }
}
