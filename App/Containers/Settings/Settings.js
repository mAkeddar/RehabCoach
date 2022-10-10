// TODO for improvement check: https://github.com/idibidiart/react-native-responsive-grid/blob/master/UniversalTiles.md

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Share,
} from 'react-native';
import ParsedText from 'react-native-parsed-text';
import { connect } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';

// import { CommonActions as NavigationActions } from '@react-navigation/native';
import { Colors } from '../../Themes/';
import PMNavigationBar from '../../Components/Navbar';
import I18n from '../../I18n/I18n';
import { Card } from 'react-native-elements';
import ServerMessageActions from '../../Redux/MessageRedux';
import FeedbackForm from './FeedbackForm';

import Log from '../../Utils/Log';
const log = new Log('Containers/Settings/Settings');

class Settings extends Component {
  renderNavigationbar(props) {
    let title = I18n.t('Settings.header');
    return (
      <PMNavigationBar title={title} props={props} rightButton={<View />} />
    );
  }

  onSendFeedback(name, email, feedback) {
    log.info('User submitted Feedback Form');
    const { wholeState } = this.props;
    // convert messages objects to arrays, and shorten them to last 20 messages
    // also filter out send-feedback intention to prevent 'cascadic'-memory leak
    const messagesArray = Object.values(wholeState.messages.messageObjects)
      .slice(-20)
      .filter((message) => message['user-intention'] !== 'send-app-feedback');

    const giftedChatMessagesArray = Object.values(
      wholeState.giftedchatmessages.messageObjects,
    )
      .reverse()
      .slice(-20);
    // Shorten Message Arrays of state to last 20 messages
    const debugState = {
      ...wholeState,
      messages: messagesArray,
      giftedchatmessages: giftedChatMessagesArray,
    };
    this.props.sendFeedback({ name, email, feedback, state: debugState });
  }

  render() {
    const { openURL } = this.props.route.params.screenProps;
    return (
      <View style={styles.container}>
        {this.renderNavigationbar(this.props)}
        <ScrollView style={styles.content} indicatorStyle="white">
          <Card
            title={I18n.t('Settings.impressumTitle')}
            titleStyle={styles.cardTitle}>
            <View key={1}>
              <Text style={[styles.headline, { marginTop: 0 }]}>
                {I18n.t('Settings.impressum.title1')}
              </Text>
              {/* Use ParsedText to open containing URLS */}
              <ParsedText
                style={styles.paragraph}
                parse={[
                  {
                    type: 'url',
                    style: styles.url,
                    onPress: openURL,
                  },
                  {
                    type: 'email',
                    style: styles.url,
                    onPress: (email) => openURL('mailto:' + email),
                  },
                ]}>
                {I18n.t('Settings.impressum.copytext1')}
              </ParsedText>
              <Text style={styles.headline}>
                {I18n.t('Settings.impressum.title2')}
              </Text>
              <ParsedText
                style={styles.paragraph}
                parse={[
                  {
                    type: 'email',
                    style: styles.url,
                    onPress: (mail) => openURL('mailto:' + mail),
                  },
                ]}>
                {I18n.t('Settings.impressum.copytext2')}
              </ParsedText>
              <Text style={styles.headline}>
                {I18n.t('Settings.impressum.title3')}
              </Text>
              <Text style={styles.paragraph}>
                {I18n.t('Settings.impressum.copytext3')}
              </Text>
              <Text style={styles.headline}>
                {I18n.t('Settings.impressum.title4')}
              </Text>
              {/* Use ParsedText to open containing URLS */}
              <ParsedText
                style={styles.paragraph}
                parse={[
                  {
                    type: 'url',
                    style: styles.url,
                    onPress: openURL,
                  },
                  {
                    type: 'email',
                    style: styles.url,
                    onPress: openURL,
                  },
                ]}>
                {I18n.t('Settings.impressum.copytext4')}
              </ParsedText>
            </View>
          </Card>
          <Card
            title={I18n.t('Settings.feedbackForm.title')}
            titleStyle={styles.cardTitle}
            containerStyle={{ marginBottom: 20 }}>
            <FeedbackForm
              onSubmit={(name, email, feedback) =>
                this.onSendFeedback(name, email, feedback)
              }
              onFeedbackFocus={() => {
                if (this.refs.scrollView && Platform.OS === 'ios') {
                  this.refs.scrollView.scrollToEnd();
                }
              }}
            />
          </Card>
        </ScrollView>
        {Platform.OS === 'ios' ? <KeyboardSpacer /> : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wholeState: state,
  };
};

const mapDispatchToProps = (dispatch) => ({
  sendFeedback: (content) =>
    dispatch(
      ServerMessageActions.sendIntention(null, 'send-app-feedback', content),
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

const styles = StyleSheet.create({
  url: {
    color: Colors.buttons.common.background,
  },
  headline: {
    color: Colors.main.headline,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  // paragraph: {
  //   fontSize: Fonts.size.small,
  //   color: Colors.main.paragraph
  // },
  container: {
    flex: 1,
    backgroundColor: Colors.main.appBackground,
    borderRadius: 10,
  },
  cardTitle: {
    textAlign: 'left',
    color: Colors.main.headline,
  },
  cardText: {
    color: Colors.main.paragraph,
  },
  content: {
    flex: 1,
  },
  button: {
    backgroundColor: Colors.buttons.common.background,
    borderRadius: 20,
    marginVertical: 10,
  },
  buttonText: { color: Colors.buttons.common.text, fontSize: 16 },
});
