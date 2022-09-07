function closeModal(modalSelector) {
  modal = document.querySelector(modalSelector);
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
  document.body.style.paddingRight = 0 + "px";
}

function openModal(modalSelector, modalTimerId) {
  modal = document.querySelector(modalSelector);
  console.log(modal);
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = 16 + "px";
  console.log(modalTimerId);
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
      // MODAL WINDOW

  const modalOpenBtn = document.querySelectorAll(triggerSelector),
  modal = document.querySelector(modalSelector);

modalOpenBtn.forEach((item) => {
  item.addEventListener("click",() => openModal(modalSelector, modalTimerId));
});


modal.addEventListener("click", (e) => {
  if (e.target === modal || e.target.getAttribute("data-close") == "") {
    closeModal(modalSelector);
  }
});
document.addEventListener("keydown", (e) => {
  if (e.code === "Escape" && modal.classList.contains("show")) {
    closeModal(modalSelector);
  }
});

function showModalByScroll() {
  if (
    window.pageYOffset + document.documentElement.clientHeight >=
    document.documentElement.scrollHeight
  ) {
    openModal(modalSelector, modalTimerId);
    window.removeEventListener("scroll", showModalByScroll);
  }
}

window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};