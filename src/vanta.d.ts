declare module 'vanta/dist/vanta.net.min' {
  const NET: (opts: Record<string, unknown>) => { destroy: () => void; resize?: () => void };
  export default NET;
}
declare module 'three';
