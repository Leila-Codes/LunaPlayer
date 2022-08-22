export enum DeviceType {
  DESKTOP,
  ANDROID,
  ELECTRON
  /* CURRENTLY UNSUPPORTED TYPE(S) */
  // IOS
  // TV
}

export function getDeviceType() : DeviceType {
  if (navigator.userAgent.indexOf("Android") !== -1) {
    return DeviceType.ANDROID;
  } else if (window.electronAPI !== undefined) {
    return DeviceType.ELECTRON;
  }
  /*else if (navigator.userAgent.indexOf("iPhone OS") !== -1 || navigator.userAgent.indexOf("iPad 0S") !== -1) {
      return DeviceType.IOS;
  }*/

  // Default return value, we're on Desktop.
  return DeviceType.DESKTOP;
}
