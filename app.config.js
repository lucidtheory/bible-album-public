const getEnv = () => {
  switch (process.env.ENV) {
    case 'production':
      return {
        name: 'Bible Album',
        bundleIdentifier: 'com.etrainlearning.biblememorybook',
        package: 'com.etrainlearning.biblememorybook',
        icon: './assets/icon.png',
        foregroundImage: './assets/adaptive-icon.png',
        androidGoogleServicesFile: './buildConfigs/google-services.json',
        iosGoogleServicesFile: './buildConfigs/ios-google-prod.plist',
      };
    default/* build for staging */:
      return {
        name: 'Bible Mubla',
        bundleIdentifier: 'com.etrainlearning.biblememorybook.stag',
        package: 'com.etrainlearning.biblememorybook.stag',
        icon: './assets/icon.png',
        foregroundImage: './assets/adaptive-icon.png',
        androidGoogleServicesFile: './buildConfigs/google-services.json',
        iosGoogleServicesFile: './buildConfigs/ios-google-staging.plist',
      };
  }
};

const env = getEnv();

export default () => ({
  expo: {
    name: env.name,
    owner: 'es.etrenne',
    slug: 'bible-picture-book',
    version: '1.1.21',
    orientation: 'portrait',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#FFFFFF',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: [
      '**/*',
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: env.bundleIdentifier,
      buildNumber: '1.1.21',
      icon: env.icon,
      googleServicesFile: env.iosGoogleServicesFile,
    },
    android: {
      package: env.package,
      versionCode: 21,
      icon: env.icon,
      adaptiveIcon: {
        foregroundImage: env.foregroundImage,
        backgroundColor: '#FFFFFF',
      },
      jsEngine: 'hermes',
      googleServicesFile: env.androidGoogleServicesFile,
    },
    extra: {
      eas: {
        projectId: '4412009e-66cb-491c-9e70-67019e2be258',
      },
    },
    plugins: [
      [
        'expo-build-properties',
        {
          android: {
            packagingOptions: {
              pickFirst: [
                'lib/x86/libc++_shared.so',
                'lib/x86_64/libjsc.so',
                'lib/arm64-v8a/libjsc.so',
                'lib/arm64-v8a/libc++_shared.so',
                'lib/x86_64/libc++_shared.so',
                'lib/armeabi-v7a/libc++_shared.so',
              ],
            },
          },
          ios: {
            useFrameworks: 'static',
          },
        },
      ],
      '@react-native-firebase/app',
      '@react-native-firebase/perf',
      '@react-native-firebase/crashlytics',
    ],
  },
});
