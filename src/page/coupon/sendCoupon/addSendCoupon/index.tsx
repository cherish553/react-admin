import React, { useState } from "react";
import { Form, DatePicker, Radio, Input, Button } from "antd";
import { useHistory } from "react-router-dom";
import locale from "antd/es/date-picker/locale/zh_CN";
import "moment/locale/zh-cn";
import style from "./index.module.scss";
import { validate } from "@/util/common";
import { postAddBanner as PostAddBanner } from "@api/coupon";
const { RangePicker } = DatePicker;
export default function AddCoupon() {
  const router = useHistory();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    type: 1,
    type_money: "",
    min_goods_amount: "",
    type_name: "",
    use_end_date: "",
    use_start_date: "",
  });
  async function postAddBanner() {
    if (!(await validate(form))) return;
    const data = await PostAddBanner(formData);
    if (!data) return;
    router.push("/coupon");
  }
  return (
    <Form form={form}>
      <Form.Item
        label="使用时间"
        name="range-picker"
        rules={[
          { type: "array", required: true, message: "请选择开始结束日期" },
        ]}
      >
        <RangePicker
          showTime={{ format: "HH:mm" }}
          format="YYYY-MM-DD HH:mm"
          onChange={(_, time: string[]) => {
            setFormData({
              ...formData,
              use_start_date: time[0],
              use_end_date: time[1],
            });
          }}
          locale={locale}
          placeholder={["开始时间", "结束时间"]}
        />
      </Form.Item>
      <Form.Item
        name="type_name"
        label="优惠券名称"
        rules={[
          {
            required: true,
            message: "请填写优惠券名称",
          },
        ]}
      >
        <Input
          className={style.w200}
          value={formData.type_name}
          onChange={(e) =>
            setFormData({
              ...formData,
              type_name: e.target.value,
            })
          }
        ></Input>
      </Form.Item>
      <Form.Item label="优惠方式">
        <Radio.Group
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          value={formData.type}
        >
          <Radio value={1}>满减</Radio>
          <Radio value={3}>定额优惠券</Radio>
        </Radio.Group>
      </Form.Item>
      <div className={style.detail}>
        {formData.type === 1
          ? [
              <Form.Item
                rules={[{ required: true, message: "请填写满金额" }]}
                name="type_money"
                key="1"
                label="满"
              >
                <Input
                  onChange={(e) =>
                    setFormData({ ...formData, type_money: e.target.value })
                  }
                  value={formData.type_money}
                  className={style.w200}
                ></Input>
              </Form.Item>,
              <Form.Item
                rules={[{ required: true, message: "请填写减少金额" }]}
                name="min_goods_amount"
                key="2"
                label="减少"
              >
                <Input
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      min_goods_amount: e.target.value,
                    })
                  }
                  value={formData.min_goods_amount}
                  className={style.w200}
                ></Input>
              </Form.Item>,
            ]
          : [
              <Form.Item
                key="3"
                rules={[{ required: true, message: "请填写优惠券面额" }]}
                name="type_money"
                label="优惠券面额"
              >
                <Input
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type_money: e.target.value,
                    })
                  }
                  value={formData.type_money}
                  className={style.w200}
                ></Input>
              </Form.Item>,
              <Form.Item
                rules={[{ required: true, message: "请填写使用门槛金额" }]}
                name="min_goods_amount"
                key="4"
                label="使用门槛金额"
              >
                <Input
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      min_goods_amount: e.target.value,
                    })
                  }
                  value={formData.min_goods_amount}
                  className={style.w200}
                ></Input>
              </Form.Item>,
            ]}
      </div>
      <Button onClick={postAddBanner}>添加</Button>
    </Form>
  );
}
