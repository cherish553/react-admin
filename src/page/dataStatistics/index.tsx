import React from "react";
import { Card, DatePicker, Row, Col } from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import "moment/locale/zh-cn";
import style from "./index.module.scss";
import classnames from 'classnames'
const { RangePicker } = DatePicker;
export default function DataStatistics() {
  return (
    <div>
      <Row>
        <Col span={12}>
          <Card className="border-none" title="平台订单统计">
            <div className={style.card}>
              <div className={style.inner}>
                <p>已完成订单总数</p>
                <p>123123123</p>
              </div>
              <div className={style.inner}>
                <div className={style.abs}>
                  <p>争议中：21</p>
                  <p>未完成：180</p>
                </div>
                <p>当时未确认订单</p>
                <p>201</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            className="border-none"
            title={
              <RangePicker
                size={"small"}
                locale={locale}
                placeholder={["开始时间", "结束时间"]}
              ></RangePicker>
            }
          >
            <div className={style.card}>
              <div className={style.inner}>
                <p>周期内已完成的订单</p>
                <p>201</p>
              </div>
              <div className={style.inner}>
                <p>周期内已完成的订单总金额</p>
                <p>555</p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Col span={24}>
        <Card className={classnames('border-none',style.mt20)} title="平台交易统计">
          <div className={classnames(style.card,style['flex-start'])}>
            <div className={style.inner}>
              <p>已完成订单总数</p>
              <p>123123123</p>
            </div>
            <div className={style.inner}>
              <p>当时未确认订单</p>
              <p>201</p>
            </div>
          </div>
        </Card>
      </Col>
      <Col span={24}>
        <Card className={classnames('border-none',style.mt20)} title="平台用户统计">
          <div className={classnames(style.card,style['flex-start'])}>
            <div className={style.inner}>
              <p>用户总数</p>
              <p>155</p>
            </div>
            <div className={style.inner}>
              <p>用户前一日新增数</p>
              <p>201</p>
            </div>
          </div>
        </Card>
      </Col>
    </div>
  );
}
