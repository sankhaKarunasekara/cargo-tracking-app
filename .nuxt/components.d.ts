
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'AppBottomNavigation': typeof import("../components/AppBottomNavigation.vue")['default']
    'AppSidebar': typeof import("../components/AppSidebar.vue")['default']
    'ContainerCard': typeof import("../components/ContainerCard.vue")['default']
    'ContainerStatus': typeof import("../components/ContainerStatus.vue")['default']
    'CusDecCard': typeof import("../components/CusDecCard.vue")['default']
    'FilterSection': typeof import("../components/FilterSection.vue")['default']
    'ItemDetailsSheet': typeof import("../components/ItemDetailsSheet.vue")['default']
    'Navbar': typeof import("../components/Navbar.vue")['default']
    'PwaInstall': typeof import("../components/PwaInstall.vue")['default']
    'StatusTimeline': typeof import("../components/StatusTimeline.vue")['default']
    'StatusTimelineButton': typeof import("../components/StatusTimelineButton.vue")['default']
    'StatusTimelineSheet': typeof import("../components/StatusTimelineSheet.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
    'ClientOnly': typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/.pnpm/@nuxt+image@1.10.0_db0@0.3.1_ioredis@5.6.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
    'NuxtPicture': typeof import("../node_modules/.pnpm/@nuxt+image@1.10.0_db0@0.3.1_ioredis@5.6.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
    'Accordion': typeof import("../components/ui/accordion/index")['Accordion']
    'AccordionItem': typeof import("../components/ui/accordion/index")['AccordionItem']
    'AccordionTrigger': typeof import("../components/ui/accordion/index")['AccordionTrigger']
    'AccordionContent': typeof import("../components/ui/accordion/index")['AccordionContent']
    'BottomNavigation': typeof import("../components/ui/bottom-navigation/index")['BottomNavigation']
    'BottomNavigationItem': typeof import("../components/ui/bottom-navigation/index")['BottomNavigationItem']
    'Card': typeof import("../components/ui/card/index")['Card']
    'CardHeader': typeof import("../components/ui/card/index")['CardHeader']
    'CardTitle': typeof import("../components/ui/card/index")['CardTitle']
    'CardDescription': typeof import("../components/ui/card/index")['CardDescription']
    'CardContent': typeof import("../components/ui/card/index")['CardContent']
    'CardFooter': typeof import("../components/ui/card/index")['CardFooter']
    'Pagination': typeof import("../components/ui/pagination/index")['Pagination']
    'SheetContextValue': typeof import("../components/ui/sheet/index")['SheetContextValue']
    'SheetProvider': typeof import("../components/ui/sheet/index")['SheetProvider']
    'Sheet': typeof import("../components/ui/sheet/index")['Sheet']
    'SheetTrigger': typeof import("../components/ui/sheet/index")['SheetTrigger']
    'SheetClose': typeof import("../components/ui/sheet/index")['SheetClose']
    'SheetContent': typeof import("../components/ui/sheet/index")['SheetContent']
    'SheetHeader': typeof import("../components/ui/sheet/index")['SheetHeader']
    'SheetTitle': typeof import("../components/ui/sheet/index")['SheetTitle']
    'SheetDescription': typeof import("../components/ui/sheet/index")['SheetDescription']
    'SheetFooter': typeof import("../components/ui/sheet/index")['SheetFooter']
    'SidebarContextValue': typeof import("../components/ui/sidebar/index")['SidebarContextValue']
    'SidebarProvider': typeof import("../components/ui/sidebar/index")['SidebarProvider']
    'Sidebar': typeof import("../components/ui/sidebar/index")['Sidebar']
    'SidebarHeader': typeof import("../components/ui/sidebar/index")['SidebarHeader']
    'SidebarContent': typeof import("../components/ui/sidebar/index")['SidebarContent']
    'SidebarFooter': typeof import("../components/ui/sidebar/index")['SidebarFooter']
    'SidebarGroup': typeof import("../components/ui/sidebar/index")['SidebarGroup']
    'SidebarGroupLabel': typeof import("../components/ui/sidebar/index")['SidebarGroupLabel']
    'SidebarGroupContent': typeof import("../components/ui/sidebar/index")['SidebarGroupContent']
    'SidebarMenu': typeof import("../components/ui/sidebar/index")['SidebarMenu']
    'SidebarMenuItem': typeof import("../components/ui/sidebar/index")['SidebarMenuItem']
    'SidebarMenuButton': typeof import("../components/ui/sidebar/index")['SidebarMenuButton']
    'SidebarMenuAction': typeof import("../components/ui/sidebar/index")['SidebarMenuAction']
    'SidebarSeparator': typeof import("../components/ui/sidebar/index")['SidebarSeparator']
    'SidebarTrigger': typeof import("../components/ui/sidebar/index")['SidebarTrigger']
    'SidebarRail': typeof import("../components/ui/sidebar/index")['SidebarRail']
    'Tabs': typeof import("../components/ui/tabs/index")['Tabs']
    'TabsList': typeof import("../components/ui/tabs/index")['TabsList']
    'TabsTrigger': typeof import("../components/ui/tabs/index")['TabsTrigger']
    'TabsContent': typeof import("../components/ui/tabs/index")['TabsContent']
    'Timeline': typeof import("../components/ui/timeline/index")['Timeline']
    'TimelineItem': typeof import("../components/ui/timeline/index")['TimelineItem']
    'VitePwaManifest': typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']
    'NuxtPwaManifest': typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']
    'NuxtPwaAssets': typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/NuxtPwaAssets")['default']
    'PwaAppleImage': typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleImage.vue")['default']
    'PwaAppleSplashScreenImage': typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleSplashScreenImage.vue")['default']
    'PwaFaviconImage': typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaFaviconImage.vue")['default']
    'PwaMaskableImage': typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaMaskableImage.vue")['default']
    'PwaTransparentImage': typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaTransparentImage.vue")['default']
    'NuxtPage': typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': IslandComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
      'LazyAppBottomNavigation': LazyComponent<typeof import("../components/AppBottomNavigation.vue")['default']>
    'LazyAppSidebar': LazyComponent<typeof import("../components/AppSidebar.vue")['default']>
    'LazyContainerCard': LazyComponent<typeof import("../components/ContainerCard.vue")['default']>
    'LazyContainerStatus': LazyComponent<typeof import("../components/ContainerStatus.vue")['default']>
    'LazyCusDecCard': LazyComponent<typeof import("../components/CusDecCard.vue")['default']>
    'LazyFilterSection': LazyComponent<typeof import("../components/FilterSection.vue")['default']>
    'LazyItemDetailsSheet': LazyComponent<typeof import("../components/ItemDetailsSheet.vue")['default']>
    'LazyNavbar': LazyComponent<typeof import("../components/Navbar.vue")['default']>
    'LazyPwaInstall': LazyComponent<typeof import("../components/PwaInstall.vue")['default']>
    'LazyStatusTimeline': LazyComponent<typeof import("../components/StatusTimeline.vue")['default']>
    'LazyStatusTimelineButton': LazyComponent<typeof import("../components/StatusTimelineButton.vue")['default']>
    'LazyStatusTimelineSheet': LazyComponent<typeof import("../components/StatusTimelineSheet.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/.pnpm/@nuxt+image@1.10.0_db0@0.3.1_ioredis@5.6.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/.pnpm/@nuxt+image@1.10.0_db0@0.3.1_ioredis@5.6.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
    'LazyAccordion': LazyComponent<typeof import("../components/ui/accordion/index")['Accordion']>
    'LazyAccordionItem': LazyComponent<typeof import("../components/ui/accordion/index")['AccordionItem']>
    'LazyAccordionTrigger': LazyComponent<typeof import("../components/ui/accordion/index")['AccordionTrigger']>
    'LazyAccordionContent': LazyComponent<typeof import("../components/ui/accordion/index")['AccordionContent']>
    'LazyBottomNavigation': LazyComponent<typeof import("../components/ui/bottom-navigation/index")['BottomNavigation']>
    'LazyBottomNavigationItem': LazyComponent<typeof import("../components/ui/bottom-navigation/index")['BottomNavigationItem']>
    'LazyCard': LazyComponent<typeof import("../components/ui/card/index")['Card']>
    'LazyCardHeader': LazyComponent<typeof import("../components/ui/card/index")['CardHeader']>
    'LazyCardTitle': LazyComponent<typeof import("../components/ui/card/index")['CardTitle']>
    'LazyCardDescription': LazyComponent<typeof import("../components/ui/card/index")['CardDescription']>
    'LazyCardContent': LazyComponent<typeof import("../components/ui/card/index")['CardContent']>
    'LazyCardFooter': LazyComponent<typeof import("../components/ui/card/index")['CardFooter']>
    'LazyPagination': LazyComponent<typeof import("../components/ui/pagination/index")['Pagination']>
    'LazySheetContextValue': LazyComponent<typeof import("../components/ui/sheet/index")['SheetContextValue']>
    'LazySheetProvider': LazyComponent<typeof import("../components/ui/sheet/index")['SheetProvider']>
    'LazySheet': LazyComponent<typeof import("../components/ui/sheet/index")['Sheet']>
    'LazySheetTrigger': LazyComponent<typeof import("../components/ui/sheet/index")['SheetTrigger']>
    'LazySheetClose': LazyComponent<typeof import("../components/ui/sheet/index")['SheetClose']>
    'LazySheetContent': LazyComponent<typeof import("../components/ui/sheet/index")['SheetContent']>
    'LazySheetHeader': LazyComponent<typeof import("../components/ui/sheet/index")['SheetHeader']>
    'LazySheetTitle': LazyComponent<typeof import("../components/ui/sheet/index")['SheetTitle']>
    'LazySheetDescription': LazyComponent<typeof import("../components/ui/sheet/index")['SheetDescription']>
    'LazySheetFooter': LazyComponent<typeof import("../components/ui/sheet/index")['SheetFooter']>
    'LazySidebarContextValue': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarContextValue']>
    'LazySidebarProvider': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarProvider']>
    'LazySidebar': LazyComponent<typeof import("../components/ui/sidebar/index")['Sidebar']>
    'LazySidebarHeader': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarHeader']>
    'LazySidebarContent': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarContent']>
    'LazySidebarFooter': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarFooter']>
    'LazySidebarGroup': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarGroup']>
    'LazySidebarGroupLabel': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarGroupLabel']>
    'LazySidebarGroupContent': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarGroupContent']>
    'LazySidebarMenu': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenu']>
    'LazySidebarMenuItem': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenuItem']>
    'LazySidebarMenuButton': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenuButton']>
    'LazySidebarMenuAction': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenuAction']>
    'LazySidebarSeparator': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarSeparator']>
    'LazySidebarTrigger': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarTrigger']>
    'LazySidebarRail': LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarRail']>
    'LazyTabs': LazyComponent<typeof import("../components/ui/tabs/index")['Tabs']>
    'LazyTabsList': LazyComponent<typeof import("../components/ui/tabs/index")['TabsList']>
    'LazyTabsTrigger': LazyComponent<typeof import("../components/ui/tabs/index")['TabsTrigger']>
    'LazyTabsContent': LazyComponent<typeof import("../components/ui/tabs/index")['TabsContent']>
    'LazyTimeline': LazyComponent<typeof import("../components/ui/timeline/index")['Timeline']>
    'LazyTimelineItem': LazyComponent<typeof import("../components/ui/timeline/index")['TimelineItem']>
    'LazyVitePwaManifest': LazyComponent<typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']>
    'LazyNuxtPwaManifest': LazyComponent<typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']>
    'LazyNuxtPwaAssets': LazyComponent<typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/NuxtPwaAssets")['default']>
    'LazyPwaAppleImage': LazyComponent<typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleImage.vue")['default']>
    'LazyPwaAppleSplashScreenImage': LazyComponent<typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleSplashScreenImage.vue")['default']>
    'LazyPwaFaviconImage': LazyComponent<typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaFaviconImage.vue")['default']>
    'LazyPwaMaskableImage': LazyComponent<typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaMaskableImage.vue")['default']>
    'LazyPwaTransparentImage': LazyComponent<typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaTransparentImage.vue")['default']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<IslandComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const AppBottomNavigation: typeof import("../components/AppBottomNavigation.vue")['default']
export const AppSidebar: typeof import("../components/AppSidebar.vue")['default']
export const ContainerCard: typeof import("../components/ContainerCard.vue")['default']
export const ContainerStatus: typeof import("../components/ContainerStatus.vue")['default']
export const CusDecCard: typeof import("../components/CusDecCard.vue")['default']
export const FilterSection: typeof import("../components/FilterSection.vue")['default']
export const ItemDetailsSheet: typeof import("../components/ItemDetailsSheet.vue")['default']
export const Navbar: typeof import("../components/Navbar.vue")['default']
export const PwaInstall: typeof import("../components/PwaInstall.vue")['default']
export const StatusTimeline: typeof import("../components/StatusTimeline.vue")['default']
export const StatusTimelineButton: typeof import("../components/StatusTimelineButton.vue")['default']
export const StatusTimelineSheet: typeof import("../components/StatusTimelineSheet.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
export const ClientOnly: typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/.pnpm/@nuxt+image@1.10.0_db0@0.3.1_ioredis@5.6.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
export const NuxtPicture: typeof import("../node_modules/.pnpm/@nuxt+image@1.10.0_db0@0.3.1_ioredis@5.6.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
export const Accordion: typeof import("../components/ui/accordion/index")['Accordion']
export const AccordionItem: typeof import("../components/ui/accordion/index")['AccordionItem']
export const AccordionTrigger: typeof import("../components/ui/accordion/index")['AccordionTrigger']
export const AccordionContent: typeof import("../components/ui/accordion/index")['AccordionContent']
export const BottomNavigation: typeof import("../components/ui/bottom-navigation/index")['BottomNavigation']
export const BottomNavigationItem: typeof import("../components/ui/bottom-navigation/index")['BottomNavigationItem']
export const Card: typeof import("../components/ui/card/index")['Card']
export const CardHeader: typeof import("../components/ui/card/index")['CardHeader']
export const CardTitle: typeof import("../components/ui/card/index")['CardTitle']
export const CardDescription: typeof import("../components/ui/card/index")['CardDescription']
export const CardContent: typeof import("../components/ui/card/index")['CardContent']
export const CardFooter: typeof import("../components/ui/card/index")['CardFooter']
export const Pagination: typeof import("../components/ui/pagination/index")['Pagination']
export const SheetContextValue: typeof import("../components/ui/sheet/index")['SheetContextValue']
export const SheetProvider: typeof import("../components/ui/sheet/index")['SheetProvider']
export const Sheet: typeof import("../components/ui/sheet/index")['Sheet']
export const SheetTrigger: typeof import("../components/ui/sheet/index")['SheetTrigger']
export const SheetClose: typeof import("../components/ui/sheet/index")['SheetClose']
export const SheetContent: typeof import("../components/ui/sheet/index")['SheetContent']
export const SheetHeader: typeof import("../components/ui/sheet/index")['SheetHeader']
export const SheetTitle: typeof import("../components/ui/sheet/index")['SheetTitle']
export const SheetDescription: typeof import("../components/ui/sheet/index")['SheetDescription']
export const SheetFooter: typeof import("../components/ui/sheet/index")['SheetFooter']
export const SidebarContextValue: typeof import("../components/ui/sidebar/index")['SidebarContextValue']
export const SidebarProvider: typeof import("../components/ui/sidebar/index")['SidebarProvider']
export const Sidebar: typeof import("../components/ui/sidebar/index")['Sidebar']
export const SidebarHeader: typeof import("../components/ui/sidebar/index")['SidebarHeader']
export const SidebarContent: typeof import("../components/ui/sidebar/index")['SidebarContent']
export const SidebarFooter: typeof import("../components/ui/sidebar/index")['SidebarFooter']
export const SidebarGroup: typeof import("../components/ui/sidebar/index")['SidebarGroup']
export const SidebarGroupLabel: typeof import("../components/ui/sidebar/index")['SidebarGroupLabel']
export const SidebarGroupContent: typeof import("../components/ui/sidebar/index")['SidebarGroupContent']
export const SidebarMenu: typeof import("../components/ui/sidebar/index")['SidebarMenu']
export const SidebarMenuItem: typeof import("../components/ui/sidebar/index")['SidebarMenuItem']
export const SidebarMenuButton: typeof import("../components/ui/sidebar/index")['SidebarMenuButton']
export const SidebarMenuAction: typeof import("../components/ui/sidebar/index")['SidebarMenuAction']
export const SidebarSeparator: typeof import("../components/ui/sidebar/index")['SidebarSeparator']
export const SidebarTrigger: typeof import("../components/ui/sidebar/index")['SidebarTrigger']
export const SidebarRail: typeof import("../components/ui/sidebar/index")['SidebarRail']
export const Tabs: typeof import("../components/ui/tabs/index")['Tabs']
export const TabsList: typeof import("../components/ui/tabs/index")['TabsList']
export const TabsTrigger: typeof import("../components/ui/tabs/index")['TabsTrigger']
export const TabsContent: typeof import("../components/ui/tabs/index")['TabsContent']
export const Timeline: typeof import("../components/ui/timeline/index")['Timeline']
export const TimelineItem: typeof import("../components/ui/timeline/index")['TimelineItem']
export const VitePwaManifest: typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']
export const NuxtPwaManifest: typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']
export const NuxtPwaAssets: typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/NuxtPwaAssets")['default']
export const PwaAppleImage: typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleImage.vue")['default']
export const PwaAppleSplashScreenImage: typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleSplashScreenImage.vue")['default']
export const PwaFaviconImage: typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaFaviconImage.vue")['default']
export const PwaMaskableImage: typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaMaskableImage.vue")['default']
export const PwaTransparentImage: typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaTransparentImage.vue")['default']
export const NuxtPage: typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: IslandComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyAppBottomNavigation: LazyComponent<typeof import("../components/AppBottomNavigation.vue")['default']>
export const LazyAppSidebar: LazyComponent<typeof import("../components/AppSidebar.vue")['default']>
export const LazyContainerCard: LazyComponent<typeof import("../components/ContainerCard.vue")['default']>
export const LazyContainerStatus: LazyComponent<typeof import("../components/ContainerStatus.vue")['default']>
export const LazyCusDecCard: LazyComponent<typeof import("../components/CusDecCard.vue")['default']>
export const LazyFilterSection: LazyComponent<typeof import("../components/FilterSection.vue")['default']>
export const LazyItemDetailsSheet: LazyComponent<typeof import("../components/ItemDetailsSheet.vue")['default']>
export const LazyNavbar: LazyComponent<typeof import("../components/Navbar.vue")['default']>
export const LazyPwaInstall: LazyComponent<typeof import("../components/PwaInstall.vue")['default']>
export const LazyStatusTimeline: LazyComponent<typeof import("../components/StatusTimeline.vue")['default']>
export const LazyStatusTimelineButton: LazyComponent<typeof import("../components/StatusTimelineButton.vue")['default']>
export const LazyStatusTimelineSheet: LazyComponent<typeof import("../components/StatusTimelineSheet.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/.pnpm/@nuxt+image@1.10.0_db0@0.3.1_ioredis@5.6.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/.pnpm/@nuxt+image@1.10.0_db0@0.3.1_ioredis@5.6.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
export const LazyAccordion: LazyComponent<typeof import("../components/ui/accordion/index")['Accordion']>
export const LazyAccordionItem: LazyComponent<typeof import("../components/ui/accordion/index")['AccordionItem']>
export const LazyAccordionTrigger: LazyComponent<typeof import("../components/ui/accordion/index")['AccordionTrigger']>
export const LazyAccordionContent: LazyComponent<typeof import("../components/ui/accordion/index")['AccordionContent']>
export const LazyBottomNavigation: LazyComponent<typeof import("../components/ui/bottom-navigation/index")['BottomNavigation']>
export const LazyBottomNavigationItem: LazyComponent<typeof import("../components/ui/bottom-navigation/index")['BottomNavigationItem']>
export const LazyCard: LazyComponent<typeof import("../components/ui/card/index")['Card']>
export const LazyCardHeader: LazyComponent<typeof import("../components/ui/card/index")['CardHeader']>
export const LazyCardTitle: LazyComponent<typeof import("../components/ui/card/index")['CardTitle']>
export const LazyCardDescription: LazyComponent<typeof import("../components/ui/card/index")['CardDescription']>
export const LazyCardContent: LazyComponent<typeof import("../components/ui/card/index")['CardContent']>
export const LazyCardFooter: LazyComponent<typeof import("../components/ui/card/index")['CardFooter']>
export const LazyPagination: LazyComponent<typeof import("../components/ui/pagination/index")['Pagination']>
export const LazySheetContextValue: LazyComponent<typeof import("../components/ui/sheet/index")['SheetContextValue']>
export const LazySheetProvider: LazyComponent<typeof import("../components/ui/sheet/index")['SheetProvider']>
export const LazySheet: LazyComponent<typeof import("../components/ui/sheet/index")['Sheet']>
export const LazySheetTrigger: LazyComponent<typeof import("../components/ui/sheet/index")['SheetTrigger']>
export const LazySheetClose: LazyComponent<typeof import("../components/ui/sheet/index")['SheetClose']>
export const LazySheetContent: LazyComponent<typeof import("../components/ui/sheet/index")['SheetContent']>
export const LazySheetHeader: LazyComponent<typeof import("../components/ui/sheet/index")['SheetHeader']>
export const LazySheetTitle: LazyComponent<typeof import("../components/ui/sheet/index")['SheetTitle']>
export const LazySheetDescription: LazyComponent<typeof import("../components/ui/sheet/index")['SheetDescription']>
export const LazySheetFooter: LazyComponent<typeof import("../components/ui/sheet/index")['SheetFooter']>
export const LazySidebarContextValue: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarContextValue']>
export const LazySidebarProvider: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarProvider']>
export const LazySidebar: LazyComponent<typeof import("../components/ui/sidebar/index")['Sidebar']>
export const LazySidebarHeader: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarHeader']>
export const LazySidebarContent: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarContent']>
export const LazySidebarFooter: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarFooter']>
export const LazySidebarGroup: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarGroup']>
export const LazySidebarGroupLabel: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarGroupLabel']>
export const LazySidebarGroupContent: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarGroupContent']>
export const LazySidebarMenu: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenu']>
export const LazySidebarMenuItem: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenuItem']>
export const LazySidebarMenuButton: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenuButton']>
export const LazySidebarMenuAction: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarMenuAction']>
export const LazySidebarSeparator: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarSeparator']>
export const LazySidebarTrigger: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarTrigger']>
export const LazySidebarRail: LazyComponent<typeof import("../components/ui/sidebar/index")['SidebarRail']>
export const LazyTabs: LazyComponent<typeof import("../components/ui/tabs/index")['Tabs']>
export const LazyTabsList: LazyComponent<typeof import("../components/ui/tabs/index")['TabsList']>
export const LazyTabsTrigger: LazyComponent<typeof import("../components/ui/tabs/index")['TabsTrigger']>
export const LazyTabsContent: LazyComponent<typeof import("../components/ui/tabs/index")['TabsContent']>
export const LazyTimeline: LazyComponent<typeof import("../components/ui/timeline/index")['Timeline']>
export const LazyTimelineItem: LazyComponent<typeof import("../components/ui/timeline/index")['TimelineItem']>
export const LazyVitePwaManifest: LazyComponent<typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']>
export const LazyNuxtPwaManifest: LazyComponent<typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/VitePwaManifest")['default']>
export const LazyNuxtPwaAssets: LazyComponent<typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/NuxtPwaAssets")['default']>
export const LazyPwaAppleImage: LazyComponent<typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleImage.vue")['default']>
export const LazyPwaAppleSplashScreenImage: LazyComponent<typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaAppleSplashScreenImage.vue")['default']>
export const LazyPwaFaviconImage: LazyComponent<typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaFaviconImage.vue")['default']>
export const LazyPwaMaskableImage: LazyComponent<typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaMaskableImage.vue")['default']>
export const LazyPwaTransparentImage: LazyComponent<typeof import("../node_modules/.pnpm/@vite-pwa+nuxt@1.0.0_magicast@0.3.5_vite@6.2.5_@types+node@22.14.0_jiti@2.4.2_lightningcss@1._3ayfxfnn2p6af43kxq7f2mbc3i/node_modules/@vite-pwa/nuxt/dist/runtime/components/PwaTransparentImage.vue")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<IslandComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_ioredis@5.6.0_lightningcss@1._dxaran7fsva4ozblamaj4pc5ka/node_modules/nuxt/dist/app/components/server-placeholder")['default']>>

export const componentNames: string[]
