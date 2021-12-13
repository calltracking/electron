module.exports = {
  "packagerConfig": {
    "icon": "./public/packaged-icons/icons/mac/icon.icns",
    "osxSign": {
      "identity": "Apple Development: Todd Fisher (QWATJPT97M)",
      "hardened-runtime": true,
      "entitlements": "entitlements.plist",
      "entitlements-inherit": "entitlements.plist",
      "signature-flags": "library"
    },
    "osxNotarize": {
      "appleId": process.env.NOTORIZE_APPLE_ID,
      "appleIdPassword": process.env.NOTORIZE_APPLE_ID,
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
      }
    }
  ]
}
