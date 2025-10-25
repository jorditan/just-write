import { FC, useEffect, useState } from "react";

interface Props {
  text: string;
}

export const InputText: FC<Props> = ({ text }) => {
  const words = text.split(' ');

  // Esto hace que la lógica de indexación sea más simple.
  const wordsWithSpaces = text.split(' ').map(word => word + ' ');
  const allChars = wordsWithSpaces.flatMap(word => word.split(''));
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [typedCharGlobalIndex, settypedCharGlobalIndex] = useState<number>(0);

  const currentExpectedChar = allChars[typedCharGlobalIndex];
  const currentWord = wordsWithSpaces[currentWordIndex];



  useEffect(() => {
    console.log(typedCharGlobalIndex)
    const startOfCurrentWordGlobalIndex = wordsWithSpaces
      .slice(0, currentWordIndex)
      .reduce((acc, word) => acc + word.length, 0);

    // EL ÍNDICE CLAVE: Índice del carácter dentro de la palabra actual (0, 1, 2, ...)
    const typedCharLocalIndex = typedCharGlobalIndex - startOfCurrentWordGlobalIndex;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.length === 1 || event.key === 'Backspace' || event.key === ' ') {
        event.preventDefault();
      }

      const key = event.key;

      if (currentExpectedChar === ' ') {
        setCurrentWordIndex(prev => prev + 1);
      }

      if (key === 'Backspace') {
        settypedCharGlobalIndex(prev => (prev > 0 ? prev - 1 : 0));
        return;
      }

      if (key.length === 1) {
        const isCorrect = key === currentExpectedChar;
        if (isCorrect) {
          handleCorrectStyle();
          settypedCharGlobalIndex(prev => prev + 1);
        } else {
          handleIncorrectStyle();
          settypedCharGlobalIndex(prev => prev + 1);
        }
      }
    };


    const handleCorrectStyle = () => {
      const charDom = document.getElementById(`word-index-${currentWordIndex}-char-${typedCharLocalIndex}`);
      charDom?.classList.remove('incorrect');
      charDom?.classList.add('correct');
    }

    const handleIncorrectStyle = () => {
      const charDom = document.getElementById(`word-index-${currentWordIndex}-char-${typedCharLocalIndex}`);
      charDom?.classList.remove('correct');
      charDom?.classList.add('incorrect');
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [allChars, wordsWithSpaces, currentWordIndex, currentExpectedChar, currentWord, typedCharGlobalIndex]);




  return (
    <>
      <div id="words" className="word flex flex-wrap gap-1 p-4  h-auto overflow-y-auto">
        {words.map((word, index) => (
          <span
            id={`word-index-${index}`}
            key={index}
            className={
              `word text-4xl/14 text-gray-600 `
            }>
            {word.split('').map((char, charIndex) => (
              <span key={charIndex}
                className={`inline-block animate-pulse
                  `}
                id={`word-index-${index}-char-${charIndex}`}>
                {char}
              </span>
            ))}
          </span>
        ))}
      </div>
    </>
  )
}
