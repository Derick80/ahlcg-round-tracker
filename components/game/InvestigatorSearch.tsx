'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { fetchInvestigators, ArkhamCard } from '@/app/services/arkhamdb';
import { useGame } from '@/app/context/GameContext';
import { FactionCode } from '@/app/types/game';

export function InvestigatorSearch() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');
    const [investigators, setInvestigators] = React.useState<ArkhamCard[]>([]);
    const { dispatch, state } = useGame();

    React.useEffect(() => {
        const loadData = async () => {
            const data = await fetchInvestigators();
            // Filter out duplicates by name to keep list clean, prefer lower codes (base set)
            const unique = data.reduce((acc, current) => {
                const x = acc.find(item => item.name === current.name);
                if (!x) {
                    return acc.concat([current]);
                } else {
                    return acc;
                }
            }, [] as ArkhamCard[]);

            setInvestigators(unique.sort((a, b) => a.name.localeCompare(b.name)));
        };
        loadData();
    }, []);

    const handleSelect = (currentValue: string) => {
        const inv = investigators.find((i) => i.code === currentValue);
        if (inv) {
            // Check if already added
            if (state.investigators.find(i => i.code === inv.code)) {
                setOpen(false);
                return;
            }

            dispatch({
                type: 'ADD_INVESTIGATOR',
                payload: {
                    code: inv.code,
                    name: inv.name,
                    subname: inv.subname,
                    faction_code: inv.faction_code as FactionCode,
                    health: inv.health || 0,
                    sanity: inv.sanity || 0,
                    healthDamage: 0,
                    sanityDamage: 0,
                    actions: 3,
                    maxActions: 3,
                    resources: 5,
                    isEliminated: false,
                },
            });
            setOpen(false);
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between text-zinc-900"
                >
                    {value
                        ? investigators.find((inv) => inv.code === value)?.name
                        : "Add Investigator..."}
                    <Plus className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput placeholder="Search investigator..." />
                    <CommandList>
                        <CommandEmpty>No investigator found.</CommandEmpty>
                        <CommandGroup>
                            {investigators.map((inv) => (
                                <CommandItem
                                    key={inv.code}
                                    value={inv.code}
                                    keywords={[inv.name]}
                                    onSelect={handleSelect}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            state.investigators.find(i => i.code === inv.code) ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {inv.name} <span className="text-xs text-muted-foreground ml-2">({inv.faction_code})</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
