# ForexGuard QA Orchestrator 🛡️📈

An enterprise-grade, fully orchestrated QA/QC automation framework designed for a high-availability Forex trading application. 

This repository serves as a technical portfolio piece demonstrating architectural thinking, risk-based testing, and cross-platform automation orchestration designed to meet stringent European and US Fintech compliance standards.

## 👤 Author & Contact

**Amir Mohammad Shahsavarani**  
*Senior SDET | Automation Architect*

* 📧 **Email:** amirmohammadshi@gmail.com
* 📱 **Phone:** (+98) 919 207 2689
* 💼 **LinkedIn:** [amir-shahsavarani](https://www.linkedin.com/in/amir-shahsavarani)
* 🐙 **GitHub:** [NPS-Dive](https://github.com/NPS-Dive)

> **Professional Summary:**  
> I am a Senior SDET with 9 years in software engineering, combining full-stack development experience with deep test automation expertise. I design scalable test frameworks across UI, API, and database layers, write maintainable test code, and integrate automation into CI/CD pipelines. This project showcases my ability to orchestrate complex infrastructures and bridge the gap between business risk and technical execution. I am actively seeking relocation opportunities (Europe, US, Australia, New Zealand) to lead QA teams and drive software quality at the executive level.

---

## 🏗️ Architecture & Tech Stack Matrix

To demonstrate polyglot proficiency and use the best tool for each layer, this project implements a multi-language stack:

| Layer | Technology / Language | Purpose |
| :--- | :--- | :--- |
| **Control Center** | **C# / ASP.NET Core** | Central UI/Orchestrator to run test suites separately or in parallel. Handles JSON/CSV logbook mutation. |
| **Web E2E** | **TypeScript + Playwright** | BDD (Cucumber/Gherkin) driven UI tests for Forex trading interfaces. |
| **Mobile E2E** | **Python + Appium + Behave** | BDD automated testing for Android/iOS Forex applications. |
| **API & Perf** | **TypeScript/JS + k6** | Functional, Load, Stress, Spike, and Concurrency testing for backend trade execution. |
| **Reporting** | **Grafana, InfluxDB, Allure** | Visual metrics dashboarding (Auto-provisioned) and detailed E2E step reporting. |

---

## 📂 Project Structure
```text
├── docs/                      # Risk assessments, triage rules, TestRail mappings
├── grafana/                   # Auto-provisioned Grafana dashboards & datasources for immediate visualization
├── qa-control-center/         # ASP.NET Core MVC Orchestrator UI
├── results/                   # Immutable JSON/CSV logbooks for historical test runs
├── tests/
│   ├── api_k6/                # Functional, Load, Stress, Spike, Concurrency scripts
│   ├── mobile_appium/         # Python/Behave BDD mobile tests
│   └── web_playwright/        # TypeScript/Cucumber BDD UI tests
├── docker-compose.yml         # InfluxDB and Grafana infrastructure setup
└── README.md

---

## 💼 Business Domain & Test Coverage (Forex Trading)

The automation framework validates an imaginary high-stakes Forex trading platform based on strict business rules:

1. **Authentication & Security:** Secure login and session management.
2. **Wallet Management:** Paying and receiving funds securely.
3. **Trade Execution Constraint:** Trade requests are inherently rejected if $$Wallet\_Balance < Trade\_Price$$.
4. **Concurrency & Race Conditions:** Ensuring parallel trade requests do not bypass wallet constraints (tested via k6 concurrency).
5. **Audit Logging:** Every transaction is logged and queryable by currency pair.

---

## 📊 Performance Testing Math & Risk Strategy

Our API performance tests apply standard queuing theory and risk calculations. 
Risk is quantified dynamically using: 
$$Risk = Likelihood \times Impact$$

For Spike and Stress tests, we measure system throughput:
$$Throughput = \frac{Total\_Requests}{Total\_Time\_(s)}$$

**Service Level Agreements (SLAs) enforced by the pipeline:**
* API Functional Errors $$= 0\%$$
* P95 Response Time under Load $$\le 2000$$ ms.

For detailed documentation, refer to the `/docs` directory:
* `01_Risk_Assessment.md`
* `02_Triage_Rules.md`
* `03_TestRail_Mappings.csv`

---

## 🚀 Getting Started

### 1. Start the Visual Metric Dashboards (Grafana / InfluxDB)
To capture real-time telemetry from k6, spin up the Docker containers. The Grafana dashboards and InfluxDB data sources are **auto-provisioned**—no manual setup required.
bash
docker-compose up -d
* **Grafana UI:** `http://localhost:3000` (Login disabled, direct Admin access)
* **InfluxDB:** `http://localhost:8086`

### 2. Launch the C# QA Control Center
bash
cd qa-control-center
dotnet build
dotnet run
The ASP.NET Core dashboard will automatically open in your default browser at `http://localhost:5187`.

### 3. Execute Tests
From the Control Center UI, you can click to run:
* **Web Playwright Tests**
* **Mobile Appium Tests**
* **API k6 Suites** (Functional, Load, Stress, Spike, Concurrency)

### 4. View Results
* **Real-time API Metrics:** Open the "Forex k6 Performance" dashboard in Grafana.
* **Immutable Logbook:** Every test execution appends its results to the local data stores:
  * `results/test_logbook.csv`
  * `results/test_logbook.json`

## ⚖️ License
MIT License - Copyright (c) 2026 Amir Mohammad Shahsavarani


***

### 2. GitHub Repository Description & Tags

Go to your repository on GitHub. On the main page, look at the top right of the file list and click the **⚙️ (gear icon)** next to "About".

**Description:**
> Enterprise QA Automation Orchestrator for a Forex platform. Built by a Senior SDET showcasing C# ASP.NET Core, Playwright, Appium, k6, and auto-provisioned Grafana dashboards.

**Topics / Tags:**
Type these into the "Topics" field and press Enter after each:
`sdet`, `qa-automation`, `csharp`, `aspnetcore`, `playwright`, `appium`, `k6`, `grafana`, `bdd`, `test-orchestration`

***

### 3. How to Update the Repository

Open your terminal (PowerShell, Bash, or Command Prompt) in the root of your project folder and run the following commands to send all your new files to GitHub:

```bash
# Add all new and modified files (README, docker-compose, grafana folder, MVC changes)
git add .

# Commit the changes with a clear message
git commit -m "feat: add grafana provisioning, finalize UI orchestrator, and update documentation"

# Push to your main branch (replace 'main' with 'master' if your default branch is master)
git push origin main
