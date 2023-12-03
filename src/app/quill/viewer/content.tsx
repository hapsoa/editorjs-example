"use client";
import PhotoSwipe from "photoswipe";
import Quill from "quill";
import Delta from "quill-delta";
import { useEffect, useState } from "react";

// import PhotoSwipeLightbox from "photoswipe/lightbox";

export const QuillViewer: React.FC = () => {
  const [editor, setEditor] = useState<Quill | null>(null);

  useEffect(() => {
    Promise.all([
      import("quill"),
      require("quill-table"),
      import("photoswipe/lightbox"),
    ]).then((imports) => {
      const Quill = imports[0].default;
      const quillTable = imports[1];
      const PhotoSwipeLightbox = imports[2].default;

      Quill.register(quillTable.TableCell);
      Quill.register(quillTable.TableRow);
      Quill.register(quillTable.Table);
      Quill.register(quillTable.Contain);
      Quill.register("modules/table", quillTable.TableModule);

      const maxRows = 10;
      const maxCols = 5;
      const tableOptions = [];
      for (let r = 1; r <= maxRows; r++) {
        for (let c = 1; c <= maxCols; c++) {
          tableOptions.push("newtable_" + r + "_" + c);
        }
      }

      const editor = new Quill("#editor", {
        readOnly: true,
      });

      editor.once("text-change", (delta) => {
        setTimeout(() => {
          delta.ops.forEach((op) => {
            if (op.insert && (op.insert as Record<string, string>).image) {
              const opInsertImage = (op.insert as Record<string, string>).image;
              const imageNode = document.querySelector(
                `img[src="${opInsertImage}"]`
              );
              if (imageNode) {
                const linkNode = document.createElement("a");
                linkNode.href = opInsertImage;
                linkNode.setAttribute(
                  "data-pswp-width",
                  (imageNode.clientWidth * 100).toString()
                );
                linkNode.setAttribute(
                  "data-pswp-height",
                  (imageNode.clientHeight * 100).toString()
                );

                imageNode?.parentNode?.insertBefore(linkNode, imageNode);
                linkNode.appendChild(imageNode);
              }
            }
          });
        }, 500);
      });

      editor.setContents({
        ops: [
          {
            insert: {
              image:
                "https://storage.googleapis.com/value-investing-together.appspot.com/blog/hi-rabbit.png",
            },
          },
          { insert: "\n" },
          {
            insert: {
              image:
                "https://storage.googleapis.com/value-investing-together.appspot.com/blog/irp-tax/lovely-fox.png",
            },
          },
          { insert: "\n" },
          { insert: "ss" },
          {
            attributes: {
              "0": "T",
              "1": "A",
              "2": "B",
              "3": "L",
              "4": "E",
              td: "2k3rr79wrge|rueerjvnuy|1fsc2lhfy2t",
            },
            insert: "\n",
          },
          { insert: "cc" },
          {
            attributes: {
              "0": "T",
              "1": "A",
              "2": "B",
              "3": "L",
              "4": "E",
              td: "2k3rr79wrge|rueerjvnuy|t74c9795bgc",
            },
            insert: "\n",
          },
          { insert: "ss title" },
          {
            attributes: {
              "0": "T",
              "1": "A",
              "2": "B",
              "3": "L",
              "4": "E",
              td: "2k3rr79wrge|8pnfgsghae|gx1h5rxld69",
            },
            insert: "\n",
          },
          { insert: "cc content" },
          {
            attributes: {
              "0": "T",
              "1": "A",
              "2": "B",
              "3": "L",
              "4": "E",
              td: "2k3rr79wrge|8pnfgsghae|yupt70ft0u",
            },
            insert: "\n",
          },
          { insert: "\n" },
        ],
      } as Delta);

      setEditor(editor);

      const lightbox = new PhotoSwipeLightbox({
        gallery: "#editor",
        children: "a",
        pswpModule: () => import("photoswipe"),
      });
      lightbox.init();
    });
  }, []);

  return <div id="editor" style={{ minHeight: "600px" }}></div>;
};
