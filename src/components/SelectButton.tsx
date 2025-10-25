interface Props {
  titleOptions: string;
  options: string[],
  icon?: React.ReactNode;
}

export const SelectButton = ({ options, titleOptions, icon }: Props) => {
  return (
    <>
      <div className="select select-neutral min-w-[50px] max-w-[120px]">
        {icon && <span className="mr-2">{icon}</span>}
        <select defaultValue="Español" >
          <option disabled={true}>{titleOptions}</option>
          {options.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
      </div>
    </>
  )
}
