function cards() {
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
}

module.exports = cards