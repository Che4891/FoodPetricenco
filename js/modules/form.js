function form () {
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
}

export default form;