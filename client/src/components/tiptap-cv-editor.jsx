"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { SparkleIcon, StarIcon } from "lucide-react";

const defaultContent = `
<h1>John Doe</h1>
<h1>@jobTitle</h1>
<p>Email: john.doe@example.com | Phone: (123) 456-7890</p>

<h2>Summary</h2>
<p>Experienced software developer with a passion for creating efficient and scalable applications.</p>

<h2>Experience</h2>
<h3>Senior Developer - Tech Solutions Inc.</h3>
<p>2018 - Present</p>
<ul>
  <li>Led development of cloud-based applications</li>
  <li>Mentored junior developers and conducted code reviews</li>
</ul>

<h3>Software Engineer - Innovative Systems LLC</h3>
<p>2015 - 2018</p>
<ul>
  <li>Developed and maintained web applications using React and Node.js</li>
  <li>Collaborated with cross-functional teams to deliver high-quality software</li>
</ul>

<h2>Education</h2>
<h3>@educationContent</h3>

<h2>Skills</h2>
@skills
`;

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-gray-100 border-b">
      <Button>Skills</Button>
      <Button>Education</Button>
      <Button>Experience</Button>
      <Button
        size="sm"
        variant={editor.isActive("bold") ? "secondary" : "outline"}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        Bold
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("italic") ? "secondary" : "outline"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      >
        Italic
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("strike") ? "secondary" : "outline"}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
      >
        Strike
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("code") ? "secondary" : "outline"}
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
      >
        Code
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        Clear marks
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => editor.chain().focus().clearNodes().run()}
      >
        Clear nodes
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("paragraph") ? "secondary" : "outline"}
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        Paragraph
      </Button>
      <Button
        size="sm"
        variant={
          editor.isActive("heading", { level: 1 }) ? "secondary" : "outline"
        }
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </Button>
      <Button
        size="sm"
        variant={
          editor.isActive("heading", { level: 2 }) ? "secondary" : "outline"
        }
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </Button>
      <Button
        size="sm"
        variant={
          editor.isActive("heading", { level: 3 }) ? "secondary" : "outline"
        }
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("bulletList") ? "secondary" : "outline"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        Bullet list
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("orderedList") ? "secondary" : "outline"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        Ordered list
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("codeBlock") ? "secondary" : "outline"}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        Code block
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("blockquote") ? "secondary" : "outline"}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        Blockquote
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        Horizontal rule
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        Hard break
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        Undo
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        Redo
      </Button>
      <Button
        size="sm"
        variant={
          editor.isActive("textStyle", { color: "#958DF1" })
            ? "secondary"
            : "outline"
        }
        onClick={() => editor.chain().focus().setColor("#958DF1").run()}
      >
        Purple
      </Button>
    </div>
  );
};

export function AskAI({
  asistantSteps,
  setAssistantSteps,
  prompt,
  setPrompt,
  loading,
}) {
  const configurations = [
    { title: "Enter your target Job title!" },
    { title: "Enter your Recent Eduction, College, and Graduation Year" },
    { title: "Enter your Work Experience" },
    { title: "Enter you Present Education-level" },
  ];

  return (
    <Card className="w-full mt-8">
      <CardHeader>
        <CardTitle>AI Assistant</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder={configurations[asistantSteps].title}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="w-full"
        />
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => setAssistantSteps(asistantSteps + 1)}
          type="submit"
          className="w-full"
        >
          {loading ? "Hustle is thinking..." : "Apply Changes"}

          <SparkleIcon />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function TiptapCVEditor() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [asistantSteps, setAssistantSteps] = useState(0);
  const [education, setEducation] = useState("");

  const editor = useEditor({
    extensions: [StarterKit, Color, TextStyle],
    content: defaultContent,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
  });

  const logContent = () => {
    console.log(editor?.getHTML());
  };

  const getSkillsListAI = async (prompt) => {
    setLoading(true);

    const { data } = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDuP5fDjvPdXNdIUK6UDNFMShbUqPsw-z0",
      {
        contents: [
          {
            parts: [
              {
                text: `Give me skills of ${prompt} of 3 years experience. Always keep it short and concise. Give me answer in string seperated by | and do not add new line or \n and extra spaces.`,
              },
            ],
          },
        ],
      }
    );
    debugger;
    const updatedContent = editor
      .getHTML()
      .replace(
        "@skills",
        data.candidates[0]?.content?.parts[0]?.text.replaceAll("|", "<br/>")
      );
    editor.commands.setContent(updatedContent);
    if (data) setLoading(false);
  };

  useEffect(() => {
    if (asistantSteps == 1) {
      const updatedContent = editor.getHTML().replace("@jobTitle", prompt);
      editor.commands.setContent(updatedContent);
      getSkillsListAI(prompt);
      setPrompt("");
    } else if (asistantSteps == 2) {
      // Replace @educationContent with the user's input
      const updatedContent = editor
        .getHTML()
        .replace("@educationContent", prompt);
      editor.commands.setContent(updatedContent);
      setEducation(prompt); // Store the input in state if needed for further use
      setPrompt("");
    }
  }, [asistantSteps]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="border rounded-lg overflow-hidden shadow-lg">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
        <AskAI
          loading={loading}
          prompt={prompt}
          setPrompt={setPrompt}
          asistantSteps={asistantSteps}
          setAssistantSteps={setAssistantSteps}
        />
      </div>
    </div>
  );
}
