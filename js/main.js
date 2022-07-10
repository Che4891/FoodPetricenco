window.addEventListener("DOMContentLoaded", () => {
  //TABS
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParant = document.querySelector(".tabheader__items");

  function hideTabsContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }
  function showTabsContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }
  hideTabsContent();
  showTabsContent();

  tabsParant.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target === item) {
          hideTabsContent();
          showTabsContent(i);
        }
      });
    }
  });

  // TIMER

  const deadline = "2022-08-20";

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  // MODAL WINDOW

  const modalCloseBtn = document.querySelector("[data-close]");
  const modal = document.querySelector(".modal");
  const modalOpen = document.querySelectorAll("[data-modal]");

  function openModal() {
    modal.classList.toggle("show");
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = 16 + "px";
    clearInterval(modalTimerId);
  }
  function closeModal() {
    modal.classList.toggle("show");
    document.body.style.overflow = "";
    document.body.style.paddingRight = 0 + "px";
  }
  modalOpen.forEach((item) => {
    item.addEventListener("click", openModal);
  }),
    modalCloseBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      closeModal();
    }
  });
  // setting modal window

  const modalTimerId = setTimeout(openModal, 3000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);
});

//Создаем карточки через Class

class ProductCard {
  constructor( img, alt, title, description, price, perentSelector) {
    this.price = price;
    this.alt = alt;
    this.title = title;
    this.description = description;
    this.img = img;
    this.perent = document.querySelector(perentSelector)
    this.transfer = 27;
    this.changeUa()
  }
  changeUa() {
    this.price = +this.price * this.transfer;
  }
  render() {
    const element = document.createElement('div')
    element.innerHTML = `<div class="menu__item">
    <img src=${this.img} alt=${this.alt} />
    <h3 class="menu__item-subtitle">${this.title}</h3>
    <div class="menu__item-descr">
    ${this.description}
    </div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
      <div class="menu__item-cost">Цена:</div>
      <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
    </div>
  </div>`
    this.perent.append(element)
  }
}

new ProductCard('img/tabs/vegy.jpg', 'elite', 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 9, '.menu .container').render()


new ProductCard('img/tabs/post.jpg', 'post', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 9, '.menu .container').render()

new ProductCard('img/tabs/vegy.jpg', 'vegy', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 20, '.menu .container').render() // тоже что записать const div = new ProductCard; div.render()


//Мой способ он не нужен

// let cards = [
//   {
//     img: 'img/tabs/vegy.jpg" alt="vegy',
//     alt: "vegy",
//     title: 'Меню "Фитнес"',
//     description:
//       'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
//     price: "229",
//   },
//   {
//     img: "img/tabs/elite.jpg",
//     alt: "elite",
//     title: "Меню “Премиум”",
//     description:
//       "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
//     price: "550",
//   },
//   {
//     img: "img/tabs/post.jpg",
//     alt: "post",
//     title: 'Меню "Постное"',
//     description:
//       "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
//     price: "430",
//   },
// ];

// function cardList(cards) {
//   const wrapper = document.querySelector(".menu__field");
//   const container = wrapper.querySelector(".container");

//   for (let card of cards) {
//     container.insertAdjacentHTML(
//       "beforeend",
//       `<div class="menu__item">
//     <img src="${card.img}" alt="${card.alt}" />
//     <h3 class="menu__item-subtitle">${card.title}"</h3>
//     <div class="menu__item-descr">
//     ${card.description}
//     </div>
//     <div class="menu__item-divider"></div>
//     <div class="menu__item-price">
//       <div class="menu__item-cost">Цена:</div>
//       <div class="menu__item-total"><span>${card.price}</span> грн/день</div>
//     </div>
//   </div>`
//     );
//   }
// }

// cardList(cards);
