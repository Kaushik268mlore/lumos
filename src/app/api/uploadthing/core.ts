import { auth, clerkClient } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { ratelimit } from "~/server/ratelimit";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 40 } })
    .middleware(async ({ req }) => {
      const user = await auth();
      if (!user.userId) throw new UploadThingError("Unauthorized");

      const fullUserData = await clerkClient.users.getUser(user.userId);

      if (fullUserData?.privateMetadata?.["can-upload"] !== true)
        throw new UploadThingError("User Does Not Have Upload Permissions");

      const { success } = await ratelimit.limit(user.userId);
      if (!success) throw new UploadThingError("Ratelimited");

      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.insert(images).values({
        name: file.name,
        url: file.url,
        userId: metadata.userId,
      });

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
// import { auth, clerk } from "@clerk/nextjs/server";
// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";
// import { db } from "~/server/db";
// import { images } from "~/server/db/schema";
// import { ratelimit } from "~/server/ratelimit";

// const f = createUploadthing();

// export const ourFileRouter = {
//   imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 40 } })
//     .middleware(async ({ req }) => {
//       // Await the auth call to get user data
//       const user = await auth(); // Ensure you await this call

//       // Check if userId exists
//       if (!user.userId) throw new UploadThingError("Unauthorized");
//       const clerkClient = new Clerk();
//       // Await the Clerk client call to get full user data
//       const fullUserData = await  clerkClient.users.getUser(user.userId);

//       // Check for upload permissions in user's private metadata
//       if (fullUserData?.privateMetadata?.["can-upload"] !== true) {
//         throw new UploadThingError("User Does Not Have Upload Permissions");
//       }

//       // Rate limit check
//       const { success } = await ratelimit.limit(user.userId);
//       if (!success) throw new UploadThingError("Ratelimited");

//       // Return userId for use in onUploadComplete
//       return { userId: user.userId };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       // Insert uploaded file information into the database
//       await db.insert(images).values({
//         name: file.name,
//         url: file.url,
//         userId: metadata.userId,
//       });

//       return { uploadedBy: metadata.userId };
//     }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;