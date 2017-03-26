# Ubuntu v16.04

# READ THIS
# ======
# This command must be run before this script can be executed
#
# chmod +x ./init.sh

echo "Creating Mountpoint"
mkdir -p ~/FRC-Scouting/dev

echo "=========="

echo "Installing Scouting System"
mkdir -p ~/FRC-Scouting/lib
cp -R ~/FRC-Scouting/backend/* ~/FRC-Scouting/lib

echo "Configuring Scouting System"
cd ~/FRC-Scouting/lib
npm install