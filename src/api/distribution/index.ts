import { get, post } from '@axios'
import { proportionData } from './api'
// 获取分销比例设置
export const getProportion = (): Promise<proportionData> =>
    get('admin/getProportion')
// 设置分销比例
export const postSettingProportion = (data: proportionData) =>
    post(`admin/settingProportion`, data)