const buttonOpen = document.querySelector(".main___filter__button");
const buttonClose = document.querySelector(".button__close");
const filterbackButton = document.querySelector(".filter__back__button");
const backdrop = document.querySelector(".backdrop");

buttonOpen.addEventListener("click", toggleBackdrop);
buttonClose.addEventListener("click", toggleBackdrop);
filterbackButton.addEventListener("click", toggleBackdrop);

function toggleBackdrop() {
  backdrop.classList.toggle("is-open");
}

//===========Slider==============
function getVals() {
  const sliderStart = document.querySelector(".start");
  const sliderEnd = document.querySelector(".end");
  const parent = this.parentNode;
  const slides = parent.getElementsByTagName("input");
  const slide1 = parseFloat(slides[0].value);
  const slide2 = parseFloat(slides[1].value);

  if (slide1 > slide2) {
    const tmp = slide2;
    slide2 = slide1;
    slide1 = tmp;
  }

  sliderStart.value = slide1;
  sliderEnd.value = slide2;
}

window.onload = function () {
  const sliderSections = document.getElementsByClassName("range-slider");
  for (let x = 0; x < sliderSections.length; x++) {
    const sliders = sliderSections[x].getElementsByTagName("input");
    for (let y = 0; y < sliders.length; y++) {
      if (sliders[y].type === "range") {
        sliders[y].oninput = getVals;
        sliders[y].oninput();
      }
    }
  }
};
