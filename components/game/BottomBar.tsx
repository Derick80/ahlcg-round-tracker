"use client"

import { BookOpen } from "lucide-react"
import { KeywordSearchDialog } from "./KeywordSearchDialog"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function BottomBar() {
    const [isKeywordDialogOpen, setIsKeywordDialogOpen] = useState(false)

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-zinc-950 p-2 pb-safe z-50">
                <div className="max-w-md mx-auto flex justify-center items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-12 w-12 hover:bg-zinc-800 focus:bg-zinc-800"
                        onClick={() => setIsKeywordDialogOpen(true)}
                    >
                        <BookOpen className="h-6 w-6 text-zinc-300" />
                        <span className="sr-only">Keywords</span>
                    </Button>
                    {/* Future icons go here */}
                </div>
            </div>

            <KeywordSearchDialog
                open={isKeywordDialogOpen}
                onOpenChange={setIsKeywordDialogOpen}
            />
        </>
    )
}
