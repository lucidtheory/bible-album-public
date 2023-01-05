import Constants from 'expo-constants';

export default function getVersion(): string {
  if (!Constants.manifest || !Constants.manifest.ios || !Constants.manifest.android) {
    return '';
  }

  const {
    ios: {
      buildNumber,
    },
    name,
  } = Constants.manifest;

  const versionString = `Version: ${buildNumber}-${name.charAt(6)}`;

  return versionString;
}
