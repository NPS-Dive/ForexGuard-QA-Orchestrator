module.exports = {
  default: {
    requireModule: ["ts-node/register"],
    require: ["step-definitions/**/*.ts", "support/**/*.ts"],
    paths: ["features/**/*.feature"],
    format: [
      "summary",
      "progress-bar",
      "json:../../results/cucumber_report.json" // Standard JSON report
    ],
   // publishQuiet: true
  }
};
