import * as React from 'react';
import {
  Text,
  View,
  AsyncStorage,
  Button,
} from 'react-native';
import { Root, Popup } from 'popup-ui'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from "react-native-elements";
import { RepositoryFactory } from '../API/RepositoryFactory';
const user = RepositoryFactory.get('user');


export default class SettingsScreen extends React.Component {

  constructor(props) {
    super(props);
    this._isMounted = false;
  }

  async componentDidMount(){
    this._isMounted = true;
  }

  async componentWillUnmount() {
    this._isMounted = false;
  }

  state = {
    firstname: '',
    lastname: '',
  };

  async _storeData() {
    const {firstname, lastname} = this.state;
    try {
      await AsyncStorage.setItem('lastname', lastname);
      await AsyncStorage.setItem('firstname', firstname);
    } catch (error) {
      // Error saving data
    }
    //TODO: CHANGE ID
    await this.postUser(5);
  }

  async _retrieveData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // Our data is fetched successfully
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  postUser(userid){
    const { firstname, lastname } = this.state;

    return user.postUserData(userid,0, firstname,lastname)
    .then(res => console.log("Fetched successfully all contacted Users"))
    .catch(error => {
      Popup.show({
        type: 'Danger',
        callback: () => Popup.hide(),
        title: 'Upload failed',
        textBody: 'Sorry! Please upload again!',
      });
      console.log("Error occured: ", error);
    });
  }

  setStateIfMounted(obj) {
    if (this._isMounted) {
      this.setState(obj);
    }
  }

  render() {
    return(
      <View>
        <Root>
          <Text> </Text>
        </Root>
        <Input
          placeholder='INSERT FIRSTNAME'
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='black'
            />
          }
          onChangeText={text => this.setStateIfMounted({firstname: text})}
        />
        <Text> </Text>
        <Input
          placeholder='INSERT LASTNAME'
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='black'
            />
          }
          onChangeText={text => this.setStateIfMounted({lastname: text})}
        />
        <Button
          title="SAVE"
          onPress={() => this._storeData()}/>
      </View>
    );
  }
}