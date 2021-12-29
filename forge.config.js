const apple_id = process.env.NOTORIZE_APPLE_ID;
const apple_pass = process.env.NOTORIZE_APPLE_PASS;
const apple_identity = process.env.APPLE_DEVELOPER;
console.log(`\nLoading with: '${apple_id}' and '${apple_identity}'`, );
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
      "identity": apple_identity,
      "hardened-runtime": true,
      "gatekeeper-assess": false,
      "entitlements": "entitlements.plist",
      "entitlements-inherit": "entitlements.plist",
      "signature-flags": "library"
    },
    "osxNotarize": {
      "appleId": apple_id,
      "appleIdPassword": '@keychain:CTMDesktopAppPassword'
      // see: https://stackoverflow.com/questions/32976976/how-should-the-keychain-option-be-used-for-altool
      // to setup the keychain for CTMDesktopAppPassword
    }
  },
  "makers": [
    {
      "name": "@electron-forge/maker-wix",
      "config": {
	 "name": "CallTrackingMetrics",
	 "shortName": "CTM",
	 "version": "1.0.0",
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
