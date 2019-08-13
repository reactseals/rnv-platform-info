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

  if ((IS_MOBILE && IS_ANDROID) || (userAgent && userAgent.match(/Android/))) os = "android";
  else if ((IS_MOBILE && IS_IOS) || (userAgent && userAgent.match(/iPhone|iPad|iPod/))) os = "ios";
  else if (userAgent && userAgent.match(/Windows Phone/)) os = "windowsPhone";
  else if (userAgent && userAgent.match(/BlackBerry/)) os = "blackBerry";
  else if (IS_ANDROID_TV || userAgent && userAgent.match(/Android TV/)) os = "androidtv";
  else if (IS_TV_OS || userAgent && userAgent.match(/AppleTV/i)) os = "tvos";
  else if (IS_TIZEN) os = "tizen";
  else if (IS_WEB_OS) os = "webos";
  else if (userAgent && userAgent.match("Windows")) os = "windows";
  else if (userAgent && userAgent.match("Mac")) os = "macOS";
  else if (userAgent && userAgent.match("X11")) os = "unix";
  else if (userAgent && userAgent.match("Linux")) os = "linux";
  else os = "unknown";
  return os;
};

const getRuntime = () => {
  return Platform.OS === 'web' ? 'web' : 'native';
}

const getFormFactor = () => {
  const OS = getOS();
  const isMobile = /android|ios|windowsPhone|blackBerry/.test(OS);
  const isDesktop = /windows|macOS|unix|linux/.test(OS);
  const isBigScreen = /androidtv|tvos|tizen|webos/.test(OS);

  if (isMobile && !isTablet()) return 'phone';
  else if (isTablet() && isMobile) return 'tablet';
  else if (isBigScreen) return 'big_screen';
  else if (isDesktop) return 'desktop';
  return 'unknown';
};

const IS_TABLET = isTablet();
const OS_NAME = getOS();
const RUNTIME = getRuntime();
const FORM_FACTOR = getFormFactor();

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
  FORM_FACTOR,
};
