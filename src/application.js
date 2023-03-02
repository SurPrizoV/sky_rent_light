window.application = {
  blocks: {},
  screens: {},
  renderScreen: function (screenName) {
    window.application.screens[`${screenName}`]();
  },
  renderBlock: function (blockName, container) {
    window.application.blocks[`${blockName}`](container);
  },
  timers: [],
};
const app = document.querySelector(".app");
