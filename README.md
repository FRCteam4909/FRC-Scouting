# The Green Alliance - Server

Team 4909's 2017 Scouting System.

The aim of this project is to gather match data from the team's Android tablets via Bluetooth/USB/QR and then store data in a MongoDB database. Once the data is stored, analysis will be possible through a web interface.

## Overview
- Installing Ubuntu
- Installing The Green Alliance - Server
- Configuring Pairing with Tablets 
- Configuring Tablet Device Configuration

## Prerequisites
- [Ubuntu Desktop v16.04 LTS](https://www.ubuntu.com/download/desktop)
- [Bluetooth v4.x Adapter, if not built-in](http://a.co/fmJrtQR)

## Installation
Prior to installing The Green Alliance - Server, Ubuntu Desktop must be installed on the device being used as a server. The Green Alliance - Server also requires a Bluetooth adapter to be present. 

## Installation Script
This can be pasted in an Ubuntu Terminal and the majority of the server installation will be complete.
```
# Ensure Git is Installed
sudo apt-get install git

# Download Git Repository
cd ~
git clone https://github.com/FRCteam4909/FRC-Scouting.git

# Configure Scripts
cd ~/FRC-Scouting/scripts
chmod +x *.sh

# Run Scripts
sudo ./dependencies.sh
./init.sh

```
## Backend Device Configuration (~/FRC-Scouting/config/devices.js)
The device config. file can edited with the following command:
```
nano ~/FRC-Scouting/config/devices.js
```
The file should look Like this, all the devices MAC addresses can be found under the devices' Bluetooth settings:
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

## Device Pairing
Each tablet intended for scouting use must be paired with the scouting server laptop. This can be done in the OS settings Bluetooth pane.

## Using the System as a Whole, After Configuration
### Running the Server, using the terminal
```
cd ~/FRC-Scouting/lib
nodejs ./main.js --event EVENT_KEY_GOES_HERE
```
### Opening the Viewing Analysis Portal
The data analysis can be done by opening up the following URL in a browser on the same laptop the server is running on.
```
localhost:4909
```
### Run the Bluetooth OBEX Server on each Tablets
This will be done in the ESFileExplorer app. You should choose to deny making the Bluetooth device visible for pairing, as to avoid additional prompts while scouting. This app should remain open in the background to facilitate the Bluetooth data transfer.

### Run the App
Open the TGA app on the tablets, and begin to scout! 
- Once data is submitted, the matches will appear in the analysis portal momentarily. This data transfer process can take up to 1-2 minutes, at most. 
- When data transfer is pending, the top navigation bar will be red in color, and when all transfers are complete, the navigation bar will be green in color.

## Issues
Please create a GitHub issue for any bugs or feature requests.

## WIKI
Other information can be found in the Wiki Component of this Repository.
