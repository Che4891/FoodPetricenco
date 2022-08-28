window.addEventListener("DOMContentLoaded", () => {

  const calc = require('./modules/calculete'),
        cards = require('./modules/cards'),
        form = require('./modules/form'),
        modal = require('./modules/modal'),
        slider = require('./modules/slider'),
        tabs = require('./modules/tabs'),
        timer = require('./modules/timer');


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
