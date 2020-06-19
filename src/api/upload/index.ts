import { post } from '@axios'
// 公共图片上传
export const postUploadImage = (data: FormData): Promise<string | false> => post('/api/uploadImage', data)