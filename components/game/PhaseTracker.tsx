'use client';

import { useGame } from '@/app/context/GameContext';
import { cn } from '@/lib/utils';

export function PhaseTracker() {
    const { state, dispatch } = useGame();

    const phases = [
        { id: 'mythos', label: 'Mythos' },
        { id: 'investigation', label: 'Investigation' },
        { id: 'enemy', label: 'Enemy' },
        { id: 'upkeep', label: 'Upkeep' },
    ];

    return (
        <div className="w-full bg-zinc-950 border-b border-zinc-800 p-2 sticky top-0 z-10 shadow-lg">

            <div className="flex justify-between gap-1">
                {phases.map((p) => (
                    <div
                        key={p.id}
                        onClick={() => dispatch({ type: 'SET_PHASE', payload: p.id as any })}
                        className={cn(
                            "flex-1 text-center text-[10px] uppercase tracking-wider py-1 rounded transition-colors cursor-pointer select-none",
                            state.phase === p.id
                                ? "bg-amber-900/50 text-amber-200 border border-amber-800"
                                : "bg-zinc-900 text-zinc-600 hover:bg-zinc-800 hover:text-zinc-400"
                        )}
                    >
                        {p.label}
                    </div>
                ))}
            </div>
        </div>
    );
}
