import words from './words.txt';
export const defaultValue = [
 ["", "", "", "", ""],
 ["", "", "", "", ""],
 ["", "", "", "", ""],
 ["", "", "", "", ""],
 ["", "", "", "", ""],
 ["", "", "", "", ""],
]

export const generateWordSet = async () => {
    let wordSet;
    let todaysWord;
    await fetch(words)
        .then((res) => res.text())
        .then(result => {
            const wordsArray = result.split(/\r?\n/);
            todaysWord = wordsArray[Math.floor(Math.random() * wordsArray.length)]
            wordSet = new Set(wordsArray);
        });
    return { wordSet, todaysWord };
}