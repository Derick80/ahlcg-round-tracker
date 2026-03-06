'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gamepad2, Code2, ExternalLink } from 'lucide-react';

const techStack = [
    'TypeScript',
    'Next.js',
    'React',
    'Tailwind CSS',
    'Shadcn UI',
    'Vercel',
    'AI Coding',
    'Google Antigravity',
    'ArkhamDB API'
];

export function ProjectCard() {
    return (
        <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
            <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        <Gamepad2 className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                        <CardTitle className="text-xl font-serif text-amber-500">
                            Arkham Horror LCG Round Tracker
                        </CardTitle>
                        <span className="text-xs uppercase tracking-widest text-zinc-500">
                            Interactive Tool
                        </span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-zinc-400 leading-relaxed text-sm">
                    A digital round tracker and game state manager for Arkham Horror: The Living Card Game.
                    Track rounds, phases,investigator actions, health, and sanity in real time.
                    Features a searchable keyword glossary, per-investigator action pips, and phase-by-phase
                    checklists for Mythos, Investigation, Enemy, and Upkeep. Supports up to 4 investigators
                    with persistent game state saved to local storage.
                </p>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-zinc-500">
                        <Code2 className="w-3.5 h-3.5" />
                        <span className="text-xs uppercase tracking-widest font-semibold">Built With</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {techStack.map((tech) => (
                            <span
                                key={tech}
                                className="px-2 py-0.5 text-xs rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="pt-2 border-t border-zinc-800">
                    <div className="flex items-center gap-2 text-zinc-500">
                        <Gamepad2 className="w-3.5 h-3.5" />
                        <span className="text-xs uppercase tracking-widest font-semibold">How It Works</span>
                    </div>
                    <p className="text-zinc-500 text-xs leading-relaxed mt-1.5">
                        Investigator data is fetched from the ArkhamDB API. Game state is managed via React context
                        with a reducer pattern and persisted to local storage so sessions survive page reloads.
                        The UI is built with Shadcn UI components on top of Radix primitives, styled with Tailwind CSS
                        for a dark, thematic aesthetic.
                    </p>
                </div>

                <a
                    href="https://github.com/Derick80/ahlcg-round-tracker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-400 transition-colors mt-1"
                >
                    <ExternalLink className="w-3 h-3" />
                    View on GitHub
                </a>
            </CardContent>
        </Card>
    );
}
