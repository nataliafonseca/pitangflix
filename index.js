import PrismaClient from "@prisma/client";

const prisma = new PrismaClient.PrismaClient();

// (async () => {
//   const movies = await prisma.movie.createMany({
//     data: [
//       {
//         title: "Interstelar",
//         description: "SCI-FI",
//         duration: 180,
//         classification: "PARENT_GUIDANCE_SUGGESTED",
//       },
//       {
//         title: "Batman Begins",
//         description: "Batman...",
//         duration: 180,
//         classification: "RESTRICTED",
//       },
//       {
//         title: "Batman Dark Knight",
//         description: "Batman...",
//         duration: 180,
//         classification: "RESTRICTED",
//       },
//     ],
//   });

//   console.log(movies.count);
// })();

// (async () => {
//   const session = await prisma.session.create({
//     data: {
//       sessionDate: new Date(),
//       room: "IMAX",
//       movie: {
//         connect: { id: "624fba6c-b7af-460d-8083-bf46f09a0d26" },
//       },
//     },
//   });

//   console.log(session);
// })();

// (async () =>
//   await prisma.user.create({
//     data: {
//       name: "Natalia",
//       email: "nat@nat.nat",
//       password: "123456",
//       birthDate: new Date("1995-02-03"),
//     },
//   }))();

// (async () => {
//   const users = await prisma.user.findMany({});
//   console.log(users);
// })();

(async () => {
  const sessions = await prisma.session.findMany({ include: { movie: true } });

  console.log(sessions);
})();
