/** @jsx React.DOM */
(function () {
  'use strict';
 /*Declaro mi componente llamado Quiz*/
  var Quiz = React.createClass({
    /*propTypes realiza una validacion de tipo, en este caso obligo a data a
      que sea un array y es obligatorio que exista.*/
    propTypes: {
      data: React.PropTypes.array.isRequired
    },
    /*getInitialState es el constructor para ES5, cuando usas ES6 utilizas
    constructor(props), tambien es importante mencionar que state es nuestro
    estado incluyendo los datos que manejamos y los valores de las propiedades
    de dichos datos, dentro del codigo podemos ver funciones como setState
    la cual permite actualizar el estado, propiedades o datos que estemos
    utilizando.*/
    getInitialState: function (){
      /*_.extend es un metodo de underscore.js para copiar propiedades
      de un origen a un destino, los parametros son: destination, *sources */
      return _.extend({
        bgClass: 'neutral',
        showContinue: false,
      }, this.props.data.selectGame());
    },
    /*declaracion de un evento personalizado, o mas bien la logica que debe de
      ejecutarse cuando se le invoque, puede considerarse un handler aunque en
      si el evento BookSelected no existe como tal, sino que se disparara desde
      otro punto al ocurrir uno de los eventos base de JavaScript*/
    handleBookSelected: function(title) {
      var isCorrect = this.state.checkAnswer(title);
      this.setState({
          bgClass: isCorrect ? 'pass' : 'fail',
          showContinue: isCorrect
      });
    },
    handleContinue: function () {
        this.setState(this.getInitialState());
    },
    /*Esta es realmente el evento que se ejecuta cuando el componente tiene
      que pintarse en el cliente, aqui podemos controlar lo que queremos que
      se presente inicialmente al usuario.*/
    render: function () {
      /*Esta sintaxis es conocida como JSX y es una mezcla entre XML y HTML
        todo lo que sea JSX o parte de la programacion del componente y no
        HTML, debe de ir entre llaves, si esta entre llaves significa que
        se reemplazara por el resultado de la ejecucion de la instruccion que
        contenga.*/
        return (<div>
                <div className="row">
                    <div className="col-md-4">
                        <img src={this.state.author.imageUrl} className="authorimage col-md-3" />
                    </div>
                    <div className={"col-md-7"}>
                        {this.state.books.map(function (b) {
                          {/*Aqui estoy retornando una instancia de un componente llamado book
                            y lo estoy configurando en su declaracion, desde luego el componente
                            Book tiene las propiedades definidas en la declaracion que viene abajo
                            Otra cosa relevante es el manejo del evento onBookSelected, el cual
                            esta enlazado a la funcion handleBookSelected de la instancia actual
                            que dispare el evento, por ello la palabra this, para enlazar correctamente
                            el scope.*/}
                            return <Book onBookSelected={this.handleBookSelected} key={b} title={b} />;
                        },this)}
                    </div>
                    <div className={"col-md-1 " + this.state.bgClass} />
                </div>
                {this.state.showContinue ? (
                    <div className="row">
                        <div className="col-md-12">
                          {/*Aqui podemos ver como tambien se enlaza este control input a un handler declarado
                            en el componente, el handler se llama handleContinue y si nos fijamos en la
                            declaracion de dicho handler podemos darnos cuenta que hace un reset del estado
                            de seleccion de la pregunta/respuesta.*/}
                            <input onClick={this.handleContinue} type="button" className="btn btn-primary btn-lg pull-right" value="Siguiente" />
                        </div>
                    </div>) : <span/>
                }
            </div>
            );
    }
  });

  /*Declaro un nuevo componente llamado Book, el cual es utilizado dentro del componente Quiz
    El Quiz o trivia, se basa en libros, lo que presenta son libros como opciones posibles de
    respuesta a la foto que se presenta.*/
  var Book = React.createClass({
      propTypes: {
          title: React.PropTypes.string.isRequired
      },
      handleClick: function () {
        /*Cuando el usuario invoque a la funcion handleClick esto internamente
          invocara a la funcion o evento onBookSelected el cual en la declaracion
          del componente dentro de Quiz podemos ver que esta enlazado a una funcion
          en Quiz llamada handleBookSelected, esto es un encadenamiento de eventos
          o llamadas pero controlando el scope de quien es el responsable de atender
          dicha llamada, por el la utilizacion del this*/
          this.props.onBookSelected(this.props.title);
      },
      render: function () {
        /*Nuevamente un render o presentacion de la UI en el cliente, mezclando el
          HTML con el codigo JavaScript/JSX*/
          return  <div onClick={this.handleClick} className="answer">
                      <h4>{this.props.title}</h4>
                  </div>;
      }
  });

  /*En esta ocasion yo estoy falseando los datos, estoy generando un arreglo de datos
    a mano, pero sin problema alguno, estos datos podrian venir de una llamada Ajax a
    un web service/api*/
  var data = [
      {
          name: 'Carlos Fuentes',
          imageUrl: 'images/autores/CarlosFuentes.jpg',
          books: ['La Muerte de Artemio Cruz', 'Aura', 'Gringo Viejo', 'Terra Nostra', 'La Silla del Aguila']
      },
      {
          name: 'Cuahutemoc Sanchez',
          imageUrl: 'images/autores/CuahutemocSanchez.jpg',
          books: ['Tiempo de Ganar', 'Mientras Respire', 'Juventud en Extasis', 'Sangre de Campeon', 'Un Grito Desesperado']
      },
      {
          name: 'Federico Garcia Lorca',
          imageUrl: 'images/autores/FedericoGarciaLorca.jpg',
          books: ['Romancero Gitano', 'Poeta en Nueva York', 'Poema del Cante Jondo', 'Impresiones y Paisajes']
      },
      {
          name: 'Gabriel Garcia Marquez',
          imageUrl: 'images/autores/GabrielGarciaMarquez.jpg',
          books: ['Cien Años de Soledad','El Amor en Tiempos del Colera', 'Cronica de una Muerte Anunciada', 'El Otoño del Patriarca', 'El Coronel no Tiene Quien le Escriba']
      },
      {
          name: 'Octavio Paz',
          imageUrl: 'images/autores/OctavioPaz.jpg',
          books: ['El Laberinto de la Soledad', 'Piedra del Sol', 'La Llama Doble', 'Vislumbres de la India', 'El Arco y la Lira', 'Aguila o Sol']
      },
      {
          name: 'Pablo Neruda',
          imageUrl: 'images/autores/PabloNeruda.jpg',
          books: ['Veinte Poemas de Amor', 'Cien Sonetos de Amor', 'Canto General', 'Residencia en la Tierra', 'Confieso que he Vivido']
      },
      {
          name: 'Paulo Coelho',
          imageUrl: 'images/autores/PauloCoelho.jpg',
          books: ['El Alquimista', 'Once Minutos', 'Brida', 'Adulterio', 'Veronika Decide Morir', 'El Peregrino']
      },
      {
          name: 'Yordi Rosado',
          imageUrl: 'images/autores/YordiRosado.jpg',
          books: ['SOS Adolscentes fuera de control', 'Renuncio', 'Quiubole con', 'Y miss 15']
      }
  ];

  /*Aqui defino un metodo que configura la instancia del objeto data
    le añade propiedades y metodos que son utilizados mas adelante por
    el Quiz.*/
  data.selectGame = function () {
    /*Utilizando underscore, revuelvo los datos recibidos y retorno una nueva
      copia, de ahi tomo solo los primeros 4 para presentarlos como opciones*/
      var books = _.shuffle(this.reduce(function (p, c, i) {
          return p.concat(c.books);
      }, [])).slice(0,4);

      /*De los libros seleccionados, aleatoriamente tomo uno y sobre el buscare
        a su autor para que esta sea la respuesta.*/
      var answer = books[_.random(books.length-1)];

      /*Retorno un nuevo objeto el cual contiene un subconjunto de los datos
        originalmente recibidos por el servicio/fijos en este caso...
        la idea es que este objeto sera el estado de nuestro quiz, contiene
        los libros que usaremos como opciones y el autor correspondiente a la
        respuesta seleccionada, para que el usuario seleccione alguno de los
        libros que crea que son del autor y entonces chequemos si la seleccione
        fue corrrecta con el metodo checkAnswer.*/
      return {
          books: books,
          author: _.find(this, function (author) {
              return author.books.some(function (title) {
                  return title === answer;
              });
          }),

          checkAnswer: function (title) {
              return this.author.books.some(function (t) {
                  return t === title;
              });
          }
      };
  };

  /*Finalmente rendereamos nuestro componente y le pasamos el valor del objeto
    data a la propiedad data la cual esta validada para que sea solo un arreglo.
    El contenido o la presentacion final de nuestro componente se realizara dentro
    del elemento que tenga el id app en el HTML.*/
  React.renderComponent(<Quiz data={data} />,
      document.getElementById('app'));
})();
