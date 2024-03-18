
// patrón modulo, permite asegurar el codigo para ser identificado y cambiado por el usuario en el navegador

(()  => {
    
    // use strict le dice a JavaScript que sea estricto al evaluar mi codigo para no dejar pasar ningun error
    'use strict'
    
    // arreglos
    
    let deck          = [];
    const tipos       = ['C','D','H','S'],
          especiales  = [ 'A', 'J', 'Q', 'K'];
    
    // variables
    
    

    let puntosJugadores = [],
        victoriasJugador    = 0,
        victoriasComputador = 0;
    
    // Referencias del Html
    
    const btnNuevo           = document.querySelector('#btnNuevo'),
          btnPedir           = document.querySelector('#btnPedir'),
          btnDetener         = document.querySelector('#btnDetener');
    
    const puntosHtml         = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCartas'),
          spanVicJugador     = document.querySelector('#victoriasJugador'),
          spanVicPC          = document.querySelector('#victoriasComputadora');
          
          
          
          const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();

        puntosJugadores = [];
        for( let i = 0; i< numJugadores; i++ ) {
            puntosJugadores.push(0);
        }

        puntosHtml.forEach( elem => elem.innerText = 0 );

        divCartasJugadores.forEach( elem => elem.innerHTML = '' );
                
        btnPedir.disabled = false;
        btnDetener.disabled = false;

        console.log({ deck });
    }
            
    // esta funcion crea el deck

          const crearDeck = () => {
        
        deck = [];
        for( let i = 2; i <= 10; i++ ) {
            
            for( let  tipo of tipos ) {
                deck.push( i + tipo )
            }
        }
        
        for( let  tipo of tipos ) {
            for( let  especial of especiales ) {
                deck.push( especial + tipo )
            }
        }
        
        // gracias a la libreria underscore.js
        return _.shuffle( deck );
    }
    
    // elegir una carta del deck y eliminarla del mazo
    
    const tomarCarta = () => {
        
        if ( deck.length === 0 ) {
            throw 'No hay carta en el deck';
        }
        
        return deck.pop();
    }
    
    // determinar el valor de la carta a tipo numerico
    
    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length - 1);
        let cartaValor = 0;
        
        if ( isNaN( valor )) {
            if ( valor === 'J', 'Q', 'K' ) {
                cartaValor = 10;
            }
            if ( valor === 'A' ) {
                cartaValor = 1;
            }
        } else {
            cartaValor = parseInt(valor);
        }
        
        // console.log( cartaValor );
        
        return( cartaValor )
    }
    
    // turno: 0 = es el primero jugador y el ultimo valor del arreglo es la computadora
    const acumularPuntos = ( carta, turno ) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = ( carta, turno ) => {

        const imgCarta = document.createElement('img');
              imgCarta.src = `src/assets/images/cartas/${ carta }.png`;
              imgCarta.classList.add('carta')  
              divCartasJugadores[turno].append( imgCarta );
    }
    
    // turno de la computadora
    
    const turnoPc = ( valorMinimo ) => {
        
        let puntosComputadora = 0;
        do {
            
            const carta = tomarCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

            if( valorMinimo > 21 ) {
                break;
            }
            
        } while ( (puntosComputadora < valorMinimo) && (valorMinimo <= 21) );
        
        determinarGanador();
    }
    
    const determinarGanador = () => {

        setTimeout(() => {
            
            const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

            if( puntosComputadora === puntosMinimos ) {
                alert('Nadie gana...?');
            } else if ( puntosMinimos > 21 ) {
                alert('Computadora gana!')
                victoriasComputador = victoriasComputador + 1;
                spanVicPC.innerText = victoriasComputador;
            }else if ( puntosComputadora > 21 ) {
                alert('Jugador Gana!');
                victoriasJugador = victoriasJugador + 1;
                spanVicJugador.innerText = victoriasJugador;
            } else {
                alert('Computadora Gana!')
                victoriasComputador = victoriasComputador + 1;
                spanVicPC.innerText = victoriasComputador;
            }
            
        }, 100 )

    }
    
    // eventos
    
    btnNuevo.addEventListener( 'click', () =>{ 

        inicializarJuego();
        
    });
    
    btnPedir.addEventListener('click', () => {
        
        const carta = tomarCarta();
        const puntosJugador = acumularPuntos( carta, 0 )
        
        crearCarta( carta, 0 );
        
        if ( puntosJugador > 21 ) {
            alert('has sacado un valor mayor a 21');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            setTimeout(() => {
                turnoPc( puntosJugador );
            }, 500  )
            
        } else if ( puntosJugador === 21 ) {
            
            alert('21! Felicidades!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            setTimeout(() => {
                turnoPc( puntosJugador );
            }, 500  )
        }
        
    });
    
    btnDetener.addEventListener('click', () => {
        
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        
        turnoPc( puntosJugadores[0] );
        
    });
    
})();
    
    
    
    
    
    
    
    