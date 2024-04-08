/* eslint-disable */
import mongoose from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

mongoose.set("strictQuery", false);
declare global {
  var mongoose: Promise<any>;
}

let cached = global.mongoose;

if (!cached) {
  // @ts-ignore
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  // @ts-ignore
  if (cached.conn) {
    // @ts-ignore
    return cached.conn;
  }

  // @ts-ignore
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      autoIndex: false,
    };

    // @ts-ignore
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((client) => client);
  }

  // @ts-ignore
  cached.conn = await cached.promise;
  // @ts-ignore
  return cached.conn;
}
