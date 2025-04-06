import { defineComponent, h } from 'vue'
import { cn } from '../../../lib/utils'

const Card = defineComponent({
  name: 'Card',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn(
        'rounded-lg border bg-white shadow-sm',
        props.class
      )
    }, slots.default?.())
  }
})

const CardHeader = defineComponent({
  name: 'CardHeader',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn(
        'flex flex-col space-y-1.5 p-4',
        props.class
      )
    }, slots.default?.())
  }
})

const CardTitle = defineComponent({
  name: 'CardTitle',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('h3', {
      class: cn(
        'text-lg font-semibold leading-none tracking-tight',
        props.class
      )
    }, slots.default?.())
  }
})

const CardDescription = defineComponent({
  name: 'CardDescription',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('p', {
      class: cn(
        'text-sm text-gray-500',
        props.class
      )
    }, slots.default?.())
  }
})

const CardContent = defineComponent({
  name: 'CardContent',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn(
        'p-4 pt-0',
        props.class
      )
    }, slots.default?.())
  }
})

const CardFooter = defineComponent({
  name: 'CardFooter',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn(
        'flex items-center p-4 pt-0',
        props.class
      )
    }, slots.default?.())
  }
})

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
export default Card 