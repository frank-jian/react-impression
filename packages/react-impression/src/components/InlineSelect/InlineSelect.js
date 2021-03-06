import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import InlineSelectOption from '../InlineSelectOption'
import Row from '../Row'
import Col from '../Col'

export default class InlineSelect extends React.PureComponent {
  constructor(props) {
    super(props)
    // 是否木偶组件
    this.isPuppet = props.value !== undefined

    let initValue = {
      value: this.isPuppet ? undefined : props.defaultValue,
    }

    this.state = {
      ...initValue,
    }
  }
  static propTypes = {
    /**
     * 子组件
     */
    children: PropTypes.node,

    /**
     * 自定义样式
     */
    className: PropTypes.string,

    /**
     * 选中回调函数
     */
    onChange: PropTypes.func,

    /**
     * 选中值
     */
    value: PropTypes.any,

    /**
     * 标签名
     */
    label: PropTypes.string,

    /**
     * 标签占比
     */
    col: PropTypes.number,

    /**
     * 选中值
     */
    defaultValue: PropTypes.any,
  }
  getValue() {
    if (this.isPuppet) {
      return this.props.value
    }

    return this.state.value
  }
  setValue(value) {
    if (!this.isPuppet) this.setState({ value })
  }
  // ption选中回调
  selectOptionHandle(value, text, index) {
    let { onChange } = this.props

    if (this.isPuppet) {
      onChange && onChange(value, text, index)
    } else {
      this.setState(
        {
          value,
        },
        () => {
          onChange && onChange(value, text, index)
        }
      )
    }
  }
  render() {
    const { className, label, col, ...others } = this.props
    const originValue = this.isPuppet ? this.props.value : this.state.value
    let { children } = this.props

    children = React.Children.map(children, (child, index) => {
      if (!child) {
        return child
      }

      let { value, children } = child.props

      return React.cloneElement(child, {
        key: index,
        active: originValue !== undefined && originValue === value,
        onClick: () => this.selectOptionHandle(value, children, index),
      })
    })

    return (
      <div {...others} className={classnames('inline-select', className)}>
        {label && (
          <Row>
            <Col col={col || 1} className='text-right inline-select-label'>
              <strong>{label}:</strong>
            </Col>
            <Col className='inline-select-content'>{children}</Col>
          </Row>
        )}
        {!label && children}
      </div>
    )
  }
}

// getValue
InlineSelect.getValue = ref => {
  if (!ref) return undefined

  return ref.getValue()
}

// setValue
InlineSelect.setValue = (ref, value) => {
  if (!ref) return

  ref.setValue(value)
}

InlineSelect.Option = InlineSelectOption
