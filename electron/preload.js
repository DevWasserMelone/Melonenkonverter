const { contextBridge, ipcRenderer, webUtils } = require('electron');

contextBridge.exposeInMainWorld('launcher', {
  info: () => ipcRenderer.invoke('l:info'),
  check: () => ipcRenderer.invoke('l:check'),
  update: () => ipcRenderer.invoke('l:update'),
  start: () => ipcRenderer.invoke('l:start'),
  progCheck: () => ipcRenderer.invoke('l:progCheck'),
  progDownload: () => ipcRenderer.invoke('l:progDownload'),
  progInstall: () => ipcRenderer.invoke('l:progInstall'),
  onProg: (cb) => ipcRenderer.on('l:prog', (e, d) => cb(d)),
  pubGet: () => ipcRenderer.invoke('l:pubGet'),
  pubSave: (d) => ipcRenderer.invoke('l:pubSave', d),
  pubPick: () => ipcRenderer.invoke('l:pubPick'),
  publish: (d) => ipcRenderer.invoke('l:publish', d)
});

contextBridge.exposeInMainWorld('mk', {
  version: () => ipcRenderer.invoke('a:version'),
  pathForFile: (file) => { try { return webUtils.getPathForFile(file); } catch (e) { return ''; } },
  pickFiles: () => ipcRenderer.invoke('a:pickFiles'),
  pickFolder: () => ipcRenderer.invoke('a:pickFolder'),
  readFile: (p) => ipcRenderer.invoke('a:read', p),
  writeFiles: (dir, files) => ipcRenderer.invoke('a:write', dir, files),
  findTexture: (p3d, tex) => ipcRenderer.invoke('a:findTex', p3d, tex),
  listTextures: (file, levels) => ipcRenderer.invoke('a:listTex', file, levels),
  openFolder: (dir) => ipcRenderer.invoke('a:openFolder', dir),
  bridgeDir: () => ipcRenderer.invoke('a:bridgeDir'),
  showItem: (p) => ipcRenderer.invoke('a:showItem', p),
  aiRequest: (url, key, body) => ipcRenderer.invoke('a:aiRequest', url, key, body),
  httpGetImage: (url) => ipcRenderer.invoke('a:httpGetImage', url),
  watch: (dir) => ipcRenderer.invoke('a:watch', dir),
  unwatch: () => ipcRenderer.invoke('a:unwatch'),
  onWatched: (cb) => ipcRenderer.on('a:watched', (e, p) => cb(p)),
  onOpenFiles: (cb) => ipcRenderer.on('a:open', (e, ps) => cb(ps))
});
