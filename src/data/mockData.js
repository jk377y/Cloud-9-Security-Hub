// All hard-coded demo data lives in this one file.
// When real data shows up, this is the file that gets swapped for API calls.

// Three demo "moods" so we can show off the gauge and status colors.
// The switcher in the bottom-right corner of the page flips between them.
const scenarios = {
  good: {
    overall: { score: 88, delta: 3.2 },
    standardScores: { CIS: 91, PCI: 84 },
    accountScores: [93, 88, 82, 79, 71],
  },
  fair: {
    overall: { score: 74, delta: 5.6 },
    standardScores: { CIS: 76, PCI: 68 },
    accountScores: [86, 78, 62, 48, 32],
  },
  poor: {
    overall: { score: 41, delta: -6.4 },
    standardScores: { CIS: 52, PCI: 38 },
    accountScores: [58, 47, 41, 29, 17],
  },
};

export const scenarioKeys = Object.keys(scenarios);

export function getDashboardData(scenarioKey = 'fair') {
  const s = scenarios[scenarioKey];

  return {
    lastUpdated: '2 min ago',
    alertCount: 3,

    standards: [
      { id: 'CIS', name: 'CIS AWS Foundations', version: 'v1.4.0', enabled: true, score: s.standardScores.CIS },
      { id: 'PCI', name: 'PCI DSS v4.0', version: 'v1.0.0', enabled: true, score: s.standardScores.PCI },
    ],

    overall: s.overall,

    summary: [
      { key: 'total', icon: 'shield', value: 128, label: 'Total controls', color: 'var(--cyan)', trend: [4, 5, 5, 6, 5, 7, 8, 7, 9, 11] },
      { key: 'passed', icon: 'check', value: 93, label: 'Passed controls', pct: '72.7%', color: 'var(--green)', trend: [6, 5, 6, 5, 7, 6, 6, 7, 6, 7] },
      { key: 'failed', icon: 'warn', value: 18, label: 'Failed controls', pct: '14.1%', color: 'var(--orange)', trend: [4, 6, 5, 8, 6, 4, 5, 3, 5, 4] },
      { key: 'unknown', icon: 'minus', value: 17, label: 'Unknown controls', pct: '13.2%', color: 'var(--blue)', trend: [3, 4, 3, 5, 4, 5, 4, 3, 4, 4] },
    ],

    failedControls: [
      { id: 'CIS 1.2', title: 'Root account has MFA', severity: 'HIGH' },
      { id: 'CIS 2.3', title: 'S3 Buckets should not be public', severity: 'HIGH' },
      { id: 'PCI 8.2.1', title: 'Ensure logging is enabled in all regions', severity: 'MEDIUM' },
      { id: 'PCI 10.2.5', title: 'Ensure audit trails are integrated', severity: 'MEDIUM' },
    ],
    failedControlsTotal: 18,

    findingCounts: { all: 312, critical: 12, high: 58, medium: 132, low: 110 },
    findings: [
      { severity: 'CRITICAL', title: 'S3 Bucket publicly accessible', resource: 's3://prod-compliance-docs', ago: '2 min ago' },
      { severity: 'HIGH', title: 'Security group allows 0.0.0.0/0 to port 22', resource: 'sg-0a12b3c4d5e6f7a8b', ago: '6 min ago' },
      { severity: 'HIGH', title: 'EBS volume not encrypted', resource: 'vol-0f1e2d3c4b5a69788', ago: '9 min ago' },
      { severity: 'MEDIUM', title: 'CloudTrail not enabled in us-west-2', resource: '', ago: '15 min ago' },
      { severity: 'LOW', title: 'IAM user without MFA', resource: 'user: john.doe', ago: '18 min ago' },
    ],

    accountTotals: { total: 12, healthy: 6, attention: 4, risk: 2 },
    accounts: [
      { name: 'Prod-Account', score: s.accountScores[0] },
      { name: 'Security-Account', score: s.accountScores[1] },
      { name: 'Dev-Account', score: s.accountScores[2] },
      { name: 'Shared-Services', score: s.accountScores[3] },
      { name: 'Legacy-Account', score: s.accountScores[4] },
    ],

    // lon/lat get converted to map positions inside WorldMap
    mapMarkers: [
      { lon: -122, lat: 38, status: 'healthy' },
      { lon: -77, lat: 39, status: 'attention' },
      { lon: -47, lat: -15, status: 'attention' },
      { lon: -2, lat: 52, status: 'healthy' },
      { lon: 10, lat: 50, status: 'healthy' },
      { lon: 105, lat: 15, status: 'risk' },
      { lon: 128, lat: 36, status: 'info' },
      { lon: 80, lat: 20, status: 'risk' },
      { lon: 150, lat: -30, status: 'healthy' },
      { lon: 115, lat: -25, status: 'attention' },
    ],

    insights: [
      { label: 'New findings', value: 42, change: '18%', direction: 'down', good: true, trend: [5, 6, 5, 7, 6, 5, 6, 4, 5, 4] },
      { label: 'Resolved findings', value: 67, change: '23%', direction: 'up', good: true, trend: [3, 4, 4, 3, 5, 4, 6, 5, 7, 8] },
      { label: 'Controls improved', value: 9, change: '12%', direction: 'up', good: true, trend: [4, 3, 4, 5, 4, 5, 4, 6, 5, 6] },
    ],
  };
}
