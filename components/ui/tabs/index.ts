// This is a placeholder file to satisfy shadcn-nuxt's component lookup
// We're not actually using these components but the build system is looking for this file

interface TabsProps {
  modelValue?: string;
  defaultValue?: string;
}

interface TabsListProps {}

interface TabsTriggerProps {
  value: string;
  disabled?: boolean;
}

interface TabsContentProps {
  value: string;
}

export const Tabs = {
  name: 'Tabs',
  props: ['modelValue', 'defaultValue'] as unknown as TabsProps
}

export const TabsList = {
  name: 'TabsList',
  props: {} as unknown as TabsListProps
}

export const TabsTrigger = {
  name: 'TabsTrigger',
  props: ['value', 'disabled'] as unknown as TabsTriggerProps
}

export const TabsContent = {
  name: 'TabsContent',
  props: ['value'] as unknown as TabsContentProps
}