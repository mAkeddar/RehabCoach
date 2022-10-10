import React, { Component } from 'react';
import { View } from 'react-native';

import { inputMessageStyles } from './Styles/CommonStyles';
import PropTypes from 'prop-types';

import { Metrics } from '../../Themes/';
import Video from '../Video/Video.js';
// import Log from '../../Utils/Log'
// const log = new Log('CustomMessages/ChatVideo')

export default class ChatVideo extends Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
    showModal: PropTypes.func.isRequired,
  };

  render() {
    let width = Metrics.screenWidth - 135;
    return (
      <View style={[inputMessageStyles.mediaContent, { overflow: 'hidden' }]}>
        <Video
          width={width}
          source={this.props.source}
          showModal={this.props.showModal}
          useIOSNativeFullscreen
          // onToggleFullscreen will be called with the current source of the video-component and the currentTime
          // to prevent double calculations (e.g. get absolute filepath of local video, see: componentWillMount of Video.js)
          onToggleFullscreen={(
            source,
            currentTime,
            paused,
            closeFullscreenCallback,
          ) =>
            this.props.showModal('fullscreen-video', {
              source,
              initialPosition: currentTime,
              paused,
              closeFullscreenCallback,
            })
          }
        />
      </View>
    );
  }
}
