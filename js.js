
function punto1()
{
    var nombre = prompt("Como te llamas?");
      var edad = prompt("Cuantos años tienes?");
      var edad1 = parseInt(edad) + 1;

      if (!isNaN(edad)) {
        console.log(
          "Hola ",
          nombre,
          " tienes ",
          edad,
          " años y el año que viene tendrás ",
          edad1,
          " años"
        );

        alert("Hola ",
        nombre,
        " tienes ",
        edad,
        " años y el año que viene tendrás ",
        edad1,
        " años");
      }
}


function punto2()
{
var figura = parseInt( prompt("Ingrese la figura que desea calcular el area: 1. Triangulo - 2. Rectangulo - 3. Circulo  "));
switch (figura) {
    case 1:
      var base = parseFloat(prompt("Ingrese la base del triangulo (cm)"));
      var altura = parseFloat( prompt("Ingrese la altura del triangulo (cm)"));

      var area = (base * altura) / 2;

      console.log("El area del triangulo es: ", area,  " cm^2");
      alert("El area del triangulo es: "+ area+ " cm^2");
      break;

    case 2:
      var base = parseFloat(prompt("Ingrese la base del Rectangulo (cm)"));
      var altura = parseFloat(prompt("Ingrese la altura del Rectangulo (cm)"));

      var area = base * altura;

      console.log("El area del Rectangulo es: ", area, " cm^2");
      alert("El area del Rectangulo es: "+area+ " cm^2");
      break;

    case 3:
      var radio = parseFloat(prompt("Ingrese el radio del circulo (cm)"));

      var area = Math.PI * Math.pow(radio, 2);

      console.log("El area del circulo es: ", area,  " cm^2");
      alert("El area del circulo es: "+ area+ " cm^2");
      break;
  }
}


 

function muestra(cnombre)
{
    var nombre=cnombre.value;
    const vocal = nombre.match(/[aeiou]/gi).length;
    const consonante = nombre.match(/[bcdfghjklmnpqrstvwxyz]/gi).length;
    const longitud = nombre.match(/[abcdefghijklmnopqrstuvwxyz]/gi).length;
        console.log("Vocales: "+vocal+"\nConsonantes: "+consonante+"\nlongitud: "+longitud);
        alert("Vocales: "+vocal+"\nConsonantes: "+consonante+"\nlongitud: "+longitud);
        cnombre.value="";
        cnombre.focus();
}



    function punto3()
    {
        let numero = parseInt(prompt('Introduce un número'))
        var cad=""
            for(let i=1; i<=numero; i++){
                if(i%2==0){
                    cad=cad+i+" es par\n"
                }else{
                    cad=cad+i+" es impar\n"
                }
            }
            alert(cad);
    }

    function punto4()
    {
            let numero1 = parseInt(prompt('Introduce un número'))
            let divisores = 0

            if (numero1 === 1) alert('El número no es válido')
            else {

                for (let i = 2; i < numero1; i++) {
                    if (numero1 % i == 0) {
                        alert(`${numero1} / ${i} = ${numero1 / i} No es primo`)
                        divisores++
                        break
                    }
                }
            }

            if(divisores==0) alert(`${numero1} es primo`);
    }  
    function punto5()
    {
            let num = parseInt(prompt('Introduce un número'))
            let result=1

            for(let i = num; i>1; i--){
                result *= i
            }

            alert(`El factorial de ${num} es ${result}`)
    }  
    function punto6()
    {
                let suma=0
                let cont=0

                while(suma<=50){
                    suma += parseInt(prompt('Introduce un número para añadir a la suma'))
                    cont++
                }

                alert(`La suma total es de: ${suma}`);
                alert(`El total de números introducidos es: ${cont}`);
    }  
    function punto7()
    {
           const numbers = [3,43,21,20,56]
            let pares = []
            let impares = []

            for(const number of numbers){
                let random = Math.round(Math.random() * 10 + 1)
                const result = number * random

                alert(`${number} x ${random} = ${result}`);
                if(result % 2 == 0){
                    pares.push(result)
                }else{
                    impares.push(result)
                }
            }

            alert(pares);
            alert(impares);
    } 

    function punto8()
    {
            const letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T']

            const dni = prompt('Introduce tu DNI')

            if(dni.length==8 && parseInt(dni)>0){
                let letra = dni%23
                alert(`Tu DNI completo es ${dni}${letras[letra]}`);
        }
    }   


    function array()
    {
    let colores=["azul", "amarillo", "rojo", "verde", "rosa"];
    let age = prompt ('Escribe un color');
    var color="";
    var i=0;

    for(var i=0; i<colores.length; i++)
    {
        if(colores[i]==age)
        {
            color="si"; 
            break;       
        }
        else{
            color="no";
        }
    }
    
    if(color=="si")
    {
        alert("El color SI se encuentra en el array");
    }
    else{
        alert("El color NO se encuentra en el array");
    }
    
}

    





   

  
