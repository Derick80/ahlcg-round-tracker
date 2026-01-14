'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { GameState, Action, INITIAL_STATE, Phase } from '@/app/types/game';

const GameContext = createContext<{
    state: GameState;
    dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

const STORAGE_KEY = 'ahlcg-round-tracker-state-v2'; // Version bump for schema change

const gameReducer = (state: GameState, action: Action): GameState => {
    switch (action.type) {
        case 'SET_GAME_STATE':
            return action.payload;
        case 'START_GAME':
            return {
                ...INITIAL_STATE,
                phase: 'mythos',
                investigators: action.payload.investigators.map(inv => ({
                    ...inv,
                    actions: 3,
                    maxActions: 3,
                    resources: 5,
                    healthDamage: 0,
                    sanityDamage: 0
                })),
                agendaDoomThreshold: action.payload.doomThreshold,
            };
        case 'SET_PHASE':
            return { ...state, phase: action.payload };
        case 'NEXT_PHASE': {
            const phases: Phase[] = ['mythos', 'investigation', 'enemy', 'upkeep'];
            const currentIdx = phases.indexOf(state.phase);
            let nextPhase = phases[(currentIdx + 1) % phases.length];
            let nextRound = state.round;

            if (state.phase === 'upkeep') {
                nextRound += 1;
                // Upkeep reset logic logic should technically happen IN upkeep or trigger a new round mythos start?
                // Usually Upkeep ends -> Round Ends -> New Round (Mythos)
            }

            return {
                ...state,
                phase: nextPhase,
                round: nextRound,
            };
        }
        case 'ADD_DOOM':
            return { ...state, doom: state.doom + action.payload };
        case 'ADD_INVESTIGATOR':
            return { ...state, investigators: [...state.investigators, { ...action.payload, maxActions: 3 }] };
        case 'REMOVE_INVESTIGATOR':
            return { ...state, investigators: state.investigators.filter(i => i.code !== action.payload) };
        case 'UPDATE_INVESTIGATOR':
            return {
                ...state,
                investigators: state.investigators.map((inv) =>
                    inv.code === action.payload.code ? { ...inv, ...action.payload.updates } : inv
                ),
            };
        case 'RESET_ACTIONS':
            return {
                ...state,
                investigators: state.investigators.map(inv => ({ ...inv, actions: inv.maxActions || 3 }))
            };
        case 'UPDATE_MAX_ACTIONS':
            return {
                ...state,
                investigators: state.investigators.map(inv =>
                    inv.code === action.payload.code ? { ...inv, maxActions: action.payload.value, actions: Math.min(inv.actions, action.payload.value) } : inv
                )
            };
        case 'TAKE_ACTION':
            return {
                ...state,
                investigators: state.investigators.map(inv =>
                    inv.code === action.payload.code ? { ...inv, actions: Math.max(0, inv.actions - 1) } : inv
                )
            };
        case 'ELIMINATE_INVESTIGATOR':
            return {
                ...state,
                investigators: state.investigators.map(inv =>
                    inv.code === action.payload ? { ...inv, isEliminated: true } : inv
                )
            }
        case 'RESET_GAME':
            return INITIAL_STATE;
        default:
            return state;
    }
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                dispatch({ type: 'SET_GAME_STATE', payload: parsed });
            } catch (e) {
                console.error("Failed to parse saved game state", e);
            }
        }
    }, []);

    // Save to local storage on state change
    useEffect(() => {
        if (state !== INITIAL_STATE) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }
    }, [state]);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
