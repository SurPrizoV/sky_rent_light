const BASE_URL = "http://158.160.58.142/rooms/";

function mainBlock(container) {
  mainBlockArray = [];
  const mainBlockHeader = document.createElement("header");
  mainBlockHeader.classList.add("header");
  mainBlockArray.push(mainBlockHeader);
  const mainBlocklogo = document.createElement("p");
  mainBlocklogo.classList.add("logo");
  mainBlockHeader.appendChild(mainBlocklogo);
  mainBlocklogo.textContent = "Skyrent";
  mainBlocklogo.addEventListener("click", (event) => {
    event.preventDefault();
    app.innerHTML = "";
    window.application.renderScreen("main");
  });
  const mainBlockAbout = document.createElement("p");
  mainBlockAbout.classList.add("about");
  mainBlockHeader.appendChild(mainBlockAbout);
  mainBlockAbout.textContent = "О проекте";
  mainBlockAbout.addEventListener("click", (event) => {
    event.preventDefault();
    app.innerHTML = "";
    window.application.screens["aboutScreen"] = aboutScreen;
    window.application.renderScreen("aboutScreen");
  });
  const mainBlockTop = document.createElement("div");
  mainBlockTop.classList.add("main_block_top");
  mainBlockArray.push(mainBlockTop);
  const mainBlockTitle = document.createElement("p");
  mainBlockTitle.classList.add("main_block_title");
  mainBlockTop.appendChild(mainBlockTitle);
  mainBlockTitle.textContent = "Пора переезжать? ";
  const mainBlockSubtitle = document.createElement("p");
  mainBlockSubtitle.classList.add("main_block_subtittle");
  mainBlockTop.appendChild(mainBlockSubtitle);
  mainBlockSubtitle.textContent =
    "Находите места для жизни и работы по всему миру";
  
  
    const mainBlockButton = document.createElement("button");
  mainBlockButton.classList.add("main_block_button");
  mainBlockTop.appendChild(mainBlockButton);
  mainBlockButton.textContent = "Подобрать недвижимость";
  mainBlockButton.addEventListener("click", (event) => {
    event.preventDefault();
    mainBlockButton.classList.add("hidden");
    mainBlockForm.classList.add("border");
    mainBlockForm.classList.remove("hidden");
    mainBlockSelect.classList.remove("hidden");
    mainBlockPrice.classList.remove("hidden");
    mainBlockPriceFrom.classList.remove("hidden");
    mainBlockPriceTo.classList.remove("hidden");
    mainBlockFormButton.classList.remove("hidden");
  });


  const mainBlockForm = document.createElement("div");
  mainBlockForm.classList.add("main_block_form", "hidden");
  mainBlockArray.push(mainBlockForm);
  const mainBlockSelect = document.createElement("select");
  mainBlockSelect.setAttribute('id', 'select');
  mainBlockSelect.classList.add("main_block_select", "hidden");
  mainBlockForm.appendChild(mainBlockSelect);
  const selectDisabled = document.createElement("option");
  selectDisabled.setAttribute("value", "");
  selectDisabled.textContent = "Страна и город";
  mainBlockSelect.appendChild(selectDisabled);
  request({
    url: BASE_URL,
    onSuccess: (data) => {
      let arr = [];
      data.map((el) => {
        arr.push({
          city:el.city,
          country:el.country,
        });
      });
      jsonObject = arr.map(JSON.stringify);
      uniqueSet = new Set(jsonObject);
      uniqueArray = Array.from(uniqueSet).map(JSON.parse);
      uniqueArray.map((location)=>{
        const selectCity = document.createElement("option");
        selectCity.setAttribute("value", location.city);
        selectCity.textContent = `${location.country} → ${location.city}`;
        mainBlockSelect.appendChild(selectCity);
      })
    },
  });


  const mainBlockPrice = document.createElement("div");
  mainBlockPrice.classList.add("main_block_price", "hidden");
  mainBlockForm.appendChild(mainBlockPrice);
 
 
  const mainBlockPriceFrom = document.createElement("input");
  mainBlockPriceFrom.setAttribute("placeholder", "Цена от");
  mainBlockPriceFrom.setAttribute('id', 'priceFrom');
  mainBlockPriceFrom.classList.add("main_block_input", "hidden");
  mainBlockPriceFrom.addEventListener("keypress", (event) => {
    if (event.keyCode < 48 || event.keyCode > 57) {
      event.preventDefault();
      mainBlockPriceFrom.setAttribute("placeholder", "только цифры");
      mainBlockPriceFrom.classList.add("input_warrning");
    } else {
      mainBlockPriceFrom.classList.remove("input_warrning");
      mainBlockPriceFrom.setAttribute("placeholder", "Цена от");
    }
  });
  mainBlockPrice.appendChild(mainBlockPriceFrom);
  
  
  const mainBlockPriceTo = document.createElement("input");
  mainBlockPriceTo.setAttribute("placeholder", "Цена до");
  mainBlockPriceTo.setAttribute("id", "priceTo");
  mainBlockPriceTo.classList.add("main_block_input", "hidden");
  mainBlockPriceTo.addEventListener("keypress", (event) => {
    if (event.keyCode < 48 || event.keyCode > 57) {
      event.preventDefault();
      mainBlockPriceTo.setAttribute("placeholder", "только цифры");
      mainBlockPriceTo.classList.add("input_warrning");
    } else {
      mainBlockPriceTo.classList.remove("input_warrning");
      mainBlockPriceTo.setAttribute("placeholder", "Цена до");
    }
  });
  mainBlockPrice.appendChild(mainBlockPriceTo);
  
  
  const mainBlockFormButton = document.createElement("button");
  mainBlockFormButton.classList.add("main_block_form_button", "hidden");
  mainBlockFormButton.addEventListener("click", (event) => {
    event.preventDefault();
    const mainPage = document.querySelector(".main_block_main");
    mainPage.innerHTML = '';
    fetchFilteredLocation();
  });
  mainBlockForm.appendChild(mainBlockFormButton);
  mainBlockFormButton.textContent = "Подобрать";


  const mainBlockMain = document.createElement("div");
  mainBlockMain.classList.add("main_block_main");
  mainBlockArray.push(mainBlockMain);
  request({
    url: BASE_URL,
    onSuccess: (data) => {
        renderLocationsList(data)
    },
  });
  const mainBlockFooter = document.createElement("footer");
  mainBlockFooter.classList.add("footer");
  mainBlockArray.push(mainBlockFooter);
  const mainBlockFooterLogo = document.createElement("p");
  mainBlockFooterLogo.classList.add("logo");
  mainBlockFooter.appendChild(mainBlockFooterLogo);
  mainBlockFooterLogo.textContent = "Skyrent";
  mainBlockFooterLogo.addEventListener("click", (event) => {
    event.preventDefault();
    app.innerHTML = " ";
    window.application.renderScreen("main");
  });
  const mainBlockFooterYear = document.createElement("p");
  mainBlockFooterYear.classList.add("footer_year");
  mainBlockFooter.appendChild(mainBlockFooterYear);
  mainBlockFooterYear.textContent = "2022";

  mainBlockArray.forEach((element) => {
    container.appendChild(element);
  });
}

