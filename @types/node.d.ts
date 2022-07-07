declare namespace NodeJS {
  interface ProcessEnv {
    FIREBASE_SETTINGS_SECRET: string;
    FIREBASE_SETTINGS_IV: string;
    FIREBASE_AUTH_EMULATOR_HOST?: string;
    FIRESTORE_EMULATOR_HOST?: string;
    FIREBASE_STORAGE_EMULATOR_HOST?: string;
    NEXT_PUBLIC_EMULATORS: 'on' | 'off';
    NEXT_PUBLIC_ALGOLIA_APP_ID: string;
    NEXT_PUBLIC_ALGOLIA_API_KEY: string;
    VERCEL_URL?: string;
    SENDGRID_API_KEY: string;
    SENDGRID_SENDER: string;
  }
}
