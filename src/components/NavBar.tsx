import { Github, Sun } from 'lucide-react'
import { Languages } from 'lucide-react'
import { SelectButton } from './SelectButton'
export const MenuBar = () => {
  return (
    <div>
      <div className="navbar bg-base-200 transparent shadow-sm">
        <div className="navbar-start">
          <SelectButton icon={<Languages width={16} height={16} />} titleOptions="Selecciona un lenguaje" options={['Español', 'Inglés', 'Portugés', 'Francés']} />
        </div>
        <div className="navbar-center">
          <h1 className="btn btn-ghost text-xl">Test de mecanografía</h1>
        </div>
        <div className="navbar-end">

          <div className="tooltip tooltip-left" data-tip="Modo claro">
            <button className="btn btn-ghost btn-circle">
              <Sun />
            </button>

          </div>

          <div className="tooltip tooltip-left" data-tip="Ver en Github">

            <button className="btn btn-ghost btn-circle">
              <Github />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
