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
mkdir -p ~/FRC-Scouting/dev

echo "=========="

echo "Installing Scouting System"
mkdir -p ~/FRC-Scouting/lib
cp -R ../backend/* ~/FRC-Scouting/lib

echo "Configuring Scouting System"
cd ~/FRC-Scouting/lib
npm install