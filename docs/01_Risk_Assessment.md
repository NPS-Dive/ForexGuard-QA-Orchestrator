# Risk Assessment Matrix: Forex Trading Platform

## 1. Risk Methodology
As a high-frequency financial application, risk is calculated using the standard fintech risk matrix:
$$Risk = Likelihood \times Impact$$

Where:
*   **Likelihood** ($L$): Probability of failure occurring in production (1: Rare to 5: Frequent).
*   **Impact** ($I$): Financial, regulatory, or reputational damage (1: Negligible to 5: Catastrophic).
*   **Total Risk Score** ($S$): $$S = L \times I$$. A score where $$S \ge 15$$ requires immediate CTO/Lead intervention and blocks release.

## 2. Component Risk Analysis & Test Coverage

| Component / Feature | Business Rule Requirement | Potential Failure Risk | $L$ | $I$ | $S$ | Mitigating Test Suite(s) |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| **Trade Execution** | Strict Validation: Trade allowed only if $$wallet\_balance \ge trade\_price$$ | Race condition allowing negative balance via concurrent API calls. | 3 | 5 | **15** | `ApiConcurrency`, `ApiFunctional`, `WebPlaywright` |
| **Wallet Management** | Pay and receive money accurately | Money deposited/withdrawn is lost or duplicated in DB. | 2 | 5 | **10** | `ApiFunctional`, `ApiStress`, `MobileAppium` |
| **Auth & Security** | Client authentication and authorization | Session hijacking, unauthorized access to another user's wallet. | 1 | 5 | **5** | `WebPlaywright`, `ApiFunctional` |
| **Trading History** | Log all trades, filter by specific currency pairs | High DB load when querying massive histories causes system timeout. | 4 | 3 | **12** | `ApiLoad`, `ApiSpike`, `WebPlaywright` |
| **Market Data Feed** | Real-time FX pair pricing | Price spikes cause system to crash under sudden user load. | 3 | 4 | **12** | `ApiSpike`, `ApiStress` |

## 3. Automation Strategy based on Risk
*   **High Risk ($$S \ge 15$$):** The Trade Execution engine is tested across all layers. `ApiConcurrency` specifically uses k6 to hammer the trade endpoint simultaneously to ensure database isolation levels prevent negative balances.
*   **Medium Risk ($$8 \le S \le 14$$):** Testing relies heavily on performance boundaries. `ApiLoad` and `ApiSpike` validate that the reporting and history endpoints do not degrade the overall system performance.
*   **Low Risk ($$S < 8$$):** Handled via standard BDD (Cucumber/Behave) features during `WebPlaywright` and `MobileAppium` E2E runs.
