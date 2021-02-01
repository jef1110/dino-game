const dino = document.querySelector('.dino');
const background = document.querySelector('.fundo');
let isJumping = false;
let position = 0;


function handleKeyUp(event){
    if(event.keyCode === 32){
        if(!isJumping){
          jump();
          let audio = new Audio('../audios/jump.mp3');
            audio.addEventListener('canplaythrough', function() {
            audio.play();
});
        }        
    }
}

function jump(){    
    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 225){
            clearInterval(upInterval);
            //descendo
            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                }else{
                    position -= 10;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        }else{
            //subindo
            position += 30;
            dino.style.bottom = position + 'px';
       }
    }, 20);
}

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.floor(Math.random() * 6000);

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {       
        if(cactusPosition <-60){
           clearInterval(leftInterval); 
           background.removeChild(cactus);     
        }else if (cactusPosition > 0 && cactusPosition < 80 && position < 60){
            //Game Over
            clearInterval(leftInterval);
            document.body.innerHTML = '<input type="button" value="Jogar novamente" class="game-over" onClick="window.location.reload()">'
            
            
            let audio = new Audio('../audios/game-over.wav');
            audio.addEventListener('canplaythrough', function() {
            audio.play();              
            
});
        }else{        
           cactusPosition -= 10;
           cactus.style.left = cactusPosition + 'px';
        }
    }, 35);

    setTimeout(createCactus, randomTime);
}

function recarregar(){
    window.location.reload(); 
}
     
createCactus();
document.addEventListener('keyup', handleKeyUp); 
         