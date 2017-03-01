# FRC-Scouting

Team 4909's 2017 Scouting System.

The aim of this project is to gather match data from the team's Android tablets via Bluetooth/USB/QR and then store data in a MongoDB database. Once the data is stored, analysis will be possible through a web interface.

## Prerequisites
- [Ubuntu Desktop v16.04 LTS](https://www.ubuntu.com/download/desktop)
- [Bluetooth v4.x Adapter, if not built-in](http://a.co/fmJrtQR)

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

## Running Server
```
cd ~/FRC-Scouting/lib
nodejs ./main.js --event [EVENT_KEY GOES HERE]
```

## WIKI
Other information can be found in the Wiki Component of this Repository.

## Customization
There are two other files in the config directory, the app configuration and data analysis configuration. These need not be touched if you are using the standard configuration from the team.
