import { useState } from "react";

export const useKeyDown = (text: string) => {
    const wordsWithSpaces = text.split(" ").map((word, index, arr) => {
        return index < arr.length - 1 ? word + " " : word
    });

    const words = text.split(" ");
    const allChars = wordsWithSpaces.flatMap((word) => word.split(""));
    const totalCharCount = words.reduce((accumulator, currentValue) => accumulator + currentValue.length, 0);

    const [correctChars, setCorrectChars] = useState<number>(0);
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
    const [typedCharGlobalIndex, setTypedCharGlobalIndex] = useState<number>(0);

    const currentExpectedChar = allChars[typedCharGlobalIndex];

    const startOfCurrentWordGlobalIndex = wordsWithSpaces
        .slice(0, currentWordIndex)
        .reduce((acc, word) => acc + word.length, 0);
    
    const typedCharLocalIndex = typedCharGlobalIndex - startOfCurrentWordGlobalIndex;

    const pickWordDom = (index: number) => {
        return document.getElementById(`word-index-${index}`);
    }

    const pickCharDom = (indexWord: number, indexChar: number) => {
        return document.getElementById(`word-index-${indexWord}-char-${indexChar}`)
    }

    const handleStyle = (currentWordIndex: number, indexChar: number, key: string, expectedChar: string) => {
        const charDom = pickCharDom(currentWordIndex, indexChar);

        if (key === expectedChar) {
            charDom?.classList.add("correct");
            setCorrectChars((prev) => prev + 1);
        } else {
            charDom?.classList.add("incorrect");
        }
    }

    const removeStyles = (indexChar: number) => {
        const charDom = pickCharDom(currentWordIndex, indexChar);

        if (charDom?.classList.contains("correct")) {
            setCorrectChars((prev) => (prev > 0 ? prev - 1 : 0));
        }
        charDom?.classList.remove("correct");
        charDom?.classList.remove("incorrect");
    };

    const handleKeyDownInternal = (event: KeyboardEvent, typedCharLocalIndex: number,) => {
        handleActiveWord(currentWordIndex);
        const key = event.key;

        if (key.length !== 1 && event.key !== "Backspace") return;
        if (key === " ") {handleSpace();return;}
        if (key === "Backspace") {handleBackspace(typedCharLocalIndex); return;}

        handleStyle(currentWordIndex, typedCharLocalIndex, key, currentExpectedChar);
        setTypedCharGlobalIndex((prev) => prev + 1);
    };

    const handleActiveWord = (indexWord: number) => {
        if (indexWord > 0) {
            const previousWordDom = pickWordDom(indexWord-1)
            previousWordDom?.classList.remove("active-word");
        }
        const activeWordDom = pickWordDom(indexWord);
        activeWordDom ? activeWordDom.classList.add("active-word") : ""
    };


    const handleBackspace = (typedCharLocalIndex: number) => {
        setTypedCharGlobalIndex((prev) => (prev > 0 ? prev - 1 : 0));
        removeStyles(typedCharLocalIndex - 1);
        if (typedCharLocalIndex === 0) {
            setCurrentWordIndex((prev) => (prev > 0 ? prev - 1 : 0));
            handleActiveWord(currentWordIndex);
        }
    };

    const handleSpace = () => {
        const newIndexWord = currentWordIndex + 1;
        setCurrentWordIndex(newIndexWord);
        handleActiveWord(newIndexWord);

        const startOfNewWordGlobalIndex = wordsWithSpaces
            .slice(0, newIndexWord)
            .reduce((acc, w) => acc + w.length, 0);

        const boundedIndex = Math.min(startOfNewWordGlobalIndex, allChars.length);
        setTypedCharGlobalIndex(boundedIndex);
    }


    return {
        totalCharCount,
        correctChars,
        wordsWithSpaces,
        startOfCurrentWordGlobalIndex,
        typedCharLocalIndex,

        handleActiveWord,
        handleBackspace,
        handleKeyDownInternal,
        handleSpace,
        handleStyle,
        removeStyles,

        currentExpectedChar,
        currentWordIndex,
        typedCharGlobalIndex,
        setCurrentWordIndex,
        setTypedCharGlobalIndex,
    }
};