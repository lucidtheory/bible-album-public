import InAppReview from 'react-native-in-app-review';

const handleAskForReview = async () => {
  if (InAppReview.isAvailable()) {
    try {
      await InAppReview.RequestInAppReview();
    } catch (err) {
      console.log('error launching review', err);
    }
  }
};

export default handleAskForReview;
