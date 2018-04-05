import {
    app,
    BrowserWindow,
    Menu,
} from 'electron'


import * as path from "path";
import * as url from "url";

const env = process.env['NODE_ENV'] || 'production'

let mainWindow

function createWindow () {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,

        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            webSecurity: false
        }
    })

    let appURL = {
        'development': {
            pathname: 'localhost:8080/',
            protocol: 'http:',
            slashes: true,
        },
        'production': {
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true,
        }
    }

    mainWindow.loadURL(url.format(appURL[env]))

    if (env === 'development') {
        mainWindow.toggleDevTools()
    }

    mainWindow.on('closed', function () {
        mainWindow = null
    })

    Menu.setApplicationMenu(Menu.buildFromTemplate(
        [{
            label: "Application",
            submenu: [
                { label: "About Application", role: "about" },
                { type: "separator" },
                { label: "Quit", accelerator: "Command+Q", click: () => { app.quit() }}
            ]}, {
            label: "Edit",
            submenu: [
                { label: "Undo", accelerator: "CmdOrCtrl+Z", role: "undo" },
                { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", role: "redo" },
                { type: "separator" },
                { label: "Cut", accelerator: "CmdOrCtrl+X", role: "cut" },
                { label: "Copy", accelerator: "CmdOrCtrl+C", role: "copy" },
                { label: "Paste", accelerator: "CmdOrCtrl+V", role: "paste" },
                { label: "Select All", accelerator: "CmdOrCtrl+A", role: "selectall" }
            ]}
        ]
    ))
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate',  () => {
    if (mainWindow === null) {
        createWindow()
    }
})