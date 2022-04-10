//import liraries
import React, {memo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from '../Constants/Colors';
// create a component
const ProgressDialogue = ({onClose, showModal}) => {
  return (
    <Modal
      testID={'modal'}
      isVisible={showModal ? showModal : false}
      style={styles.modal_view}>
      <View style={styles.modal_content_view}>
         <ActivityIndicator size={'large'} color={COLORS.APP_GREEN} />
          <Text style={styles.modal_desc_text}>{'Loading...'}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal_view: {
    margin: 0,
    justifyContent:'center',
    alignItems:'center',
  },
  modal_content_view: {
    backgroundColor: COLORS.WHITE,
    marginVertical: 5,
    marginHorizontal: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center',
  },
  
  modal_desc_text: {
    fontSize: 17,
    marginTop: 10,
  },
 
});

//make this component available to the app
export default memo(ProgressDialogue);
