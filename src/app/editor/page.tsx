import { NextPage } from "next";
// import EditorJS from "@editorjs/editorjs";

import dynamic from "next/dynamic";

export const EditorJS = dynamic(() => import("./content"), {
  ssr: false,
});

const EditorPage: NextPage = () => {
  return (
    <div>
      <div>안녕하세요</div>
      <EditorJS />
    </div>
  );
};

export default EditorPage;
