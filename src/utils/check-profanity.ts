import { PROFANITY_WORDS_UA, PROFANITY_WORDS_EN } from './profanity-list';
import { franc } from 'franc';
import natural from 'natural';

export function containsProfanity(text: string): boolean {

    if (!text) return false;

    const lang = franc(text, { minLength: 3 });
    const tokenizer = new natural.WordTokenizer();
    const words = tokenizer.tokenize(text.toLowerCase());

    let dictionary: string[];

    if (lang === 'ukr') {
        dictionary = PROFANITY_WORDS_UA;
    } else if (lang === 'eng') {
        dictionary = PROFANITY_WORDS_EN;
    } else {
        dictionary = [...PROFANITY_WORDS_UA, ...PROFANITY_WORDS_EN];
    }

    return words.some(word => dictionary.some(bad => word.includes(bad)));
}
