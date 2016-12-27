# Ubuntu v16.04

# READ THIS
# ======
# This command must be run before this script can be executed
#
# chmod +x ./init.sh

echo "THIS COMMAND MUST BE AS SUDO RUN FROM WITHIN THE ./backend directory"

echo "Installing Node.JS & NPM"
sudo apt-get install nodejs -y
sudo apt-get install npm -y

echo "Installing OBEXFS Bluetooth Mount Utility"
sudo apt-get install obexfs -y

echo "Installing and Configuring MongoDB"
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo service mongod start

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