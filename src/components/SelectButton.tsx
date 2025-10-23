interface Props {
  titleOptions: string;
  options: string[],
  icon?: React.ReactNode;
}

export const SelectButton = ({ options, titleOptions }: Props) => {
  return (
    <>
      <select defaultValue="Español" className="select select-neutral min-w-[50px] max-w-[120px]">
        <option disabled={true}>{titleOptions}</option>
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </>
  )
}
