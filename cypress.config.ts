import { defineConfig } from "cypress";

export default defineConfig({
     e2e: {
          // setupNodeEvents(on, config) {
          // },
          baseUrl: 'http://localhost:5173/',
          viewportWidth: 2560,
          viewportHeight: 1080
     },
});
