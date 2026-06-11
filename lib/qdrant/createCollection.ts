import { qdrant }
  from "./client";

export async function
createCollection() {

  const collections =
    await qdrant.getCollections();

  const exists =
    collections.collections.some(
      (c) =>
        c.name ===
        "medical_documents"
    );

  if (exists) {
    return;
  }

  await qdrant.createCollection(
    "medical_documents",
    {
      vectors: {
        size: 3072,
        distance:
          "Cosine",
      },
    }
  );

  console.log(
    "Qdrant collection created"
  );
}