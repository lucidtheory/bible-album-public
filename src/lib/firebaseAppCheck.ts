import { firebase } from '@react-native-firebase/app-check';

export const getAppCheckHeaders = async (): Promise<any> => {
  try {
    const { token } = await firebase.appCheck().getToken();
    return { headers: { 'X-Firebase-AppCheck': token } };
  } catch (error) {
    console.log('error', error);
    return { };
  }
};

export const activateAppCheck = async (): Promise<any> => {
  try {
    await firebase.appCheck().activate('', true);
  } catch (err) {
    console.log('failed to activate appcheck');
  }
};
