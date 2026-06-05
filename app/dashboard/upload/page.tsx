import UploadForm from "@/components/upload/UploadForm";
import MedicalNoteForm from "@/components/upload/MedicalNoteForm";

export default function UploadPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Upload Medical Documents
      </h1>

      <div className="space-y-10">
        <UploadForm />

        <MedicalNoteForm />
      </div>
    </div>
  );
}