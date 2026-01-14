
export interface ArkhamCard {
    code: string;
    name: string;
    subname: string;
    faction_code: string;
    type_code: string;
    health?: number;
    sanity?: number;
    imagesrc?: string;
    // ... other fields
}

export async function fetchInvestigators(): Promise<ArkhamCard[]> {
    try {
        const response = await fetch('https://arkhamdb.com/api/public/cards/?type_code=investigator');
        if (!response.ok) {
            throw new Error('Failed to fetch investigators');
        }
        const data = await response.json();
        // Filter out duplicate investigators (ArkhamDB has diff versions/book promos)
        // We generally want the base version or unqiue by name if possible, but user might want specific art.
        // For simplicity, we return all, but client side filtering might be needed.
        return data.filter((card: ArkhamCard) => card.type_code === 'investigator');
    } catch (error) {
        console.error("Error fetching investigators", error);
        return [];
    }
}
