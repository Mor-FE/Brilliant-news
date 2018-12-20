import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import ReactDOM from 'react-dom'
import { TabBar, ListView } from 'antd-mobile'
import ListViewExample from './listview'
import Nav from './nav'
import './style.scss'
// @inject('homeStore')
// @observer
// class Home extends Component {
//   static propTypes = {
//     homeStore: PropTypes.shape({}).isRequired
//   }
//   render() {
//     const { homeStore } = this.props
//     const { number, increase, decrease } = homeStore

//     return (
//       <div>
//         <p>this is home page</p>
//         <Link to="/about">goto About</Link>
//         <div>当前数：{number}</div>
//         <div>
//           <Button className="btn" type="primary" onClick={increase}>
//             增加
//           </Button>
//           <Button type="primary" onClick={decrease}>
//             减少
//           </Button>
//         </div>
//       </div>
//     )
//   }
// }

class TabBarExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
      screenShow: false
    }
  }

  renderContent(pageText) {
    return (
      <div
        style={{
          backgroundColor: 'white',
          height: '100%',
          textAlign: 'center'
        }}
      >
        <div style={{ paddingTop: 60 }}>
          Clicked “{pageText}” tab， show “{pageText}” information
        </div>
        <a
          style={{
            display: 'block',
            marginTop: 40,
            marginBottom: 20,
            color: '#108ee9'
          }}
          onClick={e => {
            e.preventDefault()
            this.setState({
              hidden: !this.state.hidden
            })
          }}
        >
          Click to show/hide tab-bar
        </a>
      </div>
    )
  }
  componentDidMount() {
    setTimeout(() => {
      ReactDOM.findDOMNode(this.screenPIc).style.opacity = 0
      this.setState({ screenShow: true })
    }, 3000)
  }
  render() {
    let mainConet
    if (!this.state.screenShow) {
      mainConet = (
        <div
          ref={el => (this.screenPIc = el)}
          onClick={e => {
            this.setState({
              screenShow: true
            })
          }}
          style={{
            background:
              'url(../../assets/images/p44315582.gif) center center /  contain  no-repeat',
            backgroundColor: '#fff',
            animation: 'fadeIn 3s',
            width: '100%',
            height: '100%'
          }}
        />
      )
    } else {
      mainConet = (
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          tabBarPosition="bottom"
          hidden={this.state.hidden}
          prerenderingSiblingsNumber={0}
        >
          {/* 新闻 */}
          <TabBar.Item
            title="最热"
            key="news"
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(../../assets/icon/news_hide.svg) center center /  21px 21px no-repeat'
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(../../assets/icon/news.svg) center center /  21px 21px no-repeat'
                }}
              />
            }
            selected={this.state.selectedTab === 'blueTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab'
              })
            }}
            dot
            data-seed="logId"
          >
            <Nav title="最热" model="light" />
            <ListViewExample />
          </TabBar.Item>
          {/*社区*/}

          <TabBar.Item
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(../../assets/icon/club_hide.svg) center center /  21px 21px no-repeat'
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(../../assets/icon/club.svg) center center /  21px 21px no-repeat'
                }}
              />
            }
            title="俱乐部"
            key="club"
            badge={'new'}
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab'
              })
            }}
            data-seed="logId1"
          >
            <Nav title="Club" model="light" />

            {this.renderContent('club')}
          </TabBar.Item>
          {/* 私信 */}
          <TabBar.Item
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(../../assets/icon/message_hide.svg) center center /  21px 21px no-repeat'
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(../../assets/icon/message.svg) center center /  21px 21px no-repeat'
                }}
              />
            }
            title="私信"
            key="message"
            badge={10}
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab'
              })
            }}
          >
            <Nav title="我的私信" model="light" />
            {this.renderContent('message')}
          </TabBar.Item>
        </TabBar>
      )
    }
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        {mainConet}
      </div>
    )
  }
}

export default TabBarExample
