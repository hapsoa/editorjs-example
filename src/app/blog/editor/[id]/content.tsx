"use client";

import { useEffect, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { ClientWidthContainer } from "@/components/client-width-container";

interface Props {
  id: string;
}

const BlogEditor: React.FC<Props> = ({ id }) => {
  const [editor, setEditor] = useState<EditorJS>();

  useEffect(() => {
    Promise.all([
      import("@editorjs/editorjs"),
      import("@editorjs/header"),
      import("@editorjs/list"),
      import("@editorjs/image"),
      import("editorjs-drag-drop"),
    ]).then((imports) => {
      const EditorJS = imports[0].default;
      const Header = imports[1].default;
      const List = imports[2].default;
      const ImageTool = imports[3].default;
      const DragDrop = imports[4].default;

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
              },
            },
          },
        },
        onReady: () => {
          new DragDrop(editor);
        },
      });

      setEditor(editor);
    });

    return () => {
      editor?.destroy();
    };
  }, []);

  return (
    <ClientWidthContainer pcWidth="40rem">
      {
        <div className="pt-3">
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-primary"
              id="save"
              onClick={() => {
                editor?.save().then((outputData) => {
                  console.log(
                    "Article data: ",
                    JSON.stringify(outputData, null, 2)
                  );
                });
              }}
            >
              Save
            </button>
          </div>

          <div
            className="mt-3 mb-3 bg-secondary-subtle"
            style={{ height: "1px" }}
          />

          <div id="editorjs"></div>
        </div>
      }
    </ClientWidthContainer>
  );
};

export default BlogEditor;
