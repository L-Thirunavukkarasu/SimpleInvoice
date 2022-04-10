import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import * as Constants from '../../Api/constants';
import * as Api from '../../Api/index';
import ProgressDialogue from '../../Components/AlertDialogue/ProgressDialogue';
import {COLORS} from '../../Components/Constants/Colors';
import RenderTxtView from '../../Components/RenderTxtView';

const HomeScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [invoicesList, setInvoicesList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [loadMore, setLoadMore] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchApplied, setSearchApplied] = useState(false);

  useEffect(() => {
    getInvoicesList(pageNum, searchKeyword);
  }, []);

  //get invoice list from api
  const getInvoicesList = async (pageNumber, query) => {
    let body = {
      grant_type: 'client_credentials',
      scope: 'PRODUCTION',
    };

    let headerBase = {
      Authorization:
        'Basic TGJUZVVFT2RpTEhhZzV4aUxpWDdPQ3ZFbmZNYTpiWVNtbFRBakxsVDJuWEc1SVh2QjNLRDdvVm9h',
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };

    //get access token
    let responseBase = await Api.callPostApi(
      Constants.APP_POST_ACCESS_TOKEN,
      body,
      headerBase,
    );
    //console.log('api-response-splash', responseBase);

    if (responseBase?.status == 200) {
      //clear invoice list array when the search query entered first time
      query != '' && pageNumber == 1 ? setInvoicesList([]) : null;

      //generating the params with custom values for pagination & search query apply
      let access_token = `${responseBase?.data?.token_type} ${responseBase?.data?.access_token}`;
      let param_url = `merchantReference=3011047&pageNum=${pageNumber}&pageSize=${pageSize}&fromDate=2019-01-13&toDate=2021-01-14`;
      let param_keyword_url = `merchantReference=3011047&pageNum=${pageNumber}&pageSize=${pageSize}&fromDate=2019-01-13&toDate=2021-01-14&keyword=${query}`;
      let url =
        query && query != ''
          ? Constants.APP_GET_INVOICES_BASE_URL + param_keyword_url
          : Constants.APP_GET_INVOICES_BASE_URL + param_url;
      let header = {
        Authorization: access_token,
      };

      //get invoices list from api
      let response = await Api.getInvoices(url, header);
      //console.log('api-response-home', pageNumber, url, response?.data);

      //set data from api response and stop loaders
      setLoading(false);
      let array =
        response?.data?.data && response?.data?.data?.length > 0
          ? response?.data?.data
          : [];
      setInvoicesList(pageNumber == 1 ? array : [...invoicesList, ...array]);
      setTotalCount(response?.data?.paging?.totalRecords);
      setLoadMore(false);
    } else {
      //to avoid crash error while api facing any errors
      setLoading(false);
      setInvoicesList(
        pageNumber > 1 && invoicesList?.length > 0 ? invoicesList : [],
      );
      setTotalCount(totalCount);
      setLoadMore(false);
    }
  };

  return (
    <SafeAreaView>
      {loading ? (
        <ProgressDialogue showModal={loading} />
      ) : (
        <HomeContainer>
          <InvoiceSearchView>
            <InvoiceSearch
              onChangeText={async txt => {
                setSearchKeyword(txt);
                //clear previously searched query results, when user manually clear the text using keyboard
                if (searchKeyword?.length > 0 && searchApplied) {
                  setLoading(true);
                  setPageNum(1);
                  setSearchApplied(false);
                  await getInvoicesList(1, searchKeyword);
                }
              }}
              value={searchKeyword}
              placeholder={'Please enter the keyword...'}
            />
            <InvoiceSearchBtn
              onPress={async () => {
                //get new results, based on search query
                if (!searchApplied) {
                  setLoading(true);
                  setPageNum(1);
                  setSearchApplied(true);
                  await getInvoicesList(1, searchKeyword);
                } else {
                  //clear previously searched query results, when user manually clear the text using keyboard
                  setSearchKeyword('');
                  setLoading(true);
                  setPageNum(1);
                  setSearchApplied(false);
                  await getInvoicesList(1, '');
                }
              }}>
              <InvoiceSearchImg
                source={
                  searchApplied
                    ? require('../../Assets/Images/cancel.png')
                    : require('../../Assets/Images/search.png')
                }
              />
            </InvoiceSearchBtn>
          </InvoiceSearchView>
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
                      <InvoiceStatusTxt>
                        {item?.status[0]?.key}
                      </InvoiceStatusTxt>
                    </InvoiceStatus>
                  ) : null}
                </InvoiceListItem>
              );
            }}
            keyExtractor={item => item?.invoiceId}
            contentContainerStyle={{paddingBottom: 50}}
            ListFooterComponent={() => {
              //load footer view - like load more items loader & api response is empty handler
              return (
                <InvoiceFooter>
                  {invoicesList?.length > 0 &&
                  totalCount > invoicesList?.length ? (
                    <InvoiceFooterView>
                      <InvoiceLoader />
                    </InvoiceFooterView>
                  ) : invoicesList?.length == 0 ? (
                    <InvoiceEmpty>
                      <InvoiceEmptyTxt>No Data Found</InvoiceEmptyTxt>
                    </InvoiceEmpty>
                  ) : null}
                </InvoiceFooter>
              );
            }}
            onEndReachedThreshold={0.5}
            onEndReached={async () => {
              //to call load more method to get additional data based on page number
              if (totalCount > invoicesList?.length) {
                await setLoadMore(true);
                let pageNumber = pageNum + 1;
                await setPageNum(pageNumber);
                await getInvoicesList(pageNumber, searchKeyword);
                //console.log('api-response-home', totalCount, pageNumber);
              }
            }}
          />
        </HomeContainer>
      )}
    </SafeAreaView>
  );
};

