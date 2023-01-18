// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/scss/main.scss"],
  components: {
    global: true,
    dirs: ["~/components", "~/ui-components"],
  },
  modules: [
    [
      "@pinia/nuxt",
      { autoImports: ["defineStore", "definePiniaStore", "acceptHMRUpdate"] },
    ],
  ],
});
