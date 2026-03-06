'use client';

import * as React from 'react';
import { useGame } from '@/app/context/GameContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { Heart, Brain, ChevronDown, ChevronUp, ArrowRight, RefreshCcw, Info } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Investigator } from '@/app/types/game';

function InvestigatorRow({ inv }: { inv: Investigator }) {
    const { dispatch } = useGame();
    const [isOpen, setIsOpen] = React.useState(false);

    // Calculate current health/sanity
    const currentHealth = Math.max(0, inv.health - inv.healthDamage);
    const currentSanity = Math.max(0, inv.sanity - inv.sanityDamage);
    const isDefeated = currentHealth === 0 || currentSanity === 0;


    return (
        <Card className={cn("bg-zinc-900 border-zinc-800 overflow-hidden transition-all relative", isDefeated && "opacity-50 grayscale")}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 z-10"
                    >
                        <Info className="w-3.5 h-3.5" />
                        <span className="sr-only">Info</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 bg-zinc-900 border-zinc-700 text-zinc-300" align="end">
                    <div className="space-y-3 text-sm">
                        <div>
                            <h4 className="font-semibold text-amber-400 mb-1">Action Pips</h4>
                            <p className="text-zinc-400 leading-relaxed">Tap a pip to mark an action as spent — pips fill from left to right. Tap a filled pip to undo it.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-red-400 mb-1 flex items-center gap-1"><Heart className="w-3 h-3" /> Health</h4>
                            <p className="text-zinc-400 leading-relaxed">Shows remaining health. Expand the card to add or remove damage. Defeated at 0.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-blue-400 mb-1 flex items-center gap-1"><Brain className="w-3 h-3" /> Sanity</h4>
                            <p className="text-zinc-400 leading-relaxed">Shows remaining sanity. Expand the card to add or remove horror. Defeated at 0.</p>
                        </div>
                        <div>
                            {/* describe the down chevron */}
                            <h4 className="font-semibold text-zinc-400 mb-1 flex items-center gap-1"><ChevronDown className="w-3 h-3" /> Expand</h4>
                            <p className="text-zinc-400 leading-relaxed">Expand the card to add or remove damage or horror.</p>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
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

                    {/* Action Pips — fill up as actions are spent */}
                    <div className="flex flex-col items-end gap-1">
                        <div className="flex gap-1">
                            {Array.from({ length: inv.maxActions || 3 }).map((_, i) => {
                                const actionsSpent = (inv.maxActions || 3) - inv.actions;
                                const isFilled = i < actionsSpent;
                                return (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            // Clicking a filled pip: unfill it and everything after
                                            // Clicking an empty pip: fill it and everything before
                                            const newSpent = isFilled ? i : i + 1;
                                            const newActions = (inv.maxActions || 3) - newSpent;
                                            dispatch({
                                                type: 'UPDATE_INVESTIGATOR',
                                                payload: { code: inv.code, updates: { actions: newActions } }
                                            });
                                        }}
                                        className={cn(
                                            "w-6 h-6 rounded-full border-2 transition-colors cursor-pointer flex items-center justify-center",
                                            isFilled
                                                ? "bg-amber-500 border-amber-600 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                                                : "bg-zinc-950 border-zinc-700"
                                        )}
                                    >
                                        {isFilled && <div className="w-1.5 h-1.5 bg-amber-100 rounded-full" />}
                                    </div>
                                );
                            })}
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
                                        onClick={() => dispatch({ type: 'UPDATE_INVESTIGATOR', payload: { code: inv.code, updates: { sanityDamage: Math.max(0, inv.sanityDamage + 1) } } })}
                                    >-</Button>
                                    <span className="text-blue-500 font-bold">{inv.sanityDamage}</span>
                                    <Button
                                        variant="ghost" size="sm" className="h-8 w-8 text-zinc-400"
                                        onClick={() => dispatch({ type: 'UPDATE_INVESTIGATOR', payload: { code: inv.code, updates: { sanityDamage: inv.sanityDamage - 1 } } })}
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

            <div className="flex gap-2 mt-4">
                <Button
                    variant="secondary"
                    className="flex-1 bg-zinc-800"
                    onClick={() => dispatch({ type: 'RESET_ACTIONS' })}
                >
                    <RefreshCcw className="w-4 h-4 mr-2" /> Reset Actions
                </Button>
                <Button
                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                    onClick={() => dispatch({ type: 'NEXT_PHASE' })}
                >
                    Proceed to Enemy <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}
