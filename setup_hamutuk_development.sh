set -ex

npm install -g bower 'cordova@6.5.0' grunt-cli
npm install
bower install

# Install Android development tools
brew install https://gist.github.com/raphaelmerx/d08739b734001563365dd1a61e9c6660/raw/38a3696b37791fd0d917d5118aced5ef8304ad0f/android-sdk.rb
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
