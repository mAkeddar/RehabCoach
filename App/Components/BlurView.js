import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
  ViewPropTypes,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';

export default class BlurView extends Component {
  static propTypes = {
    containerStyle: ViewPropTypes.style,
    fadeIn: PropTypes.bool,
    opacity: PropTypes.number,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    opacity: 0.7,
  };

  render() {
    let backgroundColor = `rgba(0, 0, 0, ${this.props.opacity})`;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (this.props.onPress) {
            this.props.onPress();
          }
          Keyboard.dismiss();
        }}
        accessible={false}>
        <Animatable.View
          useNativeDriver
          duration={350}
          animation={this.props.fadeIn ? 'fadeIn' : null}
          ref="view"
          style={[
            styles.blurViewStyle,
            this.props.containerStyle,
            { backgroundColor },
          ]}>
          {this.props.children}
        </Animatable.View>
      </TouchableWithoutFeedback>
    );
  }

  animatable = () => {
    return this.refs.view;
  };
}

const styles = {
  blurViewStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
};
