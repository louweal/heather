export default {
  ssr: false,
  modern: "client",
  target: "static",
  router: {
    base: "/",
  },
  head: {
    title: "ℏ𝑒𝒶𝓉ℏ𝑒𝓇",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Minimize environmental impact by sharing resources",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
  },

  css: ["@/assets/css/main.scss"],

  styleResources: {
    scss: [
      __dirname + "/node_modules/bootstrap/scss/_functions.scss",
      __dirname + "/assets/css/_theme.scss",
      __dirname + "/node_modules/bootstrap/scss/_variables.scss",
      __dirname + "/node_modules/bootstrap/scss/_mixins.scss",
    ],
  },

  messages: {
    error_404: "Page not found",
  },

  components: true,

  plugins: ["~/plugins/typed.js"],

  modules: ["@nuxtjs/style-resources"],
  build: {
    extend(config) {
      config.node = {
        fs: "empty",
      };
    },
  },
  generate: {
    fallback: true, // for error pages on Netlify
  },
};
