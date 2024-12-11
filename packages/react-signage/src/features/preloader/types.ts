export type PreloaderStatus =
    | {
          type: 'pending' | 'finished';
      }
    | {
          type: 'loadingImage';
          src: string;
      }
    | {
          type: 'loadingVideo';
          src: string;
          percent: number;
      };
