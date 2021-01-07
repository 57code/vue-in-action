module.exports = [
  {
    url: "/api/upload",
    type: "post",
    response: () => {
      return {
        code: 20000,
      };
    },
  },
];