import { Storage } from "@google-cloud/storage";
import path from "path";

// Service account key JSON
const keyFilename = path.join(process.cwd(), "google-service-account.json");


const bucketName = "pixelcore";
const storage = new Storage({ keyFilename });
const bucket = storage.bucket(bucketName);


export async function uploadImageWithName(
  fileBuffer: Buffer,
  desiredFileName: string,
  contentType: string,
  imageType: "tournaments" | "teams" | "users"
): Promise<string> {
  const destinationPath = `${imageType}/${desiredFileName}`;

  const blob = bucket.file(destinationPath);
  const stream = blob.createWriteStream({
    resumable: false,
    contentType,
    public: true,
    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });

  return new Promise((resolve, reject) => {
    stream.on("error", reject);
    stream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${destinationPath}`;
      resolve(publicUrl);
    });

    stream.end(fileBuffer);
  });
}
