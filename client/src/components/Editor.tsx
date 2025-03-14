// import "../style.scss";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  XCircle,
  List,
  ArrowLeft,
  ArrowRight,
  ListOrdered,
  Heading,
} from "lucide-react";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];
const MenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="control-group p-4 bg-gray-200 rounded-lg shadow-md">
      <div className="button-group flex flex-wrap gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition duration-150
            ${
              editor.isActive("bold")
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            } 
            hover:bg-blue-200`}>
          <Bold className="mr-1" />
          Bold
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can().chain().focus().toggleItalic().run()
          }
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition duration-150
            ${
              editor.isActive("italic")
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            } 
            hover:bg-blue-200`}>
          <Italic className="mr-1" />
          Italic
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can().chain().focus().toggleStrike().run()
          }
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition duration-150
            ${
              editor.isActive("strike")
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            } 
            hover:bg-blue-200`}>
          <Strikethrough className="mr-1" />
          Strike
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition duration-150
            ${
              editor.isActive("code")
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            } 
            hover:bg-blue-200`}>
          <Code className="mr-1" />
          Code
        </button>

        <button
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className="flex items-center px-3 py-2 text-sm font-medium bg-white text-black rounded-md hover:bg-gray-200 transition duration-150">
          <XCircle className="mr-1" />
          Clear marks
        </button>

        <button
          onClick={() => editor.chain().focus().clearNodes().run()}
          className="flex items-center px-3 py-2 text-sm font-medium bg-white text-black rounded-md hover:bg-gray-200 transition duration-150">
          <XCircle className="mr-1" />
          Clear nodes
        </button>

        {/* Add more button implementations here with proper icons */}

        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition duration-150
            ${
              editor.can().chain().focus().undo().run()
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
            hover:bg-green-400`}>
          <ArrowLeft className="mr-1" />
          Undo
        </button>

        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition duration-150
            ${
              editor.can().chain().focus().redo().run()
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
            hover:bg-green-400`}>
          <ArrowRight className="mr-1" />
          Redo
        </button>
      </div>
    </div>
  );
};
const content = "Hello world";
const newContent = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;

export default () => {
  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none focus:outline-none min-h-[300px] p-4 leading-tighter",
      },
    },
  });

  return (
    <>
      {/* MenuBar  /> */}
      <div className="control-group p-4 bg-gray-100">
        <div className="button-group flex flex-wrap gap-2">
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            disabled={
              !editor?.can().chain().focus().toggleBold().run()
            }
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition duration-150
            ${
              editor?.isActive("bold")
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            } 
            hover:bg-blue-200`}>
            <Bold className="mr-1" />
          </button>

          <button
            onClick={() =>
              editor?.chain().focus().toggleItalic().run()
            }
            disabled={
              !editor?.can().chain().focus().toggleItalic().run()
            }
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition duration-150
            ${
              editor?.isActive("italic")
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            } 
            hover:bg-blue-200`}>
            <Italic className="mr-1" />
            Italic
          </button>
          <button
            type="button"
            onClick={() =>
              editor
                ?.chain()
                .focus()
                .toggleHeading({ level: 2 })
                .run()
            }
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition duration-150
            ${
              editor?.isActive("heading", { level: 2 })
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            } 
            hover:bg-blue-200`}>
            <Heading className="mr-1" />
          </button>
          <button
            onClick={() =>
              editor?.chain().focus().toggleStrike().run()
            }
            disabled={
              !editor?.can().chain().focus().toggleStrike().run()
            }
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition duration-150
            ${
              editor?.isActive("strike")
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            } 
            hover:bg-blue-200`}>
            <Strikethrough className="mr-1" />
            Strike
          </button>

          <button
            onClick={() => editor?.chain().focus().toggleCode().run()}
            disabled={
              !editor?.can().chain().focus().toggleCode().run()
            }
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition duration-150
            ${
              editor?.isActive("code")
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            } 
            hover:bg-blue-200`}>
            <Code className="mr-1" />
            Code
          </button>

          <button
            onClick={() =>
              editor?.chain().focus().unsetAllMarks().run()
            }
            className="flex items-center px-3 py-2 text-sm font-medium bg-white text-black rounded-md hover:bg-gray-200 transition duration-150">
            <XCircle className="mr-1" />
            Clear marks
          </button>

          <button
            onClick={() => editor?.chain().focus().clearNodes().run()}
            className="flex items-center px-3 py-2 text-sm font-medium bg-white text-black rounded-md hover:bg-gray-200 transition duration-150">
            <XCircle className="mr-1" />
            Clear nodes
          </button>
          <button
            type="button"
            onClick={() =>
              editor?.chain().focus().toggleBulletList().run()
            }
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition duration-150
            ${
              editor?.isActive("bulletList")
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            } 
            hover:bg-blue-200`}>
            <List className="mr-1" />
          </button>
          <button
            type="button"
            onClick={() =>
              editor?.chain().focus().toggleOrderedList().run()
            }
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition duration-150
            ${
              editor?.isActive("toggleOrderedList")
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            } 
            hover:bg-blue-200`}>
            <ListOrdered className="mr-1" />
          </button>

          <button
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editor?.can().chain().focus().undo().run()}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition duration-150
            ${
              editor?.can().chain().focus().undo().run()
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
            hover:bg-green-400`}>
            <ArrowLeft className="mr-1" />
            Undo
          </button>

          <button
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editor?.can().chain().focus().redo().run()}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition duration-150
            ${
              editor?.can().chain().focus().redo().run()
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
            hover:bg-green-400`}>
            <ArrowRight className="mr-1" />
            Redo
          </button>
        </div>
      </div>

      <EditorContent editor={editor} />
    </>
  );
};
// slotBefore={<MenuBar />}
// extensions={extensions}
// content={content}
// editorContainerProps={{
//   className:
//     "prose prose-lg max-w-none focus:outline-none min-h-[300px] p-4",
// }}
