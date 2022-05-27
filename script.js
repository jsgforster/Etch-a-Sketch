let size = 52;
let penColor = '#000000';
let penColorTemp = '#000000';
let screenColor = '#ffffff';
let state = 'off';
let rubber = 'off';
let rainbow = 'off';
let opacity = 'off';
let random = 'off';
let totalBackground = '#f9382273';
let totalBackground2 = '#FDD20EFF'

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

let reset = document.querySelector('.reset');
reset.addEventListener('click',doReset);

function doReset(){
     size = 52;
     penColor = '#000000';
     penColorTemp = '#000000';
     screenColor = '#ffffff';
     state = 'off';
     rubber = 'off';
     rainbow = 'off';
     opacity = 'off';
     random = 'off';
     createGrid();
     document.querySelector('body').style.backgroundColor = totalBackground;
     document.querySelector('.eraser').classList.remove('buttonAfter');
     document.querySelector('.rainbow').classList.remove('buttonAfter');
     document.querySelector('.random').classList.remove('buttonAfter');
     document.querySelector('.opacity').classList.remove('buttonAfter');
     document.querySelector('.rubber').classList.remove('buttonAfter');
}

function toggleRandom(){
    if(random == 'off'){
        random = 'on';
        rainbow = 'off';
        document.querySelector('.random').classList.add('buttonAfter');
        document.querySelector('.rainbow').classList.remove('buttonAfter');
    }else if(random == 'on'){
        random = 'off';
        document.querySelector('.random').classList.remove('buttonAfter');
    }
}

function toggleOpacity(){
    if(opacity == 'off'){
        opacity = 'on';
        document.querySelector('.opacity').classList.add('buttonAfter');
        setOpacity();
    }else if(opacity == 'on'){
        opacity = 'off';
        document.querySelector('.opacity').classList.remove('buttonAfter');
    }
}

function toggleRain(){
    if(rainbow == 'off'){
        rainbow = 'on';
        random = 'off';
        document.querySelector('.random').classList.remove('buttonAfter');
        document.querySelector('.rainbow').classList.add('buttonAfter');
    } else if (rainbow == 'on'){
        rainbow = 'off';
        document.querySelector('.rainbow').classList.remove('buttonAfter');
    }
}


function toggleErase(){
    if(rubber == 'off'){
        rubber = 'on';
        //penColor = screenColor;
        document.querySelector('.eraser').classList.add('buttonAfter');
    } else if (rubber == 'on'){
        rubber = 'off';
        //penColor = penColorTemp;
        document.querySelector('.eraser').classList.remove('buttonAfter');
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
let body = document.querySelector('body')
screen.addEventListener('click',function(){
    if(state == 'on'){
        removeListeners();
        body.style.backgroundColor = totalBackground;

    }else if (state == 'off'){
        addListeners();
        body.style.backgroundColor = totalBackground2;
    }
});

function ChangeColor(){
    if(opacity == 'on' && rubber == 'off'){
        this.style.opacity = +this.style.opacity + 0.2;
    }else if(opacity == 'off' || rubber == 'on'){
        this.style.opacity = 1;
    }
    if(rainbow == 'on' && rubber == 'off'){
        incrementColor();
        this.style.backgroundColor = penColor;    
    }else if(rainbow == 'off' && rubber == 'off'){
    this.style.backgroundColor = penColor;
    }
    if(random == 'on' && rubber == 'off'){
        this.style.backgroundColor = generateRandomColor();
    }
    if(rubber == 'on'){
        this.style.backgroundColor = screenColor;
    }
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

let slider = document.getElementById("myRange");
slider.oninput = function() {
    size = this.value;
    createGrid();
  }
createGrid();

let color_picker = document.querySelector(".picker");
let color_picker_wrapper = document.querySelector(".picker-wrapper");
color_picker.onchange = function() {
	color_picker_wrapper.style.backgroundColor = color_picker.value;    
}
color_picker_wrapper.style.backgroundColor = color_picker.value;

let color_picker1 = document.querySelector(".screenPicker");
let color_picker_wrapper1 = document.querySelector(".picker-wrapper1");
color_picker.onchange = function() {
	color_picker_wrapper1.style.backgroundColor = color_picker1.value;    
}
color_picker_wrapper1.style.backgroundColor = color_picker1.value;

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
