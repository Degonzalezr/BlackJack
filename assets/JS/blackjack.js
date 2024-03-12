
// arreglos

let deck          = [];
const tipos       = ['C','D','H','S'];
const especiales  = [ 'A', 'J', 'Q', 'K'];

// variables

let puntosJugador       = 0;
let puntosComputadora   = 0;
let victoriasJugador    = 0;
let victoriasComputador = 0;

// Referencias del Html

const btnNuevo         = document.querySelector('#btnNuevo');
const btnPedir         = document.querySelector('#btnPedir');
const btnDetener       = document.querySelector('#btnDetener');

const puntosHtml       = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasPC      = document.querySelector('#computador-cartas');
const spanVicJugador   = document.querySelector('#victoriasJugador')
const spanVicPC        = document.querySelector('#victoriasComputadora')

// esta funcion crea el deck

const crearDeck = () => {

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
    deck = _.shuffle( deck );
}

crearDeck();


// elegir una carta del deck y eliminarla del mazo

const tomarCarta = () => {

    if ( deck.length === 0 ) {
        throw 'No hay carta en el deck';
    }

    const carta = deck.pop();
    return carta;
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

// turno de la computadora

const turnoPc = ( valorMinimo ) => {

    do {

        const carta = tomarCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHtml[1].innerText = puntosComputadora;
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta')  
        divCartasPC.append( imgCarta )

        // permite detener el ciclo si el valor del jugador es mayor a 21 ya que pierde
        if( valorMinimo > 21 ) {
            break;
        }

    } while ( (puntosComputadora < valorMinimo) && (valorMinimo <= 21) );

    // timeout para permitir a las desplegarse para luego obtener los resultados

    setTimeout(() => {

        if ((puntosJugador > puntosComputadora) && (puntosJugador <= 21) || (puntosComputadora > 21)) {
            alert( 'Felicidades HAS GANADO!' );
            victoriasJugador = victoriasJugador + 1;
            spanVicJugador.innerText = victoriasJugador;
        } else if ((puntosComputadora > puntosJugador) && (puntosComputadora <= 21) || (puntosJugador > 21)) {
            alert( 'Has PERDIDO intentalo de nuevo' );
            victoriasComputador =  victoriasComputador + 1;
            spanVicPC.innerText      = victoriasComputador;
        } else if (puntosComputadora === puntosJugador) {
            alert( 'Ha habido un empate' );
        };

    }, 1000 )

    console.log({ victoriasComputador, victoriasJugador });
}


// eventos

btnNuevo.addEventListener( 'click', () =>{ 
    
    console.clear();
    
    puntosComputadora = 0;
    puntosJugador = 0;

    divCartasJugador.innerHTML = "";
    divCartasPC.innerHTML = "";

    puntosHtml[0].innerText = puntosJugador;
    puntosHtml[1].innerText = puntosComputadora;

    deck = [];
    crearDeck();

    btnPedir.disabled = false;
    btnDetener.disabled = false;

} )

btnPedir.addEventListener('click', () => {

    const carta = tomarCarta();

    puntosJugador = puntosJugador + valorCarta(carta);

    puntosHtml[0].innerText = puntosJugador;

    
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta')  
    divCartasJugador.append( imgCarta );

    
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
    
})

btnDetener.addEventListener('click', () => {

        btnPedir.disabled   = true;
        btnDetener.disabled = true;

        turnoPc( puntosJugador );

});








