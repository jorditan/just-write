interface Props {
  items: string[],
}

export const MenuBar = ({ items }: Props) => {
  return (
    <>
      <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">

        {items.map((item, index) => (
          <li key={index}><a>{item}</a></li>

        ))}
      </ul>
    </>
  )
}
