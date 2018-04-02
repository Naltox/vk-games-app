import {remote} from "electron";

export function getUserDataPath(): string {
    return remote.app.getPath('userData')
}