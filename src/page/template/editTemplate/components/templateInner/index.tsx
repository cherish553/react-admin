import React, { useState, useRef, useEffect, ElementType } from "react";
import style from "./index.module.scss";
import classnames from "classnames";
import { Form, Radio, Button } from "antd";
let now = ""; // 当前target（可拖拽元素）
let dot = ""; // 当前dot（拉伸点）
let scrollNode: Element;
let fixTop = ""; // 想上拖拽时，之前的初始top值// const div = document.createElement('div')
let fixLeft = ""; // 想上拖拽时，之前的初始top值// const div = document.createElement('div')
interface DotFunc {
  rightTOP: Function;
  right: Function;
  rightBottom: Function;
  top: Function;
  bottom: Function;
  left: Function;
  leftBottom: Function;
  leftTOP: Function;
}
interface NodeList {
  [propName: string]: StyleProp;
}
interface StyleProp {
  height: string;
  width: string;
  background: string;
  left: string;
  top: string;
}
interface Canvas {
  offsetWidth: number;
  offsetHeight: number;
  offsetLeft: number;
  offsetTop: number;
}
export default function TemplateInner() {
  const canvas = useRef<Canvas>() as React.MutableRefObject<Canvas>;
  const [checked, setChecked] = useState(1);
  const [target, setTarget] = useState("");
  const [parent, setParent] = useState({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });
  useEffect(() => {
    scrollNode = document.querySelector<Element>("main")!;
  }, []);
  useEffect(() => {
    setParent({
      width: canvas.current.offsetWidth,
      height: canvas.current.offsetHeight,
      left: canvas.current.offsetLeft,
      top: canvas.current.offsetTop,
    });
  }, [canvas, target]);
  const [nodeList, setNodeList] = useState<NodeList>({
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

  const drag = (e: MouseEvent) => {
    let left;
    let top;
    let width;
    let height;
    let X = e.pageX;
    let Y = e.pageY + scrollNode.scrollTop;
    X = X - canvas.current.offsetLeft;
    Y = Y - canvas.current.offsetTop;
    width = +nodeList[now].width.slice(0, -2);
    height = +nodeList[now].height.slice(0, -2);
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
    const nowData = nodeList[now];
    setNodeList({
      ...nodeList,
      [now]: {
        ...nowData,
        left: `${left}px`,
        top: `${top}px`,
      },
    });
  };

  const computed = {
    changeRight: (e: MouseEvent, node: HTMLDivElement, nowData: StyleProp) => {
      const left = canvas.current.offsetLeft;
      const maxWidth = parent.width - +nowData.left.slice(0, -2);
      let width = e.pageX - left - node.offsetLeft;
      if (width < 20) {
        width = 20;
      } else if (width > maxWidth) {
        width = maxWidth;
      }
      return width;
    },
    changeTop: (e: MouseEvent, node: HTMLDivElement, nowData: StyleProp) => {
      const offsetTop = canvas.current.offsetTop;
      const maxHeihgt = +fixTop + +nowData.height.slice(0, -2);
      let height =
        +fixTop +
        +nowData.height.slice(0, -2) -
        (e.pageY + scrollNode.scrollTop - offsetTop);
      let top = e.pageY + scrollNode.scrollTop - offsetTop;
      if (height < 20) {
        height = 20;
        top = +fixTop + (+nowData.height.slice(0, -2) - 20);
      } else if (height > maxHeihgt) {
        height = maxHeihgt;
        top = 0;
      }
      return { height, top };
    },
    changeLeft: (e: MouseEvent, node: HTMLDivElement, nowData: StyleProp) => {
      const offsetLeft = canvas.current.offsetLeft;
      const maxWidth = +fixLeft + +nowData.width.slice(0, -2);
      let width =
        +fixLeft +
        +nowData.width.slice(0, -2) -
        (e.pageX + scrollNode.scrollLeft - offsetLeft);
      let left = e.pageX + scrollNode.scrollLeft - offsetLeft;
      if (width < 20) {
        width = 20;
        left = +fixLeft + (+nowData.width.slice(0, -2) - 20);
      } else if (width > maxWidth) {
        width = maxWidth;
        left = 0;
      }
      return { width, left };
    },
    changeBottom: (e: MouseEvent, node: HTMLDivElement, nowData: StyleProp) => {
      const top = canvas.current.offsetTop;
      const maxHeight = parent.height - +nowData.top.slice(0, -2);
      let height = e.pageY + scrollNode.scrollTop - top - node.offsetTop;
      if (height < 20) {
        height = 20;
      } else if (height > maxHeight) {
        height = maxHeight;
      }
      return height;
    },
  };
  const onChange = (e: any) => {
    // console.log("radio checked", e.target.value);
    // setChecked(e.target.value);
    // console.log(e)
  };
  const onMouseUp = (e: MouseEvent) => {
    window.removeEventListener("mousemove", drag);
    window.removeEventListener("mousemove", changeRrightTop);
    window.removeEventListener("mousemove", changeRight);
    window.removeEventListener("mousemove", changeRightBottom);
    window.removeEventListener("mousemove", changeTop);
    window.removeEventListener("mousemove", changeBottom);
    window.removeEventListener("mousemove", changeLeft);
    window.removeEventListener("mousemove", changeLeftBottom);
    window.removeEventListener("mousemove", changeLeftTOP);
  };

  const changeRrightTop = (e: MouseEvent) => {
    const node = document.querySelector<HTMLDivElement>(`.${now}`)!;
    const nowData = nodeList[now];
    const width = computed.changeRight(e, node, nowData);
<<<<<<< HEAD
    const offsetTop = canvas.current.offsetTop;
    const maxHeihgt = +fixTop + +nowData.height.slice(0, -2);
    let height =
      +fixTop +
      +nowData.height.slice(0, -2) -
      (e.pageY + scrollNode.scrollTop - offsetTop);
    let top = e.pageY + scrollNode.scrollTop - offsetTop;
    // 处理最大和最小
    if (height < 20) {
      height = 20;
      top = +fixTop + (+nowData.height.slice(0, -2) - 20);
    } else if (height > maxHeihgt) {
      height = maxHeihgt;
      top = 0;
    }
=======
    const { height, top } = computed.changeTop(e, node, nowData);
>>>>>>> 2ac5e82dea8243518c3bc5f0b1c2755dfcb3ea2f
    setNodeList({
      ...nodeList,
      [now]: {
        ...nowData,
        width: `${width}px`,
        top: `${top}px`,
        height: `${height}px`,
      },
    });
  };

  const changeRight = (e: MouseEvent) => {
    const node = document.querySelector<HTMLDivElement>(`.${now}`)!;
    const nowData = nodeList[now];
    const width = computed.changeRight(e, node, nowData);
    setNodeList({
      ...nodeList,
      [now]: {
        ...nowData,
        width: `${width}px`,
      },
    });
  };
  const changeLeft = (e: MouseEvent) => {
    const node = document.querySelector<HTMLDivElement>(`.${now}`)!;
    const nowData = nodeList[now];
    const { width, left } = computed.changeLeft(e, node, nowData);
    setNodeList({
      ...nodeList,
      [now]: {
        ...nowData,
        left: `${left}px`,
        width: `${width}px`,
      },
    });
  };
  const changeRightBottom = (e: MouseEvent) => {
    const node = document.querySelector<HTMLDivElement>(`.${now}`)!;
    const nowData = nodeList[now];
    const width = computed.changeRight(e, node, nowData);
    const height = computed.changeBottom(e, node, nowData);

    setNodeList({
      ...nodeList,
      [now]: {
        ...nowData,
        width: `${width}px`,
        height: `${height}px`,
      },
    });
  };
  const changeTop = (e: MouseEvent) => {
    const node = document.querySelector<HTMLDivElement>(`.${now}`)!;
    const nowData = nodeList[now];
    const { height, top } = computed.changeTop(e, node, nowData);
    setNodeList({
      ...nodeList,
      [now]: {
        ...nowData,
        top: `${top}px`,
        height: `${height}px`,
      },
    });
  };
  const changeBottom = (e: MouseEvent) => {
    const node = document.querySelector<HTMLDivElement>(`.${now}`)!;
    const nowData = nodeList[now];
    const height = computed.changeBottom(e, node, nowData);

    setNodeList({
      ...nodeList,
      [now]: {
        ...nowData,
        height: `${height}px`,
      },
    });
  };
  const changeLeftBottom = (e: MouseEvent) => {
    const node = document.querySelector<HTMLDivElement>(`.${now}`)!;
    const nowData = nodeList[now];
    const { width, left } = computed.changeLeft(e, node, nowData);
    const height = computed.changeBottom(e, node, nowData);
    setNodeList({
      ...nodeList,
      [now]: {
        ...nowData,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
      },
    });
  };
  const changeLeftTOP = (e: MouseEvent) => {
    const node = document.querySelector<HTMLDivElement>(`.${now}`)!;
    const nowData = nodeList[now];
    const { width, left } = computed.changeLeft(e, node, nowData);
    const { height, top } = computed.changeTop(e, node, nowData);
    setNodeList({
      ...nodeList,
      [now]: {
        ...nowData,
        top: `${top}px`,
        width: `${width}px`,
        left: `${left}px`,
        height: `${height}px`,
      },
    });
  };
  const dotFunc: DotFunc = {
    rightTOP: (now: string) => {
      fixTop = nodeList[now].top.slice(0, -2);
      window.addEventListener("mousemove", changeRrightTop);
      window.addEventListener("mouseup", onMouseUp); // 移除事件
    },
    right: () => {
      window.addEventListener("mousemove", changeRight);
      window.addEventListener("mouseup", onMouseUp);
    },
    rightBottom: () => {
      window.addEventListener("mousemove", changeRightBottom);
      window.addEventListener("mouseup", onMouseUp);
    },
    top: (now: string) => {
      fixTop = nodeList[now].top.slice(0, -2);
      window.addEventListener("mousemove", changeTop);
      window.addEventListener("mouseup", onMouseUp);
    },
    bottom: () => {
      window.addEventListener("mousemove", changeBottom);
      window.addEventListener("mouseup", onMouseUp);
    },
    left: (now: string) => {
      fixLeft = nodeList[now].left.slice(0, -2);
      window.addEventListener("mousemove", changeLeft);
      window.addEventListener("mouseup", onMouseUp);
    },
    leftBottom: (now: string) => {
      fixLeft = nodeList[now].left.slice(0, -2);
      window.addEventListener("mousemove", changeLeftBottom);
      window.addEventListener("mouseup", onMouseUp);
    },
    leftTOP: (now: string) => {
      fixLeft = nodeList[now].left.slice(0, -2);
      fixTop = nodeList[now].top.slice(0, -2);
      window.addEventListener("mousemove", changeLeftTOP);
      window.addEventListener("mouseup", onMouseUp);
    },
  };
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    now = (e.target as Element).getAttribute("data-type")!;
    dot = (e.target as Element).getAttribute("data-dot")!;
    setTarget(now);
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
        ref={canvas as React.RefObject<HTMLDivElement>}
        onMouseDown={onMouseDown}
        className={style.canvas}
      >
        {Object.entries(nodeList).map((item) => (
          <div
            key={item[0]}
            data-type={item[0]}
            className={classnames(style.abs, item[0])}
            style={nodeList[item[0]]}
          >
            {target === item[0]
              ? [
                  <span
                    data-type={item[0]}
                    data-dot="right"
                    key={Math.random()}
                    className={classnames(style.circle, style.right)}
                  ></span>,
                  <span
                    data-type={item[0]}
                    data-dot="left"
                    key={Math.random()}
                    className={classnames(style.circle, style.left)}
                  ></span>,
                  <span
                    data-type={item[0]}
                    data-dot="top"
                    key={Math.random()}
                    className={classnames(style.circle, style.top)}
                  ></span>,
                  <span
                    data-type={item[0]}
                    data-dot="bottom"
                    key={Math.random()}
                    className={classnames(style.circle, style.bottom)}
                  ></span>,
                  <span
                    data-type={item[0]}
                    data-dot="rightTOP"
                    key={Math.random()}
                    className={classnames(style.circle, style.rightTOP)}
                  ></span>,
                  <span
                    data-type={item[0]}
                    data-dot="leftTOP"
                    key={Math.random()}
                    className={classnames(style.circle, style.leftTOP)}
                  ></span>,
                  <span
                    data-type={item[0]}
                    data-dot="rightBottom"
                    key={Math.random()}
                    className={classnames(style.circle, style.rightBottom)}
                  ></span>,
                  <span
                    data-type={item[0]}
                    data-dot="leftBottom"
                    key={Math.random()}
                    className={classnames(style.circle, style.leftBottom)}
                  ></span>,
                ]
              : ""}
          </div>
        ))}
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
