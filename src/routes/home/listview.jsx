import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import ReactDOM from 'react-dom'
import { ListView, PullToRefresh } from 'antd-mobile'
import { SwipeAction, List } from 'antd-mobile'
import Swiper from './swiper'
// import { deflate } from 'zlib'

const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒'
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: "McDonald's invites you",
    des: '不是所有的兼职汪都需要风吹日晒'
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒'
  }
]
const refreshTextList = [
  '竟然被你发现了！',
  '不要为了反复遍历而不停刷新～',
  '书中自有黄金屋',
  '杨林鲎真帅',
  '什么牙！',
  '三体文明万岁！！',
  '轻一点拽人家 (●ﾟωﾟ●)'
]
const NUM_SECTIONS = 5
const NUM_ROWS_PER_SECTION = 5
let pageIndex = 0

const dataBlobs = {}
let sectionIDs = []
let rowIDs = []

function genData(pIndex = 0) {
  for (let i = 0; i < NUM_SECTIONS; i++) {
    const ii = pIndex * NUM_SECTIONS + i
    const sectionName = `Section ${ii}`
    sectionIDs.push(sectionName)
    dataBlobs[sectionName] = sectionName
    rowIDs[ii] = []
    for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
      const rowName = `S${ii}, R${jj}`
      rowIDs[ii].push(rowName)
      dataBlobs[rowName] = rowName
    }
  }
  sectionIDs = [...sectionIDs]
  rowIDs = [...rowIDs]
  console.log(sectionIDs, rowIDs)
}
class ListViewExample extends React.Component {
  constructor(props) {
    super(props)
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID]
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID]
    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    })

    this.state = {
      dataSource,
      isLoading: true,
      refreshing: true,
      height: (document.documentElement.clientHeight * 3) / 4
    }
  }

  componentDidMount() {
    const hei =
      document.documentElement.clientHeight -
      ReactDOM.findDOMNode(this.lv).parentNode.offsetTop
    setTimeout(() => {
      genData()

      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(
          dataBlobs,
          sectionIDs,
          rowIDs
        ),
        isLoading: false,
        height: hei
      })
    }, 600)
  }
  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true })
    // simulate initial Ajax
    setTimeout(() => {
      sectionIDs = []
      sectionIDs = []
      rowIDs = []
      genData()
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(
          dataBlobs,
          sectionIDs,
          rowIDs
        ),
        isLoading: false,
        refreshing: false
      })
    }, 1600)
  }
  onEndReached = event => {
    if (this.state.isLoading && !this.state.hasMore) {
      return
    }
    console.log('reach end', event)
    this.setState({ isLoading: true })
    setTimeout(() => {
      genData(++pageIndex)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(
          dataBlobs,
          sectionIDs,
          rowIDs
        ),
        isLoading: false
      })
    }, 1000)
  }

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED'
        }}
      />
    )
    let index = data.length - 1
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1
      }
      const obj = data[index--]
      return (
        <Swiper>
          <div key={rowID} style={{ padding: '0 15px' }}>
            <div
              style={{
                lineHeight: '50px',
                color: '#888',
                fontSize: 18,
                borderBottom: '1px solid #F6F6F6'
              }}
            >
              {obj.title}
            </div>
            <div style={{ display: 'flex', padding: '15px 0' }}>
              <img
                style={{ height: '64px', marginRight: '15px' }}
                src={obj.img}
                alt=""
              />
              <div style={{ lineHeight: 1 }}>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>
                  {obj.des}
                </div>
                <div>
                  <span style={{ fontSize: '30px', color: '#FF6E27' }}>35</span>
                  ¥ {rowID}
                </div>
              </div>
            </div>
          </div>
        </Swiper>
      )
    }
    let refreshText =
      refreshTextList[Math.floor(refreshTextList.length * Math.random())]
    return (
      <React.Fragment>
        <ListView
          ref={el => (this.lv = el)}
          dataSource={this.state.dataSource}
          pullToRefresh={
            <PullToRefresh
              damping={150}
              refreshing={this.state.refreshing}
              indicator={
                this.state.down
                  ? {}
                  : {
                      activate: refreshText,
                      finish: '搬运完成o(TωT)o ',
                      release: 'bi bi bi ----通讯中----  bi bi bi '
                    }
              }
              style={{
                paddingTop: '70px',
                color: 'red'
              }}
              onRefresh={this.onRefresh}
            />
          }
          renderHeader={() => <span>最新</span>}
          renderFooter={() => (
            <div style={{ padding: 30, textAlign: 'center' }}>
              {this.state.isLoading
                ? 'ε==(づ′▽`)づ 努力加载中...'
                : 'ヾ(=･ω･=)o 加载完成'}
            </div>
          )}
          renderSectionHeader={sectionData => (
            <div>{`发表于 ${sectionData.split(' ')[1]}`}</div>
          )}
          renderRow={row}
          renderSeparator={separator}
          style={{
            height: this.state.height,
            overflow: 'auto'
          }}
          pageSize={3}
          onScroll={() => {
            console.log('scroll')
          }}
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      </React.Fragment>
    )
  }
}
export default ListViewExample
