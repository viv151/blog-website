import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(conf.appWriteUrl).setProject(conf.appProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });

      if (userAccount) {
        //call login method, ie make the user login directly after signup
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({
        email,
        password,
      });
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      //   throw error;
      // we can log the error also
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logout({ sessionId }) {
    try {
      //   return await this.account.deleteSession({sessionId}); to delete the one particular sesssion using id or if want to delete current one then pass 'current'
      //delete all the sessions
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
    return null;
  }
}

const authService = new AuthService();

export default authService;