function hotelBlock(container) {
  hotelBlockArray = [];
  const hotelBlockHeader = document.createElement("header");
  hotelBlockHeader.classList.add("about_header");
  hotelBlockArray.push(hotelBlockHeader);
  const hotelBlockArrow = document.createElement("img");
  hotelBlockArrow.setAttribute("src", "./src/img/back.svg");
  hotelBlockArrow.classList.add("arrow");
  hotelBlockHeader.appendChild(hotelBlockArrow);
  const hotelBlocklogo = document.createElement("p");
  hotelBlocklogo.classList.add("logo");
  hotelBlockHeader.appendChild(hotelBlocklogo);
  hotelBlocklogo.textContent = "Skyrent";
  hotelBlocklogo.addEventListener("click", (event) => {
    event.preventDefault();
    app.innerHTML = "";
    window.application.renderScreen("main");
  });
  const hotelBlockInfo = document.createElement("div");
  hotelBlockInfo.classList.add("hotel_info_item");
  hotelBlockArray.push(hotelBlockInfo);
  const hotelBlockTitle = document.createElement("p");
  hotelBlockTitle.classList.add("location");
  hotelBlockInfo.appendChild(hotelBlockTitle);
  hotelBlockTitle.textContent = window.application.location;
  const hotelBlockPrice = document.createElement("p");
  hotelBlockPrice.classList.add("price");
  hotelBlockInfo.appendChild(hotelBlockPrice);
  hotelBlockPrice.textContent = window.application.price;
  const hotelBlockImg = document.createElement("img");
  hotelBlockImg.classList.add("img");
  hotelBlockImg.setAttribute("src", window.application.img);
  hotelBlockArray.push(hotelBlockImg);
  const hotelBlockFeauters = document.createElement("div");
  hotelBlockFeauters.classList.add("hotel_feauters");
  hotelBlockArray.push(hotelBlockFeauters);
  const hotelBlockFeautersTitle = document.createElement("p");
  hotelBlockFeautersTitle.classList.add("hotel_feauters_title");
  hotelBlockFeautersTitle.textContent = "Что есть внутри?";
  hotelBlockFeauters.appendChild(hotelBlockFeautersTitle);
  window.application.have.map((have) => {
    const hotelBlockHave = document.createElement("p");
    hotelBlockHave.classList.add("hotel_have");
    hotelBlockHave.textContent = `✔  ${have}`;
    hotelBlockFeauters.appendChild(hotelBlockHave);
  });
  window.application.havent.map((havent) => {
    const hotelBlockHavent = document.createElement("p");
    hotelBlockHavent.classList.add("hotel_havent");
    hotelBlockHavent.textContent = `✕  ${havent}`;
    hotelBlockFeauters.appendChild(hotelBlockHavent);
  });
  const hotelBlockButton = document.createElement("button");
  hotelBlockButton.classList.add("hotel-button");
  hotelBlockButton.textContent = "Показать контактную информацию";
  hotelBlockArray.push(hotelBlockButton);
  hotelBlockButton.addEventListener("click", (event) => {
    event.preventDefault();
    hotelBlockButton.classList.add("hidden");
    hotelBlockContact.classList.remove("hidden");
    hotelBlockName.classList.remove("hidden");
    hotelBlockNameName.classList.remove("hidden");
    hotelBlockPhone.classList.remove("hidden");
    hotelBlockPhonePhone.classList.remove("hidden");
    hotelBlockAdress.classList.remove("hidden");
    hotelBlockAdressAdress.classList.remove("hidden");
    hotelBlockContact.classList.add("border");
  });
  const hotelBlockContact = document.createElement("div");
  hotelBlockContact.classList.add("hotel_contact", "hidden");
  hotelBlockArray.push(hotelBlockContact);
  const hotelBlockName = document.createElement("p");
  hotelBlockName.classList.add("host_params", "hidden");
  hotelBlockContact.appendChild(hotelBlockName);
  hotelBlockName.textContent = "Имя хоста";
  const hotelBlockNameName = document.createElement("p");
  hotelBlockNameName.classList.add("params", "hidden");
  hotelBlockContact.appendChild(hotelBlockNameName);
  hotelBlockNameName.textContent = window.application.hostName;
  const hotelBlockPhone = document.createElement("p");
  hotelBlockPhone.classList.add("host_params", "hidden");
  hotelBlockContact.appendChild(hotelBlockPhone);
  hotelBlockPhone.textContent = "Телефон";
  const hotelBlockPhonePhone = document.createElement("p");
  hotelBlockPhonePhone.classList.add("params", "hidden");
  hotelBlockContact.appendChild(hotelBlockPhonePhone);
  hotelBlockPhonePhone.textContent = window.application.hostPhone;
  const hotelBlockAdress = document.createElement("p");
  hotelBlockAdress.classList.add("host_params", "hidden");
  hotelBlockContact.appendChild(hotelBlockAdress);
  hotelBlockAdress.textContent = "Адрес";
  const hotelBlockAdressAdress = document.createElement("p");
  hotelBlockAdressAdress.classList.add("params", "hidden");
  hotelBlockContact.appendChild(hotelBlockAdressAdress);
  hotelBlockAdressAdress.textContent = window.application.adress;
  const hotelBlockFooter = document.createElement("footer");
  hotelBlockFooter.classList.add("footer");
  hotelBlockArray.push(hotelBlockFooter);
  const hotelBlockFooterLogo = document.createElement("p");
  hotelBlockFooterLogo.classList.add("logo");
  hotelBlockFooter.appendChild(hotelBlockFooterLogo);
  hotelBlockFooterLogo.textContent = "Skyrent";
  hotelBlockFooterLogo.addEventListener("click", (event) => {
    event.preventDefault();
    app.innerHTML = " ";
    window.application.renderScreen("main");
  });
  const hotelBlockFooterYear = document.createElement("p");
  hotelBlockFooterYear.classList.add("footer_year");
  hotelBlockFooter.appendChild(hotelBlockFooterYear);
  hotelBlockFooterYear.textContent = "2022";
  hotelBlockArray.forEach((element) => {
    container.appendChild(element);
  });
}

