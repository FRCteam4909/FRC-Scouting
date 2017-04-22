sudo service mongod start
~/FRC-Scouting/scripts/reset.sh
cd ~/FRC-Scouting/lib && nodejs ./web.js &
cd ~/FRC-Scouting/lib && nodejs ./main.js --event $1
