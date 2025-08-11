// import Filter from 'bad-words';

// class ProfanityService {
//     private filter = new Filter();
//     public check(text: string) {
//         if (!text) return { hasProfanity: false, words: [] };
//         const has = this.filter.isProfane(text);
//         const words: string[] = [];
//         // bad-words не повертає слова — спрощено: якщо profane, повернемо placeholder
//         if (has) words.push('***PROFANE***');
//         return { hasProfanity: has, words };
//     }
// }
//
// export const profanityService = new ProfanityService();
