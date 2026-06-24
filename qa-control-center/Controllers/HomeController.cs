using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using QaControlCenter.Models;
using ForexQA.ControlCenter.Services;

namespace QaControlCenter.Controllers
{
    public class HomeController : Controller
    {
        private readonly ITestRunnerService _testRunner;
        private readonly IConfiguration _config;

        public HomeController(ITestRunnerService testRunner, IConfiguration config)
        {
            _testRunner = testRunner;
            _config = config;
        }

        public IActionResult Index()
        {
            ViewBag.TestOutput = TempData["TestOutput"] as string;
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> RunTest(string testType)
        {
            string configKey = testType;
            
            // Map all API tests to the single ApiK6 configuration path
            if (testType.StartsWith("Api"))
            {
                configKey = "ApiK6";
            }

            var workingDir = _config[$"TestPaths:{configKey}"] ?? "";
            if (string.IsNullOrEmpty(workingDir))
            {
                TempData["TestOutput"] = $"Error: Path for {configKey} is not configured in appsettings.json.";
                return RedirectToAction("Index");
            }

            var absPath = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), workingDir));

            string command = "npm";
            string args = "";

            // Map each button to its specific CLI command
            switch (testType)
            {
                case "WebPlaywright": command = "npx"; args = "playwright test"; break;
                case "MobileAppium": command = "python"; args = "-m behave"; break;
                case "ApiFunctional": command = "npm"; args = "run test:functional"; break;
                case "ApiSpike": command = "npm"; args = "run test:spike"; break;
                case "ApiLoad": command = "npm"; args = "run test:load"; break;
                case "ApiStress": command = "npm"; args = "run test:stress"; break;
                case "ApiConcurrency": command = "npm"; args = "run test:concurrency"; break;
                default:
                    TempData["TestOutput"] = $"Error: Unknown test type '{testType}'.";
                    return RedirectToAction("Index");
            }

            var output = await _testRunner.RunTestAsync(absPath, command, args);

            // --- SMARTER STATUS EVALUATION ---
            bool isFailed = false;

            if (output.Contains("Error", StringComparison.OrdinalIgnoreCase))
            {
                isFailed = true;
            }

            if (testType.StartsWith("Api"))
            {
                // k6 checks
                if (output.Contains("checks_failed") && !output.Contains("checks_failed......: 0.00%")) isFailed = true;
                if (output.Contains("http_req_failed") && !output.Contains("http_req_failed................: 0.00%")) isFailed = true;
            }
            else
            {
                // Playwright/Behave usually print "0 failed" when successful
                if (output.Contains("failed", StringComparison.OrdinalIgnoreCase) && !output.Contains("0 failed")) isFailed = true;
            }

            string status = isFailed ? "Failed/Warning" : "Success";

            // Log to CSV
            await _testRunner.AppendToLogbookAsync(testType, status);

            TempData["TestOutput"] = $"[{DateTime.Now}] Executed: {testType}\n{output}";
            return RedirectToAction("Index");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
