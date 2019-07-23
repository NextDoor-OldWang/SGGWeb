import React, { Component } from 'react'
import {Modal} from 'antd';
import {withRouter} from 'react-router-dom'

import LinkButton from '../../components/link-button';
import menuList from '../../config/menuConfig'
import {reqWeather} from '../../api'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import './index.less'


class Header extends Component {
  state = {
    currentTime:formateDate(Date.now()),
    dayPictureUrl:'',
    weather:''
  }

  getWeather = async()=>{
    const {dayPictureUrl,weather} = await reqWeather('北京')
    this.setState({
      dayPictureUrl,
      weather
    })
  }
  

  logout = () => {
    Modal.confirm({
      title:'确认退出？',
      onOk:()=>{
        console.log('ok');
        storageUtils.removeUser()
        memoryUtils.user = {}
        this.props.history.replace('/login')
      },
      onCancel(){
        console.log('Cancel')
      }
    })
  }

  getTitle = () => {
    let title = ''
    const path = this.props.location.pathname
    menuList.forEach(item => {
      if(item.key===path){
        title = item.title
      }else if (item.children){
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
        if(cItem){
          title = cItem.title
        }
      }
    })
    return title
  }

  componentDidMount(){
    this.intervalid = setInterval(() => {
      this.setState({
        currentTime:formateDate(Date.now())
      })
    },1000);
    this.getWeather()
  }
  componentWillUnmount(){
    clearInterval(this.intervalid)
  }
  render() {
    const {currentTime, dayPictureUrl, weather} = this.state

    // 得到当前用户
    const user = memoryUtils.user

    // 得到当前请求的路径
    
    // 得到对应的标题
    const title = this.getTitle()
    return (
      <div className='header'>
        <div className='header-top'>
          欢迎，{user.username}&nbsp;&nbsp;
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>{title}</div>
          <div className='header-bottom-right'>
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="weather"/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)