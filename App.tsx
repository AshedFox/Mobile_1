import MainNavigator from "./app/navigation/MainNavigator";
import {useEffect, useState} from "react";
import LoadingScreen from "./app/screens/LoadingScreen";
import MainScreen from "./app/screens/MainScreen";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setTimeout(() => {setIsLoading(false)}, 2000);
  }, [])

  if (isLoading) {
    return (
        <LoadingScreen/>
    )
  }

  return <MainScreen/>;
}

export default App;
