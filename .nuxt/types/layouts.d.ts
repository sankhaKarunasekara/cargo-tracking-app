import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "desktop-layout" | "mobile-layout" | "default"
declare module "../../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher_883c18b779f1611e35935ad0e7789ec0/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}