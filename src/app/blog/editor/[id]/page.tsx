import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import BlogEditor from "./content";

interface Props {
  params: {
    id: string;
  };
}

export const BlogEditorPage: NextPage<Props> = ({ params }) => {
  return <BlogEditor id={params.id} />;
};

export default BlogEditorPage;
