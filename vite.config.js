const path = require("path");
const { createMockServer } = require("vite-plugin-mock");

module.exports = {
  alias: {
    "/comps/": path.resolve(__dirname, "src/components"),
  },
  proxy: {
    "/api": {
      target: "http://jsonplaceholder.typicode.com",
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, ""),
    },
  },
  plugins: [
    createMockServer({
      // close support .ts file
      supportTs: false,
    }),
  ],
};
