//import liraries
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import * as Constants from '../../Api/constants';
import * as Api from '../../Api/index';
import ProgressDialogue from '../../Components/AlertDialogue/ProgressDialogue';
import {COLORS} from '../../Components/Constants/Colors';
import RenderTxtView from '../../Components/RenderTxtView';

// create a component
const HomeScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [invoicesList, setInvoicesList] = useState([]);

  useEffect(() => {
    getInvoicesList();
  }, []);

  //get invoice list from api
  const getInvoicesList = async () => {
    let body = {
      grant_type: 'client_credentials',
      scope: 'PRODUCTION',
    };

    let headerBase = {
      Authorization:
        'Basic TGJUZVVFT2RpTEhhZzV4aUxpWDdPQ3ZFbmZNYTpiWVNtbFRBakxsVDJuWEc1SVh2QjNLRDdvVm9h',
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };

    let responseBase = await Api.callPostApi(
      Constants.APP_POST_ACCESS_TOKEN,
      body,
      headerBase,
    );
    console.log('api-response-splash', responseBase);
    if (responseBase?.status == 200) {
      let access_token = `${responseBase?.data?.token_type} ${responseBase?.data?.access_token}`;
      let param =
        'merchantReference=3011047&pageNum=1&pageSize=10&fromDate=2019-01-13&toDate=2021-01-14';
      let url = Constants.APP_GET_INVOICES_BASE_URL + param;
      let header = {
        Authorization: access_token,
      };
      let response = await Api.getInvoices(url, header);
      console.log('api-response-home', response?.data);
      setLoading(false);
      setInvoicesList(response?.data?.data);
    } else {
      //alert('Something went wrong...try again later...');
      setLoading(false);
      setInvoicesList([]);
    }
  };

  return (
    <SafeAreaView>
      {loading ? (
        <ProgressDialogue showModal={loading} />
      ) : (
        <InvoicesList
          data={invoicesList}
          renderItem={({item, index}) => {
            return (
              <InvoiceListItem
                key={item?.invoiceId}
                onPress={() =>
                  navigation.navigate('DetailScreen', {data: item})
                }>
                <RenderTxtView
                  keyVal={'Invoice No'}
                  value={item?.invoiceNumber}
                />
                <RenderTxtView
                  keyVal={'Invoice Date'}
                  value={item?.invoiceDate}
                />
                {item?.currencySymbol && item?.totalAmount ? (
                  <RenderTxtView
                    keyVal={'Amount'}
                    value={`${item?.currencySymbol} ${item?.totalAmount}`}
                  />
                ) : null}
                <RenderTxtView
                  keyVal={'Description'}
                  value={item?.description}
                />
                {item?.status[0]?.key ? (
                  <InvoiceStatus invoiceStatus={item?.status[0]?.key}>
                    <InvoiceStatusTxt>{item?.status[0]?.key}</InvoiceStatusTxt>
                  </InvoiceStatus>
                ) : null}
              </InvoiceListItem>
            );
          }}
          keyExtractor={item => item?.invoiceId}
          contentContainerStyle={{paddingBottom: 50}}
        />
      )}
    </SafeAreaView>
  );
};

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const InvoicesList = styled.FlatList`
  flex: 1;
`;

const InvoiceListItem = styled.TouchableOpacity`
  background_color: ${COLORS.WHITE};
  margin_horizontal: 15px;
  margin_top: 15px;
  padding_horizontal: 15px;
  padding_vertical: 15px;
  border_radius: 10px;
`;

const InvoiceStatus = styled.View`
  align_self: flex-end;
  background_color: ${props =>
    props?.invoiceStatus == 'Paid' ? COLORS.APP_GREEN : COLORS.APP_RED};
  border-radius: 15px;
  padding_horizontal: 10px;
  padding_vertical: 5px;
`;

const InvoiceStatusTxt = styled.Text`
  color: ${COLORS.APP_OFF_WHITE};
  font_size: 17px;
`;

//make this component available to the app
export default HomeScreen;
