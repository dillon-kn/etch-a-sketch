/*
TODO:
    Implement onclick color change
    Implement reset on resolution change
    Implement Reset
    Implement eraser vs draw mode
*/

let mode = 'DRAW';
let mouseDown = false;
document.body.onmousedown = () => {
    mouseDown = true;
}
document.body.onmouseup = () => {
    mouseDown = false;
}

const initSliderLabel = () => {
    const sliderValue = document.querySelector(".slider").value;
    const sliderLabel = document.querySelector('.slider-label')


    sliderLabel.textContent = `${sliderValue} x ${sliderValue}`;
}


const updateSliderLabel = () => {
    // On change of slider value, modify the slider label
    const slider = document.querySelector(".slider");
    const sliderLabel = document.querySelector('.slider-label')

    slider.addEventListener('input', (e) => {
        sliderLabel.textContent = `${e.target.value} x ${e.target.value}`;
    })
}

const configureGrid = (resolution) => {
    // Create the CSS grid
    const gridContainer = document.querySelector('.container');

    // Delete any divs that are in there
    gridContainer.innerHTML = '';

    // Create a resolution x resolution grid
    for (let i = 0; i < (resolution ** 2); i++) {
        const pixel = document.createElement('div');
        gridContainer.appendChild(pixel);
    }

    // Properly arrange the divs
    gridContainer.setAttribute('style', `grid-template-columns: repeat(${resolution}, 1fr); grid-template-rows: repeat(${resolution}, 1fr);`)

    // Set mode to draw
    mode = "DRAW";

    // Reapply etch a sketch to new grid
    applyEtchASketch();    
}

const updateResolution = () => {
    const slider = document.querySelector('.slider');
    slider.addEventListener('input', (e) => {
        configureGrid(+e.target.value)
        
        // Reapply etch a sketch to new grid
        applyEtchASketch();
    })
}

const applyEtchASketch = () => {
    const gridContainer = document.querySelector('.container');
    const pixels = gridContainer.childNodes;

    pixels.forEach((pixel) => {
        pixel.addEventListener('mouseover', updateColor)
        pixel.addEventListener('click', updateColor)
    })
}

const updateColor = (e) => {
    if ((mouseDown && e.type === 'mouseover') || e.type === 'click') {

        if (mode === 'DRAW') {
            e.target.classList.add('colored');
        }
        else if (mode === 'ERASE') {
            e.target.classList.remove('colored');
        }
    }
}

const updateMode = () => {
    const drawButton = document.querySelector('.draw');
    const eraseButton = document.querySelector('.erase');
    
    drawButton.addEventListener('click', () => {mode = 'DRAW'})
    eraseButton.addEventListener('click', () => {mode = 'ERASE'})
}

const setResetEventListener = () => {
    const resetButton = document.querySelector('.reset');

    resetButton.addEventListener('click', () => {
        const sliderValue = document.querySelector('.slider').value
        configureGrid(sliderValue)
    })
}

const main = () => {
    // Create the CSS Grid with an initial value of whatever the slider range value is
    configureGrid(document.querySelector('.slider').value);

    // Initialize slider label
    initSliderLabel();
    
    // Create event listener to update slider label
    updateSliderLabel();

    // Create event listener for updating canvas resolution
    updateResolution();

    // Create event listener for draw vs erase mode
    updateMode();

    // Create event listener for reset button
    setResetEventListener();

    // Event listener for each "pixel" in canvas
    applyEtchASketch();
}

main()