import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

export async function POST(req: Request) {
  const formData = await req.formData();

  const file = formData.get('file') as File | null;

  if (!file) {
    return new Response(JSON.stringify({ error: 'File is missing' }), {
      status: 400,
    });
  }

  const { name, type } = file;

  const arrayBuffer = await file.arrayBuffer();
  const data = Buffer.from(arrayBuffer);

  const s3Client = new S3Client({
    region: 'ap-northeast-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
  });

  const id = randomUUID();
  const ext = name.split('.').pop();
  const newName = `${id}.${ext}`;

  const uploadCommand = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME as string,
    Body: data,
    ACL: 'public-read',
    ContentType: type,
    Key: name,
  });

  await s3Client.send(uploadCommand);

  return Response.json({ id, name, ext, newName });
}
