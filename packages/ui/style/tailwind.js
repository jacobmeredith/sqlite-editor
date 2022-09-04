// eslint-disable-next-line
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = function (app, options) {
  let config = {
    content: [
      "../../packages/*/src/**/*.{js,ts,jsx,tsx,html}",
      app
        ? `../../apps/${app}/**/*.{,tsx,html}`
        : `./src/**/*.{js,ts,jsx,tsx,html}`,
    ],
    darkMode: "class",
    mode: "jit",
    theme: {
      ...defaultTheme,
    },
  };
  return config;
};
