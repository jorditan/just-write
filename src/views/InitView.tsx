
export const InitView = () => {
  return (
    <>
      <section className="flex flex-col gap-6 items-center justify-center h-screen w-screen">
        <h1 className="text-5xl font-bold">
          Poné a prueba tu mecanografía
        </h1>
        <div className="flex flex-row gap-2 items-center">
          <button className="btn btn-neutral">
            Iniciar prueba
          </button>
          <button className="btn btn-outline btn-primary">
            ¿Qué es la mecanografía?
          </button>
        </div>
      </section>
    </>
  )
}
