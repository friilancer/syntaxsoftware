import type mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

import type { IUser } from "@/api/types";

declare global {
  type GenericResponse<T> = {
    success: boolean;
    message: string;
    error?: unknown;
    redirect?: string;
    data: T;
  };

  interface SyntaxNextApiRequest extends NextApiRequest {}

  interface SyntaxNextApiResponse<T> extends NextApiResponse {
    success: true;
  }

  namespace NodeJS {
    export interface ProcessEnv {
      MONGODB_URI: string;
      SECRET: string;
      API_KEY: string;
      AUTHDOMAIN: string;
      PROJECTID: string;
      STORAGEBUCKET: string;
      SENDERID: string;
      APPID: string;
      MID: string;
    }
    export interface Global {
      mongoose: mongoose;
    }
  }
}
