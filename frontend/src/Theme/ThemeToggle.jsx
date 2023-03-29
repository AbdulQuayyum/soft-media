import React from 'react'
import { FaSun, FaMoon } from "react-icons/fa"
import { ThemeContext } from '../Contexts/ThemeContext'

const Toggler = () => {
    const { theme, setTheme } = React.useContext(ThemeContext)

    return (
        <div className="transition duration-500 ease-in-out flex justify-center items-center">
            {theme === 'dark' ? (
                <FaSun
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="text-gray-500 dark:text-gray-400 w-6 h-6 md:w-8 md:h-6 flex justify-center items-center cursor-pointer"
                />
            ) : (
                <FaMoon
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="text-gray-500 dark:text-gray-400 w-6 h-6 md:w-8 md:h-6 flex justify-center items-center cursor-pointer"
                />
            )}
        </div>
    )
}

export default Toggler