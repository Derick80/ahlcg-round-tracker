export interface ArkhamKeyword {
  keyword: string;
  definition: string;
}

export const arkhamKeywords: ArkhamKeyword[] = [
  {
    keyword: "Alert",
    definition:
      "Each time an investigator fails a skill test while attempting to evade an enemy with the alert keyword, after applying all results for that skill test, that enemy performs an attack against the evading investigator. An enemy does not exhaust after performing an alert attack. This attack occurs whether the enemy is engaged with the evading investigator or not."
  },
  {
    keyword: "Aloof",
    definition:
      "An enemy with the aloof keyword does not automatically engage investigators at its location."
  },
  {
    keyword: "Exceptional",
    definition:
      "A card with the exceptional keyword costs twice its printed experience cost to purchase. A player’s investigator deck cannot include more than 1 copy (by title) of any given exceptional card."
  },
  {
    keyword: "Massive",
    definition:
      "A ready enemy with the massive keyword is considered to be engaged with each investigator at the same location as it."
  },
  {
    keyword: "Partner",
    definition:
      "Partner is a keyword ability that appears on the nine story assets in the Expedition Team encounter set. Each of these assets represents a powerful ally whom investigators can bring along during scenarios in this campaign to improve their chances of success. However, bringing an asset with the partner keyword endangers that asset, with the risk of losing them permanently."
  },
  {
    keyword: "Patrol",
    definition:
      "During the enemy phase (in framework step 3.2), each ready, unengaged enemy with the patrol keyword moves to a connecting location along the shortest path toward the designated target (as described in parentheses next to the word 'patrol')."
  },
  {
    keyword: "Peril",
    definition:
      "While resolving the drawing of an encounter card with the peril keyword, an investigator cannot confer with the other players. Those players cannot play cards, trigger abilities, or commit cards to that investigator’s skill test(s) while the peril encounter is resolving."
  },
  {
    keyword: "Permanent",
    definition:
      "A card with the permanent keyword does not count towards your deck size."
  },
  {
    keyword: "Retaliate",
    definition:
      "If an investigator fails a skill test while attacking an enemy that has the retaliate keyword, the enemy (if it is ready) performs its attack (damage and horror) against the investigator."
  },
  {
    keyword: "Surge",
    definition:
      "After an investigator draws and resolves an encounter card that has the surge keyword, that investigator must draw and resolve an additional card."
  },
  {
    keyword: "Uses (X)",
    definition:
      "The uses keyword creates and defines a particular token type to be placed on a card when that card enters play. The value following the keyword indicates a number of resource tokens to be placed on the card to represent the specified token type."
  },
  {
    keyword: "Veiled",
    definition:
      "This keyword represents that a location contains unknown lore or assistance that must be sought out by the investigators before it can be of use to them."
  }
];