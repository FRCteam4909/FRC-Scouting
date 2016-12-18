# Ubuntu v16.04

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
cp ../backend ~/FRC-SCOUT/lib

echo "Configuring Scouting System"
cd ~/FRC-SCOUT/lib
# npm install