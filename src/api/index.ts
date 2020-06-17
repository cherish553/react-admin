import { get } from '@axios'
import { loginParmas } from './api'
export const getAdminLogin = (data: loginParmas): any => get('admin/login', data)