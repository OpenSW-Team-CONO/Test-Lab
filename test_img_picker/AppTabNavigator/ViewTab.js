import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

export default class ViewTab extends Component {
  static navigationOptions = {
       tabBarIcon: ({ tintColor }) => (
           <Icon name='ios-person' style={{ color: tintColor }} />
       )
   }
    render() {
        return (
            <View style={style.container}>
                <Text>View Tab</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
