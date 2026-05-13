/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_NAME: string
  readonly VITE_PRIMARY_COLOR: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'aos' {
  interface AosOptions {
    offset?: number;
    delay?: number;
    duration?: number;
    easing?: string;
    once?: boolean;
    mirror?: boolean;
    anchorPlacement?: string;
  }

  interface Aos {
    init(options?: AosOptions): void;
    refresh(): void;
    refreshHard(): void;
  }

  const aos: Aos;
  export default aos;
}

interface Window {
  tsParticles: {
    load(id: string, options: object): Promise<void>;
  };
}
