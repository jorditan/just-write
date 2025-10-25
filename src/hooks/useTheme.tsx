
export const useTheme = () => {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <>
      <div>{isDarkMode ? 'Dark' : 'Light'}</div>
    </>
  )
}
