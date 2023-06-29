import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Text,
  TouchableOpacity,
  Keyboard,
  LogBox,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import RNOtpVerify from 'react-native-otp-verify';

type Props = {};

const App = (props: Props) => {
  const [otp, setOtp] = useState<string>('');
  LogBox.ignoreAllLogs();
  LogBox.ignoreLogs(['Warning: ...']);
  const handleOtpVerification = () => {
    console.log('object');
    if (otp.length === 4) {
      // Perform your OTP verification logic here
      Alert.alert('Success', 'OTP verified successfully!');
    } else {
      Alert.alert('Error', 'Please enter a valid OTP.');
    }
  };

  useEffect(() => {
    RNOtpVerify.getHash()
      .then(hash => {
        console.log('Hash', hash);
      })
      .catch(console.log);

    RNOtpVerify.getOtp()
      .then(p => RNOtpVerify.addListener(otpHandler))
      .catch(p => console.log(p));

    return () => {
      RNOtpVerify.removeListener();
    };
  }, []);

  const otpHandler = (message: string) => {
    const otp1 = /(\d{4})/g.exec(message)?.[1];
    setOtp(otp1 as string);
    console.log('OTP', otp1);
    RNOtpVerify.removeListener();
    Keyboard.dismiss();
  };
  return (
    <View
      // behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <View style={styles.otpContainer}>
        <OTPInputView
          style={styles.otpInput}
          pinCount={4}
          code={otp}
          onCodeChanged={code => setOtp(code)}
          autoFocusOnLoad
          secureTextEntry
          codeInputFieldStyle={styles.otpInputField}
          codeInputHighlightStyle={styles.otpInputHighlight}
        />
      </View>
      <Button title="Verify OTP" onPress={handleOtpVerification} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  otpContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  otpInput: {
    width: '80%',
    height: 200,
  },
  otpInputField: {
    borderWidth: 2,
    borderRadius: 8,
    color: '#000',
    fontSize: 20,
  },
  otpInputHighlight: {
    borderColor: '#000',
  },
});

export default App;
