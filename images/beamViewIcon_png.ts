/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gYRFAkgcoaCiAAAAflJREFUWMPtl09PE0EYh3+F7Z80Fpqw3QMbs4vlTLd4a9TwEbxrIl+BT0D5BMRvAHeFBCQGSUhFgydDW2P1YE17IHFj25TD7s60ELy0CrsvKyHgYDK/ZA/7zGbmmXfebHYBGRkZGRkZmRtOROTiDx4+WjYMw/Jz27aRSCTKrzY3lgB0h1wRKWsYpjWTy835eb3+Ddns9NzUvez81y+15ztvtou/ZVunugnADJm3oUYOG9ctOz4+Bk3LBHin3YamZaBpmfTsbH7RsvLPDg4+LgwrOw9gMWzi1qkeNtwYXBelC6Dih3tbCfNOPDhv62cL+uQfrk/qZqFQWL+uNvjbyQDAYz/I3R/B0Y8JsuKqep6r6oTYno3FYkilUgGeTCZJLlRWUUYRj8cDPBqNknzkf3rPCq1sv38Mz/MCnHNOcsGyfbiuS8pSXDnz6hEi6xBSjDGSD2VdYZV1KFlOcuFt4LhOUJYzkg9l74qQ7V1QWc5YaGVTQirb612pZ8W1gRM8bo8xkguVPT45Aeec3ATFb0K2fPaDeXB/RI3vvo4tp8dgXWbSTqfdpWRLvvu3YeNq5LB01V09eTraTc+EP8M8D9VqZWXt5YslZbBgEUDxtn0L1Gqfy+/f7S18r9dLwnu22WyWKW7bNj7s769+qlZW5G+yjIyMjIzMP80v6ovPXmkUn/kAAAAASUVORK5CYII=';
export default image;