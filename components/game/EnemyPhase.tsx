'use client';

import { useGame } from '@/app/context/GameContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ArrowRight, Swords } from 'lucide-react';
import { useState } from 'react';

export function EnemyPhase() {
    const { dispatch } = useGame();

    // Simple checklist state for this phase instance
    const [checked, setChecked] = useState({
        hunter: false,
        attacks: false,
    });

    return (
        <div className="flex flex-col gap-6 p-4 animate-in fade-in slide-in-from-right-4 duration-300 h-full justify-center">
            <div className="text-center space-y-2">
                <Swords className="w-12 h-12 text-red-700 mx-auto" />
                <h2 className="text-3xl font-serif text-zinc-200">Enemy Phase</h2>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-6">
                <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-zinc-800/50 transition-colors cursor-pointer" onClick={() => setChecked(c => ({ ...c, hunter: !c.hunter }))}>
                    <Checkbox id="hunter" checked={checked.hunter} onCheckedChange={(c: boolean | string) => setChecked(prev => ({ ...prev, hunter: !!c }))} />
                    <div className="flex-1">
                        <Label htmlFor="hunter" className="text-lg font-serif cursor-pointer">Hunter Enemies Move</Label>
                        <p className="text-zinc-500 text-sm">Move each Hunter enemy one location toward nearest investigator.</p>
                    </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-zinc-800/50 transition-colors cursor-pointer" onClick={() => setChecked(c => ({ ...c, attacks: !c.attacks }))}>
                    <Checkbox id="attacks" checked={checked.attacks} onCheckedChange={(c: boolean | string) => setChecked(prev => ({ ...prev, attacks: !!c }))} />
                    <div className="flex-1">
                        <Label htmlFor="attacks" className="text-lg font-serif cursor-pointer">Enemies Attack</Label>
                        <p className="text-zinc-500 text-sm">Each engaged enemy attacks (deal damage/horror).</p>
                    </div>
                </div>
            </div>

            <Button
                className="w-full mt-auto bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                onClick={() => dispatch({ type: 'NEXT_PHASE' })}
            >
                Proceed to Upkeep <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
        </div>
    );
}
