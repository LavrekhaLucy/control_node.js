import { franc } from 'franc';
import natural from 'natural';
import {PROFANITY_WORDS_EN, PROFANITY_WORDS_UA} from './profanity-list';


export function containsProfanity(text: string): { hasProfanity: boolean; words: string[] } {
    if (!text) return { hasProfanity: false, words: [] };

    const cleanText = text.toLowerCase().replace(/[^\w\s]/g, ' ');
    const tokenizer = new natural.WordTokenizer();
    const words = tokenizer.tokenize(cleanText);

    const lang = franc(text, { minLength: 3 });

    let dictionary: string[];
    if (lang === 'ukr') {
        dictionary = PROFANITY_WORDS_UA;
    } else if (lang === 'eng') {
        dictionary = PROFANITY_WORDS_EN;
    } else {
        dictionary = [...PROFANITY_WORDS_UA, ...PROFANITY_WORDS_EN];
    }

    const profaneWords = words.filter(word => dictionary.includes(word));

    return {
        hasProfanity: profaneWords.length > 0,
        words: profaneWords
    };
}