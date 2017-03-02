# The Green Alliance - Server

Team 4909's 2017 Scouting System.

The aim of this project is to gather match data from the team's Android tablets via Bluetooth/USB/QR and then store data in a MongoDB database. Once the data is stored, analysis will be possible through a web interface.

## Overview
- Installing and Configuring The Green Alliance Scouting System
- Using the System
- Issues/Wiki

## Initial Configuration
[Details on Installation and Configuration](./INSTALL.md)

## Using the Scouting System
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
More information may be found in the Wiki Component of this Repository.
