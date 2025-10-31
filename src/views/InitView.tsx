import { CustomModal } from "../components/CustomModal";

export const InitView = () => {
  return (
    <>
      <section className="flex items-center justify-center h-[90vh] w-full">
        <article className="w-2/4 flex flex-col gap-6 justify-center items-center ">
          <h1 className="text-5xl font-bold">Poné a prueba tu mecanografía</h1>
          <p className="font-medium text-center text-base">
            Al realizar la prueba, vas a descubrir cuán{" "}
            <span className="font-bold text-neutral-content">
              rápido y preciso
            </span>{" "}
            escribís en el teclado. Podrás conocer tu velocidad de mecanografía,
            identificar errores y mejorar tu técnica para escribir
          </p>
          <div className="flex flex-row gap-2 items-center">
            <button className="btn btn-neutral">Comenzar test</button>
            <CustomModal
              buttonText="¿Qué es la mecanografía?"
              buttonType="outline"
              modalTitle="¿Qué es la mecanografía?"
              modalContent="La mecanografía es la habilidad de escribir en un teclado de manera rápida y precisa sin mirar las teclas."
              video="/sci-fi-typing.gif"
              videoAlt="Sci-Fi Typing Animation"
            />
          </div>
        </article>
      </section>
    </>
  );
};
