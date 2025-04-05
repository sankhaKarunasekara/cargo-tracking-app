import { defineComponent, h } from 'vue'
import { cn } from '../../../lib/utils'

const Timeline = defineComponent({
  name: 'Timeline',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn(
        'relative ml-4 pl-6 border-l-2 border-gray-200',
        props.class
      )
    }, slots.default?.())
  }
})

const TimelineItem = defineComponent({
  name: 'TimelineItem',
  props: {
    class: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      required: true
    },
    date: {
      type: String,
      default: ''
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn(
        'relative mb-8 last:mb-0',
        props.class
      )
    }, [
      h('div', {
        class: cn(
          'absolute -left-9 flex h-6 w-6 items-center justify-center rounded-full',
          props.completed ? 'bg-green-100' : 'bg-gray-100'
        )
      },
        props.completed ?
          h('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 0 24 24',
            fill: 'currentColor',
            class: 'h-4 w-4 text-green-500'
          }, [
            h('path', {
              'fill-rule': 'evenodd',
              d: 'M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z',
              'clip-rule': 'evenodd'
            })
          ]) :
          h('div', { class: 'h-2 w-2 rounded-full bg-gray-400' })
      ),
      h('div', { class: 'absolute -left-32 text-sm text-gray-500' }, props.date),
      h('div', { class: 'rounded-lg border bg-white p-4 shadow-sm' }, [
        h('h4', { class: 'text-base font-semibold' }, props.title),
        slots.default?.()
      ])
    ])
  }
})

export { Timeline, TimelineItem }
export default Timeline 