'use client';

import { useGame } from '@/app/context/GameContext';
import { GameSetup } from './GameSetup';
import { PhaseTracker } from './PhaseTracker';
import { MythosPhase } from './MythosPhase';
import { InvestigationPhase } from './InvestigationPhase';
import { EnemyPhase } from './EnemyPhase';
import { UpkeepPhase } from './UpkeepPhase';

export function GameLoop() {
    const { state } = useGame();

    if (state.phase === 'setup') {
        return <GameSetup />;
    }

    return (
        <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 pb-10">
            <PhaseTracker />

            <main className="flex-1 max-w-md mx-auto w-full pb-24">
                {state.phase === 'mythos' && <MythosPhase />}
                {state.phase === 'investigation' && <InvestigationPhase />}
                {state.phase === 'enemy' && <EnemyPhase />}
                {state.phase === 'upkeep' && <UpkeepPhase />}
            </main>
        </div>
    );
}

