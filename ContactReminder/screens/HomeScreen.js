import * as React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RepositoryFactory } from '../API/RepositoryFactory';
import { Root, Popup } from 'popup-ui'
import Constants from 'expo-constants';


const deviceId = Constants.deviceId;
const InfectionCall = RepositoryFactory.get('infection');

export default class HomeScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Root>
          <View>

          </View>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Willkommen bei CoronaTracking!</Text>
            <Text style={styles.getStartedText}>TODO: Aktuellen Status des Users anzeigen (Kontaktperson oder
              safe)</Text>
            <Button 
              style={styles.infectedButton}
              title={"I am Infected"}
              onPress={() => postInfectionMethod("user", "contacted")}
                //Alert.alert("Abfrage, ob wirklich infiziert hier Button einfügen der api call macht")}
            />

          </View>
        </ScrollView>
        </Root>
      </View>
    );
  }
}

async function postInfectionMethod(user, contacted){

  Popup.show({
    type: 'Success'
  });
  InfectionCall.postInfection(user, contacted).then(res => {
    console.log("Infection succesfully added");
    console.log(res.data);
  })
  .catch(error => {
    ToastAndroid.show("An Error occured", 50);
    console.log("Error occured: ", error);
  });
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  infectedButton: {
    width: 100,
    borderRadius: 5,
    padding: 10,
    color: "#f03434",
    borderColor: "#f03434",
    borderWidth: 2,

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
