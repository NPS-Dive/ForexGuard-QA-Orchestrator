using System.Diagnostics;
using System.Text;

namespace ForexQA.ControlCenter.Services
{
    public interface ITestRunnerService
    {
        Task<string> RunTestAsync(string workingDirectory, string command, string arguments);
        Task AppendToLogbookAsync(string testType, string status);
    }

    public class TestRunnerService : ITestRunnerService
    {
        private readonly string _resultsDir = Path.Combine(Directory.GetCurrentDirectory(), "../results");
        private readonly string _logbookPath;

        public TestRunnerService()
        {
            _logbookPath = Path.Combine(_resultsDir, "logbook.csv");
            if (!Directory.Exists(_resultsDir))
            {
                Directory.CreateDirectory(_resultsDir);
            }
            if (!File.Exists(_logbookPath))
            {
                File.WriteAllText(_logbookPath, "Timestamp,TestType,Status\n");
            }
        }

        public async Task<string> RunTestAsync(string workingDirectory, string command, string arguments)
        {
            var outputBuilder = new StringBuilder();
            var errorBuilder = new StringBuilder();

            try
            {
                var processInfo = new ProcessStartInfo
                {
                    WorkingDirectory = workingDirectory,
                    FileName = OperatingSystem.IsWindows() ? "cmd.exe" : command,
                    Arguments = OperatingSystem.IsWindows() ? $"/c {command} {arguments}" : arguments,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                };

                using var process = new Process { StartInfo = processInfo };
                
                process.OutputDataReceived += (sender, e) => {
                    if (e.Data != null) outputBuilder.AppendLine(e.Data);
                };
                process.ErrorDataReceived += (sender, e) => {
                    if (e.Data != null) errorBuilder.AppendLine(e.Data);
                };

                process.Start();
                process.BeginOutputReadLine();
                process.BeginErrorReadLine();
                await process.WaitForExitAsync();

                return $"--- STDOUT ---\n{outputBuilder}\n--- STDERR ---\n{errorBuilder}";
            }
            catch (Exception ex)
            {
                return $"EXECUTION ERROR:\n{ex.Message}";
            }
        }

        public async Task AppendToLogbookAsync(string testType, string status)
        {
            var timestamp = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss UTC");
            var logEntry = $"{timestamp},{testType},{status}\n";
            await File.AppendAllTextAsync(_logbookPath, logEntry);
        }
    }
}
