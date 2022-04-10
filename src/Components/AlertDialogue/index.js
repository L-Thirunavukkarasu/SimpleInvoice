//import liraries
import React, {memo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from '../Constants/Colors';
// create a component
const AlertDialogue = ({titleTxt,descTxt,onClose, showModal, onOk, cancelTxt, okTxt}) => {
  return (
    <Modal
      testID={'modal'}
      isVisible={() => (showModal ? showModal : false)}
      onSwipeComplete={() => (onClose ? onClose() : null)}
      swipeDirection={['up', 'left', 'right', 'down']}
      onBackdropPress={() => (onClose ? onClose() : null)}
      style={styles.modal_view}>
      <View style={styles.modal_content_view}>
        <View>
          <Text style={styles.modal_title_text}>{titleTxt ? titleTxt : 'Title'}</Text>
          <Text style={styles.modal_desc_text}>{descTxt ? descTxt : 'Description'}</Text>
        </View>
        <View style={styles.modal_btn_parent}>
          <TouchableOpacity
            style={styles.modal_btn_view(false)}
            onPress={() => (onClose ? onClose() : null)}>
            <Text style={styles.modal_btn_text}>{cancelTxt ? cancelTxt : 'Cancel'}</Text>
          </TouchableOpacity>
          <View style={styles.modal_btn_space} />
          <TouchableOpacity
            style={styles.modal_btn_view(true)}
            onPress={() => (onOk ? onOk() : null)}>
            <Text style={styles.modal_btn_text}>{okTxt ? okTxt : 'Ok'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal_view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modal_content_view: {
    backgroundColor: COLORS.WHITE,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 30,
    borderRadius: 10,
  },
  modal_title_text: {
    textAlign: 'center',
    fontSize: 20,
  },
  modal_desc_text: {
    fontSize: 17,
    marginVertical: 5,
    marginBottom: 10,
  },
  modal_btn_parent: {
    flexDirection: 'row',
  },
  modal_btn_space: {
    width: 10,
  },
  modal_btn_view: val => ({
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: val ? COLORS.APP_GREEN : COLORS.APP_OFF_WHITE,
    borderRadius: 10,
  }),
  modal_btn_text:{
      fontSize:16,
      padding:3
  }
});

//make this component available to the app
export default memo(AlertDialogue);
