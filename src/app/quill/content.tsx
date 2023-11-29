"use client";

import { useEffect, useState } from "react";
import Quill, { DeltaOperation } from "quill";
import Delta from "quill-delta";

/**
 * Step1. select local image
 */
function selectLocalImage(editor: Quill) {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();

  // Listen upload local image and save to server
  input.onchange = () => {
    const file = input.files?.[0];

    // file type is only image.
    if (file && /^image\//.test(file.type)) {
      saveToServer(file, editor);
      console.log("saveToServer");
    } else {
      console.warn("You could only upload images.");
    }
  };
}

/**
 * Step2. save to server
 *
 * @param {File} file
 */
function saveToServer(file: File, editor: Quill) {
  const fd = new FormData();
  fd.append("image", file);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3002/test/create-test-image", true);
  xhr.onload = () => {
    console.log("xhr.status", xhr.status);
    if (xhr.status === 200 || xhr.status === 201) {
      // this is callback data: url
      const url = xhr.responseText;
      insertToEditor(url, editor);
    }
  };
  xhr.send(fd);
}

/**
 * Step3. insert image url to rich editor.
 *
 * @param {string} url
 */
function insertToEditor(url: string, editor: Quill) {
  // push image url to rich editor.
  const range = editor.getSelection()!;
  editor.insertEmbed(range.index, "image", `${url}`);
}

export const QuillEditor: React.FC = () => {
  const [editor, setEditor] = useState<Quill | null>(null);

  useEffect(() => {
    // var toolbarOptions = [{ header: "3" }];
    // var toolbarOptions = [{ size: ["small", false, "large", "huge"] }];

    Promise.all([import("quill")]).then((imports) => {
      const Quill = imports[0].default;

      // var toolbarOptions = [
      //   ["bold", "italic", "underline", "strike"], // toggled buttons
      //   ["blockquote", "code-block"],

      //   [{ header: 1 }, { header: 2 }], // custom button values
      //   [{ list: "ordered" }, { list: "bullet" }],
      //   [{ script: "sub" }, { script: "super" }], // superscript/subscript
      //   [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      //   [{ direction: "rtl" }], // text direction

      //   [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      //   [{ header: [1, 2, 3, 4, 5, 6, false] }],

      //   [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      //   [{ font: [] }],
      //   [{ align: [] }],

      //   ["clean"], // remove formatting button
      // ];
      const toolbarOptions = [
        [
          { header: [1, 2, 3, 4, 5, 6, false] },
          { size: ["small", false, "large", "huge"] },
        ],
        [
          "bold",
          "italic",
          "underline",
          "strike",
          { color: [] },
          { background: [] },
          { align: [] },
          { script: "sub" },
          { script: "super" },
        ],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["link", "image"],
        ["clean"],
        // ["blockquote", "code-block", { font: [] }],
      ];

      const editor = new Quill("#editor", {
        modules: { toolbar: toolbarOptions },
        theme: "snow",
        // readOnly: true,
      });

      // editor.setContents({
      //   ops: [
      //     { insert: "ssss\n\n\n\n" },
      //     {
      //       insert: {
      //         image:
      //           "https://storage.googleapis.com/value-investing-together.appspot.com/blog/1/oou.png",
      //       },
      //     },
      //     { insert: "\n" },
      //   ],
      // } as Delta);
      setEditor(editor);

      editor.getModule("toolbar").addHandler("image", () => {
        selectLocalImage(editor);
      });
    });
  }, []);

  return (
    <>
      <button
        onClick={() => {
          if (editor) {
            console.log(JSON.stringify(editor.getContents()));
          }
        }}
      >
        save
      </button>

      <div id="editor" style={{ minHeight: "600px" }}>
        {/* <p>Hello World!</p> */}
      </div>
    </>
  );
};
