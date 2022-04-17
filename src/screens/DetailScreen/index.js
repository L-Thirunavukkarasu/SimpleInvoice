import React, {memo} from 'react';
import styled from 'styled-components';
import {COLORS} from '../../constants/colors';
import RenderTxtView from '../../components/rendertxtview';

const DetailScreen = ({route}) => {
  //retrieve data from navigation params
  const {data} = route.params;

  return (
    <SafeAreaView>
      <ScrollView>
        <DetailParent>
          {data?.status[0]?.key ? (
            <InvoiceStatus invoiceStatus={data?.status[0]?.key}>
              <InvoiceStatusTxt>{data?.status[0]?.key}</InvoiceStatusTxt>
            </InvoiceStatus>
          ) : null}
          <RenderTxtView keyVal={'Type'} value={data?.type} />
          <RenderTxtView keyVal={'Invoice ID'} value={data?.invoiceId} />
          <RenderTxtView keyVal={'Invoice No'} value={data?.invoiceNumber} />
          <RenderTxtView keyVal={'Invoice Date'} value={data?.invoiceDate} />
          <RenderTxtView keyVal={'Due Date'} value={data?.dueDate} />
          {data?.currencySymbol && data?.totalAmount ? (
            <RenderTxtView
              keyVal={'Amount'}
              value={`${data?.currencySymbol} ${data?.totalAmount}`}
            />
          ) : null}
          <RenderTxtView keyVal={'Currency'} value={data?.currency} />
          <RenderTxtView keyVal={'Version'} value={data?.version} />
          <RenderTxtView keyVal={'Description'} value={data?.description} />
        </DetailParent>
      </ScrollView>
    </SafeAreaView>
  );
};

//styles
const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background_color: ${COLORS.WHITE};
  margin_vertical: 15px;
  margin_horizontal: 15px;
  padding_vertical: 15px;
  padding_horizontal: 15px;
  border_radius: 10px;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
`;

const DetailParent = styled.View`
  flex: 1;
`;

const InvoiceStatus = styled.View`
  align_self: center;
  background_color: ${props =>
    props?.invoiceStatus == 'Paid' ? COLORS.APP_GREEN : COLORS.APP_GRAY};
  border-radius: 15px;
  padding_horizontal: 10px;
  padding_vertical: 5px;
  margin_vertical: 5px;
`;

const InvoiceStatusTxt = styled.Text`
  color: ${COLORS.APP_OFF_WHITE};
  font_size: 17px;
`;

export default memo(DetailScreen);
