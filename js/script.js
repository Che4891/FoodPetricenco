import timer from './modules/timer';
import modal from './modules/modal';
import tabs from'./modules/tabs';
import form from './modules/form';
import cards from './modules/cards';
import calc from './modules/calculete';
import slider from './modules/slider';


window.addEventListener("DOMContentLoaded", () => {

        calc();
        cards();
        form();
        modal();
        slider();
        tabs();
        timer();

  // fetch("http://localhost:3000/menu")  // тестирую как работает json-server npx json-server --watch db.json
  //   .then((data) => data.json())
  //   .then((res) => console.log(res));

  // start webpack npx webpack
});
