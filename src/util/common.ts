import { FormInstance } from "antd/lib/form";
import { postUploadImage as PostUploadImage } from "@api/upload";
import { resolve } from "dns";
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
// 筛选保留字段
export function filter<T, K extends keyof T>(data: T) {
    const obj = {} as T
    (Object.keys(data) as K[]).filter((item: K) => data[item] as unknown !== '')
        .reduce((pre, now) => {
            pre[now] = data[now]
            return pre
        }, obj)
    return obj
}