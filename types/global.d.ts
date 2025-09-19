// types/global.d.ts

// Baris ini terkadang dibutuhkan, bisa dicoba jika ada error lain
// export {};

declare module "*.glb";
declare module "*.png";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}
