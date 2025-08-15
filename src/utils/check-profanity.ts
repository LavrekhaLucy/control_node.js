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
// import { franc } from 'franc';
// import natural from 'natural';
// import { PROFANITY_WORDS_UA, PROFANITY_WORDS_EN } from './profanity-dictionaries';

// export function containsProfanity(text: string): boolean {
//     if (!text) return false;
//
//     // Розпізнаємо мову, якщо текст достатньо довгий
//     const lang = franc(text, { minLength: 3 });
//
//     // Токенізуємо текст на слова
//     const tokenizer = new natural.WordTokenizer();
//     const words = tokenizer.tokenize(text.toLowerCase());
//
//     // Фільтруємо слова: мінімум 3 символи, букви (щоб уникнути цифр та символів)
//     const cleanWords = words.filter(w => w.length > 2 && /[a-zа-я]/i.test(w));
//
//     // Вибираємо словник
//     let dictionary: string[];
//     if (lang === 'ukr') {
//         dictionary = PROFANITY_WORDS_UA;
//     } else if (lang === 'eng') {
//         dictionary = PROFANITY_WORDS_EN;
//     } else {
//         // Якщо мова не визначена або короткий текст — перевіряємо обидва словники
//         dictionary = [...PROFANITY_WORDS_UA, ...PROFANITY_WORDS_EN];
//     }
//
//     // Перевіряємо точний збіг слів
//     return cleanWords.some(word => dictionary.includes(word));
// }

import { franc } from 'franc';
import natural from 'natural';
import {PROFANITY_WORDS_EN, PROFANITY_WORDS_UA} from "./profanity-list";

export function containsProfanity(text: string): boolean {
    if (!text) return false;

    // Видаляємо небажані символи, залишаємо лише слова
    const cleanText = text.toLowerCase().replace(/[^\w\s]/g, ' ');

    // Розбиваємо текст на слова
    const tokenizer = new natural.WordTokenizer();
    const words = tokenizer.tokenize(cleanText);

    // Визначаємо мову
    const lang = franc(text, { minLength: 3 });

    let dictionary: string[];
    if (lang === 'ukr') {
        dictionary = PROFANITY_WORDS_UA;
    } else if (lang === 'eng') {
        dictionary = PROFANITY_WORDS_EN;
    } else {
        dictionary = [...PROFANITY_WORDS_UA, ...PROFANITY_WORDS_EN];
    }

    // Перевіряємо точне співпадіння
    return words.some(word => dictionary.includes(word));
}

