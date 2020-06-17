import { get } from '@axios'
import { loginParmas,loginData } from './api'
export const getLogin = (data: loginParmas): Promise<loginData> => get('admin/login', data)