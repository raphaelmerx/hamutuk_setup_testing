set -ex

npm install -g bower 'cordova@6.5.0' grunt-cli
npm install
bower install

# Install Android development tools
brew tap catalpainternational/catalpa
(brew tap-info catalpainternational/catalpa | grep 'unpinned') && brew tap-pin catalpainternational/catalpa
brew install android-sdk
export ANDROID_HOME=/usr/local/opt/android-sdk

# have to separate all android installs to "echo y" for each
echo y | android update sdk --no-ui --all --filter "android-25"
echo y | android update sdk --no-ui --all --filter "build-tools-25.0.3"
echo y | android update sdk --no-ui --all --filter "extra-android-m2repository"
echo y | android update sdk --no-ui --all --filter "extra-google-m2repository"

# create the android project, then git checkout the custom barcodescanner.aar
rm -rf platforms/android
cordova platform add android@6.1.2
git checkout -- platforms

cordova requirements
cordova build

echo "Add the following to your .bashrc: export ANDROID_HOME=/usr/local/opt/android-sdk"
