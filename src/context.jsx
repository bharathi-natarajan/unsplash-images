import { useContext, createContext, useState } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [search, setSearch] = useState('shoes')

  const toggleDarkTheme = () => {
    const newTheme = !isDarkTheme
    setIsDarkTheme(newTheme)

    document.body.classList.toggle('dark-theme', newTheme)
  }

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, search, setSearch }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => useContext(AppContext)
