//import liraries
import React, { useEffect,useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from './src/screens/NoInternet'

// create a component
const App = () => {

  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    //subscribe to network state updates
    const unSubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      //unsubscribe to network state updates
      unSubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      {isConnected ?  <Text>App</Text> : <NoInternet />}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default App;
