import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NextButton from '../../Components/NextButton';
import Colors from '../../Themes/Colors';
import I18n from '../../I18n/I18n';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch } from 'react-redux';
import SettingsActions from '../../Redux/ParticipantRedux';
import MessageActions from '../../Redux/MessageRedux';
import { Metrics } from '../../Themes';

const nextScreen = 'ScreenCoachSelection';

const ScreenPatientInfo = () => {
  const [participantName, setParticipantName] = useState(null);
  const [participantCanType, setParticipantCanType] = useState(null);
  const [canTypeDropdownOpen, setCanTypeDropdownOpen] = useState(false);
  const [canTypeDropdownItems, setCanTypeDropdownItems] = useState([
    {
      label: I18n.t('participantInformations.yes'),
      value: true,
    },
    {
      label: I18n.t('participantInformations.no'),
      value: false,
    },
  ]);
  const [participantCanWalk, setParticipantCanWalk] = useState(null);
  const [canWalkDropdownOpen, setCanWalkDropdownOpen] = useState(false);
  const [canWalkDropdownItems, setCanWalkDropdownItems] = useState([
    {
      label: I18n.t('participantInformations.yes'),
      value: true,
    },
    {
      label: I18n.t('participantInformations.no'),
      value: false,
    },
  ]);

  const dispatch = useDispatch();
  const syncName = () => dispatch(SettingsActions.setName(participantName));
  const syncCanType = () =>
    dispatch(SettingsActions.setTyping(participantCanType));
  const syncCanWalk = () =>
    dispatch(SettingsActions.setImpairment(participantCanWalk));
  const sendNameIntention = () =>
    dispatch(MessageActions.sendIntention(null, 'name', participantName));

  const navigation = useNavigation();
  const { navigate } = navigation;

  return (
    <>
      <View style={styles.headContainer}>
        <Text style={styles.subtitle}>
          {I18n.t('participantInformations.enterInformation')}
        </Text>
      </View>
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.inputContainer}
            placeholder={I18n.t('participantInformations.name')}
            onChangeText={setParticipantName}
          />
          <DropDownPicker
            placeholder={I18n.t('participantInformations.type')}
            open={canTypeDropdownOpen}
            value={participantCanType}
            items={canTypeDropdownItems}
            setOpen={setCanTypeDropdownOpen}
            setValue={setParticipantCanType}
            setItems={setCanTypeDropdownItems}
            zIndex={2000}
            zIndexInverse={1000}
          />
          <DropDownPicker
            placeholder={I18n.t('participantInformations.walk')}
            open={canWalkDropdownOpen}
            value={participantCanWalk}
            items={canWalkDropdownItems}
            setOpen={setCanWalkDropdownOpen}
            setValue={setParticipantCanWalk}
            setItems={setCanWalkDropdownItems}
            zIndex={1000}
            zIndexInverse={2000}
          />
        </View>
      </View>
      <View style={styles.textContainer}>
        <NextButton
          text={I18n.t('Onboarding.next')}
          onPress={() => {
            if (
              participantName !== null &&
              participantCanType !== null &&
              participantCanWalk !== null
            ) {
              syncName();
              syncCanType();
              syncCanWalk();
              sendNameIntention();
              navigate(nextScreen, { params: participantName });
            } else {
              Alert.alert(I18n.t('participantInformations.MissingInfo'));
            }
          }}
        />
      </View>
    </>
  );
};

export default ScreenPatientInfo;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 90,
    padding: 10,
    height: 60,
    //width: 300,
    backgroundColor: 'white',
    //width:Metrics.screenWidth,
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderRadius: 50,
    paddingHorizontal: 50,
    paddingVertical: 10,
    marginBottom: 50,
  },
  picker: {
    marginVertical: 50,
    width: Metrics.screenWidth - 20,
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: Colors.onboarding.background,
  },
  textContainer: {
    flex: 0.25,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: Colors.onboarding.background,
    alignSelf: 'stretch',
  },
  headContainer: {
    flex: 0.25,
    backgroundColor: Colors.onboarding.background,
  },
  subtitle: {
    color: Colors.onboarding.text,
    textAlign: 'center',
    marginTop: 80,
    fontSize: 20,
  },
});
