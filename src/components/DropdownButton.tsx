import { FC } from "react";

interface Props {
  items: string[];
  icon?: React.ReactNode;
}

export const DropdownButton: FC<Props> = ({ items, icon }) => {
  return (
    <div>
      <div className="dropdown w-fit">
        <div tabIndex={0} role="button" className="btn m-1 btn-outline">
          {icon}
          Lenguaje: {items[0]}
        </div>
        <ul
          tabIndex={-1}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          {items.map((item, index) => (
            <li key={index}>
              <a>{item}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
