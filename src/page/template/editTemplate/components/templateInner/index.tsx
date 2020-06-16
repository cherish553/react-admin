import React, { useState, useRef } from "react";
import style from "./index.module.scss";
import classnames from "classnames";
import { Form, Radio, Button } from "antd";
export default function TemplateInner() {
  const canvas = useRef();
  const [checked, setChecked] = useState(1);
  const [image1, setImage1] = useState({
    height: "100px",
    width: "100px",
    background: "skyblue",
    left: "100px",
    top: "100px",
  });
  const [flag, setFlag] = useState(false);
  const [flag1, setFlag1] = useState(false);
  const onChange = (e: any) => {
    console.log("radio checked", e.target.value);
    setChecked(e.target.value);
  };
  const onMouseDown = (e: any) => {
    //   for(const item in e){
    if (e.target.tagName === "SPAN") {
      setFlag1(true);
      return;
    }
    //   }
    // console.log(flag);
    setFlag(true);
    move(e);
    // setImage1({
    //   ...image1,
    //   left: `${e.target.offsetLeft + e.nativeEvent.offsetX - 50}px`,
    //   top: `${e.target.offsetTop + e.nativeEvent.offsetY - 50}px`,
    // });
    // console.log(e.target.offsetLeft+e.nativeEvent.offsetX/2-50)
    // console.log(e.target.offsetLeft)
    // console.log(e.target.style.width)
    // console.log(e.target.style.height)
    // console.log(e.target.offsetHeight);
    // console.log(e.target.offsetWidth);
    // console.log(e.nativeEvent.offsetX);

    // console.log(e.nativeEvent.offsetY);
  };
  const move = (e: any) => {
    const X = e.target.offsetLeft + e.nativeEvent.offsetX;
    const Y = e.target.offsetTop + e.nativeEvent.offsetY;
    const width = e.target.offsetWidth;
    const height = e.target.offsetHeight;
    let left = 0;
    let top = 0;
    const parentWidth = (canvas as any).current.offsetWidth;
    const parentHeight = (canvas as any).current.offsetHeight;
    if (X - width / 2 > 0) {
      if (parentWidth - width / 2 < X) {
        left = parentWidth - width;
      } else {
        left = X - width / 2;
      }
    } else {
      left = 0;
    }
    if (Y - height / 2 > 0) {
      if (parentHeight - height / 2 < Y) {
        top = parentHeight - height;
      } else {
        top = Y - height / 2;
      }
    } else {
      top = 0;
    }
    // const top = Y - height / 2 > 0 ? Y - height / 2 : 0;
    setImage1({
      ...image1,
      left: `${left}px`,
      top: `${top}px`,
    });
  };
  const onMouseUp = (e: any) => {
    setFlag(false);
    // console.log(e.clientX);
  };
  const onMouseMove = (e: any) => {
    if (!flag) {
      if (flag1 && e.target.tagName === "SPAN") {
        // console.log(e.nativeEvent.offsetX);
        setImage1({
          ...image1,
          width: `${
            parseFloat(image1.width.slice(0, -2)) + e.nativeEvent.offsetX - 5
          }px`,
        });
      }
      return;
    }
    move(e);
  };
  const onLeftMouseMove = (e: any) => {
    console.log(e);
  };
  const spanMove = (e: any) => {
    console.log(e);
  };
  return (
    <div className={style.flex}>
      <div ref={canvas as any} className={style.canvas}>
        <div
          //   draggable={true}
          onMouseUp={(e) => onMouseUp(e)}
          onMouseMove={(e) => onMouseMove(e)}
          onMouseDown={(e) => onMouseDown(e)}
          className={style.abs}
          style={image1}
        >
          <span className={classnames(style.circle, style.right)}></span>
          <span
            onClick={(e) => {
              console.log(123);
              e.stopPropagation();
              e.preventDefault();
            }}
            onMouseUp={(e) => {
              console.log(123);
              e.stopPropagation();
              e.preventDefault();
              //   onLeftMouseUp(e);
            }}
            onMouseMove={(e) => {
              console.log(123);
              e.stopPropagation();
              e.preventDefault();
              onLeftMouseMove(e);
            }}
            onMouseDown={(e) => {
              console.log(123);
              e.stopPropagation();
              e.preventDefault();
              console.log(e);
              //   onLeftMouseDown(e);
            }}
            className={classnames(style.circle, style.left)}
          ></span>
          <span className={classnames(style.circle, style.top)}></span>
          <span className={classnames(style.circle, style.bottom)}></span>
          <span className={classnames(style.circle, style.rightTOP)}></span>
          <span className={classnames(style.circle, style.leftTOP)}></span>
          <span className={classnames(style.circle, style.rightBottom)}></span>
          <span className={classnames(style.circle, style.leftBottom)}></span>
        </div>
      </div>
      <Form>
        <Form.Item label="选择编辑页">
          <Radio.Group onChange={onChange} value={checked}>
            <Radio value={1}>封面</Radio>
            <Radio value={2}>页面1</Radio>
            <Radio value={3}>页面2</Radio>
            <Radio value={4}>页面3</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="选择编辑页">
          <Button>添加文字位</Button>
          <Button>添加图片位</Button>
          <Button>清空画板</Button>
          <Button>保存画板</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
