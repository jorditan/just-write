import { ThemeController } from "./ThemeController";
export const MenuBar = () => {
  return (
    <div>
      <div className="navbar shadow-sm">
        <div className="w-full">
          <h1 className="btn btn-ghost text-xl">Test de mecanografía</h1>
        </div>
        <div className="navbar-end">
          <ThemeController />
        </div>
      </div>
    </div>
  );
};
