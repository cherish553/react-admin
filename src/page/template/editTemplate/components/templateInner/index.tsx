import React, { useState, useRef, useEffect } from "react";
import style from "./index.module.scss";
import classnames from "classnames";
import { Form, Radio, Button, message } from "antd";
import { GoodsModel, PageList, List } from "@api/template/api";
import { slice } from "@/util/common";
let now = ""; // 当前target（可拖拽元素）
let dot = ""; // 当前dot（拉伸点）
let type = ""; // 当前type（决定是否是文字位或图片位）

let scrollNode: Element;
let fixTop = ""; // 向上拖拽时，之前的初始top值// const div = document.createElement('div')
let fixLeft = ""; // 向上拖拽时，之前的初始top值// const div = document.createElement('div')

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
export interface imageList {
  [propName: string]: StyleImageProp;
}
export interface textList {
  [propName: string]: StyleTextProp;
}
export interface StyleImageProp {
  height: string;
  width: string;
  left: string;
  top: string;
  id?: string;
}
export type StyleTextProp = Pick<StyleImageProp, "height" | "top" | "left"> & {
  lineHeight: string;
  fontSize: string;
  id?: string;
};

interface Canvas {
  offsetWidth: number;
  offsetHeight: number;
  offsetLeft: number;
  offsetTop: number;
}
let pageList: List[] = [
  {
    imageList: {},
    textList: {},
  },
  {
    imageList: {},
    textList: {},
  },
];
interface Props {
  data: {
    formData: GoodsModel;
    setFormData: React.Dispatch<React.SetStateAction<GoodsModel>>;
  };
  pageList?: List[];
}
export default function TemplateInner(props: Props) {
  const canvas = useRef<Canvas>() as React.MutableRefObject<Canvas>;
  const {
    data: { formData, setFormData },
    pageList: pageListData,
  } = props;
  const pagination = parseInt(formData.numberPages);
  const [checked, setChecked] = useState(0);
  const [target, setTarget] = useState("");
  const [parent, setParent] = useState({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });
  const [imageList, setImageList] = useState<imageList>({});
  const [textList, setTextList] = useState<textList>({});
  useEffect(() => {
    if (pageListData) {
      pageList = pageListData;
      setImageList(pageListData[0].imageList);
      setTextList(pageListData[0].textList);
    } else {
      Array.from({ length: parseInt(formData.numberPages) }).forEach((item) =>
        pageList.push({
          textList: {},
          imageList: {},
        })
      );
    }
  }, []);
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

  useEffect(() => {
    pageList[checked] = { imageList, textList };
  }, [imageList, textList]);
  const drag = (e: MouseEvent) => {
    let left, top, width, height, nowData;
    let X = e.pageX;
    let Y = e.pageY + scrollNode.scrollTop;
    X = X - canvas.current.offsetLeft;
    Y = Y - canvas.current.offsetTop;
    if (type === "imageList") {
      width = +slice(imageList[now].width);
      height = +slice(imageList[now].height);
      nowData = imageList[now];
    } else {
      width = 100;
      height = +slice(textList[now].height);
      nowData = textList[now];
    }

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
    if (type === "imageList") {
      setImageList({
        ...imageList,
        [now]: {
          ...nowData,
          left: `${left}px`,
          top: `${top}px`,
        } as StyleImageProp,
      });
    } else {
      setTextList({
        ...textList,
        [now]: {
          ...(nowData as StyleTextProp),
          left: `${left}px`,
          top: `${top}px`,
        } as StyleTextProp,
      });
    }
  };

  const computed = {
    changeRight: (
      e: MouseEvent,
      node: HTMLDivElement,
      nowData: StyleImageProp
    ) => {
      const left = canvas.current.offsetLeft;
      const maxWidth = parent.width - +slice(nowData.left);
      let width = e.pageX - left - node.offsetLeft;
      if (width < 20) {
        width = 20;
      } else if (width > maxWidth) {
        width = maxWidth;
      }
      return width;
    },
    changeTop: (
      e: MouseEvent,
      _node: HTMLDivElement,
      nowData: StyleImageProp | StyleTextProp
    ) => {
      const offsetTop = canvas.current.offsetTop;
      const maxHeihgt = +fixTop + +slice(nowData.height);
      let height =
        +fixTop +
        +slice(nowData.height) -
        (e.pageY + scrollNode.scrollTop - offsetTop);
      let top = e.pageY + scrollNode.scrollTop - offsetTop;
      if (height < 20) {
        height = 20;
        top = +fixTop + (+slice(nowData.height) - 20);
      } else if (height > maxHeihgt) {
        height = maxHeihgt;
        top = 0;
      }
      return { height, top };
    },
    changeLeft: (
      e: MouseEvent,
      _node: HTMLDivElement,
      nowData: StyleImageProp
    ) => {
      const offsetLeft = canvas.current.offsetLeft;
      const maxWidth = +fixLeft + +slice(nowData.width);
      let width =
        +fixLeft +
        +slice(nowData.width) -
        (e.pageX + scrollNode.scrollLeft - offsetLeft);
      let left = e.pageX + scrollNode.scrollLeft - offsetLeft;
      if (width < 20) {
        width = 20;
        left = +fixLeft + (+slice(nowData.width) - 20);
      } else if (width > maxWidth) {
        width = maxWidth;
        left = 0;
      }
      return { width, left };
    },
    changeBottom: (
      e: MouseEvent,
      node: HTMLDivElement,
      nowData: StyleImageProp | StyleTextProp
    ) => {
      const top = canvas.current.offsetTop;
      const maxHeight = parent.height - +slice(nowData.top);
      let height = e.pageY + scrollNode.scrollTop - top - node.offsetTop;
      if (height < 20) {
        height = 20;
      } else if (height > maxHeight) {
        height = maxHeight;
      }
      return height;
    },
  };
  const onMouseUp = (e: MouseEvent) => {
    window.removeEventListener("mousemove", drag);
    window.removeEventListener("mousemove", draw.changeRrightTop);
    window.removeEventListener("mousemove", draw.changeRight);
    window.removeEventListener("mousemove", draw.changeRightBottom);
    window.removeEventListener("mousemove", draw.changeTop);
    window.removeEventListener("mousemove", draw.changeBottom);
    window.removeEventListener("mousemove", draw.changeLeft);
    window.removeEventListener("mousemove", draw.changeLeftBottom);
    window.removeEventListener("mousemove", draw.changeLeftTOP);
  };
  const draw = {
    changeRrightTop: (e: MouseEvent) => {
      const node = document.querySelector<HTMLDivElement>(`.${now}`)!;
      const nowData = imageList[now];
      const width = computed.changeRight(e, node, nowData);
      const { height, top } = computed.changeTop(e, node, nowData);
      setImageList({
        ...imageList,
        [now]: {
          ...nowData,
          width: `${width}px`,
          top: `${top}px`,
          height: `${height}px`,
        },
      });
    },

    changeRight: (e: MouseEvent) => {
      const node = document.querySelector<HTMLDivElement>(`.${now}`)!;
      const nowData = imageList[now];
      const width = computed.changeRight(e, node, nowData);
      setImageList({
        ...imageList,
        [now]: {
          ...nowData,
          width: `${width}px`,
        },
      });
    },
    changeLeft: (e: MouseEvent) => {
      const node = document.querySelector<HTMLDivElement>(`.${now}`)!;
      const nowData = imageList[now];
      const { width, left } = computed.changeLeft(e, node, nowData);
      setImageList({
        ...imageList,
        [now]: {
          ...nowData,
          left: `${left}px`,
          width: `${width}px`,
        },
      });
    },
    changeRightBottom: (e: MouseEvent) => {
      const node = document.querySelector<HTMLDivElement>(`.${now}`)!;
      const nowData = imageList[now];
      const width = computed.changeRight(e, node, nowData);
      const height = computed.changeBottom(e, node, nowData);

      setImageList({
        ...imageList,
        [now]: {
          ...nowData,
          width: `${width}px`,
          height: `${height}px`,
        },
      });
    },
    changeTop: (e: MouseEvent) => {
      const node = document.querySelector<HTMLDivElement>(`.${now}`)!;
      if (type === "imageList") {
        const nowData = imageList[now];
        const { height, top } = computed.changeTop(e, node, nowData);
        setImageList({
          ...imageList,
          [now]: {
            ...nowData,
            top: `${top}px`,
            height: `${height}px`,
          },
        });
      } else {
        const nowData = textList[now];
        const { height, top } = computed.changeTop(e, node, nowData);
        setTextList({
          ...textList,
          [now]: {
            ...nowData,
            top: `${top}px`,
            height: `${height}px`,
            fontSize: `${height}px`,
            lineHeight: `${height}px`,
          },
        });
      }
    },
    changeBottom: (e: MouseEvent) => {
      const node = document.querySelector<HTMLDivElement>(`.${now}`)!;
      if (type === "imageList") {
        const nowData = imageList[now];
        const height = computed.changeBottom(e, node, nowData);
        setImageList({
          ...imageList,
          [now]: {
            ...nowData,
            height: `${height}px`,
          },
        });
      } else {
        const nowData = textList[now];
        const height = computed.changeBottom(e, node, nowData);
        setTextList({
          ...textList,
          [now]: {
            ...nowData,
            height: `${height}px`,
            lineHeight: `${height}px`,
            fontSize: `${height}px`,
          },
        });
      }
    },
    changeLeftBottom: (e: MouseEvent) => {
      const node = document.querySelector<HTMLDivElement>(`.${now}`)!;
      const nowData = imageList[now];
      const { width, left } = computed.changeLeft(e, node, nowData);
      const height = computed.changeBottom(e, node, nowData);
      setImageList({
        ...imageList,
        [now]: {
          ...nowData,
          left: `${left}px`,
          width: `${width}px`,
          height: `${height}px`,
        },
      });
    },
    changeLeftTOP: (e: MouseEvent) => {
      const node = document.querySelector<HTMLDivElement>(`.${now}`)!;
      const nowData = imageList[now];
      const { width, left } = computed.changeLeft(e, node, nowData);
      const { height, top } = computed.changeTop(e, node, nowData);
      setImageList({
        ...imageList,
        [now]: {
          ...nowData,
          top: `${top}px`,
          width: `${width}px`,
          left: `${left}px`,
          height: `${height}px`,
        },
      });
    },
  };
  const dotFunc: DotFunc = {
    rightTOP: (now: string) => {
      fixTop = slice(imageList[now].top);
      window.addEventListener("mousemove", draw.changeRrightTop);
      window.addEventListener("mouseup", onMouseUp); // 移除事件
    },
    right: () => {
      window.addEventListener("mousemove", draw.changeRight);
      window.addEventListener("mouseup", onMouseUp);
    },
    rightBottom: () => {
      window.addEventListener("mousemove", draw.changeRightBottom);
      window.addEventListener("mouseup", onMouseUp);
    },
    top: (now: string) => {
      if (type === "textList") {
        fixTop = slice(textList[now].top);
      } else {
        fixTop = slice(imageList[now].top);
      }
      window.addEventListener("mousemove", draw.changeTop);
      window.addEventListener("mouseup", onMouseUp);
    },
    bottom: () => {
      window.addEventListener("mousemove", draw.changeBottom);
      window.addEventListener("mouseup", onMouseUp);
    },
    left: (now: string) => {
      fixLeft = slice(imageList[now].left);
      window.addEventListener("mousemove", draw.changeLeft);
      window.addEventListener("mouseup", onMouseUp);
    },
    leftBottom: (now: string) => {
      fixLeft = slice(imageList[now].left);
      window.addEventListener("mousemove", draw.changeLeftBottom);
      window.addEventListener("mouseup", onMouseUp);
    },
    leftTOP: (now: string) => {
      fixLeft = slice(imageList[now].left);
      fixTop = slice(imageList[now].top);
      window.addEventListener("mousemove", draw.changeLeftTOP);
      window.addEventListener("mouseup", onMouseUp);
    },
  };
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    now = (e.target as Element).getAttribute("data-type")!;
    dot = (e.target as Element).getAttribute("data-dot")!;
    type = (e.target as Element).getAttribute("div-type")!;
    setTarget(now);
    if (!now && !dot) return;
    if (dot) {
      dotFunc[dot as keyof DotFunc](now);
      return;
    }
    window.addEventListener("mousemove", drag);
    window.addEventListener("mouseup", onMouseUp);
  };
  const clearCanvas = () => {
    pageList[checked] = {
      imageList: {},
      textList: {},
    };
    setImageList({});
    setTextList({});
  };
  function deletePlaceholder(list: string, key: string) {
    let newList;
    if (list === "textList") {
      newList = JSON.parse(JSON.stringify(textList));
      delete newList[key];
      setTextList(newList);
    } else {
      newList = JSON.parse(JSON.stringify(imageList));
      delete newList[key];
      setImageList(newList);
    }
  }
  function saveData() {
    let flag: string | number = pageList.findIndex(
      (item) =>
        !Object.keys(item.imageList).length &&
        !Object.keys(item.textList).length
    );
    if (~flag) {
      flag =
        flag === 0
          ? "封面"
          : flag === pageList.length - 1
          ? "背面"
          : `第${flag}页`;
      return message.error(`${flag}数据为空`);
    }
    const data = pageList.reduce((pre, now, index) => {
      const image = Object.keys(now.imageList).map((item) => ({
        id: now.imageList[item].id ?? "",
        height: slice(now.imageList[item].height),
        width: slice(now.imageList[item].width),
        top: slice(now.imageList[item].top),
        left: slice(now.imageList[item].top),
        type: "1",
        pages: index,
      }));
      const text = Object.keys(now.textList).map((item) => ({
        id: now.textList[item].id ?? "",
        height: slice(now.textList[item].height),
        width: "0",
        top: slice(now.textList[item].top),
        left: slice(now.textList[item].top),
        type: "2",
        pages: index,
      }));
      pre.push(...image, ...text);
      return pre;
    }, [] as Array<PageList>);
    setFormData({
      ...formData,
      pageList: data,
    });
  }
  return (
    <div className={style.flex}>
      <div
        ref={canvas as React.RefObject<HTMLDivElement>}
        onMouseDown={onMouseDown}
        className={style.canvas}
      >
        {Object.entries(imageList).map((item) => (
          <div
            div-type="imageList"
            key={item[0]}
            data-type={item[0]}
            className={classnames(style.abs, item[0], style.bgc)}
            style={imageList[item[0]]}
          >
            {target === item[0]
              ? [
                  "right",
                  "left",
                  "top",
                  "bottom",
                  "rightTOP",
                  "leftTOP",
                  "rightBottom",
                  "leftBottom",
                ].map((items, index) => (
                  <span
                    div-type="imageList"
                    data-type={item[0]}
                    data-dot={items}
                    key={index}
                    className={classnames(style.circle, style[items])}
                  ></span>
                ))
              : ""}
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                deletePlaceholder("image", item[0]);
              }}
              className={style.delete}
            >
              X
            </span>
          </div>
        ))}
        {Object.entries(textList).map((item) => (
          <div
            div-type="textList"
            key={item[0]}
            data-type={item[0]}
            className={classnames(style.abs, item[0], style.text)}
            style={textList[item[0]]}
          >
            文字位
            {target === item[0]
              ? ["top", "bottom"].map((items, index) => (
                  <span
                    div-type="textList"
                    data-type={item[0]}
                    data-dot={items}
                    key={index}
                    className={classnames(style.circle, style[items])}
                  ></span>
                ))
              : ""}
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                deletePlaceholder("textList", item[0]);
              }}
              className={style.delete}
            >
              X
            </span>
          </div>
        ))}
      </div>

      <Form>
        <Form.Item label="选择编辑页">
          <Radio.Group
            value={checked}
            onChange={(e) => {
              pageList[checked] = { imageList, textList };
              setChecked(e.target.value);
              setImageList(pageList[e.target.value]?.imageList || {});
              setTextList(pageList[e.target.value]?.textList || {});
            }}
          >
            <Radio value={0} key={0}>
              封面
            </Radio>
            {Array.from({ length: pagination }).map((item, index) => (
              <Radio key={index + 1} value={index + 1}>
                页面{index + 1}
              </Radio>
            ))}
            <Radio key={pagination + 1} value={pagination + 1}>
              背面
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="选择编辑页">
          <Button
            onClick={() => {
              setTextList({
                ...textList,
                [`text${+new Date()}`]: {
                  height: "20px",
                  top: "100px",
                  lineHeight: "20px",
                  fontSize: "20px",
                  left: "100px",
                },
              });
            }}
          >
            添加文字位
          </Button>
          <Button
            onClick={() => {
              setImageList({
                ...imageList,
                [`image${+new Date()}`]: {
                  height: "100px",
                  width: "100px",
                  left: "100px",
                  top: "100px",
                },
              });
            }}
          >
            添加图片位
          </Button>
          <Button onClick={clearCanvas}>清空画板</Button>
          <Button onClick={saveData}>保存画板</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
