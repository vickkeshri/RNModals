/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Modal from 'react-native-modal';
import NetInfo from "@react-native-community/netinfo";

let context;
export default class App extends React.Component {

  constructor(props) {
    super(props);
    context = this;
    this.state = {
      progress: null,
      rewardCount: null,
      visibleModal: null,
      rewardresult: [],
      connectionStatus: null
    }
  }

   async componentDidMount() {
    NetInfo.isConnected.addEventListener (
      'connectionChange',
      (res) => {
       alert(res)
      }
    )

    let data = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'content-Type': 'application/json'
      },
      body: JSON.stringify({
        "mobileNumber": "9980668008",
        "customerId": "Dumont0000012345",
        "sessionId": "pPmJCJX59By5UnVO-KY92jNVEvc7zs0lm"
      })
    }

    return await fetch('http://68.183.89.98:1111/api/getRewards', data)
    .then( (response) => response.json())
    .then((responseJSON) => {
      {/* handle all logical operation here. */}
      let targetPoints, achivedPoints, progressCalculation;
      achivedPoints = responseJSON.customerAchievements[0].achivedPoints;
      targetPoints = responseJSON.customerAchievements[0].targetPoints;
      this.setState({
        // progress: ((achivedPoints * 100)/ targetPoints) +"%",
        progress: "30%",
        rewardCount: responseJSON.rewardsCounter[0].rewardsCount,
        achivedPoints: achivedPoints,
        targetPoints: targetPoints,
        colorCode: responseJSON.customerAchievements[0].color_code,
        rewardresult: responseJSON.rewardresult

      })
      
    })
    .catch((error) => {
      console.log(error)
    })
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  

  handleConnectivityChange = (isConnected) => {
    console.log(isConnected ? 'connected':'not connected')
  }

  _renderModalContent = () => (
    <TouchableOpacity style={styles.modalContent} onPress={ () => {
      this.setState({
        visibleModal: null
      })
    }}>
      <Text>Hello!</Text>
    </TouchableOpacity>
  );
  

  _renderItem({item, index}) {
    return (
      <TouchableOpacity 
        style={{width:180, height: 180, margin:10, marginTop:10, height:180, borderRadius:6}}
        onPress={ () => {
          context.setState({
            visibleModal:1
          })
        }} >
            <Image
            style={{width: 180, height: 180, alignSelf:'center'}}
            source={{uri:item.rewards_url}}
            />
      </TouchableOpacity>
    )
  }

  render() {
    return(
      <SafeAreaView style={{flex:1}}>
          <StatusBar
              barStyle="light-content"
              backgroundColor="#001E41"
          />

         
 
          {/* START of top part */}
            <View style={{flex:0.2, marginTop:20}}>
              <View style={{width:"95%"}}>
                <Text style={{textAlign: "center", fontSize: 20}}>Reward Progress</Text>
                 {/* START of Progress View  */}
                   <View style={[styles.shadowView, {width: "95%", borderWidth: 1, borderColor: this.state.colorCode, marginStart: 16, marginEnd:16, marginTop:16,padding: 5}]}>
                     {this.state.progress !== "0%" && 
                        <View style={{paddingTop:5, paddingBottom:5, paddingEnd:5, width: this.state.progress, backgroundColor:this.state.colorCode}}></View> 
                     }
                     {this.state.progress === "0%" && 
                        <View style={{padding:16, width: "100%"}}></View> 
                     }
                  </View> 
                {/* End of Progress View  */}
                <Text style={{textAlign: "right", marginTop: 16, marginEnd: 16}}>{this.state.achivedPoints}/{this.state.targetPoints}</Text>
              
              </View> 
            </View>
          {/* END of top part */}

          {/* START of middle part */}
            <View style={{flex:0.6}}>
              {/* START of Tags */}
                <View style={styles.tagContainer}>

                  <View style={[styles.shadowView, {width: "30%", height:80,backgroundColor:'#fff', justifyContent:"center"}]}>
                  <Image style={{marginTop:-50,alignSelf: 'center', width:35, height:35}}  source={require('./assets/Brown.png')} /> 
                  <Text style={[styles.tagElementText, {color: this.state.color}]}>BROWN</Text>
                  </View>

                  <View style={[styles.shadowView, {width: "30%", height:80,backgroundColor:'#fff', justifyContent:"center"}]}>
                    <Image style={{marginTop:-50, alignSelf: 'center', width:35, height:35}}  source={require('./assets/Brown.png')} /> 
                    <Text style={[styles.tagElementText]}>{this.state.rewardCount} Earned Reward</Text>
                  </View>
                  
                  <View style={[styles.shadowView, {width: "30%", height:80,backgroundColor:this.state.colorCode, justifyContent:"center"}]}>
                  <Text style={[styles.tagElementText, {color: 'white'}]}>View history</Text>
                  </View>
                </View>
              {/* END of Tags */}
              {/* START of flatList */}
                <View style={{flex:3, backgroundColor:'#fff',justifyContent: "center", alignItems:"center",flexDirection: 'row'}}>
                 <FlatList 
                 data={this.state.rewardresult}
                 renderItem={this._renderItem}
                 keyExtractor={({id}, index) => id}
                 horizontal={true}
                 showsHorizontalScrollIndicator={false}
                 />
                </View>
               {/* END of flatList */}
            </View>
          {/* END of middle part */}

          {/* START of end part */}
            <View style={{flex:0.2, alignItems: "center", justifyContent: "center"}}>

              <TouchableOpacity style={{width: "70%",backgroundColor: this.state.colorCode, borderRadius:15, padding: 10}}
              onPress={ () => {
                this.setState({
                  visibleModal:4
                })
              }}>
                <Text style={{fontSize: 16, fontWeight: "200", color: 'white', textAlign:"center"}}>Generate Passcode</Text>
              </TouchableOpacity>
            </View>
          {/* END of end part */}

          <Modal isVisible={this.state.visibleModal === 1}>
          {this._renderModalContent()}
        </Modal>
        <Modal
          isVisible={this.state.visibleModal === 2}
          animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}
        >
          {this._renderModalContent()}
        </Modal>
        <Modal
          isVisible={this.state.visibleModal === 3}
          animationInTiming={2000}
          animationOutTiming={2000}
          backdropTransitionInTiming={2000}
          backdropTransitionOutTiming={2000}
        >
          {this._renderModalContent()}
        </Modal>
        <Modal
          isVisible={this.state.visibleModal === 4}
          backdropColor={'red'}
          backdropOpacity={1}
          animationIn={'zoomInDown'}
          animationOut={'zoomOutUp'}
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={1000}
        >
          {this._renderModalContent()}
        </Modal>
      </SafeAreaView>
    );
  }
};



const styles = StyleSheet.create({
  container: {
    flex:1
  },
  shadowView: {
    borderRadius: 5,
    shadowColor: '#000',
    elevation:2,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity:0.5
  },
  tagContainer: {
    flex:2,
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center"
  },
  tagElementText: {
    fontSize: 16,
    fontWeight: "200",
    color: 'black',
    textAlign:"center",
    marginTop: 8
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});
