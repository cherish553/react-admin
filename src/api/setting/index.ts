import { get, post } from '@axios'
import { systemData,StatisticsData } from './api'
// 获取系统配置参数
export const getSystem = (): Promise<systemData> =>
    get('admin/getSystem')
// 设置分销比例
export const postSettingSystem = (data: systemData) =>
    post(`admin/settingSystem`, data)
// 平台统计接口
export const getStatistics = ():Promise<StatisticsData> => get(`admin/statistics`)