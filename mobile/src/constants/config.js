import { Platform } from 'react-native';

// In Android emulator 10.0.2.2 points to host localhost; on web/ios localhost works.
// On physical device, user can configure their LAN IP in the mobile Settings screen.
export const DEFAULT_API_URL = Platform.select({
  android: 'http://10.0.2.2:5000/api',
  ios: 'http://localhost:5000/api',
  default: 'http://localhost:5000/api',
});

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@selsolve_auth_token',
  USER_DATA: '@selsolve_user_data',
  API_BASE_URL: '@selsolve_api_base_url',
  SCALE_CONFIG: '@selsolve_scale_config',
  OFFLINE_CACHE: '@selsolve_offline_cache',
};

export const BREED_OPTIONS = [
  'All Breeds',
  'Tellicherry',
  'Boer',
  'Sirohi',
  'Alpine',
  'Kiko',
  'Nubian',
  'Jamnapari',
  'Barbari',
  'Beetal',
  'Other',
];

export const GENDER_OPTIONS = ['All', 'Female', 'Male'];

export const STAGE_OPTIONS = {
  Female: ['Kid', 'Doeling', 'Doe'],
  Male: ['Kid', 'Buckling', 'Buck', 'Wether'],
};

export const STATUS_OPTIONS = ['All', 'Active', 'Sold', 'Archived', 'Dead', 'Sick', 'Pregnant'];

export const EVENT_TYPES = [
  'All Event Types',
  'Vaccination',
  'Health Check',
  'Mating',
  'Birth',
  'Purchase',
  'Sale',
  'Weight Check',
  'Milking',
  'Treatment',
  'Other',
];

export const ORIGIN_OPTIONS = ['Born on farm', 'Purchased', 'Other'];
