"use client";

import { useEffect, useState } from "react";
import Quill from "quill";

export const QuillEditor: React.FC = () => {
  const [editor, setEditor] = useState<Quill | null>(null);

  useEffect(() => {
    // const toolbarOptions = ["bold", "italic", "underline", "strike"];
    // var toolbarOptions = [
    //   ["bold", "italic"],
    //   ["link", "image"],
    // ];
    // var toolbarOptions = [{ header: "3" }];
    // var toolbarOptions = [{ size: ["small", false, "large", "huge"] }];

    var toolbarOptions = [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button
    ];

    const editor = new Quill("#editor", {
      // modules: { toolbar: "#toolbar" },
      // modules: { toolbar: toolbarOptions },
      // theme: "snow",
      readOnly: true,
    });

    // editor.update([
    //   { insert: "Hello World!\n\n\nyayayay\n\n\nahhaahahah" },
    //   { attributes: { header: 1 }, insert: "\n" },
    //   { insert: "\n\n\n" },
    // ]);
    setEditor(editor);

    editor.getContents();
  }, []);

  return (
    <>
      {/* <div id="toolbar">
        <button className="ql-bold">Bold</button>
        <button className="ql-italic">Italic</button>
      </div> */}

      <button
        onClick={() => {
          if (editor) {
            console.log(JSON.stringify(editor.getContents()));
          }
        }}
      >
        yeap
      </button>

      <div id="editor">
        <p>Hello World!</p>
      </div>
    </>
  );
};
