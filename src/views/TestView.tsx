import { InputText } from "../components/InputText"

export const TestView = () => {
  return (
    <>
      <section className="flex  justify-center h-[90vh] w-full">
        <article className="w-3/4 flex flex-col gap-6 justify-center items-center ">
          <InputText text="Esta es una vista de pruebas para verificar la correcta integración de los componentes y funcionalidades de la aplicación." />

        </article>
      </section>
    </>
  )
}
