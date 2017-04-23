# Delete Old Code
rm -rf ~/FRC-Scouting
rm -rf ~/The-Green-Alliance

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

# Download Android SDK
sudo apt-get update
sudo apt-get install openjdk-8-jdk

cd ~
wget http://dl.google.com/android/android-sdk_r24.2-linux.tgz
tar -xvf android-sdk_r24.2-linux.tgz
cd android-sdk-linux/tools

# Install all sdk packages
./android update sdk --no-ui

mv ~/android-sdk-linux ~/sdk/

# Set path
vi ~/.zshrc << EOT

export ANDROID_HOME=$HOME/sdk
export PATH=${PATH}:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools:$ANDROID_HOME/build-tools/22.0.1/

EOT

source ~/.zshrc

# Install adb
sudo apt-get install libc6:i386 libstdc++6:i386
# Install aapt
sudo apt-get install zlib1g:i386

# Install Cordova
sudo cp /usr/bin/nodejs /usr/bin/node
sudo npm install -g cordova

# Download App
cd ~
git clone https://github.com/FRCteam4909/The-Green-Alliance.git

# Configure App
cd ~/The-Green-Alliance
cordova platform add android
mkdir "$HOME/sdk/licenses"
echo -e "\n8933bad161af4178b1185d1a37fbf41ea5269c55" > "$HOME/sdk/licenses/android-sdk-license"
cordova platform remove android
cordova platform add android
cordova plugins restore

#
echo "Install Complete!"
