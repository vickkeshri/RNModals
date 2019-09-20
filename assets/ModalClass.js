import React, {Fragment} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Modal
  } from 'react-native';

export default  class ModalClass extends React.Component {
    render() {
        return (
            <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems:"center"}}>
                <Modal>
                <Text>Modal Class</Text>
                </Modal>
            </SafeAreaView>
        );
    }
   
}