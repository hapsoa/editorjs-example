"use client";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import React, { useEffect } from "react";

const EditorContent: React.FC = () => {
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
      },
    });
  }, []);

  return (
    <div>
      <div id="editorjs"></div>
    </div>
  );
};

export default EditorContent;