function aboutBlock(container) {
  aboutBlockArray = [];
  const aboutBlockHeader = document.createElement("header");
  aboutBlockHeader.classList.add("about_header");
  aboutBlockArray.push(aboutBlockHeader);
  const aboutBlockArrow = document.createElement("img");
  aboutBlockArrow.setAttribute("src", "./src/img/back.svg");
  aboutBlockArrow.classList.add("arrow");
  aboutBlockHeader.appendChild(aboutBlockArrow);
  const aboutBlocklogo = document.createElement("p");
  aboutBlocklogo.classList.add("logo");
  aboutBlockHeader.appendChild(aboutBlocklogo);
  aboutBlocklogo.textContent = "Skyrent";
  aboutBlocklogo.addEventListener("click", (event) => {
    event.preventDefault();
    app.innerHTML = "";
    window.application.renderScreen("main");
  });
  const aboutBlockTop = document.createElement("div");
  aboutBlockTop.classList.add("about_block_top");
  aboutBlockArray.push(aboutBlockTop);
  const aboutBlockTitle = document.createElement("p");
  aboutBlockTitle.classList.add("about_title");
  aboutBlockTitle.textContent =
    "Skyrent – MVP сервиса доски объявлений по длительной аренде жилья для релокации. Позволяет просматривать карточку, фильтровать и просматривать контакты арендатора.";
  aboutBlockTop.appendChild(aboutBlockTitle);
  const aboutBlockTeam = document.createElement("div");
  aboutBlockTeam.classList.add("about_team");
  aboutBlockArray.push(aboutBlockTeam);
  const aboutBlockSubtitle = document.createElement("p");
  aboutBlockSubtitle.classList.add("about_subtitle");
  aboutBlockTeam.appendChild(aboutBlockSubtitle);
  aboutBlockSubtitle.textContent = "Над проектом работали";
  const wd = document.createElement("span");
  wd.classList.add("team_made");
  wd.textContent = "✔    Frontend Роман";
  aboutBlockTeam.appendChild(wd);
  const bd = document.createElement("span");
  bd.classList.add("team_made");
  bd.textContent = "✔    Frontend Никита";
  aboutBlockTeam.appendChild(bd);
  const qa = document.createElement("span");
  qa.classList.add("team_made");
  qa.textContent = "✔    QA Лиза";
  aboutBlockTeam.appendChild(qa);
  const aboutBlockFooter = document.createElement("footer");
  aboutBlockFooter.classList.add("footer");
  aboutBlockArray.push(aboutBlockFooter);
  const aboutBlockFooterLogo = document.createElement("p");
  aboutBlockFooterLogo.classList.add("logo");
  aboutBlockFooter.appendChild(aboutBlockFooterLogo);
  aboutBlockFooterLogo.textContent = "Skyrent";
  aboutBlockFooterLogo.addEventListener("click", (event) => {
    event.preventDefault();
    app.innerHTML = "";
    window.application.renderScreen("main");
  });
  const aboutBlockFooterYear = document.createElement("p");
  aboutBlockFooterYear.classList.add("footer_year");
  aboutBlockFooter.appendChild(aboutBlockFooterYear);
  aboutBlockFooterYear.textContent = "2022";
  aboutBlockArray.forEach((element) => {
    container.appendChild(element);
  });
}

