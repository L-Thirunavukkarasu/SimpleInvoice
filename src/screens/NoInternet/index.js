import React, {memo} from 'react';
import styled from 'styled-components';
import {COLORS} from '../../Components/Constants/Colors';

const NoInternet = () => {

  return (
    <Container>
      <ImgView source={require('../../Assets/Images/noInternet.png')} />
      <InnerRedLine />
      <StatusTxt>{'No internet connection'}</StatusTxt>
      <DescText>
        {
          'Please make sure that Wi-Fi or mobile \ndata is turned on and try again.'
        }
      </DescText>
    </Container>
  );
};

//styles
const Container = styled.SafeAreaView`
  flex: 1;
  justify_content: center;
  align_items: center;
  background_color: ${COLORS.WHITE};
`;

const StatusTxt = styled.Text`
  font_size: 24px;
  margin_top: 15px;
  color: ${COLORS.APP_GRAY};
  text_align:center;
  font_weight: 600;
  line_height: 30px;
`;

const DescText = styled.Text`
  font_size: 16px;
  color: ${COLORS.APP_OFF_WHITE}
  width: 93%;
  font_weight: 400;
  text_align: center;
  line_height: 23px;
  margin_top:10px;
`;

const ImgView = styled.Image`
  resize_mode: contain;
`;

const InnerRedLine = styled.View`
  width: 10%;
  align_self: center;
  background_color: ${COLORS.APP_RED};
  height: 3px;
  margin_bottom: 10px;
`;

export default memo(NoInternet);
