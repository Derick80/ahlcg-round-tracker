export type Phase = 'setup' | 'mythos' | 'investigation' | 'enemy' | 'upkeep';

export type FactionCode = 'guardian' | 'seeker' | 'rogue' | 'mystic' | 'survivor' | 'neutral';

export interface Investigator {
    code: string;
    name: string;
    subname: string | null;
    faction_code: FactionCode;
    health: number;
    sanity: number;
    healthDamage: number;
    sanityDamage: number;
    actions: number;
    maxActions: number;
    resources: number;
    isEliminated: boolean;
}

export interface GameState {
    round: number;
    phase: Phase;
    doom: number;
    agendaDoomThreshold: number;
    investigators: Investigator[];
}

export type Action =
    | { type: 'SET_GAME_STATE'; payload: GameState }
    | { type: 'START_GAME'; payload: { investigators: Investigator[]; doomThreshold: number } }
    | { type: 'SET_PHASE'; payload: Phase }
    | { type: 'NEXT_PHASE' }
    | { type: 'ADD_DOOM'; payload: number }
    | { type: 'ADD_INVESTIGATOR'; payload: Investigator }
    | { type: 'REMOVE_INVESTIGATOR'; payload: string } // code
    | { type: 'UPDATE_INVESTIGATOR'; payload: { code: string; updates: Partial<Investigator> } }
    | { type: 'RESET_ACTIONS' }
    | { type: 'TAKE_ACTION'; payload: { code: string } } // decrement action
    | { type: 'UPDATE_MAX_ACTIONS'; payload: { code: string; value: number } }
    | { type: 'DRAW_ENCOUNTER' } // Just a trigger for UI maybe? Or logging?
    | { type: 'ELIMINATE_INVESTIGATOR'; payload: string }
    | { type: 'RESET_GAME' };

export const INITIAL_STATE: GameState = {
    round: 1,
    phase: 'setup',
    doom: 0,
    agendaDoomThreshold: 0,
    investigators: [],
};
