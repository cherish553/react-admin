import "braft-editor/dist/index.css";
import React from "react";
import BraftEditor from "braft-editor";
// import { ImageUtils } from "braft-finder";
import { Upload } from "antd";
import { postUploadImage } from "@/util/common";
import { ContentUtils } from "braft-utils";
interface Props {
  outputHTML: string;
  setOutputHTML: (desc: string) => void;
}
export default class BasicDemo extends React.Component<Props> {
  componentWillReceiveProps(e: any) {
    console.log(e);
    if (!this.state.flag) return;
    if (e.outputHTML) {
      this.setState({ flag: false });
      this.setState({
        editorState: BraftEditor.createEditorState(e.outputHTML),
      });
    }
  }
  state = {
    flag: true,
    editorState: BraftEditor.createEditorState(this.props.outputHTML || ""), // 设置编辑器初始内容
  };
  uploadHandler = async (param: any) => {
    if (!param.file) {
      return false;
    }
    const url = await postUploadImage(param.file);
    if (!url) return;
    this.setState({
      editorState: ContentUtils.insertMedias(this.state.editorState, [
        {
          type: "IMAGE",
          url: `${process.env.REACT_APP_BASE_URL}/storage/${url.slice(7)}`,
        },
      ]),
    });
  };

  handleChange = (editorState: any) => {
    this.setState({
      editorState: editorState,
    });
    this.props.setOutputHTML(editorState.toHTML());
  };

  render() {
    const extendControls = [
      {
        key: "antd-uploader",
        type: "component",
        component: (
          <Upload
            accept="image/*"
            showUploadList={false}
            customRequest={this.uploadHandler}
          >
            <button
              type="button"
              className="control-item button upload-button"
              data-title="插入图片"
            >
              上传图片
            </button>
          </Upload>
        ),
      },
    ];
    const { editorState } = this.state;

    return (
      <div>
        <div className="editor-wrapper">
          <BraftEditor
            value={editorState}
            onChange={this.handleChange}
            extendControls={extendControls as any}
          />
        </div>
      </div>
    );
  }
}
