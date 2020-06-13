import React from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import style from "./index.module.scss";
export default function BulkDelivery() {
  return (
    <div>
      <p>
        说明：您可以先行导出批量发货的订单，并根据系统标准录入相应信息后在下方导入以完成批量发货操作
      </p>
      <div className={style.upload}>
        <p>导入发货文件</p>
        <Upload>
          <Button>
            <UploadOutlined /> 上传文件
          </Button>
        </Upload>
      </div>
    </div>
  );
}
