import * as migration_20261115_113406_initial from './20261115_113406_initial';
import * as migration_20261115_114322_media_storage from './20261115_114322_media_storage';
import * as migration_20261115_192104_homepage_auto_services from './20261115_192104_homepage_auto_services';
import * as migration_20261115_192134_form_inbox from './20261115_192134_form_inbox';
import * as migration_20261115_194102_email_alerts from './20261115_194102_email_alerts';
import * as migration_20261115_212222_booking_slots from './20261115_212222_booking_slots';
import * as migration_20261115_214319_rate_limit from './20261115_214319_rate_limit';

export const migrations = [
  {
    up: migration_20261115_113406_initial.up,
    down: migration_20261115_113406_initial.down,
    name: '20261115_113406_initial',
  },
  {
    up: migration_20261115_114322_media_storage.up,
    down: migration_20261115_114322_media_storage.down,
    name: '20261115_114322_media_storage',
  },
  {
    up: migration_20261115_192104_homepage_auto_services.up,
    down: migration_20261115_192104_homepage_auto_services.down,
    name: '20261115_192104_homepage_auto_services',
  },
  {
    up: migration_20261115_192134_form_inbox.up,
    down: migration_20261115_192134_form_inbox.down,
    name: '20261115_192134_form_inbox',
  },
  {
    up: migration_20261115_194102_email_alerts.up,
    down: migration_20261115_194102_email_alerts.down,
    name: '20261115_194102_email_alerts',
  },
  {
    up: migration_20261115_212222_booking_slots.up,
    down: migration_20261115_212222_booking_slots.down,
    name: '20261115_212222_booking_slots',
  },
  {
    up: migration_20261115_214319_rate_limit.up,
    down: migration_20261115_214319_rate_limit.down,
    name: '20261115_214319_rate_limit'
  },
];
