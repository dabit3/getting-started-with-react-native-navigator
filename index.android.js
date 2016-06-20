/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';

class myProject extends Component {
  constructor () {
    super()
    this.goBack = this.goBack.bind(this)
    this.navigate = this.navigate.bind(this)
    this.renderScene = this.renderScene.bind(this)
  }
  goBack () {
    this.refs.navigator.pop()
  }
  navigate (component) {
    this.refs.navigator.push({
      component,
      passProps: {
        navigate: this.navigate,
        goBack: this.goBack
      }
    })
  }
  renderScene (route, navigator) {
    return <route.component {...route.passProps} />
  }
  render() {
    return (
      <Navigator
        renderScene={this.renderScene}
        ref='navigator'
        initialRoute={{ name: 'Home', component: Home, passProps: {navigate: this.navigate} }} />
    );
  }
}

const Home = ({navigate}) => (
  <View style={styles.container}>
    <Text>Hello From Home</Text>
    <Button onPress={() => navigate(About)} title='Go To About' />
  </View>
)

const About = ({goBack}) => (
  <View style={styles.container}>
    <Text>Hello From About</Text>
    <Button onPress={goBack} title='Go Back' />
  </View>
)

const Button = ({onPress, title}) => (
  <TouchableHighlight style={styles.button} onPress={onPress}>
    <Text>{title}</Text>
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  container: {
    marginTop: 60
  },
  button: {
    height: 70,
    backgroundColor: '#ededed',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

AppRegistry.registerComponent('myProject', () => myProject);
