import { FC, useEffect } from "react";
import { useKeyDown } from "../hooks/useKeyDown";

interface Props {
  text: string;
}

export const InputText: FC<Props> = ({ text }) => {
  
  const { totalCharCount,
        correctChars,
        handleKeyDownInternal,
        wordsWithSpaces,

        currentWordIndex,
        typedCharLocalIndex} = useKeyDown(text);
  
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      handleKeyDownInternal(event, typedCharLocalIndex);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentWordIndex, handleKeyDownInternal, typedCharLocalIndex]);

  return (
    <>
      <h2 className="text-2xl">
        {correctChars} / {totalCharCount}
      </h2>
      <div
        id="words"
        className="word flex flex-wrap gap-1  h-auto overflow-y-auto"
      >
        {wordsWithSpaces.map((word, index) => (
          <span
            id={`word-index-${index}`}
            key={index}
            className={`word text-4xl/14 text-gray-600 
              ${index === currentWordIndex ? "active-word" : ""}
              `}
          >
            {word.split("").map((char, charIndex) => (
              <span
                key={`word-index-${index}-char-${charIndex}`}
                className={`inline-block animate-pulse`}
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