## Prerequisites
- [Ubuntu Desktop v16.04 LTS](https://www.ubuntu.com/download/desktop)
- [Bluetooth v4.x Adapter, if not built-in](http://a.co/fmJrtQR)

## Installation
Prior to installing The Green Alliance - Server, Ubuntu Desktop v16.04 LTS must be installed on the device being used as a server. The Green Alliance - Server also requires a Bluetooth adapter to be present. 

## Installation Script
This line can be run in the Ubuntu Terminal and the entirety of the server and app installation will be complete.
```
cd ~ && wget https://raw.githubusercontent.com/FRCteam4909/The-Green-Alliance-Server/master/scripts/install.sh -O tga-installer.sh && chmod +x tga-installer.sh && bash tga-installer.sh
```
### Install Notes
1) it may ask for your password, just fill in, and enter
2) it may ask “y/n” for licenses agreements, just type “y” and enter

## Device Pairing
Each tablet intended for scouting use must be paired with the scouting server laptop. This can be done in the OS settings Bluetooth pane.

## Backend Device Configuration (~/FRC-Scouting/config/devices.js)
The device config. file can edited by running following command in the terminal:
```
nano ~/FRC-Scouting/config/devices.js
```
The file should look like this when correctly edited, all the devices MAC addresses can be found under the devices' Bluetooth settings:
```
  module.exports = [
     // LIST DEVICE BLUETOOTH MAC ADDRESSES HERE
     
     "00:E4:22:21:13:45",
     "00:E4:22:67:C8:29",
     "00:E4:22:98:13:34",
     "00:E4:22:34:C8:93",
     "00:E4:22:45:13:56",
     "00:E4:22:14:C8:43"
  ];
```
## Install Bluetooth Transfer Utility
Install [ESFileExplorer](https://www.amazon.com/ES-File-Explorer-Manager/dp/B008K6HN8I/ref=sr_1_1?ie=UTF8&qid=1492648918&sr=8-1&keywords=esfile+explorer+app) on each of the tablets from the Amazon Marketplace.

## Put the Tablets into Developer Mode
The tablets must be in developer mode. This can be enabled by clicking the serial number in the settings panes seven times. After that, ADB must be enabled under the newly available developer options.

## Install TGA App on the Tablets
Run this command in the terminal, with an individual device plugged in via USB.

```cd ~/The-Green-Alliance && cordova run android --device```
