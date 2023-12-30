var { playerChoice, computerChoice } = newFunction();
var playerPuntos = 0;
var computerPuntos = 0;

function newFunction() {
  var playerChoice;
  let computerChoice;
  return { playerChoice, computerChoice };
}

var options = document.querySelectorAll('.option');
options.forEach(function(option) {
    option.addEventListener('click', function() {
        
        options.forEach(function(otherOption) {
            otherOption.classList.remove('selected');
            document.getElementById("selection").cloneNode().play();
        });

        this.classList.add('selected');
    });
});

    function selectOption(option) {
      playerChoice = option;
      document.getElementById('result').innerHTML = '';

    }


    // Recupera los puntos del localStorage al cargar la página
var storedPlayerPuntos = localStorage.getItem('playerPuntos');
var storedComputerPuntos = localStorage.getItem('computerPuntos');

// Asigna los puntos recuperados o establece el valor predeterminado (0 si es la primera vez)
playerPuntos = storedPlayerPuntos ? parseInt(storedPlayerPuntos) : 0;
computerPuntos = storedComputerPuntos ? parseInt(storedComputerPuntos) : 0;

// Actualiza el marcador en la página
document.getElementById('result').innerHTML = `Jugador: ${playerChoice}<br>Computadora: ${computerChoice}<br>Resultado: ${result}`;

    function play() {
      if (!playerChoice) {
        alert('Por favor, elige una opción antes de jugar.');
        return;
      }

      const options = ['Piedra', 'papel', 'Tijeras'];
      computerChoice = options[Math.floor(Math.random() * options.length)];

      const result = getResult(playerChoice, computerChoice);

      document.getElementById('result').innerHTML = `Jugador: ${playerChoice}<br>Computadora: ${computerChoice}<br>Resultado: ${result}`;

      if(result=="Ganaste"){
        playerPuntos++;
      }else if(result == "Perdiste"){
        computerPuntos++;
      }

      document.getElementById('score').innerHTML = `<h3>Jugador: ${playerPuntos}</h3>`+`<h3>Computadora: ${computerPuntos}</h3>`;
      localStorage.setItem('playerPuntos', playerPuntos);
      localStorage.setItem('computerPuntos', computerPuntos);

      if(result==="Ganaste"){
          document.getElementById('result').style.background="green";
          document.getElementById("winSound").play();
        }else if(result==="Perdiste"){
          document.getElementById('result').style.background="red";
          document.getElementById("gameover").play();
        }else if(result==="Empate"){
          document.getElementById('result').style.background="blue";
        }
    }

    function animation(){
      if (!playerChoice) {
        alert('Por favor, elige una opción antes de jugar.');
        return;
      }

      let piedra = document.querySelector("#Piedra");
      let papel = document.querySelector("#papel");
      let tijeras = document.querySelector("#Tijeras");


      if('Piedra'===playerChoice){
        papel.style.animation = "fade 1s";
        tijeras.style.animation = "fade 1s";
      }else if('Tijeras'===playerChoice){
        papel.style.animation = "fade 1s";
        piedra.style.animation = "fade 1s";
      }else{
        tijeras.style.animation = "fade 1s";
        piedra.style.animation = "fade 1s";
      }


      document.querySelector(".option-pc").style.transform= "scale(1.6)";
      document.querySelector(".option2").style.transform= "scale(1.6)";
      document.querySelector(".option2").style.animationPlayState= "running";
      setTimeout(function(){
        tijeras.style.display = "none";
        piedra.style.display = "none";
        papel.style.display= "none";
        document.querySelector("#"+playerChoice).style.display="flex";
        document.querySelector("#options").style.justifyContent= "center"; 

      },1000)


      setTimeout(function(){
        play();
        document.querySelector(".option-pc").style.display="none";
        document.querySelector(`#${computerChoice}2`).style.display="flex";
        document.querySelector(".reboot").style.display="flex";
        document.querySelector(".jugarbtn").style.display="none";
        
        console.log(getResult(playerChoice,computerChoice));

      },3000)

    }

    function getResult(player, computer) {
      if (player === computer) {
        return 'Empate';
      } else if (
        (player === 'Piedra' && computer === 'Tijeras') ||
        (player === 'papel' && computer === 'Piedra') ||
        (player === 'Tijeras' && computer === 'papel')
      ) {
        return 'Ganaste';
      } else {
        return 'Perdiste';
      }
    }
