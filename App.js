import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import MainNavigator from './src/Navigation';
import NoInternet from './src/Screens/NoInternet';
import styled from 'styled-components';
import {COLORS} from './src/Components/Constants/Colors';

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
    <SafeAreaView>
      {isConnected ? <MainNavigator /> : <NoInternet />}
    </SafeAreaView>
  );
};

// define your styles
const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background_color: ${COLORS.WHITE};
`;

export default App;
