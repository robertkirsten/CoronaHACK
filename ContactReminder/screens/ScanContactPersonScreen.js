import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import QRCode from 'react-qr-code';
// import DeviceInfo from 'react-native-device-info';

export default class ScanContactPersonScreen extends Component {
  state = {
    hasPermission: null,
    scanning: false,
    deviceId: '',
  };

  async componentDidMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasPermission: status === 'granted'});

    var id = DeviceInfo.getUniqueID();
    this.setState({ deviceId: id, });
  }

  handleBarCodeScanned = ({type, data}) => {
    this.setState({ scanning: false })
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  barcodescan() {
    const {
      hasCameraPermission,
    } = this.state;

    if (hasCameraPermission === null) {
      return <Text> Requesting for camera permission </Text>;
    }
    if (hasCameraPermission === false) {
      return <Text> No access to camera </Text>;
    }

    return (
      <View style={
        {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        } 
      }>
        <BarCodeScanner 
          onBarCodeScanned={ this.handleBarCodeScanned }
          style={StyleSheet.absoluteFillObject}/>
        <Button
          title="Stop scanning"
          onPress={ () => this.setState({scanning: false}) }/>
      </View>
    );
  }

  render() {
    const {
      scanning,
      deviceId,
    } = this.state;

    if (scanning) {
      return this.barcodescan();
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text>Dies ist dein persönlicher Code. Lass eine andere Person diesen Code scannen, um dich als Kontaktperson hinzuzufügen.</Text>
            <Text>{deviceId}</Text>
            <QRCode value={deviceId}/>

            <Text>Oder du scannst selbst den Code einer anderen Person.</Text>
            <Button
              title="Anderen Code scannen"
              onPress={() => this.setState({scanning: true})}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}

ScanContactPersonScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
