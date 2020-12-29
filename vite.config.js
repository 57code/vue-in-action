const path = require("path");
const { createMockServer } = require("vite-plugin-mock");

module.exports = {
  alias: {
    "/@/": path.resolve(__dirname, "src"),
    "/comps/": path.resolve(__dirname, "src/components"),
    "/styles/": path.resolve(__dirname, "src/styles"),
    "/layout/": path.resolve(__dirname, "src/layout"),
    "/utils/": path.resolve(__dirname, "src/utils"),
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
