function slider() {
     


  // SLIDER (простой)

  const slider = document.querySelectorAll(".offer__slide"),
  btnPrev = document.querySelector(".offer__slider-prev"),
  btnNext = document.querySelector(".offer__slider-next");
let slideIndex = 1;
const current = document.querySelector("#current");
const total = document.querySelector("#total");

// закоментирую потому что карусель использует тот же HTML

// if (slider.length < 10) {
//   total.textContent = `0${slider.length}`;
// }
// else {
//   total.textContent =  slider.length;
// }

// showSlider(slideIndex)

// function showSlider(n) {
//   if (n > slider.length) {
//     slideIndex = 1;
//   }
//   if (n < 1) {
//     slideIndex = slider.length;
//   }

//   slider.forEach((item) => {
//     item.style.display = `none`;
//   });

//   slider[slideIndex - 1].style.display = `block`;

//   if (slider.length < 10) {
//     current.textContent = `0${slideIndex}`;
//   }
//   else {
//     current.textContent =  slideIndex;
//   }

// };

// function plusSlide(n) {
//   showSlider((slideIndex += n));
// };

// btnPrev.addEventListener("click", () => {
//   plusSlide(-1)
// });

// btnNext.addEventListener("click", () => {
//   plusSlide(1)
// });

// SLIDER (Кврусель мое решение)

// wrapper = document.querySelector(".offer__slider-wrapper"),
//   wrap = document.querySelector(".offer__slider-wrap"),
//   scroll = 0,
//   slideWidth = 650,
//   hidden = `opacity: 0; visibility: hidden;`,
//   show = `opacity: 100%; visibility: visible;`;
// let totalWidth = slider.length * slideWidth;
// wrap.style.cssText = `display:flex; width:${totalWidth}px;transform: translateX(${scroll}px); transition: all 0.7s;`;
// wrapper.style.cssText = `overflow:hidden; width:650px;`;

// moveSlide(scroll);

// if (slider.length < 10) {
//   total.textContent = `0${slider.length}`;
// }
// else {
//   total.textContent =  slider.length;
// }

// function moveSlide(n) {
//   if (-n <= 0) {
//     btnPrev.style.cssText = hidden;
//   } else {
//     btnPrev.style.cssText = show;
//   }
//   if (-n + slideWidth >= totalWidth) {
//     btnNext.style.cssText = hidden;
//   } else {
//     btnNext.style.cssText = show;
//   }
//   if (slider.length < 10) {
//     current.textContent = `0${slideIndex}`;
//   } else {
//     current.textContent = slideIndex;
//   }
//   wrap.style.transform = `translateX(${n}px)`;
// }
// function plusSlide(n, t) {
//   moveSlide((scroll += n), (slideIndex += t));
// }

// btnPrev.addEventListener("click", () => {
//   plusSlide(slideWidth, -1);
// });

// btnNext.addEventListener("click", () => {
//   plusSlide(-slideWidth, 1);
// });

//SLIDER (правильное решение)
(wrapper = document.querySelector(".offer__slider-wrapper")),
  (wrap = document.querySelector(".offer__slider-wrap")),
  (width = window.getComputedStyle(wrapper).width);
let offset = 0;

if (slider.length < 10) {
  total.textContent = `0${slider.length}`;
  current.textContent = `0${slideIndex}`;
} else {
  total.textContent = slider.length;
  current.textContent = slideIndex;
}

wrap.style.width = 100 * slider.length + "%";
wrap.style.display = "flex";
wrap.style.transition = "0.5s all";

wrapper.style.overflow = "hidden";

slider.forEach((item) => (item.style.width = width));

btnNext.addEventListener("click", () => {
  if (offset == +width.slice(0, width.length - 2) * (slider.length - 1)) {
    offset = 0;
  } else {
    offset += +width.slice(0, width.length - 2);
  }
  wrap.style.transform = `translateX(-${offset}px)`;

  if (slideIndex == slider.length) {
    slideIndex = 1;
  } else {
    slideIndex++;
  }

  if (slider.length < 10) {
    current.textContent = `0${slideIndex}`;
  } else {
    current.textContent = slideIndex;
  }

  dots.forEach((dot) => (dot.style.opacity = "0.5"));
  dots[slideIndex - 1].style.opacity = 1;
});

btnPrev.addEventListener("click", () => {
  if (offset == 0) {
    offset = +width.slice(0, width.length - 2) * (slider.length - 1);
  } else {
    offset -= +width.slice(0, width.length - 2);
  }

  if (slideIndex == 1) {
    slideIndex = slider.length;
  } else {
    slideIndex--;
  }

  if (slider.length < 10) {
    current.textContent = `0${slideIndex}`;
  } else {
    current.textContent = slideIndex;
  }
  wrap.style.transform = `translateX(-${offset}px)`;

  dots.forEach((dot) => (dot.style.opacity = "0.5"));
  dots[slideIndex - 1].style.opacity = 1;
});

//добавление булетов

const mainWrap = document.querySelector(".offer__slider");
mainWrap.style.position = "relative";
let dots = [];

const indicators = document.createElement("ol");
indicators.classList.add("carousel-indicators");
indicators.style.cssText = `
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 15;
  display: flex;
  justify-content: center;
  margin-right: 15%;
  margin-left: 15%;
  list-style: none;
`;
mainWrap.append(indicators);

for (let index = 0; index < slider.length; index++) {
  const dot = document.createElement("li");
  dot.setAttribute("data-slide-to", index + 1);
  dot.style.cssText = `
  box-sizing: content-box;
  flex: 0 1 auto;
  width: 30px;
  height: 6px;
  margin-right: 3px;
  margin-left: 3px;
  cursor: pointer;
  background-color: #fff;
  background-clip: padding-box;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  opacity: .5;
  transition: opacity .6s ease;
  `;
  if (index == 0) {
    dot.style.opacity = 1;
  }
  indicators.append(dot);

  dots.push(dot);
}
dots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    const slideTo = e.target.getAttribute("data-slide-to");

    slideIndex = slideTo;
    offset = +width.slice(0, width.length - 2) * (slideTo - 1);

    if (slider.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
    wrap.style.transform = `translateX(-${offset}px)`;

    dots.forEach((dot) => (dot.style.opacity = "0.5"));
    dots[slideIndex - 1].style.opacity = 1;
  });
});
}

module.exports = slider;