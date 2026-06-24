import { ICustomWorld } from './custom-world';
import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';
import * as fs from 'fs/promises';
import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';

let browser: Browser;
const resultsDir = path.join(__dirname, '../../../results'); // Navigate up to the root `results` dir
const jsonLogPath = path.join(resultsDir, 'test_logbook.json');
const csvLogPath = path.join(resultsDir, 'test_logbook.csv');

// Create results directory if it doesn't exist
BeforeAll(async function () {
  //browser = await chromium.launch({ headless: true }); // if in location web driver is achievable
  
  browser = await chromium.launch({  // if in location the web driver is out of access
  headless: true, 
  channel: 'chrome' // Use 'msedge' here if you prefer Microsoft Edge
});
  await fs.mkdir(resultsDir, { recursive: true });

  // Initialize CSV with headers if file doesn't exist
  try {
    await fs.access(csvLogPath);
  } catch {
    const csvWriter = createObjectCsvWriter({
      path: csvLogPath,
      header: [
        { id: 'timestamp', title: 'Timestamp' },
        { id: 'suite', title: 'Suite' },
        { id: 'scenario', title: 'Scenario' },
        { id: 'status', title: 'Status' },
        { id: 'durationMs', title: 'DurationMs' },
        { id: 'tags', title: 'Tags' },
      ],
    });
    await csvWriter.writeRecords([]); // Writes header only
  }
});

AfterAll(async function () {
  await browser.close();
});

Before(async function (this: ICustomWorld) {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

// This is the key hook for our portfolio project
After(async function (this: ICustomWorld, scenario: ITestCaseHookParameter) {
  const scenarioName = scenario.pickle.name;
  const scenarioStatus = scenario.result?.status;
  const duration = scenario.result?.duration?.nanos! / 1000000; // convert to ms
  const tags = scenario.pickle.tags.map(tag => tag.name).join(', ');

  const logEntry = {
    timestamp: new Date().toISOString(),
    suite: 'e2e-web-playwright',
    scenario: scenarioName,
    status: Status[scenarioStatus!],
    durationMs: Math.round(duration),
    tags: tags,
  };

  // 1. Append to JSON Logbook
  let logs: any[] = [];
  try {
    const data = await fs.readFile(jsonLogPath, 'utf-8');
    logs = JSON.parse(data);
  } catch (error) {
    // File doesn't exist, will be created
  }
  logs.push(logEntry);
  await fs.writeFile(jsonLogPath, JSON.stringify(logs, null, 2));


  // 2. Append to CSV Logbook
  const csvWriter = createObjectCsvWriter({
    path: csvLogPath,
    header: [
      { id: 'timestamp', title: 'Timestamp' },
      { id: 'suite', title: 'Suite' },
      { id: 'scenario', title: 'Scenario' },
      { id: 'status', title: 'Status' },
      { id: 'durationMs', title: 'DurationMs' },
      { id: 'tags', title: 'Tags' },
    ],
    append: true, // This is crucial for appending
  });
  await csvWriter.writeRecords([logEntry]);

  // Take a screenshot on failure
  if (scenarioStatus === Status.FAILED) {
      const screenshot = await this.page!.screenshot({
          path: path.join(resultsDir, `${scenarioName.replace(/ /g, "_")}_failed.png`)
      });
      this.attach(screenshot, 'image/png');
  }

  await this.page?.close();
  await this.context?.close();
});
