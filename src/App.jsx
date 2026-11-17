import { useState } from 'react';
import { getDashboardData, scenarioKeys } from './data/mockData';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import StandardsFrameworks from './components/StandardsFrameworks/StandardsFrameworks';
import SecuritySummary from './components/SecuritySummary/SecuritySummary';
import OverallScore from './components/OverallScore/OverallScore';
import StandardsBreakdown from './components/StandardsBreakdown/StandardsBreakdown';
import FailedControls from './components/FailedControls/FailedControls';
import FindingsQueue from './components/FindingsQueue/FindingsQueue';
import AccountRollup from './components/AccountRollup/AccountRollup';
import Insights from './components/Insights/Insights';
import DemoSwitcher from './components/DemoSwitcher/DemoSwitcher';
import './App.css';

export default function App() {
  // Starts on "fair", or whatever the URL asks for, e.g. ?scenario=poor
  const [scenario, setScenario] = useState(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('scenario');
    return scenarioKeys.includes(fromUrl) ? fromUrl : 'fair';
  });
  const data = getDashboardData(scenario);

  return (
    <div className="app">
      <Sidebar />

      <div className="app__main">
        <Header lastUpdated={data.lastUpdated} alertCount={data.alertCount} />

        {/* Top and bottom blocks have their own column widths. Each area is one component, named in App.css */}
        <main className="dashboard">
          <div className="dashboard__top">
          <div className="area-standards">
            <StandardsFrameworks standards={data.standards} />
          </div>
          <div className="area-summary">
            <SecuritySummary items={data.summary} />
          </div>

          <div className="area-score">
            <OverallScore score={data.overall.score} delta={data.overall.delta} />
          </div>
          <div className="area-breakdown">
            <StandardsBreakdown standards={data.standards} />
          </div>
          <div className="area-failed">
            <FailedControls controls={data.failedControls} total={data.failedControlsTotal} />
          </div>

          <div className="area-findings">
            <FindingsQueue counts={data.findingCounts} findings={data.findings} />
          </div>

          </div>

          <div className="dashboard__bottom">
          <div className="area-accounts">
            <AccountRollup totals={data.accountTotals} accounts={data.accounts} markers={data.mapMarkers} />
          </div>
          <div className="area-insights">
            <Insights insights={data.insights} accounts={data.accounts} />
          </div>
          </div>
        </main>
      </div>

      <DemoSwitcher options={scenarioKeys} value={scenario} onChange={setScenario} />
    </div>
  );
}
