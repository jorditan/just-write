import { MenuBar } from "../components/MenuBar"

export const TestView = () => {
  return (
    <>
      <section className="flex  justify-center h-[90vh] w-full">
        <article className="w-3/4 flex flex-col gap-6 justify-center items-center ">
          <MenuBar items={['Puntuación', 'Números', 'Stats']} />
          <p className="text-left text-4xl/14 line">Esta es una vista de pruebas para verificar la correcta integración de los componentes y funcionalidades de la aplicación.</p>
        </article>
      </section>
    </>
  )
}
