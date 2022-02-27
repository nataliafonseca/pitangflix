import prismaClient from "./index.js";

const prisma = prismaClient;

(async () => {
  const movies = await prisma.movie.createMany({
    data: [
      {
        title: "Interstelar",
        description: "SCI-FI",
        duration: 180,
        classification: "PARENT_GUIDANCE_SUGGESTED",
      },
      {
        title: "Batman Begins",
        description: "Batman...",
        duration: 180,
        classification: "RESTRICTED",
      },
      {
        title: "Batman Dark Knight",
        description: "Batman...",
        duration: 180,
        classification: "RESTRICTED",
      },
    ],
  });
})();

(async () => {
  const session = await prisma.session.create({
    data: {
      sessionDate: new Date(),
      room: "IMAX",
      movie: {
        connect: { id: "191ef27b-6044-4897-a752-0bd5a32cd63b" },
      },
    },
  });
})();

(async () =>
  await prisma.user.create({
    data: {
      name: "Natalia",
      email: "nat@nat.nat",
      password: "123456",
      birthDate: new Date("1995-02-03"),
    },
  }))();
