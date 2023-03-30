import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnalyticsWrapper } from "./Components/Analytics";

import MainRoutes from "./Routes/Main.Routes";

const App = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const userInfo = localStorage.getItem('User') !== 'undefined' ? JSON.parse(localStorage.getItem('User')) : localStorage.clear();

    if (!userInfo) navigate('/Login')
  })

  return (
    <>
      < AnalyticsWrapper />
      <MainRoutes />
    </>
  );
}

export default App;
