## Server Usage

### Start BlueTooth File Server (OBEX) in the ESFileExplorer App on every tablet
- Deny discoverable request, and leave running in the background to facilitate data transfer
- This may have to be restarted over prolonged durations of time, especially after breaks.

### Run Server on Laptop
- Run the following command in the Ubuntu terminal, replacing the event key with the correct key.

``` ~/FRC-Scouting/scripts/startServer.sh EVENT_KEY_GOES_HERE```

Note: if any errors are shown, simply restart the server by typing "ctrl-c, the up arrow, and then enter". (that sequence reruns previous command in Linux)

## Start Scouting!- Tablets
Open the TGA app on the tablets, and begin to scout! 
- Once data is submitted, the matches will appear in the analysis portal momentarily. This data transfer process can take up to 1-2 minutes, at most. 
- When data transfer is pending, the top navigation bar will be red in color, and when all transfers are complete, the navigation bar will be green in color.

## Start Scouting!- Laptop
Open `localhost:4909` in Chrome/Firefox to see the analysis interface on the laptop
