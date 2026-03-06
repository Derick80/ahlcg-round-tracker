"use client"

import { BookOpen, RotateCcw } from "lucide-react"
import { KeywordSearchDialog } from "./KeywordSearchDialog"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useGame } from "@/app/context/GameContext"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function BottomBar() {
    const [isKeywordDialogOpen, setIsKeywordDialogOpen] = useState(false)
    const { state, dispatch } = useGame()

    const handleReset = () => {
        localStorage.removeItem('ahlcg-round-tracker-state-v2')
        dispatch({ type: 'RESET_GAME' })
    }

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-zinc-950 p-2 pb-safe z-50">
                <div className="max-w-md mx-auto flex justify-between items-center">
                    {state.phase !== 'setup' && (
                        <div className="text-zinc-400 font-serif">
                            <span className="text-xs uppercase tracking-widest text-zinc-600 mr-1">Round</span>
                            <span className="text-lg text-amber-500 font-bold">{state.round}</span>
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full h-12 w-12 hover:bg-zinc-800 focus:bg-zinc-800"
                            onClick={() => setIsKeywordDialogOpen(true)}
                        >
                            <BookOpen className="h-6 w-6 text-zinc-300" />
                            <span className="sr-only">Keywords</span>
                        </Button>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full h-12 w-12 hover:bg-zinc-800 focus:bg-zinc-800"
                                >
                                    <RotateCcw className="h-6 w-6 text-red-400" />
                                    <span className="sr-only">Reset Game</span>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-zinc-900 border-zinc-700">
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-zinc-100">Reset Game?</AlertDialogTitle>
                                    <AlertDialogDescription className="text-zinc-400">
                                        This will end your current scenario and return you to character selection. All progress will be lost.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100">
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleReset}
                                        className="bg-red-600 text-white hover:bg-red-700"
                                    >
                                        Reset
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>

            <KeywordSearchDialog
                open={isKeywordDialogOpen}
                onOpenChange={setIsKeywordDialogOpen}
            />
        </>
    )
}