//styles
const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const InvoicesList = styled.FlatList`
  flex: 1;
`;

const InvoiceListItem = styled.TouchableOpacity`
  background_color: ${COLORS.WHITE};
  margin_horizontal: 15px;
  margin_bottom: 15px;
  padding_horizontal: 15px;
  padding_vertical: 15px;
  border-radius: 10px;
`;

const InvoiceStatus = styled.View`
  align_self: flex-end;
  background_color: ${props =>
    props?.invoiceStatus == 'Paid' ? COLORS.APP_GREEN : COLORS.APP_GRAY};
  border-radius: 15px;
  padding_horizontal: 10px;
  padding_vertical: 5px;
`;

const InvoiceStatusTxt = styled.Text`
  color: ${COLORS.WHITE};
  font_size: 17px;
`;

const InvoiceEmpty = styled.View`
  flex: 1;
  margin_top: 75%;
  align_items: center;
`;

const InvoiceEmptyTxt = styled.Text`
  font_size: 20px;
`;

const InvoiceFooter = styled.View`
  flex: 1;
`;

const InvoiceFooterView = styled.View`
  height: 50px;
  margin_horizontal: 15px;
  background_color: ${COLORS.WHITE};
  border_radius: 10px;
  padding: 10px;
  margin_vertical: 15px;
  justify_content: center;
  align_items: center;
`;

const InvoiceLoader = styled.ActivityIndicator`
  color: ${COLORS.APP_GRAY};
`;

const InvoiceSearchView = styled.View`
  flex_direction: row;
  margin_top: 15px;
  margin_horizontal: 15px;
  margin_bottom: 15px;
`;

const InvoiceSearch = styled.TextInput`
  padding: 10px;
  height: 50px;
  background_color: ${COLORS.WHITE};
  border-radius: 10px;
  flex: 1;
`;

const InvoiceSearchBtn = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border_radius: 10px;
  padding: 3px;
  background_color: ${COLORS.WHITE};
  align_items: center;
  justify_content: center;
  margin_start: 15px;
`;

const InvoiceSearchImg = styled.Image`
  resize_mode: contain;
  width: 35px;
  height: 35px;
`;

const HomeContainer = styled.View`
  flex: 1;
`;

export default HomeScreen;
