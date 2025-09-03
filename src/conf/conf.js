const conf = {
  appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appDatabseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appTableId: String(import.meta.env.VITE_APPWRITE_TABLE_ID),
  appBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default conf;
