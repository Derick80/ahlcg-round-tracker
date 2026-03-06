# Arkham Horror LCG Round Tracker

A digital round tracker and game state manager for **Arkham Horror: The Living Card Game**. Built for solo player this app helps you keep track of your game. You can walk away from your true solo scenario and not worry about forgetting where you were in the game. It feels even better when playing 2 handed (or more) solo.

## Features

### 🎮 Game Setup
- **Investigator Search** — Search and select up to 4 investigators from the full ArkhamDB database
- Displays each investigator's name, faction, health, and sanity
- One-click removal of selected investigators

### 🔄 Phase Tracking
- **Phase Tracker Bar** — Sticky top bar showing all four phases (Mythos → Investigation → Enemy → Upkeep) with the active phase highlighted
- Click any phase to jump directly to it
- Automatic phase advancement with "Proceed to..." buttons

### 💀 Mythos Phase
- Checklist for placing doom on the agenda and checking the threshold
- Per-investigator encounter card draw checkboxes

### 🔍 Investigation Phase
- **Action Pips** — Visual pip system for each investigator; pips start empty and fill up as actions are spent. Tap to spend, tap again to undo
- **Health & Sanity Tracking** — Real-time display of remaining health (❤️) and sanity (🧠) with low-value pulse animations
- **Expandable Cards** — Collapse/expand each investigator to access damage/horror controls and max action adjustments (3–5 pips)
- **Info Popover** — Per-card info button explaining how pips, health, and sanity work
- Reset Actions button to restore all investigators' action pips

### ⚔️ Enemy Phase
- Hunter movement checklist
- Enemy attack checklist
- Proceed to Upkeep button

### 🔁 Upkeep Phase
- Ready all exhausted cards checklist
- Per-investigator "draws 1 card and gains 1 resource" checkboxes
- Hand size check reminder
- End Round button (advances to next round's Mythos Phase)

### 📖 Keyword Glossary
- Searchable dialog accessible from the bottom bar
- Covers key Arkham Horror keywords (Alert, Aloof, Massive, Peril, Surge, etc.) with full definitions

### 🧭 Bottom Bar
- **Round Counter** — Displays current round number during active play
- **Keyword Search** — Quick access to the keyword glossary
- **Reset Game** — Confirmation dialog before clearing all progress and returning to setup

### 💾 Persistent State
- Game state (round, phase, investigators, actions, damage, horror) is saved to local storage
- Sessions survive page reloads — pick up right where you left off

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **React** | UI components and state management (Context + useReducer) |
| **Tailwind CSS** | Utility-first styling with dark theme |
| **Shadcn UI** | Pre-built accessible components (Dialog, Command, AlertDialog, Popover, etc.) |
| **Radix UI** | Headless UI primitives powering Shadcn |
| **Lucide React** | Icon library |
| **ArkhamDB API** | Investigator data source |

## Architecture

```
app/
├── context/
│   ├── GameContext.tsx     # React context + useReducer for game state
│   └── keywords.ts        # Arkham keyword definitions
├── services/
│   └── arkhamdb.ts        # ArkhamDB API client
├── types/
│   └── game.ts            # TypeScript types, actions, & initial state
├── layout.tsx             # Root layout with GameProvider + BottomBar
└── page.tsx               # Home page rendering GameLoop

components/game/
├── GameLoop.tsx            # Phase router (setup vs active game)
├── GameSetup.tsx           # Investigator selection + start game
├── PhaseTracker.tsx        # Sticky phase navigation bar
├── MythosPhase.tsx         # Mythos phase checklist
├── InvestigationPhase.tsx  # Action pips, health/sanity, damage controls
├── EnemyPhase.tsx          # Enemy phase checklist
├── UpkeepPhase.tsx         # Upkeep phase checklist
├── InvestigatorSearch.tsx  # ArkhamDB investigator search combobox
├── KeywordSearchDialog.tsx # Searchable keyword glossary dialog
├── BottomBar.tsx           # Persistent bottom bar (round, keywords, reset)
└── ProjectCard.tsx         # Project description card
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/Derick80/ahlcg-round-tracker.git
cd ahlcg-round-tracker
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## How It Works

1. **Select investigators** from the ArkhamDB database using the search combobox
2. **Start the scenario** — the game enters the Mythos phase
3. **Follow the phase checklists** — each phase guides you through the required steps
4. **Track actions, damage, and horror** in the Investigation phase with interactive controls
5. **Advance through phases** using the navigation bar or "Proceed to..." buttons
6. **Look up keywords** anytime via the bottom bar's glossary
7. **Reset** when the scenario ends and start fresh

## License

MIT

## Acknowledgments

- [ArkhamDB](https://arkhamdb.com/) for the investigator data API
- [Fantasy Flight Games](https://www.fantasyflightgames.com/) for Arkham Horror: The Living Card Game
- Built with [Shadcn UI](https://ui.shadcn.com/) and [Radix UI](https://www.radix-ui.com/)
