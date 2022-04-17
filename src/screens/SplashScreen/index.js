import React, {memo} from 'react';
import styled from 'styled-components';
import {COLORS} from '../../constants/colors';

const SplashScreen = ({navigation}) => {
  return (
    <Container>
      <ContainerSub>
        <SplashImg
          source={{
            uri: 'https://media.giphy.com/media/FAEEL82CUc1JPBas1V/giphy.gif',
          }}
        />
        <TitleTxt>Simple Invoice</TitleTxt>
        <DescTxt>
          An invoice is a time-stamped commercial document that itemizes and
          records a transaction between a buyer and a seller.
        </DescTxt>
      </ContainerSub>
      <GetStarted onPress={() => navigation.replace('HomeScreen')}>
        <GetStartedTxt>GET STARTED</GetStartedTxt>
      </GetStarted>
    </Container>
  );
};

//styles
const Container = styled.View`
  flex: 1;
  align_items: center;
  background_color: ${COLORS.WHITE};
`;

const ContainerSub = styled.View`
  flex: 1;
  justify_content: center;
  align_items: center;
  margin_top: 25%;
`;

const TitleTxt = styled.Text`
  font_size: 29px;
  color: ${COLORS.APP_GRAY};
`;

const DescTxt = styled.Text`
  font_size: 19px;
  text_align: justify;
  margin_horizontal: 10%;
  margin_top: 15%;
  color: ${COLORS.APP_OFF_WHITE};
  line-height: 30px;
`;

const SplashImg = styled.Image`
  width: 200px;
  height: 200px;
  resize_mode: contain;
`;

const GetStarted = styled.TouchableOpacity`
margin_horizontal:15px;
margin_vertical:10%;
background_color:${COLORS.APP_GRAY}
padding:15px;
border-radius:15px;
width:80%;
align_items:center;
`;

const GetStartedTxt = styled.Text`
  font_size: 20px;
  color: ${COLORS.WHITE};
  font_weight: bold;
`;

export default memo(SplashScreen);
