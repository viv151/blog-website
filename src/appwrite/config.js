import conf from "../conf/conf";
import { Client, ID, Query, Storage, TablesDB } from "appwrite";

export class Service {
  client = new Client();
  tablesDB;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appWriteUrl).setProject(conf.appProjectId);
    this.tablesDB = new TablesDB(this.client);
    this.bucket = new Storage(this.client); //storage or bucket same
  }

  async createPost({ title, slug, content, featuredImg, status, userId }) {
    try {
      await this.tablesDB.createRow({
        databaseId: conf.appDatabseId,
        tableId: conf.appWriteUrl,
        slug, //we can also create a unique id or we can also use slug
        data: {
          //data to be passed in
          title,
          slug,
          content,
          featuredImg,
          status,
          userId,
        },
        // permissions: ["read("any")"] // optional
      });
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImg, status }) {
    try {
      return await this.tablesDB.updateRow({
        databaseId: conf.appDatabseId, //"<DATABASE_ID>",
        tableId: conf.appTableId, //"<TABLE_ID>",
        rowId: slug, //unique id
        data: {
          title,
          content,
          featuredImg,
          status,
        },
      });
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.tablesDB.deleteRow({
        databaseId: conf.appDatabseId,
        tableId: conf.appTableId, //"<TABLE_ID>",
        rowId: slug, //unique id
      });
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
    }
  }

  async getPost(slug) {
    try {
      return await this.tablesDB.getRow({
        databaseId: conf.appDatabseId,
        tableId: conf.appTableId, //"<TABLE_ID>",
        rowId: slug,
        //queries: [], // optional
      });
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.tablesDB.listRows({
        databaseId: conf.appDatabseId,
        tableId: conf.appTableId, //"<TABLE_ID>",
        queries,
        // queries: [Query.equal("status", "active")], // optional
        //we can also use pagination here in the queries , read docs for more
      });
    } catch (error) {
      console.log("Appwrite service :: getposts :: error", error);
      return false;
    }
  }

  //file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: conf.appBucketId,
        fileId: ID.unique(),
        file,
        // permissions: ["role:all"],  // optional
        // onProgress: (progress) => console.log(progress), // optional
      });
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile({
        bucketId: conf.appBucketId,
        fileId,
      });
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview({
      bucketId: conf.appBucketId, // '<BUCKET_ID>',
      fileId, // '<FILE_ID>',
      width: 0, // optional
      height: 0, // optional
      gravity: ImageGravity.Center, // optional
      quality: -1, // optional
      borderWidth: 0, // optional
      borderColor: "", // optional
      borderRadius: 0, // optional
      opacity: 0, // optional
      rotation: -360, // optional
      background: "", // optional
      output: ImageFormat.Jpg, // optional
      token: "<TOKEN>", // optional
    });
  }
}

const appwriteService = new Service();

export default appwriteService;
