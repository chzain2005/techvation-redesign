import * as migration_20261115_113406_initial from './20261115_113406_initial';
import * as migration_20261115_114322_media_storage from './20261115_114322_media_storage';

export const migrations = [
  {
    up: migration_20261115_113406_initial.up,
    down: migration_20261115_113406_initial.down,
    name: '20261115_113406_initial',
  },
  {
    up: migration_20261115_114322_media_storage.up,
    down: migration_20261115_114322_media_storage.down,
    name: '20261115_114322_media_storage'
  },
];
