let size = 52;
let penColor = '#000000';
let penColorTemp = '#000000';
let screenColor = '#ffffff';
let state = 'off';
let rubber = 'off';
let rainbow = 'off';
let opacity = 'off';
let random = 'off';

let opac = document.querySelector('.opacity');
opac.addEventListener('click', toggleOpacity);

let erase = document.querySelector('.eraser');
erase.addEventListener('click',toggleErase);

let clear = document.querySelector('.clear');
clear.addEventListener('click',createGrid);

let rain = document.querySelector('.rainbow');
rain.addEventListener('click',toggleRain);

let togRandom = document.querySelector('.random');
togRandom.addEventListener('click',toggleRandom);

function toggleRandom(){
    if(random == 'off'){
        random = 'on';
        rainbow = 'off';
    }else if(random == 'on'){
        random = 'off';
    }
}

function toggleOpacity(){
    if(opacity == 'off'){
        opacity = 'on';
        setOpacity();
    }else if(opacity == 'on'){
        opacity = 'off';
    }
}

function toggleRain(){
    if(rainbow == 'off'){
        rainbow = 'on';
        random = 'off';
    } else if (rainbow == 'on'){
        rainbow = 'off';
    }
}


function toggleErase(){
    if(rubber == 'off'){
        rubber = 'on';
        penColor = screenColor;
        
    } else if (rubber == 'on'){
        rubber = 'off';
        penColor = penColorTemp;
    }
}


function createGrid(){
    container = document.querySelector('.screen')
    container.replaceChildren();
    container.style.gridTemplateColumns = `repeat(${size},1fr)`;
    for(let i = 0; i < (size * size); i++){
        rowDiv = document.createElement('div');
        rowDiv.className = `row${i + 1}`;
        rowDiv.classList.add(`grid-item`);
        container.appendChild(rowDiv);
        rowDiv.style.backgroundColor = screenColor;
    }
    if(state == 'off'){
        addListeners();
        removeListeners();
    }else if( state = 'on'){
        addListeners();
    }
}



function generateRandomColor(){
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    color.value = `#${randColor.toUpperCase()}`;
    console.log(color.value)
    return `#${randColor.toUpperCase()}`
}

function incrementColor(){
    let temp = penColor.substring(1)
    temp = parseInt(temp, 16);
    if (isNaN(temp)) { temp = 0; }
    if(temp > 4294967295){temp = 0;};
    if (temp < 0)
    {
      temp = 0xFFFFFFFF + temp + 1;
    }
    temp = temp + 100;
    
    penColor = temp.toString(16);
    penColor = penColor.padStart(6,0);  
    penColor = `#${penColor.toUpperCase()}`
}


let screen = document.querySelector('.screen')
screen.addEventListener('click',function(){
    if(state == 'on'){
        removeListeners();
    }else if (state == 'off'){
        addListeners();
    }
});

function ChangeColor(){
    if(opacity == 'on'){
        this.style.opacity = +this.style.opacity + 0.1;
    }else if(opacity == 'off'){
        this.style.opacity = 1;
    }
    if(rainbow == 'on' && rubber == 'off'){
        incrementColor();
        this.style.backgroundColor = penColor;    
    }else if(rainbow == 'off'){
    this.style.backgroundColor = penColor;
    }
    if(random == 'on' && rubber == 'off'){
        this.style.backgroundColor = generateRandomColor();
    }
    color.value = penColor;
}

function addListeners(){
    rowDiv = document.querySelectorAll('.grid-item');
    for(let i = 0; i < rowDiv.length; i++){
        
        rowDiv[i].addEventListener('mouseover', ChangeColor);
    }
    screen.style.cursor = 'crosshair'
    state = 'on';
}

function removeListeners(){
    rowDiv = document.querySelectorAll('.grid-item');
    for(let i = 0; i < rowDiv.length; i++){
        rowDiv[i].removeEventListener('mouseover', ChangeColor);
    }
    screen.style.cursor = 'default'
    state = 'off'
}

function setOpacity(){
    rowDiv = document.querySelectorAll('.grid-item');
    for(let i = 0; i < rowDiv.length; i++){
        if(rowDiv[i].style.backgroundColor == screenColor){
        rowDiv[i].style.opacity = 0;
        }
    }
}

let color = document.querySelector('.picker');
color.oninput = function(){
    penColor = this.value;
    penColorTemp = this.value;
    random = 'off';
}
let screnColor = document.querySelector('.screenPicker');
screnColor.oninput = function(){
    screenColor = this.value;
    createGrid();
}

var slider = document.getElementById("myRange");
slider.oninput = function() {
    size = this.value;
    createGrid();
  }
createGrid();
