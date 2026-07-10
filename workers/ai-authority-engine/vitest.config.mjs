export default {
  test: {
    environment: "node",
    include: ["test/**/*.test.ts"],
    globals: true,
    coverage: {
      enabled: false
    }
  }
}
