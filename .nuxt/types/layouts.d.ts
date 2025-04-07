import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "desktop-layout" | "mobile-layout" | "default"
declare module "../../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}