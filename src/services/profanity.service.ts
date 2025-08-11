// // import Filter from 'bad-words';
// import {franc} from "franc";
// import natural from "natural";
// import {PROFANITY_WORDS_EN, PROFANITY_WORDS_UA} from "../utils/profanity-list";
//
// // class ProfanityService {
// //     private filter = new Filter();
// //     public check(text: string) {
// //         if (!text) return { hasProfanity: false, words: [] };
// //         const has = this.filter.isProfane(text);
// //         const words: string[] = [];
// //
// //         if (has) words.push('***PROFANE***');
// //         return { hasProfanity: has, words };
// //     }
// // }
//
// // export const profanityService = new ProfanityService();
//
//
//
// class ProfanityService {
//     private filter = new Filter();
// export function containsProfanity(text: string): boolean {
//
//     if (!text) return false;
//
//     const lang = franc(text, { minLength: 3 });
//     const tokenizer = new natural.WordTokenizer();
//     const words = tokenizer.tokenize(text.toLowerCase());
//
//     let dictionary: string[];
//
//     if (lang === 'ukr') {
//         dictionary = PROFANITY_WORDS_UA;
//     } else if (lang === 'eng') {
//         dictionary = PROFANITY_WORDS_EN;
//     } else {
//         dictionary = [...PROFANITY_WORDS_UA, ...PROFANITY_WORDS_EN];
//     }
//
//     return words.some(word => dictionary.some(bad => word.includes(bad)));
// }
// export const profanityService = new ProfanityService();
