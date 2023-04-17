import {shallowMount, createLocalVue} from "@vue/test-utils";
import Component from '@/components/TodoForm'

const localVue = createLocalVue()

describe('components/TodoForm.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Component, {
      localVue
    })
  })

  test('Initialized well', () => {
    wrapper.vm.$mount()
  })

  describe('methods', () => {
    test('handleSubmit without props', () => {
      const vm = wrapper.vm
      vm.reset = jest.fn()
      const spyEmit = jest.spyOn(vm, '$emit')
      vm.handleSubmit()
      expect(spyEmit).toHaveBeenCalledWith('submit', {
        text: ''
      })
      expect(vm.reset).toHaveBeenCalledTimes(1)
      spyEmit.mockClear()
    })

    test('handleSubmit with props', () => {
      const props = {
        editData: {
          id: '1',
          text: 'Mau di update'
        }
      }
      wrapper = shallowMount(Component, {
        localVue,
        propsData: props
      })
      const vm = wrapper.vm
      vm.reset = jest.fn()
      const spyEmit = jest.spyOn(vm, '$emit')
      vm.handleSubmit()
      expect(spyEmit).toHaveBeenCalledWith('submit', {
        text: props.editData.text
      })
      expect(vm.reset).toHaveBeenCalledTimes(1)
      spyEmit.mockClear()
    })

    test('reset', () => {
      const props = {
        editData: {
          id: '1',
          text: 'Mau di update'
        }
      }
      wrapper = shallowMount(Component, {
        localVue,
        propsData: props
      })
      const vm = wrapper.vm
      expect(vm.text).toEqual(props.editData.text)
      vm.reset()
      expect(vm.text).toEqual('')
    })
  })

  describe('computed', () => {
    describe('placeholder', () => {
      test('without props', () => {
        const vm = wrapper.vm
        expect(vm.placeholder).toEqual('Add new todo')
      })

      test('with props', () => {
        const props = {
          editData: {
            id: '1',
            text: 'Mau di update'
          }
        }
        wrapper = shallowMount(Component, {
          localVue,
          propsData: props
        })
        const vm = wrapper.vm
        expect(vm.placeholder).toEqual('Update your todo')
      })
    })
  })
})
