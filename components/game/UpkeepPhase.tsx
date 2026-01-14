'use client';

import { useGame } from '@/app/context/GameContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, RotateCw } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';

export function UpkeepPhase() {
    const { dispatch } = useGame();

    return (
        <div className="flex flex-col gap-6 p-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center space-y-2">
                <RotateCw className="w-12 h-12 text-emerald-700 mx-auto" />
                <h2 className="text-3xl font-serif text-zinc-200">Upkeep Phase</h2>
            </div>

            <div className="space-y-4 bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
                <div className="flex items-center space-x-3 p-2 hover:bg-zinc-800 rounded transition-colors cursor-pointer">
                    <Checkbox id="u1" />
                    <label htmlFor="u1" className="text-zinc-300 font-serif text-lg cursor-pointer">Flip mini-cards to colored side.</label>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-zinc-800 rounded transition-colors cursor-pointer">
                    <Checkbox id="u2" />
                    <label htmlFor="u2" className="text-zinc-300 font-serif text-lg cursor-pointer">Ready all exhausted cards.</label>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-zinc-800 rounded transition-colors cursor-pointer">
                    <Checkbox id="u3" />
                    <label htmlFor="u3" className="text-zinc-300 font-serif text-lg cursor-pointer">Each investigator draws 1 card and gains 1 resource.</label>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-zinc-800 rounded transition-colors cursor-pointer">
                    <Checkbox id="u4" />
                    <label htmlFor="u4" className="text-zinc-300 font-serif text-lg cursor-pointer">Check hand size (discard down to 8).</label>
                </div>
            </div>

            <Button
                className="w-full mt-4 bg-amber-700 hover:bg-amber-600 text-white font-serif text-lg py-6"
                onClick={() => dispatch({ type: 'NEXT_PHASE' })}
            >
                End Round <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
        </div>
    );
}
