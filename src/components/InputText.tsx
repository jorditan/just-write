import { FC, useEffect, useState } from "react";

interface Props {
  text: string;
}

export const InputText: FC<Props> = ({ text }) => {
  const words = text.split(' ');

  // Esto hace que la lógica de indexación sea más simple.
  const wordsWithSpaces = text.split(' ').map(word => word + ' ');
  // Aplanar la lista de palabras/espacios en una sola lista de caracteres para facilitar la indexación
  const allChars = wordsWithSpaces.flatMap(word => word.split(''));
  const [typedCharIndex, setTypedCharIndex] = useState<number>(0); // Usaremos este para el renderizado

  console.log("All chars:", allChars);

  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {
      // Previene el comportamiento por defecto de ciertas teclas (ej: 'space' desplaza la página)
      if (event.key.length === 1 || event.key === 'Backspace' || event.key === ' ') {
        event.preventDefault();
      }

      const key = event.key;
      const currentExpectedChar = allChars[typedCharIndex];

      if (key === 'Backspace') {
        setTypedCharIndex(prev => (prev > 0 ? prev - 1 : 0));
        return;
      }

      if (key.length === 1) {
        const isCorrect = key === currentExpectedChar;
        if (isCorrect) {
          console.log("Correct key pressed:", key);
          // 1. Avanzar el índice de caracteres tecleados
          setTypedCharIndex(prev => prev + 1);
          // 2. Lógica para avanzar a la siguiente palabra (si se tecleó un espacio correctamente)
          if (key === ' ' && typedCharIndex === allChars.length - 1) {
            // Final del test
            console.log("¡Test finalizado!");
          }

        } else {
          console.log("Incorrect key pressed:", key, "expected:", currentExpectedChar);
          // En un test real: Aquí marcarías el carácter como error y seguirías avanzando.
          setTypedCharIndex(prev => prev + 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [allChars, typedCharIndex]);


  return (
    <>
      <div id="words" className="word flex flex-wrap gap-1 p-4  h-auto overflow-y-auto">
        {words.map((word, index) => (
          <span id={`word-index-${index}`} key={index} className="text-4xl/14 text-gray-600 animate-pulse">
            {word.split('').map((char, charIndex) => (
              <span key={charIndex} className={`inline-block `}>
                {char}
              </span>
            ))}
          </span>
        ))}
      </div>
    </>
  )
}
