import mongoose from "mongoose";

// Extend the global namespace to store cached mongoose connection
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

interface MongooseCache {
  conn: typeof mongoose.Connection | null;
  promise: Promise<typeof mongoose> | null;
}
