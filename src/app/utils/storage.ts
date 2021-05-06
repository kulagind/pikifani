import { Letters } from "@interfaces/chat";

const EMPTY_LETTERS = {
    l1: '',
    l2: '',
    l3: '',
    l4: '',
    l5: '',
    l6: ''
}

export function storageLetters(gameId: string, letters?: Letters): Letters {
    if (!letters) {
        const parsedLetters = JSON.parse(localStorage.getItem(gameId));
        return parsedLetters ? parsedLetters : EMPTY_LETTERS;
    }
    localStorage.setItem(gameId, JSON.stringify(letters));
    return letters; 
}