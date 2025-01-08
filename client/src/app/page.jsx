import TiptapCVEditor from '@/components/tiptap-cv-editor'

export default function Home() {
  return (
    (<main className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">CV Editor</h1>
      <TiptapCVEditor />
    </main>)
  );
}

