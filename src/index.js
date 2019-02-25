import { app, BrowserWindow } from 'electron';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
// import { usb } from 'usb';


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// NodeJS.Process
const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) {
    enableLiveReload();
}

// https://github.com/tessel/node-usb
var usb = require('usb');
var devices = usb.getDeviceList();

console.log( '# of devices: ' + devices.length );

for (const device in devices) {
  if (devices.hasOwnProperty(device)) {
    // element is a Device object
    const element = devices[device];
    console.log( '\nbusNumber:                       ' + element.busNumber);
    console.log( 'deviceAddress:                     ' + element.deviceAddress);
    console.log( 'portNumbers:                       ' + JSON.stringify(element.portNumbers));
    console.log( 'deviceDescriptor.iManufacturer:    ' + element.deviceDescriptor.iManufacturer);
    console.log( 'deviceDescriptor.iProduct:         ' + element.deviceDescriptor.iProduct);
    console.log( 'deviceDescriptor.idProduct:        ' + element.deviceDescriptor.idProduct);
    console.log( 'deviceDescriptor.idVendor:         ' + element.deviceDescriptor.idVendor);
    console.log( 'deviceDescriptor.bcdDevice:        ' + element.deviceDescriptor.bcdDevice);
    console.log( 'deviceDescriptor.iSerialNumber:    ' + element.deviceDescriptor.iSerialNumber);
    console.log( 'deviceDescriptor.bcdUSB:           ' + element.deviceDescriptor.bcdUSB);
    console.log( 'deviceDescriptor.bDeviceClass:     ' + element.deviceDescriptor.bDeviceClass);
    console.log( 'deviceDescriptor.bDeviceSubClass:  ' + element.deviceDescriptor.bDeviceSubClass);
    console.log( 'ideviceDescriptor.bDeviceProtocol: ' + element.deviceDescriptor.bDeviceProtocol);
    console.log( '# of allConfigDescriptors:         ' + element.allConfigDescriptors.length);
    if ( element.allConfigDescriptors.length > 0 ) {
      console.log( 'configDescriptor.bDescriptorType:  ' + element.allConfigDescriptors[0].bDescriptorType);
      console.log( 'configDescriptor.bLength:  ' + element.allConfigDescriptors[0].bLength);
      console.log( 'configDescriptor.wTotalLength:  ' + element.allConfigDescriptors[0].wTotalLength);
      console.log( 'configDescriptor.bNumInterfaces:  ' + element.allConfigDescriptors[0].bNumInterfaces);
      console.log( 'configDescriptor.bConfigurationValue:  ' + element.allConfigDescriptors[0].bConfigurationValue);
      console.log( 'configDescriptor.iConfiguration:  ' + element.allConfigDescriptors[0].iConfiguration);
    }

    element.close();
  }
}



const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // https://electronjs.org/docs/faq#i-can-not-use-jqueryrequirejsmeteorangularjs-in-electron
    nodeIntegration: true
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(VUEJS_DEVTOOLS);
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
