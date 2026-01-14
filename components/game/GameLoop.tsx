'use client';

import { useGame } from '@/app/context/GameContext';
import { GameSetup } from './GameSetup';
import { PhaseTracker } from './PhaseTracker';
import { MythosPhase } from './MythosPhase';
import { InvestigationPhase } from './InvestigationPhase';
import { EnemyPhase } from './EnemyPhase';
import { UpkeepPhase } from './UpkeepPhase';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export function GameLoop() {
    const { state, dispatch } = useGame();

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

            {/* Bottom Bar: Round Info & Reset */}
            <div className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 p-4 flex justify-between items-center z-50">
                <div className="text-zinc-400 font-serif">
                    <span className="text-sm uppercase tracking-widest text-zinc-600 mr-2">Round</span>
                    <span className="text-xl text-amber-500 font-bold">{state.round}</span>
                </div>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-red-400 hover:bg-zinc-900">
                            <RotateCcw className="w-4 h-4 mr-2" /> Reset Game
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Reset Game?</AlertDialogTitle>
                            <AlertDialogDescription className="text-zinc-500">
                                This will clear all progress and return to the setup screen.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700 hover:text-zinc-200">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => dispatch({ type: 'RESET_GAME' })}
                                className="bg-red-900 text-red-100 hover:bg-red-800"
                            >
                                Reset
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>      </div>
    );
}
