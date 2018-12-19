import { SwipeAction } from 'antd-mobile'
import React, { Component } from 'react'

import { deflate } from 'zlib'

class Swiper extends React.Component {
  render() {
    return (
      <SwipeAction
        style={{ backgroundColor: 'gray' }}
        autoClose
        right={[
          {
            text: '收藏它！ (●ﾟωﾟ●)',
            onPress: () => alert('Love it！'),
            style: { backgroundColor: '#FF708D', color: 'white' }
          }
        ]}
        left={[
          {
            text: '不喜欢ヽ(｀⌒´)ﾉ',
            onPress: () => alert('好的，我们将减少此类推荐！'),
            style: { backgroundColor: '#48CEFF', color: 'white' }
          }
        ]}
        onOpen={() => console.log('global open')}
        onClose={() => console.log('global close')}
      >
        {this.props.children}
      </SwipeAction>
    )
  }
}
export default Swiper
