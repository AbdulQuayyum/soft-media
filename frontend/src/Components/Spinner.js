import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

function Spinner({ message }) {
  const theme = localStorage.getItem("color-theme")
  // console.log(theme)

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <ThreeDots
        color={theme === "dark" ? "#fff" : "#000"}
        // height={50}
        // width={200}
        // radius={10}
        height="80"
        width="80"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
        className="m-5"
      />

      <p className="text-lg text-center px-2 transition-all duration-500 dark:text-white">{message}</p>
    </div>
  );
}

export default Spinner;