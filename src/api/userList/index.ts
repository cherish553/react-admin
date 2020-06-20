import { get } from '@axios'
import { UserParmas, UserData } from './api'

// 获取用户列表
export const getUserList = (data: UserParmas): Promise<CommonPagination<UserData>> => get('admin/userList', data)