function renderLocationsList (data) { 
  mainBlockMain = document.querySelector(".main_block_main");
data.map((el) => {
  const hotel = document.createElement("div");
  hotel.setAttribute("id", `${el.pk}`);
  hotel.classList.add("hotel");
  mainBlockMain.appendChild(hotel);
  hotel.addEventListener("click", (event) => {
    event.preventDefault();
    window.application.id = el.pk;
    window.application.location = `${el.country} → ${el.city}`;
    window.application.price = `$ ${el.price} / month`;
    window.application.img = el.picture_url;
    window.application.have = el.features_on;
    window.application.havent = el.features_off;
    window.application.hostName = el.host_name;
    window.application.hostPhone = el.host_phone;
    window.application.adress = el.host_location;
    app.innerHTML = "";
    window.application.screens["hotelScreen"] = hotelScreen;
    window.application.renderScreen("hotelScreen");
  });
  const img = document.createElement("img");
  img.classList.add("img");
  img.setAttribute("src", el.picture_url);
  hotel.appendChild(img);
  const location = document.createElement("p");
  location.classList.add("location");
  hotel.appendChild(location);
  location.textContent = `${el.country} → ${el.city}`;
  const hotelInfo = document.createElement("p");
  hotelInfo.classList.add("hotel_info");
  hotel.appendChild(hotelInfo);
  hotelInfo.textContent = el.description;
  const price = document.createElement("p");
  price.classList.add("price");
  hotel.appendChild(price);
  price.textContent = `$ ${el.price} / month`;
});

}