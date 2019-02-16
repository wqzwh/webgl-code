import { call, put, takeEvery } from 'redux-saga/effects'
import actionTypes from '../actionTypes'
import API from './api'

const { SET_CURRENT, SET_MENUINFO } = actionTypes

function * globalInfo() {
  const uInfo = yield call(API.getInfo)
  if (uInfo.code === 0) {
    yield put({ type: SET_CURRENT, user: uInfo.data.user })
  }

  const mData = [
    {
      name: '旋转三角形',
      children: []
    }
  ]
  yield put({ type: SET_MENUINFO, menuInfo: mData })
}

function * saga() {
  yield takeEvery('GOLOBAL_SAGA', globalInfo)
}

export default saga
