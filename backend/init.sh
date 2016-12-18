# Ubuntu v16.04

# READ THIS
# ======
# This command must be run before this script can be executed
#
# chmod +x ./init.sh

echo "THIS COMMAND MUST BE RUN FROM WITHIN THE ./backend directory"

echo "Installing Node.JS & NPM"
sudo apt-get install nodejs -y
sudo apt-get install npm -y

echo "Installing OBEXFS Bluetooth Mount Utility"
sudo apt-get install obexfs -y

echo "=========="

echo "Creating Mountpoint"
mkdir -p ~/FRC-SCOUT/dev

echo "=========="

echo "Installing Scouting System"
mkdir -p ~/FRC-SCOUT/lib
cp -R ../backend/* ~/FRC-SCOUT/lib

echo "Configuring Scouting System"
cd ~/FRC-SCOUT/lib
npm install