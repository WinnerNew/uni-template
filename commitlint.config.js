module.exports = {
  ignores: [(commit) => commit.includes("init")], // 忽略带有init的信息
  extends: ["@commitlint/config-conventional"],
};
