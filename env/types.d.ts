type Env = Partial<Readonly<typeof import('./env.local.json')>>;

declare namespace NodeJS {
  interface ProcessEnv extends Env {
    readonly NEXT_PUBLIC_HOST?: string;
    readonly NEXT_PUBLIC_YOUTUBE_API?: string;
    readonly NEXT_PUBLIC_YOUTUBE_API_URL?: string;
    readonly NEXT_PUBLIC_CHANNELLIST_URL?: string;
    readonly NEXT_PUBLIC_CHANNEL_ICON_URL?: string;
    readonly NEXT_PUBLIC_TEST_DOMAIN?: string;
    readonly ADMIN_ID: string;
  }
}
