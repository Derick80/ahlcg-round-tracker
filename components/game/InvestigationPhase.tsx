'use client';

import * as React from 'react';
import { useGame } from '@/app/context/GameContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { Heart, Brain, ChevronDown, ChevronUp, ArrowRight, RefreshCcw } from 'lucide-react';
import { Investigator } from '@/app/types/game';

function InvestigatorRow({ inv }: { inv: Investigator }) {
    const { dispatch } = useGame();
    const [isOpen, setIsOpen] = React.useState(false);

    // Calculate current health/sanity
    const currentHealth = Math.max(0, inv.health - inv.healthDamage);
    const currentSanity = Math.max(0, inv.sanity - inv.sanityDamage);
    const isDefeated = currentHealth === 0 || currentSanity === 0;

    const handleActionChange = (index: number) => {
        // If clicking a filled pip (index < actions), reduce actions to that index (effectively spending it and those above).
        // If clicking an empty pip (index >= actions), increase actions to include it (index + 1).
        const newActions = index < inv.actions ? index : index + 1;
        dispatch({
            type: 'UPDATE_INVESTIGATOR',
            payload: { code: inv.code, updates: { actions: newActions } }
        });
    };

    return (
        <Card className={cn("bg-zinc-900 border-zinc-800 overflow-hidden transition-all", isDefeated && "opacity-50 grayscale")}>
            <div className="p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className={cn("font-medium text-lg font-serif", isDefeated ? "text-red-900 line-through" : "text-zinc-200")}>
                            {inv.name}
                        </span>
                        <span className="text-[10px] uppercase text-zinc-500 tracking-wider">
                            {inv.faction_code}
                        </span>
                    </div>

                    {/* Action Pips */}
                    <div className="flex flex-col items-end gap-1">
                        <div className="flex gap-1">
                            {Array.from({ length: inv.maxActions || 3 }).map((_, i) => (
                                <div
                                    key={i}
                                    onClick={() => handleActionChange(i)}
                                    className={cn(
                                        "w-6 h-6 rounded-full border-2 transition-colors cursor-pointer flex items-center justify-center",
                                        i < inv.actions
                                            ? "bg-amber-500 border-amber-600 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                                            : "bg-zinc-950 border-zinc-800"
                                    )}
                                >
                                    {i < inv.actions && <div className="w-1.5 h-1.5 bg-amber-100 rounded-full animate-pulse" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Health / Sanity Preview */}
                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                    <div className="flex items-center justify-between mt-2 md:mt-0">
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1.5 text-red-500 font-bold">
                                <Heart className={cn("w-4 h-4", currentHealth <= 2 && "animate-pulse")} fill="currentColor" />
                                {currentHealth} <span className="text-zinc-600 text-xs font-normal">/ {inv.health}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-blue-500 font-bold">
                                <Brain className={cn("w-4 h-4", currentSanity <= 2 && "animate-pulse")} fill="currentColor" />
                                {currentSanity} <span className="text-zinc-600 text-xs font-normal">/ {inv.sanity}</span>
                            </div>
                        </div>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-zinc-800 text-zinc-500">
                                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </Button>
                        </CollapsibleTrigger>
                    </div>

                    <CollapsibleContent className="mt-4 pt-4 border-t border-zinc-800 space-y-4">
                        {/* Damage Controls */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <span className="text-xs text-zinc-500 uppercase flex items-center gap-1"><Heart className="w-3 h-3" /> Damage</span>
                                <div className="flex items-center justify-between bg-zinc-950 rounded p-1">
                                    <Button
                                        variant="ghost" size="sm" className="h-8 w-8 text-zinc-400"
                                        onClick={() => dispatch({ type: 'UPDATE_INVESTIGATOR', payload: { code: inv.code, updates: { healthDamage: Math.max(0, inv.healthDamage - 1) } } })}
                                    >-</Button>
                                    <span className="text-red-500 font-bold">{inv.healthDamage}</span>
                                    <Button
                                        variant="ghost" size="sm" className="h-8 w-8 text-zinc-400"
                                        onClick={() => dispatch({ type: 'UPDATE_INVESTIGATOR', payload: { code: inv.code, updates: { healthDamage: inv.healthDamage + 1 } } })}
                                    >+</Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs text-zinc-500 uppercase flex items-center gap-1"><Brain className="w-3 h-3" /> Horror</span>
                                <div className="flex items-center justify-between bg-zinc-950 rounded p-1">
                                    <Button
                                        variant="ghost" size="sm" className="h-8 w-8 text-zinc-400"
                                        onClick={() => dispatch({ type: 'UPDATE_INVESTIGATOR', payload: { code: inv.code, updates: { sanityDamage: Math.max(0, inv.sanityDamage - 1) } } })}
                                    >-</Button>
                                    <span className="text-blue-500 font-bold">{inv.sanityDamage}</span>
                                    <Button
                                        variant="ghost" size="sm" className="h-8 w-8 text-zinc-400"
                                        onClick={() => dispatch({ type: 'UPDATE_INVESTIGATOR', payload: { code: inv.code, updates: { sanityDamage: inv.sanityDamage + 1 } } })}
                                    >+</Button>
                                </div>
                            </div>
                        </div>

                        {/* Max Actions Control */}
                        <div className="col-span-2 space-y-2 pt-2 border-t border-zinc-800">
                            <span className="text-xs text-zinc-500 uppercase flex items-center gap-1">Total Actions Pips</span>
                            <div className="flex items-center justify-center gap-4 bg-zinc-950 rounded p-1">
                                <Button
                                    variant="ghost" size="sm" className="h-8 w-8 text-zinc-400"
                                    disabled={inv.maxActions <= 3}
                                    onClick={() => dispatch({ type: 'UPDATE_MAX_ACTIONS', payload: { code: inv.code, value: (inv.maxActions || 3) - 1 } })}
                                >-</Button>
                                <span className="text-amber-500 font-bold">{inv.maxActions || 3}</span>
                                <Button
                                    variant="ghost" size="sm" className="h-8 w-8 text-zinc-400"
                                    disabled={inv.maxActions >= 5}
                                    onClick={() => dispatch({ type: 'UPDATE_MAX_ACTIONS', payload: { code: inv.code, value: (inv.maxActions || 3) + 1 } })}
                                >+</Button>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </Card>
    );
}

export function InvestigationPhase() {
    const { state, dispatch } = useGame();

    return (
        <div className="flex flex-col gap-4 p-4 pb-20 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center space-y-1 mb-2">
                <h2 className="text-2xl font-serif text-zinc-200">Investigation Phase</h2>
                <p className="text-zinc-500 text-xs">Take 3 actions each.</p>
            </div>

            <div className="flex flex-col gap-3">
                {state.investigators.map(inv => (
                    <InvestigatorRow key={inv.code} inv={inv} />
                ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-950/80 backdrop-blur border-t border-zinc-800 flex gap-2">
                <Button
                    variant="secondary"
                    className="flex-1 bg-zinc-800"
                    onClick={() => dispatch({ type: 'RESET_ACTIONS' })}
                >
                    <RefreshCcw className="w-4 h-4 mr-2" /> Reset Actions
                </Button>
                <Button
                    className="flex-1 bg-amber-700 hover:bg-amber-600 text-white"
                    onClick={() => dispatch({ type: 'NEXT_PHASE' })}
                >
                    End Phase <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}
