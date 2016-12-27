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