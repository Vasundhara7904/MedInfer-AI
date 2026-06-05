import DocumentsList
from "@/components/documents/DocumentsList";

export default function DocumentsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        My Documents
      </h1>

      <DocumentsList />
    </div>
  );
}