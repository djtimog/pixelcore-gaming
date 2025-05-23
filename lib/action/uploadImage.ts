'use server';
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

const bucketName = "pixelcore";
const bucket = storage.bucket(bucketName);

export async function uploadImageWithFile(
  file: File,
  desiredFileName: string,
  imageType: "tournaments" | "teams" | "users"
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const contentType = file.type;
  const destinationPath = `${imageType}/${desiredFileName}`;

  const blob = bucket.file(destinationPath);
  const stream = blob.createWriteStream({
    resumable: false,
    contentType,
    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });

  return new Promise((resolve, reject) => {
    stream.on("error", reject);
    stream.on("finish", () => {
      // ⚠️ Works only if bucket is publicly accessible
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${destinationPath}`;
      resolve(publicUrl);
    });

    stream.end(buffer);
  });
}
