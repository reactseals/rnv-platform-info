import { Dimensions, PixelRatio, Platform } from 'react-native';

const { userAgent } = navigator;

const IS_TIZEN = /Tizen|tizen|TIZEN/.test(userAgent);
const IS_WEB_OS = /Web0S|web0s|WEB0S|webos|WEBOS|WebOS/.test(userAgent);
const IS_STV = IS_TIZEN || IS_WEB_OS;
const IS_WEB = Platform.OS === 'web' && !IS_STV;
const IS_TV = Platform.isTV || IS_TIZEN || IS_WEB_OS;
const IS_MOBILE = (Platform.OS === 'android' || Platform.OS === 'ios') && !IS_TV;
const IS_ANDROID_TV = Platform.OS === 'android' && IS_TV;
const IS_TV_OS = Platform.OS === 'ios' && IS_TV;
const IS_ANDROID = Platform.OS === 'android' && !IS_TV;
const IS_IOS = Platform.OS === 'ios' && !IS_TV;

const isTablet = () => {
  const pixelDensity = PixelRatio.get();

  const { height, width } = Dimensions.get('window');

  const adjustedWidth = width * pixelDensity;
  const adjustedHeight = height * pixelDensity;

  return (pixelDensity < 2
    && (adjustedWidth >= 1000
    || adjustedHeight >= 1000)) || (pixelDensity === 2
      && (adjustedWidth >= 1920
      || adjustedHeight >= 1920));
}

const IS_TABLET = isTablet();

export {
  IS_WEB,
  IS_MOBILE,
  IS_TV,
  IS_WEB_OS,
  IS_ANDROID_TV,
  IS_TV_OS,
  IS_ANDROID,
  IS_IOS,
  IS_TIZEN,
  IS_STV,
  IS_TABLET
};
