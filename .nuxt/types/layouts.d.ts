import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "desktop-layout" | "mobile-layout" | "default"
declare module "../../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher_0d0d00350215c53b49c3dd1375b02784/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}