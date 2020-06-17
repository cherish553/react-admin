import React, { useState, useRef, useEffect } from "react";
import style from "./index.module.scss";
import classnames from "classnames";
import { Form, Radio, Button } from "antd";
let now = "";
let dot = "";
interface DotFunc {
  rightTOP: Function;
}

interface Datas {
  height: string;
  width: string;
  background: string;
  left: string;
  top: string;
}
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
  const [target, setTarget] = useState("");
  const [parent, setParent] = useState({
    width: 0,
    height: 0,
  });
  let left = 0;
  let top = 0;
  useEffect(() => {
    setParent({
      width: (canvas as any).current.offsetWidth,
      height: (canvas as any).current.offsetHeight,
    });
  }, []);
  const [nodeList, setNodeList] = useState<any>({
    main1: {
      height: "100px",
      width: "100px",
      background: "skyblue",
      left: "100px",
      top: "100px",
    },
    main2: {
      height: "100px",
      width: "100px",
      background: "skyblue",
      left: "100px",
      top: "100px",
    },
  });
  let width = 0;
  let height = 0;

  const drag = (e: any) => {
    let X = e.clientX;
    let Y = e.clientY;
    X = X - (canvas as any).current.offsetLeft;
    Y = Y - (canvas as any).current.offsetTop;

    width = parseFloat((nodeList[now] as Datas).width.slice(0, -2));
    height = parseFloat((nodeList[now] as Datas).height.slice(0, -2));
    if (X - width / 2 > 0) {
      if (parent.width - width / 2 < X) {
        left = parent.width - width;
      } else {
        left = X - width / 2;
      }
    } else {
      left = 0;
    }

    if (Y - height / 2 > 0) {
      if (parent.height - height / 2 < Y) {
        top = parent.height - height;
      } else {
        top = Y - height / 2;
      }
    } else {
      top = 0;
    }
    const nowData = nodeList[now] as Datas;
    setNodeList({
      ...nodeList,
      [now]: {
        ...nowData,
        left: `${left}px`,
        top: `${top}px`,
      },
    });
  };
  const onChange = (e: any) => {
    // console.log("radio checked", e.target.value);
    setChecked(e.target.value);
  };
  const onMouseUp = (e: any) => {
    window.removeEventListener("mousemove", drag);
    window.removeEventListener("mousemove", changeWidth);
  };
  // const onMouseMove = (e: any) => {
  // if (!flag) return;
  //   move(e);
  // };
  const changeWidth = (e: any) => {
    // const left = e.target.parentNode.offsetLeft
    console.log(e.target.offsetLeft)
  };
  const dotFunc: DotFunc = {
    rightTOP: () => {
      window.addEventListener("mousemove", changeWidth);
      window.addEventListener("mouseup", onMouseUp);
    },
  };
  const onMouseDown = (e: any) => {
    now = e.target.getAttribute("data-type");
    dot = e.target.getAttribute("data-dot");
    setTarget(now);
    console.log(dot);
    console.log(now);
    if (!now && !dot) return;
    if (dot) {
      dotFunc[dot as keyof DotFunc](now);
      return;
    }
    window.addEventListener("mousemove", drag);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className={style.flex}>
      <div
        ref={canvas as any}
        // onMouseUp={(e) => onMouseUp(e)}
        // onMouseMove={(e) => onMouseMove(e)}
        onMouseDown={(e) => onMouseDown(e)}
        className={style.canvas}
      >
        <div
          key={"main1"}
          data-type="main1"
          className={style.abs}
          style={nodeList["main1"]}
        >
          {target === "main1"
            ? [
                <span
                  key={Math.random()}
                  className={classnames(style.circle, style.right)}
                ></span>,
                <span
                  key={Math.random()}
                  className={classnames(style.circle, style.left)}
                ></span>,
                <span
                  key={Math.random()}
                  className={classnames(style.circle, style.top)}
                ></span>,
                <span
                  key={Math.random()}
                  className={classnames(style.circle, style.bottom)}
                ></span>,
                <span
                  data-type="main1"
                  data-dot="rightTOP"
                  key={Math.random()}
                  className={classnames(style.circle, style.rightTOP)}
                ></span>,
                <span
                  key={Math.random()}
                  className={classnames(style.circle, style.leftTOP)}
                ></span>,
                <span
                  key={Math.random()}
                  className={classnames(style.circle, style.rightBottom)}
                ></span>,
                <span
                  key={Math.random()}
                  className={classnames(style.circle, style.leftBottom)}
                ></span>,
              ]
            : ""}
        </div>
        {/* <div
          key={"main2"}
          data-type="main2"
          className={style.abs}
          style={nodeList["main2"]}
        >
          {target === "main2"
            ? [
                <span
                  key={Math.random()}
                  className={classnames(style.circle, style.right)}
                ></span>,
                <span
                  key={Math.random()}
                  className={classnames(style.circle, style.left)}
                ></span>,
                <span
                  key={Math.random()}
                  className={classnames(style.circle, style.top)}
                ></span>,
                <span
                  key={Math.random()}
                  className={classnames(style.circle, style.bottom)}
                ></span>,
                <span
                  key={Math.random()}
                  className={classnames(style.circle, style.rightTOP)}
                ></span>,
                <span
                  key={Math.random()}
                  className={classnames(style.circle, style.leftTOP)}
                ></span>,
                <span
                  key={Math.random()}
                  className={classnames(style.circle, style.rightBottom)}
                ></span>,
                <span
                  key={Math.random()}
                  className={classnames(style.circle, style.leftBottom)}
                ></span>,
              ]
            : ""}
        </div> */}
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
