import React from "react"

const Background = ({ children }) => {
  return (
    <>
      <div className="transition-all duration-1000 min-h-screen bg-[#fff] dark:bg-[#1c1c24]">
        {children}
      </div>
    </>
  )
}

export default Background
