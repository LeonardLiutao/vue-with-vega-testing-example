export default {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
    "^.+\\.vue$": "@vue/vue3-jest",
  },
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  transformIgnorePatterns: ["node_modules/(?!(@heartlandone))"],
};
