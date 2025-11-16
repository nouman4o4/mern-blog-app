import { Color } from "@tiptap/extension-color"
import ListItem from "@tiptap/extension-list-item"
import TextStyle from "@tiptap/extension-text-style"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
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
} from "lucide-react"

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
]

export default ({
  onChange,
  content,
}: {
  content: any

  onChange: (content: string) => void
}) => {
  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none min-h-[300px] p-2 md:p-4 leading-[1.2]",
      },
    },
    immediatelyRender: true,
  })

  // const editorState = editor
  //   ? useEditorState({
  //       editor,
  //       selector: ({ editor }: { editor: Editor }) => ({
  //         isBold: editor.isActive("bold"),
  //         isItalic: editor.isActive("italic"),
  //         isStrike: editor.isActive("strike"),
  //         isCode: editor.isActive("code"),
  //         isHeading: (level: number) =>
  //           editor.isActive("heading", { level }),
  //         isBulletList: editor.isActive("bulletList"),
  //         isOrderedList: editor.isActive("orderedList"),
  //         canUndo: editor.can().chain().focus().undo().run(),
  //         canRedo: editor.can().chain().focus().redo().run(),
  //       }),
  //     })
  //   : null;

  return (
    <>
      {/* MenuBar  /> */}
      <div className="control-group p-2 md:p-4 bg-gray-100">
        <div className="button-group flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            disabled={!editor?.can().chain().focus().toggleBold().run()}
            className={`flex items-center px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition duration-150
      ${
        editor?.isActive("bold")
          ? "bg-blue-500 text-white"
          : "bg-white text-black"
      }
      hover:bg-blue-200`}
          >
            <Bold className="mr-1 size-4 lg:size-6" />
            <span className="hidden sm:inline">Bold</span>{" "}
            {/* Hide text on small screens */}
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            disabled={!editor?.can().chain().focus().toggleItalic().run()}
            className={`flex items-center px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition duration-150
      ${
        editor?.isActive("italic")
          ? "bg-blue-500 text-white"
          : "bg-white text-black"
      }
      hover:bg-blue-200`}
          >
            <Italic className="mr-1 size-4 lg:size-6" />
            <span className="hidden sm:inline">Italic</span>{" "}
            {/* Hide text on small screens */}
          </button>

          <button
            type="button"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`flex items-center px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition duration-150
      ${
        editor?.isActive("heading", { level: 2 })
          ? "bg-blue-500 text-white"
          : "bg-white text-black"
      }
      hover:bg-blue-200`}
          >
            <Heading className="mr-1 size-4 lg:size-6" />
            <span className="hidden sm:inline">Heading</span>{" "}
            {/* Hide text on small screens */}
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            disabled={!editor?.can().chain().focus().toggleStrike().run()}
            className={`flex items-center px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition duration-150
      ${
        editor?.isActive("strike")
          ? "bg-blue-500 text-white"
          : "bg-white text-black"
      }
      hover:bg-blue-200`}
          >
            <Strikethrough className="mr-1 size-4 lg:size-6" />
            <span className="hidden sm:inline">Strike</span>{" "}
            {/* Hide text on small screens */}
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleCode().run()}
            disabled={!editor?.can().chain().focus().toggleCode().run()}
            className={`flex items-center px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition duration-150
      ${
        editor?.isActive("code")
          ? "bg-blue-500 text-white"
          : "bg-white text-black"
      }
      hover:bg-blue-200`}
          >
            <Code className="mr-1 size-4 lg:size-6" />
            <span className="hidden sm:inline">Code</span>{" "}
            {/* Hide text on small screens */}
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().unsetAllMarks().run()}
            className="flex items-center px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium bg-white text-black rounded-md hover:bg-gray-200 transition duration-150"
          >
            <XCircle className="mr-1 size-4 lg:size-6" />
            <span className="hidden sm:inline">Clear Marks</span>{" "}
            {/* Hide text on small screens */}
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`flex items-center px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition duration-150
      ${
        editor?.isActive("bulletList")
          ? "bg-blue-500 text-white"
          : "bg-white text-black"
      }
      hover:bg-blue-200`}
          >
            <List className="mr-1 size-4 lg:size-6" />
            <span className="hidden sm:inline">Bullet List</span>{" "}
            {/* Hide text on small screens */}
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={`flex items-center px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition duration-150
      ${
        editor?.isActive("orderedList")
          ? "bg-blue-500 text-white"
          : "bg-white text-black"
      }
      hover:bg-blue-200`}
          >
            <ListOrdered className="mr-1 size-4 lg:size-6" />
            <span className="hidden sm:inline">Ordered List</span>{" "}
            {/* Hide text on small screens */}
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editor?.can().chain().focus().undo().run()}
            className={`flex items-center px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition duration-150
      ${
        editor?.can().chain().focus().undo().run()
          ? "bg-green-500 text-white"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }
      hover:bg-green-400`}
          >
            <ArrowLeft className="mr-1 size-4 lg:size-6" />
            <span className="hidden sm:inline">Undo</span>{" "}
            {/* Hide text on small screens */}
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editor?.can().chain().focus().redo().run()}
            className={`flex items-center px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition duration-150
      ${
        editor?.can().chain().focus().redo().run()
          ? "bg-green-500 text-white"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }
      hover:bg-green-400`}
          >
            <ArrowRight className="mr-1 size-4 lg:size-6" />
            <span className="hidden sm:inline">Redo</span>{" "}
            {/* Hide text on small screens */}
          </button>
        </div>
      </div>

      <EditorContent editor={editor} />
    </>
  )
}
