import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'
import Layout from 'app/components/Layout'
import Table from 'table'
import Overview from 'overview'

// 路由配置
const createRoutes = () => (
  <Route path='/' component={Layout}>
    <IndexRoute component={Table} />
    <Route path='table' component={Table} />
    <Route path='overview' component={Overview} />
    <Redirect from='*' to='/' />
  </Route>
)

export default createRoutes
