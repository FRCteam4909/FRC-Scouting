# FRC-Scouting

Team 4909's 2017 Scouting System.

The aim of this project is to gather match data from the team's Android tablets via Bluetooth/USB/QR and then store data in a MongoDB database. Once the data is stored, analysis will be possible through a web interface.

## Installation Script
```
# Ensure Git is Installed
sudo apt-get install git

# Download Git Repository
cd ~
git clone https://github.com/FRCteam4909/FRC-Scouting.git

# Configure Scripts
cd ~/FRC-Scouting/script
chmod +x *.sh

# Run Scripts
sudo ./dependencies.sh
./init.sh

```
## Backend Device Configuration (~/FRC-Scouting/config/devices.js)
```
  module.exports = [
     // LIST DEVICE BLUETOOTH MAC ADDRESSES HERE
     
     "00:E4:22:21:13:45",
     "00:E4:22:14:C8:29"
  ];
```

## Running Server
```
cd ~/FRC-Scouting/lib
nodejs ./main.js --event [EVENT_KEY GOES HERE]
```
## WIKI
Other information can be found in the Wiki Component of this Repository.
