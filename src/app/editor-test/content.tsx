"use client";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import DragDrop from "editorjs-drag-drop";
import React, { useEffect } from "react";

const EditorContent: React.FC = () => {
  const [editor, setEditor] = React.useState<EditorJS>();

  useEffect(() => {
    console.log("edtorjs");
    const editor = new EditorJS({
      holder: "editorjs",
      tools: {
        header: Header,
        list: {
          class: List,
          inlineToolbar: true,
        },
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: "http://localhost:3002/test/create-test-image", // uploadFile // Your backend file uploader endpoint
              // byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
            },
          },
        },
      },
      onReady: () => {
        new DragDrop(editor);
      },

      // view mode
      // readOnly: true,
      // data: {
      //   time: 1701094021672,
      //   blocks: [
      //     {
      //       id: "XEgEVcH59G",
      //       type: "paragraph",
      //       data: {
      //         text: "안녕하세요.",
      //       },
      //     },
      //   ],
      //   version: "2.28.2",
      // },
      data: {
        time: 1701147652943,
        blocks: [
          {
            id: "gkUEq1-N3E",
            type: "image",
            data: {
              file: {
                url: "https://firebasestorage.googleapis.com/v0/b/value-investing-together.appspot.com/o/blog%2F1%2Fou.png?alt=media",
              },
              caption: "",
              withBorder: false,
              stretched: false,
              withBackground: false,
            },
          },
        ],
        version: "2.28.2",
      },
    });
    setEditor(editor);

    //
    return () => {
      editor.destroy();
    };

    // <img /> 태그가 달리는데, 여기에 스타일 삽입이 될지 판단해야하는듯하다.
  }, []);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        id="save"
        onClick={() => {
          editor?.save().then((outputData) => {
            console.log("Article data: ", JSON.stringify(outputData, null, 2));
          });
        }}
      >
        Save
      </button>
      <div id="editorjs"></div>
    </div>
  );
};

export default EditorContent;
