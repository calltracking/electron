const APPLE_KEY = process.env.APPLE_KEY;
const APPLE_ISSUER = process.env.APPLE_ISSUER;

module.exports = {
  "packagerConfig": {
    "app-bundle-id": "com.calltrackingmetrics.desk",
    "icon": "./public/packaged-icons/icons/mac/icon.icns",
    asar: {
      unpack: '*.node'
    },
    darwinDarkModeSupport: 'true',
    name: 'CallTrackingMetrics',
    "osxSign": {
      "identity": "656DA030388AB2EB000F211E0A6031302B9913A2",
      "hardened-runtime": true,
      "gatekeeper-assess": false,
      "entitlements": "entitlements.plist",
      "entitlements-inherit": "entitlements.plist",
      "signature-flags": "library"
    },
    "osxNotarize": {
      "appleApiKey": APPLE_KEY,
      "appleApiIssuer": APPLE_ISSUER
    }
  },
  "makers": [
    {
      "name": "@electron-forge/maker-wix",
      "config": {
        "name": "CallTrackingMetrics",
        "shortName": "CTM",
        "version": "1.0.5",
        "language": 1033,
        "manufacturer": "CallTrackingMetrics",
        "description": "CallTrackingMetrics Agent Phone",
      }
    },
    {
      "name": "@electron-forge/maker-squirrel",
      "config": {
        "name": "CallTrackingMetrics"
      }
    },
    {
      "name": "@electron-forge/maker-zip",
      "platforms": [
        "darwin"
      ]
    },
    {
      "name": "@electron-forge/maker-deb",
      "config": {}
    },
    {
      "name": "@electron-forge/maker-rpm",
      "config": {}
    },
    {
      "name": "@electron-forge/maker-dmg",
      "config": {
        "background": "./public/icons/mac/1024.png",
        "icon": "./public/icons/mac/1024.png",
        "format": "ULFO",
        "extendInfo": {
          "LSUIElement": 0
        }
      },
      "platforms": [
        "darwin"
      ]
    }
  ]
}
