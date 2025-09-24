import type { Hero } from "./hero.interface";

export interface SummaryInfoResponse {
    totalHeroes: number;
    strongestHero: Hero;
    smartestHero: Hero;
    heroCount: number;
    villainCount: number;
}

// export interface EstHero {
//     id:              string;
//     name:            string;
//     slug:            string;
//     alias:           string;
//     powers:          string[];
//     description:     string;
//     strength:        number;
//     intelligence:    number;
//     speed:           number;
//     durability:      number;
//     team:            string;
//     image:           string;
//     firstAppearance: string;
//     status:          string;
//     category:        string;
//     universe:        string;
// }
