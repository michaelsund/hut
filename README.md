# Hut, my take on homeautomation.

Install node packages: yarn installdeps

create client/src/settings.json with the following content, more info needed on tradfri setup.
```
{
  "dev": true,
  "prodIp": "192.168.1.X",
  "mongoServer": "192.168.1.X",
  "mongoUser": "",
  "mongoPass": "",
  "sonarrIp": "192.168.1.X",
  "sonarrKey": "",
  "pushBulletKey": "your_api_key",
  "pusBulletChannel": "your_channel",
  "tradfriIp": "192.168.1.X",
  "tradfriId": "",
  "tradfriPsk": ""
}
```

[Follow this guide to install tellstick support](https://github.com/Hexagon/node-telldus#installation)

## Then run the following

yarn add node-gyp telldus

build the image
docker build -t hut .

start it with tellstick connected
```
docker run -d -e TZ="Europe/Stockholm" -p 5000:5000 -p 40510:40510 --device /dev/bus/usb:/dev/bus/usb --name my_hut hut
```

Or without tellstick
```
docker run -d -p 5000:5000 -p 40510:40510 --name my_hut hut
```
