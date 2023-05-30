// import ogImage from "@/static/ogImage.png";

export default {
  ssr: false,
  modern: "client",
  target: "static",
  router: {
    base: "/",
  },
  head: {
    title: "Heather",
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
      { hid: "og:image", property: "og:image", content: "https://heather.codesparks.nl/ogImage.png" },
      { name: "format-detection", content: "telephone=no" },
    ],
    script: [
      {
        hid: "gmap",
        src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAE_N9EHsQ5QvJ-ZyaBBlaWJW2K5lYNznA&libraries=geometry,places",
        defer: true,
        async: true,
      },
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

  plugins: ["~/plugins/typed.js", "~/plugins/aos.js", "~/plugins/maps.js", "~/plugins/translate.js"],

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
