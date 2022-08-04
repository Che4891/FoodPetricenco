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

  const modalOpenBtn = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

  modalOpenBtn.forEach((item) => {
    item.addEventListener("click", openModal);
  });

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
    document.body.style.paddingRight = 0 + "px";
  }

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = 16 + "px";
    clearInterval(modalTimerId);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });
  // setting modal window

  const modalTimerId = setTimeout(openModal, 30000);

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

  //Создаем карточки через Class

  class ProductCard {
    constructor(
      img,
      alt,
      title,
      description,
      price,
      perentSelector,
      ...classes
    ) {
      this.price = price;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.img = img;
      this.classes = classes;
      this.perent = document.querySelector(perentSelector);
      this.transfer = 27;
      this.changeUa();
    }
    changeUa() {
      this.price = +this.price * this.transfer;
    }
    render() {
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        element.classList.add("menu__item");
      } else {
        this.classes.forEach((clasName) => element.classList.add("menu__item"));
      }
      element.innerHTML = `<img src=${this.img} alt=${this.alt} />
    <h3 class="menu__item-subtitle">${this.title}</h3>
    <div class="menu__item-descr">
    ${this.description}
    </div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
      <div class="menu__item-cost">Цена:</div>
      <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
    </div>`;
      this.perent.append(element);
    }
  }

  const getResource = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  // get запрос через axios (нам не нужно всего что мы делали в getResource, тоесть не нужно fetch и т. д.)

  axios.get("http://localhost:3000/menu").then((data) => {
    data.data.forEach(({ img, altimg, title, descr, price }) => {
      new ProductCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });

  // getResource("http://localhost:3000/menu").then((data) => {
  //   //  data.forEach((obj )=> { // обичный формат
  //   //    new ProductCard(obj.img, obj.alt, obj.title, obj.description, obj.price, obj.classes).render();
  //   //  })
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     // Делаем деструктаризацию тоесть сразу раскрываем обект который пришол в data с помощью {} скобок
  //     new ProductCard(
  //       img,
  //       altimg,
  //       title,
  //       descr,
  //       price,
  //       ".menu .container"
  //     ).render();
  //   }); // вытягиваем даннве с сервера и этим заменяем тот статисный код что в низу
  // });

  // new ProductCard(
  //   "img/tabs/vegy.jpg",
  //   "elite",
  //   'Меню "Фитнес"',
  //   'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  //   9,
  //   ".menu .container"
  // ).render();

  // new ProductCard(
  //   "img/tabs/post.jpg",
  //   "post",
  //   'Меню "Премиум"',
  //   "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
  //   9,
  //   ".menu .container",
  //   "menu__item"
  // ).render();

  // new ProductCard(
  //   "img/tabs/vegy.jpg",
  //   "vegy",
  //   'Меню "Постное"',
  //   "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
  //   20,
  //   ".menu .container",
  //   "menu__item"
  // ).render(); // тоже что записать const div = new ProductCard; div.render()

  //Мой способ он не нужен

  // getResource("http://localhost:3000/menu").then((data) => {
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     const wrapper = document.querySelector(".menu__field");
  //     const container = wrapper.querySelector(".container");

  //       container.insertAdjacentHTML(
  //         "beforeend",
  //         `<div class="menu__item">
  //     <img src="${img}" alt="${altimg}" />
  //     <h3 class="menu__item-subtitle">${title}"</h3>
  //     <div class="menu__item-descr">
  //     ${descr}
  //     </div>
  //     <div class="menu__item-divider"></div>
  //     <div class="menu__item-price">
  //       <div class="menu__item-cost">Цена:</div>
  //       <div class="menu__item-total"><span>${price * 27}</span> грн/день</div>
  //     </div>
  //   </div>`
  //       );
  //   });
  // });

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

  // Forms отправка завпросов на сервер

  const form = document.querySelectorAll("form"); // на сайте 2 формы, помещаем в переменную
  const message = {
    loading: "img/form/spinner.svg",
    success: "Success",
    fail: "Somsing wron...",
  };

  form.forEach((item) => {
    // перебераем масив, выбираем каждую из форм
    bindPostData(item);
  });

  const postData = async (url, data) => {
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    return await res.json();
  };

  // отправка запроса на сервер через XMLHttpRequest()

  // function postData(form) { // в новом коде postData меняеться на bindPostData - это тело в котором выполняесться код а postData - это функция в которую прокидываються переменные для bindPostData
  //   // в эту функцию попадает по очереди каждая форма
  //   form.addEventListener("submit", (event) => {
  //     event.preventDefault();

  //     let statusMessage = document.createElement("img");
  //     statusMessage.src = message.loading;
  //     statusMessage.style.cssText = `display:block;
  //     margin: 0 auto;`;

  //     form.insertAdjacentElement("afterend", statusMessage);

  //     const request = new XMLHttpRequest(); //начинаем работу с запросом на сервер
  //     request.open("POST", "server.php");

  //     //Если передавать данные в формате JSON это будет выглядить так:
  //     //request.setRequestHeader('Content-type', 'application/json');
  //     //const formData = new FormData(form);
  //     //const odject = {};
  //     // formData.forEach(function (value, key) {
  //     //   object[key] = value;
  //     // });
  //     // const json = JSON.stringify(object);
  //     // request.send(json)

  //     //Если обычный формат
  //     // Записывать в хедер заголовка не нужно если использовать FormData
  //     // FormData будет работать только если у инпутов есть атрибут name
  //     // request.setRequestHeader('Content-type', 'multipart/form-data');
  //     const formData = new FormData(form);

  //     request.send(formData);

  //     request.addEventListener("load", () => {
  //       // проверяем ответ и выводим сообщение
  //       if (request.status === 200) {
  //         console.log(request.response);
  //         showThanksModal(message.success);
  //         statusMessage.remove();
  //         form.reset();
  //       } else {
  //         showThanksModal(message.fail);
  //       }
  //     });
  //   });
  // }

  // Отправка такого же запроса но через FETCH

  function bindPostData(form) {
    // в эту функцию попадает по очереди каждая форма
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
          display: block;
          margin: 0 auto;
      `;
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries())); // превращение обекта в JSON формат

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }

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

    dots.forEach(dot => dot.style.opacity = '0.5');
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

    dots.forEach(dot => dot.style.opacity = '0.5');
    dots[slideIndex - 1].style.opacity = 1;
  });

  //добавление булетов

  const mainWrap = document.querySelector('.offer__slider')
  mainWrap.style.position = 'relative';
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
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', index + 1);
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
    `
    if (index == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);

    dots.push(dot)
  }
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');
      
      slideIndex = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);
      
    if (slider.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
    wrap.style.transform = `translateX(-${offset}px)`;

    dots.forEach(dot => dot.style.opacity = '0.5');
    dots[slideIndex - 1].style.opacity = 1;
    })
     
  })

  // fetch("http://localhost:3000/menu")  // тестирую как работает json-server npx json-server --watch db.json
  //   .then((data) => data.json())
  //   .then((res) => console.log(res));
});
