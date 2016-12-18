echo "=========="

echo 'Script should be run in the ./cordova directory of the application.'

echo "=========="

echo "Configuring Android Build"
cordova platform add android

echo "=========="

echo "Installing Plugins"
cordova plugins restore

echo "=========="

echo "Cordova Application Initialized"
echo " - run the command 'cordova run android -device' to run on device"

# Run Application on Device
# cordova run android -device