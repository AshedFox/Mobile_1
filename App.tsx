import {useEffect, useState} from "react";
import LoadingScreen from "./app/screens/LoadingScreen";
import {NavigationContainer} from "@react-navigation/native";
import StackNavigator from "./app/navigation/StackNavigator";

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

  return (
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
  );
}

export default App;
