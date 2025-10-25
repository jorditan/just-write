import { FC, useEffect, useState } from "react";

interface Props {
  word: string;
  id: number;
  lastCharClicked: string | undefined;
}

export const WordComponent: FC<Props> = ({ word, id, lastCharClicked }) => {
  const [currentChar, setCurrentChar] = useState<number>(0);

  const handleCorrectKey = (lastCharClicked: string | undefined, currentChar: string) => {
    if (lastCharClicked === currentChar) {
      console.log("Correct key pressed:", lastCharClicked);
      setCurrentChar(prev => prev + 1);
    }

    if (lastCharClicked === 'backspace') {
      console.log("Backspace pressed");
      setCurrentChar(prev => (prev > 0 ? prev - 1 : 0));
      return;
    }
  }


  useEffect(() => {
    handleCorrectKey(lastCharClicked, word[currentChar]);
  }, [lastCharClicked, word, currentChar]);

  return (
    <span id={`word-index-${id}`} className="text-4xl/14 text-gray-600 animate-pulse">

      {word.split('').map((char, charIndex) => (
        <span onKeyDown={() => handleCorrectKey(lastCharClicked, char)} key={charIndex} className={`inline-block `}>
          {char}
        </span>
      ))}
    </span>
  )
}


