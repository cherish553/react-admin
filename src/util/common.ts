import { FormInstance } from "antd/lib/form";
import { postUploadImage as PostUploadImage } from "@api/upload";
// 公共form验证
export async function validate(form: FormInstance) {
    try {
        await form.validateFields();
        return true;
    } catch (_) {
        return false;
    }
}
// 公共图片上传
export async function postUploadImage(fileBlob: any): Promise<string | false> {
    const reader = new FileReader();
    const formData = new FormData()
    reader.readAsDataURL(fileBlob);
    return new Promise(resolve => {
        reader.addEventListener('load', async () => {
            formData.append('img', reader.result as string)
            resolve(await PostUploadImage(formData))
        });
    })
}
// 转换base64
export function changeBase64(fileBlob: any) {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return reader
}
// 筛选保留字段
export function filter<T extends {}, K extends keyof T>(data: T) {
    const obj = {} as T
    (Object.keys(data) as K[]).filter((item: K) => data[item] as unknown !== '')
        .reduce((pre, now) => {
            pre[now] = data[now]
            return pre
        }, obj)
    return obj
}
// search转换为对象
export function query<T>(str: string): T | {} {
    if (!str.length) return {}
    const arr = str.split('?')
    arr.shift()
    return arr.reduce((pre: { [propName: string]: any }, now) => {
        const data = now.split('=')
        pre[data[0]] = data[1]
        return pre
    }, {})
}
export function slice(str: string, start = 0, end = -2) {
    return str.slice(start, end)
}