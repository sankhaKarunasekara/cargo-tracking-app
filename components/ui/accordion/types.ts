import { ComputedRef, Ref } from 'vue'

export interface AccordionContextValue {
  type: string
  value: Ref<string | string[] | undefined>
  updateValue: (value: string) => void
}

export interface AccordionItemContextValue {
  value: ComputedRef<string>
  disabled: ComputedRef<boolean>
  open: ComputedRef<boolean>
  toggle: () => void
} 