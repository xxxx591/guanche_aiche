import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/home'

import Index from '@/pages/main/Index'
 
import LoveCar from '@/pages/car/LoveCar'
import ChooseCar from '@/pages/car/ChooseCar'
import ChooseBrand from '@/pages/car/ChooseBrand'
import ConfirmConfig from '@/pages/car/ConfirmConfig' // 确认配置
import MindLatter from '@/pages/car/MindLatter' // 意向书
import ConfirmBack from '@/pages/car/ConfirmBack' // 确认回执
import CarConfig from '@/pages/car/CarConfig' // 车辆配置
import MaintainCalcu from '@/pages/car/MaintainCalcu' // 保养计算
import MaintainAdvice from '@/pages/car/MaintainAdvice' // 保养建议
import InvitedGift from '@/pages/car/InvitedGift' // 邀请有礼
import CarShare from '@/pages/car/Share' // 分享
import CarRules from '@/pages/car/Rules' // 规则说明
import SetCar from '@/pages/car/SetCar' // 选配车辆
import ProductDetail from '@/pages/car/ProductDetail' // 车辆详情
import UserAgreement from '@/pages/car/UserAgreement' // 用户协议

import ServiceAddr from '@/pages/car/ServiceAddr' // 服务网点
import CarArticleDetail from '@/pages/car/ArticleDetail' // e90精选车辆

import DownLoad from '@/pages/car/DownLoad' // 下载app
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Index/LoveCar',
      name: 'LoveCar',
      component: LoveCar
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index,
    },
    {
      path: '/Car/ChooseCar',
      name: 'ChooseCar',
      component: ChooseCar,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Car/ChooseBrand',
      name: 'ChooseBrand',
      component: ChooseBrand
    },
    {
      path: '/Car/UserAgreement',
      name: 'UserAgreement',
      component: UserAgreement
    },
    {
      path: '/Car/ConfirmConfig',
      name: 'ConfirmConfig',
      component: ConfirmConfig
    },
    {
      path: '/Car/MindLatter',
      name: 'MindLatter',
      component: MindLatter
    },
    {
      path: '/Car/ConfirmBack',
      name: 'ConfirmBack',
      component: ConfirmBack
    },
    {
      path: '/Car/CarConfig',
      name: 'CarConfig',
      component: CarConfig
    },
    {
      path: '/Car/MaintainCalcu',
      name: 'MaintainCalcu',
      component: MaintainCalcu
    },
    {
      path: '/Car/MaintainAdvice',
      name: 'MaintainAdvice',
      component: MaintainAdvice
    },
    {
      path: '/Car/InvitedGift',
      name: 'InvitedGift',
      component: InvitedGift
    },
    {
      path: '/Car/CarShare',
      name: 'CarShare',
      component: CarShare
    },
    {
      path: '/Car/DownLoad',
      name: 'DownLoad',
      component: DownLoad
    },
    {
      path: '/Car/CarRules',
      name: 'CarRules',
      component: CarRules
    },
    {
      path: '/Car/SetCar',
      name: 'SetCar',
      component: SetCar
    },
    {
      path: '/Car/ServiceAddr',
      name: 'ServiceAddr',
      component: ServiceAddr
    },
    {
      path: '/Car/CarArticleDetail',
      name: 'CarArticleDetail',
      component: CarArticleDetail
    },
    {
      path: '/Car/ProductDetail',
      name: 'ProductDetail',
      component: ProductDetail
    },
 
  ]
})
