"use client"

import { arkhamKeywords } from "@/app/context/keywords"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

interface KeywordSearchDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function KeywordSearchDialog({ open, onOpenChange }: KeywordSearchDialogProps) {
    return (
        <CommandDialog open={open} onOpenChange={onOpenChange}>
            <CommandInput placeholder="Search keywords..." />
            <CommandList>
                <CommandEmpty>No keyword found.</CommandEmpty>
                <CommandGroup heading="Keywords">
                    {arkhamKeywords.map((kw) => (
                        <CommandItem key={kw.keyword} value={kw.keyword} className="flex flex-col items-start gap-1 p-3">
                            <span className="font-bold text-base text-foreground">{kw.keyword}</span>
                            <span className="text-sm text-muted-foreground leading-relaxed">{kw.definition}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}
