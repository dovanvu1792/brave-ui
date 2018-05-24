/* global jest, expect, describe, it, afterEach */
import * as React from 'react'
import { shallow } from 'enzyme'
import { create } from 'react-test-renderer'
import BoxedContent from '../boxedContent'

describe('boxedContent tests', () => {
  const baseComponent = (props?: object) => (
    <BoxedContent id='testBoxedContent' {...props} />
  )
  describe('basic tests', () => {
    it('matches the snapshot', () => {
      const component = baseComponent()
      const tree = create(component).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('renders the component', () => {
      const wrapper = shallow(baseComponent({id: 'toughBoxedContent'}))
      const assertion = wrapper.find('#toughBoxedContent').length
      expect(assertion).toBe(1)
    })
  })

  describe('component behavior', () => {
    it('can have an id', () => {
      const wrapper = shallow(baseComponent({id: 'boxedThing'}))
      const assertion = wrapper.props().id
      expect(assertion).toBe('boxedThing')
    })
  })

  describe('theming', () => {
    it('allows theming the `maxWidth` property', () => {
      const component = baseComponent({theme: { boxedContent: { maxWidth: '80%' } } })
      const tree = create(component).toJSON()
      expect(tree).toHaveStyleRule('max-width', '80%')
    })

    it('allows theming the `margin` property', () => {
      const component = baseComponent({theme: { boxedContent: { margin: '10px 20px' } } })
      const tree = create(component).toJSON()
      expect(tree).toHaveStyleRule('margin', '10px 20px')
    })
  })
})
