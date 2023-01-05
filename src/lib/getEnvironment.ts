import { channel } from 'expo-updates';

interface IConfig {
  dbUrl: string
  analyticsAPIKey: string
  channel: string | null
}

const getEnvironment = (): IConfig => {
  switch (channel) {
    case 'production':
      return {
        channel,
        analyticsAPIKey: 'c7a57568d265a912933b28d65cbf2202',
        dbUrl: 'https://bible-picture-book.herokuapp.com/',
      };
    default/* staging */:
      return {
        channel,
        analyticsAPIKey: 'c762c4d3c549c958bb7aa9677f0fabc6',
        dbUrl: 'https://bible-staging-book.herokuapp.com/',
      };
  }
};

export default getEnvironment;
