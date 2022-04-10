//import liraries
import React, {memo, useEffect} from 'react';
import styled from 'styled-components';

// create a component
const SplashScreen = ({navigation}) => {
  useEffect(() => {
    //navigate home screen after few seconds
    setTimeout(() => {
      navigation.navigate('HomeScreen');
    }, 3000);
  }, []);

  return (
    <Container>
      <TitleTxt>Simple Invoice</TitleTxt>
      <Loader size="small" />
    </Container>
  );
};

//styles
const Container = styled.View`
  flex: 1;
  justify_content: center;
  align_items: center;
`;

const TitleTxt = styled.Text`
  font_size: 29px;
`;

const Loader = styled.ActivityIndicator`
  margin_vertical: 10px;
`;

//make this component available to the app
export default memo(SplashScreen);
