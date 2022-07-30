declare module NodeJS.Process {
  export interface ProcessEnv {
    HOST: string;
    PORT: number;
    NODE_ENV: 'develop' | 'testing' | 'staging' | 'production';
  }
}
