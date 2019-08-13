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
};

const getOS = () => {
  let os = "";

  if (IS_MOBILE && IS_ANDROID) os = "android";
  else if (IS_MOBILE && IS_IOS) os = "ios";
  else if (IS_ANDROID_TV) os = "androidtv";
  else if (IS_TV_OS) os = "tvos";
  else if (userAgent && userAgent.indexOf("Windows") != -1) os = "windows";
  else if (userAgent && userAgent.indexOf("Mac") != -1) os = "macOS";
  else if (userAgent && userAgent.indexOf("X11") != -1) os = "unix";
  else if (userAgent && userAgent.indexOf("Linux") != -1) os = "linux";
  else os = "unknown";
  return os;
};

const getRuntime = () => {
  return Platform.OS === 'web' ? 'web' : 'native';
}

const IS_TABLET = isTablet();
const OS_NAME = getOS();
const RUNTIME = getRuntime();

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
  IS_TABLET,
  OS_NAME,
  RUNTIME,
};
