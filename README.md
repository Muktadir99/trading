# Trading Mastery Desk

A local-first learning dashboard for an evidence-led trading curriculum. It includes an interactive 8-phase roadmap, saved module progress, a position-size estimator, and a trade journal with CSV export.

## Requirements

- Node.js 18 or newer

## Run locally

```powershell
cd C:\path\to\trading_mastery_advanced
npm start
```

Open the local URL printed by the server (default: http://127.0.0.1:4173). If that port is busy, set another port first:

```powershell
$env:PORT = '4174'
npm start
```

## Local data

Progress and journal entries are saved in `data/store.json` on the machine running the server. That file is excluded from Git so personal journal data is not published.

## Disclaimer

For education and practice only. The calculator is an estimate and is not investment advice.
