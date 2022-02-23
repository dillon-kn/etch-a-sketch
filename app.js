/*
TODO:
    Implement onclick color change
    Implement reset on resolution change
    Implement Reset
    Implement eraser vs draw mode
*/

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
        pixel.setAttribute('style', 'border: 1px solid black; border-collapse: true;')
        gridContainer.appendChild(pixel);
    }

    // Properly arrange the divs
    gridContainer.setAttribute('style', `grid-template-columns: repeat(${resolution}, 1fr); grid-template-rows: repeat(${resolution}, 1fr);`)
}

const updateResolution = () => {
    const slider = document.querySelector('.slider');
    const gridContainer = document.querySelector('.container');

    slider.addEventListener('input', (e) => {
        configureGrid(+e.target.value)
    })
}

const applyEtchASketch = () => {

}

const main = () => {
    // Create the CSS Grid with an initial value of 30
    configureGrid(30);
    
    // Create event listener to update slider label
    updateSliderLabel();

    // Create event listener for updating canvas resolution
    updateResolution();

    // Create event listener for draw vs erase mode

    // Create event listener for reset button

    // Event listener for each "pixel" in canvas
    applyEtchASketch();
}

main()