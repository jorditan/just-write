import { FC, useEffect, useState } from "react";

interface Props {
  text: string;
}

export const InputText: FC<Props> = ({ text }) => {
  const words = text.split(" ");
  const [correctChars, setCorrectChars] = useState<number>(0);

  const wordsWithSpaces = text.split(" ").map((word) => word + " ");
  const allChars = wordsWithSpaces.flatMap((word) => word.split(""));
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [typedCharGlobalIndex, setTypedCharGlobalIndex] = useState<number>(0);

  const currentExpectedChar = allChars[typedCharGlobalIndex];

  // const addCarretStyle = (currentCharId: string) => {
  //   const charDom = document.getElementById(currentCharId);
  //   charDom?.classList.add('carret');
  // }

  // const removeCarretStyle = (currentCharId: string) => {
  //   const charDom = document.getElementById(currentCharId);
  //   charDom?.classList.remove("carret");
  // };

  const handleStyle = (currentWordIndex: number, idString: number, key:string, expectedChar:string)  => {
    const charDom = document.getElementById(
      `word-index-${currentWordIndex}-char-${idString}`,
    );

    if(charDom) {
      if(key === expectedChar){
        charDom.classList.add("correct");
      } else {
        charDom.classList.add("incorrect");
      }
    }
  }


  const removeStyles = (idString: number) => {
    const charDom = document.getElementById(
      `word-index-${currentWordIndex}-char-${idString}`,
    );
    charDom?.classList.remove("correct");
    charDom?.classList.remove("incorrect");
  };

  const handleKeyDownInternal = (
    event: KeyboardEvent,
    typedCharLocalIndex: number,
  ) => {
    handleActiveWord(currentWordIndex);
    const key = event.key;
    if (key.length !== 1 && event.key !== "Backspace") {
      return;
    }

    if (key === " ") {
      const newIndexWord = currentWordIndex + 1;
      setCurrentWordIndex(newIndexWord);
      handleActiveWord(newIndexWord);

      const startOfNewWordGlobalIndex = wordsWithSpaces
        .slice(0, newIndexWord)
        .reduce((acc, w) => acc + w.length, 0);

      // Si nos pasamos del número de palabras, ponemos el índice al final de todos los caracteres
      const boundedIndex = Math.min(startOfNewWordGlobalIndex, allChars.length);
      setTypedCharGlobalIndex(boundedIndex);
      return;
    }

    if (key === "Backspace") {
      handleBackspace(typedCharLocalIndex);
      return;
    }

    handleStyle(currentWordIndex, typedCharGlobalIndex, key, currentExpectedChar);
    setTypedCharGlobalIndex((prev) => prev + 1);
  };


  const handleActiveWord = (index: number) => {
    if (index > 0) {
      const previousWordDom = document.getElementById(
        `word-index-${index - 1}`,
      );
      if (previousWordDom) {
        previousWordDom.classList.remove("active-word");
      }
    }
    const activeWordDom = document.getElementById(`word-index-${index}`);
    if (activeWordDom) {
      activeWordDom.classList.add("active-word");
    }
  };

  const handleBackspace = (typedCharLocalIndex: number) => {
    setTypedCharGlobalIndex((prev) => (prev > 0 ? prev - 1 : 0));
    removeStyles(typedCharLocalIndex - 1);
    if (typedCharLocalIndex === 0) {
      setCurrentWordIndex((prev) => (prev > 0 ? prev - 1 : 0));
      handleActiveWord(currentWordIndex);
    }
  };

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const startOfCurrentWordGlobalIndex = wordsWithSpaces
        .slice(0, currentWordIndex)
        .reduce((acc, word) => acc + word.length, 0);

      const typedCharLocalIndex =
        typedCharGlobalIndex - startOfCurrentWordGlobalIndex;
      handleKeyDownInternal(event, typedCharLocalIndex);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentExpectedChar, typedCharGlobalIndex, currentWordIndex]);

  return (
    <>
      <h2 className="text-2xl">
        {correctChars} / {allChars.length}
      </h2>
      <div
        id="words"
        className="word flex flex-wrap gap-1  h-auto overflow-y-auto"
      >
        {words.map((word, index) => (
          <span
            id={`word-index-${index}`}
            key={index}
            className={`word text-4xl/14 text-gray-600 
              ${index === currentWordIndex ? "active-word" : ""}
              `}
          >
            {word.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                className={`inline-block animate-pulse
                  `}
                id={`word-index-${index}-char-${charIndex}`}
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </div>
    </>
  );
};
