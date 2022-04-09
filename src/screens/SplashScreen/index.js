//import liraries
import React, {memo, useEffect} from 'react';
import styled from 'styled-components';
import {callPostApi} from '../../Api';

// create a component
const SplashScreen = ({navigation}) => {
  //navigate home screen after few seconds
  useEffect(() => {
    getAccessToken();
  }, []);

  const getAccessToken = async () => {
    let body = {
      grant_type: 'client_credentials',
      scope: 'PRODUCTION',
    };

    let header = {
      Authorization:
        'Basic TGJUZVVFT2RpTEhhZzV4aUxpWDdPQ3ZFbmZNYTpiWVNtbFRBakxsVDJuWEc1SVh2QjNLRDdvVm9h',
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };

    let response = await callPostApi('token', body, header);
    console.log('api-response-splash', response);
    setTimeout(() => {
      //navigation.navigate('HomeScreen');
    }, 300);
  };

  return (
    <Container>
      <TitleTxt>Simple Invoice</TitleTxt>
      <Loader size="small" />
    </Container>
  );
};

// define your styles
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
