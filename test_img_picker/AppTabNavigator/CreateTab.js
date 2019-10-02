import React from 'react'
import { StyleSheet, Text, View, Button, ScrollView, Image } from 'react-native'
import * as Permissions from 'expo-permissions'
import { ImageBrowser } from 'expo-multiple-media-imagepicker'
import { Icon } from 'native-base'

export default class CreateTab extends React.Component {

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
        <Icon name='ios-home' style={{ color: tintColor }} />
    )
  }

  constructor (props) {
    super(props)
    this.state = {
      imageBrowserOpen: false,
      photos: []
    }
  }

  async componentDidMount () {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
  }

  imageBrowserCallback = (callback) => {
    callback.then((photos) => {
      console.log(photos)
      this.setState({
        imageBrowserOpen: false,
        photos
      })
    }).catch((e) => console.log(e))
  }

  renderImage (item, i) {
    return (
      <Image
        style={{ height: 400, width: 400 }}
        source={{ uri: item.uri }}
        key={i}
      />
    )
  }

  render () {
    if (this.state.imageBrowserOpen) {
      return (
        <ImageBrowser
        max={101} // Maximum number of pickable image. default is None
        headerCloseText={'Cancel'} // Close button text on header. default is 'Close'.
        headerDoneText={'OK'} // Done button text on header. default is 'Done'.
        //headerButtonColor={'#E31676'} // Button color on header.
        headerSelectText={'Select'} // Word when picking.  default is 'n selected'.
        //mediaSubtype={'default'} // Only iOS, Filter by MediaSubtype. default is display all.
        //badgeColor={'#E31676'} // Badge color when picking.
        emptyText={'None'} // Empty Text
        callback={this.imageBrowserCallback} // Callback functinon on press Done or Cancel Button. Argument is Asset Infomartion of the picked images wrapping by the Promise.
          />
      )
    }

    return (
      <View style={styles.container}>
        <Button
          title='Choose Images'
          onPress={() => this.setState({ imageBrowserOpen: true })}
        />
        <Text>This is an example of a</Text>
        <Text>multi image selector using expo</Text>
        <ScrollView>
          {this.state.photos.map((item, i) => this.renderImage(item, i))}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  }
})
