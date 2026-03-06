'use client';

import * as React from 'react';
import { useGame } from '@/app/context/GameContext';
import { InvestigatorSearch } from './InvestigatorSearch';
import { ProjectCard } from './ProjectCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Sword, Brain } from 'lucide-react';

export function GameSetup() {
    const { state, dispatch } = useGame();

    const handleStartGame = () => {
        dispatch({
            type: 'START_GAME',
            payload: {
                investigators: state.investigators,
            },
        });
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-md mx-auto p-4">
            <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
                <CardHeader>
                    <CardTitle className="text-2xl font-serif text-amber-500">New Campaign</CardTitle>
                    <CardDescription className="text-zinc-400">Assemble your team and prepare for the mythos.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <Label className="text-zinc-200">Investigators ({state.investigators.length}/4)</Label>
                        {state.investigators.length < 4 && (
                            <InvestigatorSearch />
                        )}
                        <div className="flex flex-col gap-2">
                            {state.investigators.map((inv) => (
                                <div key={inv.code} className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg border border-zinc-700">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-zinc-100">{inv.name}</span>
                                        <span className="text-xs text-zinc-400 capitalize">{inv.faction_code}</span>
                                        <div className="flex gap-2 text-xs text-zinc-500 mt-1">
                                            <span className="flex items-center gap-1"><Sword className="w-3 h-3" /> {inv.health}</span>
                                            <span className="flex items-center gap-1"><Brain className="w-3 h-3" /> {inv.sanity}</span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => dispatch({ type: 'REMOVE_INVESTIGATOR', payload: inv.code })}
                                        className="text-zinc-500 hover:text-red-400 hover:bg-zinc-700"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>


                    </div>

                    <Button
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-serif"
                        disabled={state.investigators.length === 0}
                        onClick={handleStartGame}
                    >
                        Start Scenario
                    </Button>
                </CardContent>
            </Card>

            <ProjectCard />
        </div>
    );
}
