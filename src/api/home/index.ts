import { get } from '@axios'
import { indexData } from './api'
// 主页接口
export const getIndex = (): Promise<indexData> => get('admin/index')