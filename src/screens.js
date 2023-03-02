function mainScreen() {
    const mainScreen = document.createElement('div');
    mainScreen.classList.add('main-screen');
    app.appendChild(mainScreen);

    window.application.blocks['main'] = mainBlock;
    window.application.renderBlock('main', mainScreen);
}

window.application.screens["main"] = mainScreen;
window.application.renderScreen('main');

function aboutScreen() {
    app.innerHtml = '';
    const about = document.createElement('div');
    about.classList.add('about_screen');
    app.appendChild(about);

    window.application.blocks['about-block'] = aboutBlock;
    window.application.renderBlock('about-block', about);
}

function hotelScreen() {
    app.innerHtml = '';
    const hotel = document.createElement('div');
    hotel.classList.add('hotel-screen');
    app.appendChild(hotel);

    window.application.blocks['hotel-block'] = hotelBlock;
    window.application.renderBlock('hotel-block', hotel);
}