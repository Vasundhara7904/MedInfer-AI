"use client";

import { useRouter }
  from "next/navigation";

export default function DeleteButton({
  id,
}: {
  id: string;
}) {
  const router =
    useRouter();

  async function handleDelete() {
    const confirmed =
      window.confirm(
        "Delete document?"
      );

    if (!confirmed) {
      return;
    }

    const response =
      await fetch(
        `/api/documents/${id}`,
        {
          method:
            "DELETE",
        }
      );

    if (
      response.ok
    ) {
      router.push(
        "/dashboard/documents"
      );

      router.refresh();
    }
  }

  return (
    <button
      onClick={
        handleDelete
      }
      className="
        border
        px-4
        py-2
      "
    >
      Delete
    </button>
  );
}