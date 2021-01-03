const path = require("path");
const { createMockServer } = require("vite-plugin-mock");

module.exports = {
  alias: {
    "/@/": path.resolve(__dirname, "src"),
    "/api/": path.resolve(__dirname, "src/api"),
    "/comps/": path.resolve(__dirname, "src/components"),
    "/dirs/": path.resolve(__dirname, "src/directive"),
    "/views/": path.resolve(__dirname, "src/views"),
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
