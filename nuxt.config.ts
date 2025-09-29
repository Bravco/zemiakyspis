export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  css: ["~/assets/main.css"],
  runtimeConfig: {
    public: {
      WEB3FORMS_ACCESS_KEY: process.env.WEB3FORMS_ACCESS_KEY
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "sk"
      },
      title: "Zemiaky Spiš",
      meta: [
        { name: "title", content: "Zemiaky Spiš - domáce zemiaky" },
        { name: "description", content: "Čerstvé domáce zemiaky priamo od farmára – kvalitné, chutné a vždy poctivo vypestované." }
      ]
    }
  }
})