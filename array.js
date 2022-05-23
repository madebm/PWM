"use strict";


function WordSearchLogic(gameId, list) {

	//Objeto para contener variables de tablero comunes
	var board = {

		matrix: [], //Array vacÃ­o donde irÃ¡ la matriz
		size: 20 //ancho + alto de la matriz

	};

	//Objeto para contener las propiedades de la palabra actual que se ajusta a la matriz
	var thisWord = {

		viablePaths: [], //array de orientaciones que puede tomar la palabra
		wordFitted: false 
	};

	var wordLocations = {};

	/** setUpGame es una propiedad de WordSearchLogic que inicializa la creaciÃ³n de la
     * matriz de palabras
	 */
	this.setUpGame = function() {

		//crea un array 2D con el tamaÃ±o de placa dado
		board.matrix = createMatrix(board.size);

		//Encaja la lista de palabras en la matriz del tablero
		fitWordsIntoMatrix(list, board.matrix);

	
		fillWithRandomLetters(board.matrix);

	}

	/**Esta funciÃ³n crea una matriz
	 *
	 * @param {Number} size El ancho y alto para crear la matriz
	 * @return un array cuadrado 2D
	 */
	function createMatrix(size) {

		//crear un array de tamaÃ±o de la longitud
		var matrix = new Array(size);

		//establece cada Ã­ndex dentro del array para que sea otro array de tamaÃ±o de la longitud
		for (var i = 0; i < size; i++) {

			matrix[i] = new Array(size);

		}

		return matrix;

	}

	/**Esta funciÃ³n recorre la lista de palabras y las ajusta dentro de la matriz 2D
     *que representa una cuadrÃ­cula de letras de bÃºsqueda de palabras!
	 *
	 * @param {String[][]} wordList Array de palabras para encajar en la matriz
	 * @param {Array[]} matrix encajar las palabras
	 */
	function fitWordsIntoMatrix(wordList, matrix) {

		//recorre filas
		for (var i = 0; i < wordList.length; i++) {

			//recorre las columnas
			for (var j = 0; j < wordList[i].length; j++) {

				//elimina espaciosy apÃ³strofes similares de la palabra
				var trimmedWord = trimWord(wordList[i][j]);

				//intenta 50 veces encajar la palabra en la matriz
				for (var k = 0; thisWord.wordFitted == false && k < 100; k++) {		

					insertWordIntoMatrix(trimmedWord, matrix);	

				}

				//si la palabra no cabe
				if (thisWord.wordFitted == false) {

					//lo elimina de la fila dada de palabras
					wordList[i] = remove(wordList[i], wordList[i][j]);

					//disminuye j para que no salte ninguna palabra (ya que wordList es mÃ¡s pequeÃ±a)
					j--;

				}

				//de lo contrario, configÃºrelo en falso para la prÃ³xima iteraciÃ³n
				else {

					thisWord.wordFitted = false; 

				}	

			}

		}

	}

	/** esta funciÃ³n genera coordenadas aleatorias e intenta verificar rutas vÃ¡lidas la palabra que
	* pueda tomar en esa coordenada
	 *
	 * @param {String} word la palabra para que quepa dentro de la matriz
	 * @param {Array[]} matrix la matriz para encajar la palabra en la
	 */
	function insertWordIntoMatrix(word, matrix) {

		//valor aleatorio de fila y columna
		var randX = getRandomNum(matrix.length);
		var randY = getRandomNum(matrix.length);

		//si el index estÃ¡ vacÃ­o o si el index tiene el valor como letra inicial de la palabra
		if (jQuery.isEmptyObject(matrix[randX][randY]) ||
			matrix[randX][randY] == word.charAt(0)) {

			checkPossibleOrientations(word, matrix, randX, randY);

		}

	}

	/** Encuentra posibles orientaciones que tome la palabra
	 *
	 * (nombres de parÃ¡metros abreviados en aras de la brevedad)
	 *
	 * @param {String} w palabra para encontrar orientaciones vÃ¡lidas en
	 * @param {Array[]} m matriz para encontrar caminos en
	 * @param {Number} x Fila desde la que empieza a buscar caminos
	 * @param {Number} y columna para iniciar la bÃºsqueda de ruta desde
	 */
	function checkPossibleOrientations(w, m, x, y) {

		/** convierte los nombres de las propiedades de los objetos en un array y recorre todos los nombres de las propiedades
		* en la secciÃ³n forEach()
		 *
		 * @param {String} i el nombre de la propiedad en el index en particular
		 */
		Object.keys(paths).forEach(function(i) {

			//comprueba si la orientaciÃ³n se ajusta usando el nombre de propiedad (i) en el objeto de rutas
			doesOrientationFit(w, m, x, y, paths[i]);

		});

		//si se encontraron direcciones vÃ¡lidas para la palabra
		if (thisWord.viablePaths.length != 0) {

			//elegir al azar una ruta para colocar la palabra en
			var randIndex = getRandomNum(thisWord.viablePaths.length);
			var finalOrientation = thisWord.viablePaths[randIndex];

			//vaciar el array de caminos posibles
			thisWord.viablePaths = [];

			/** agregue la coordenada x, la coordenada y, y la ruta final la palabra
			* tomarÃ¡ en WordLocations (una referencia Ãºtil para saber dÃ³nde estÃ¡n todos los
			* las palabras son)
			 */
			wordLocations[w] = {x: x, y: y, p: finalOrientation};

			//finalmente establece la palabra dentro de la matriz
			setWordIntoMatrix(w, m, x, y, finalOrientation);

		}

	}
	
	/** coloca correctamente la palabra dada en el array de la sopa de letras
	 *
	 * @param {String} w palabra para establecer
	 * @param {Array[]} m matriz para poner la palabra en
	 * @param {Number} x fila para empezar a colocar la palabra de
	 * @param {Number} y columna para empezar a colocar la palabra de
	 * @param {String} p camino que sigue la palabra
	 */
	function setWordIntoMatrix(w, m, x, y, p) {

		/** variables inicializadas: k - para longitud de palabra
		* x - para fila de matriz
		* y - para columna de matriz
		*
		* condiciones: k - menos que la longitud total de la palabra
		* x & y - permanecer dentro de los lÃ­mites recomendados para la orientaciÃ³n p
		*
		* incrementos: k incrementado en 1,
		* x e y incrementados por valores determinados para la ruta p dentro
		* objeto 'incr'
		 */
		for (var k = 0, x, y; k < w.length; k++, x = incr[p](x, y).x, y = incr[p](x, y).y) {

			m[x][y] = w.charAt(k); //establece el index como el carÃ¡cter respectivo

		}

		//establece si la palabra se ajusta o no a verdadero
		thisWord.wordFitted = true;

	}

	/** comprueba si la palabra dada cabe dentro de la matriz con la orientaciÃ³n pasada
	 *
	 * @param {String} w palabra para comprobar
	 * @param {Array[]} m matriz para contrastar
	 * @param {Number} x fila inicial
	 * @param {Number} y columna inicial
	 * @param {String} p orientaciÃ³n o ruta a comprobar
	 */
	function doesOrientationFit(w, m, x, y, p) {

		//cuantas letras caben
		var letterCount = 0;

		//variable para almacenar la longitud de la palabra
		var wl = w.length;

		//variable para almacenar la longitud de la matriz
		var ml = m.length;

	
		for (var k = 0, x, y; k < wl && bounds[p](x, y, ml); k++, x = incr[p](x, y).x, y = incr[p](x, y).y) {

	
			if (jQuery.isEmptyObject(m[x][y]) ||
				m[x][y] == w.charAt(k)) {

				letterCount++;

			}

		}


		if (letterCount == wl) {

		
			thisWord.viablePaths.push(p);

		}

	}

	
	function fillWithRandomLetters(matrix) {

	
		for (var i = 0; i < matrix.length; i++ ) {

			for (var j = 0; j < matrix[i].length; j++) {

			
				if (jQuery.isEmptyObject(matrix[i][j])) {

			
					matrix[i][j] = String.fromCharCode(65 + Math.random()*26);

				}

			}

		}

	}


	
	function remove(array, indexElement) {

		return array.filter(i => i !== indexElement);

	}


	function getRandomNum(bound) {

		return Math.floor(Math.random()*(bound));

	}
	
	function trimWord(word) {

		return word.replace(/\W/g, "");

	}


	this.getMatrix = function() {

		return board.matrix;

	}


	this.getWordLocations = function() {

		return wordLocations; 

	}
	
	this.getListOfWords = function() {

		return list;

	}

}