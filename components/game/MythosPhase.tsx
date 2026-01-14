'use client';

import { useGame } from '@/app/context/GameContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Skull, ArrowRight } from 'lucide-react';

export function MythosPhase() {
    const { state, dispatch } = useGame();

    return (
        <div className="flex flex-col gap-6 p-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-serif text-zinc-200">Mythos Phase</h2>
                <p className="text-zinc-500 text-sm italic">The forces of the unknown gather...</p>
            </div>

            <div className="bg-zinc-900 border-zinc-800 rounded-lg p-6 space-y-4">
                <h3 className="font-serif text-zinc-300 flex items-center gap-2">
                    <Skull className="w-5 h-5" /> Mythos Checklist
                </h3>

                <div className="space-y-4">
                    {/* Step 1: Doom & Threshold Combined */}
                    <div className="flex items-start space-x-3 cursor-pointer p-2 hover:bg-zinc-800 rounded transition-colors">
                        <Checkbox id="step_doom" className="mt-1" />
                        <div className="flex flex-col">
                            <label htmlFor="step_doom" className="text-zinc-200 font-medium cursor-pointer">Place 1 Doom on Agenda & Check Threshold</label>
                            <span className="text-zinc-500 text-xs">If threshold is reached, advance agenda immediately.</span>
                        </div>
                    </div>

                    <div className="h-px bg-zinc-800 my-2" />

                    {/* Step 2: Investigator Draws */}
                    <div className="space-y-2">
                        <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold ml-2">Encounter Cards</span>
                        {state.investigators.length === 0 ? (
                            <p className="text-zinc-500 text-sm italic ml-2">No investigators added.</p>
                        ) : (
                            state.investigators.map((inv) => (
                                <div key={inv.code} className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-zinc-800 rounded transition-colors">
                                    <Checkbox id={`draw_${inv.code}`} />
                                    <label htmlFor={`draw_${inv.code}`} className="text-zinc-300 cursor-pointer">
                                        <span className="font-serif text-amber-500">{inv.name}</span> draws 1 encounter card
                                    </label>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <Button
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 py-6"
                onClick={() => dispatch({ type: 'NEXT_PHASE' })}
            >
                Proceed to Investigation <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
        </div>
    );
}
