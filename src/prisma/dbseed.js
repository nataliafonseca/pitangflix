import prismaClient from "./index.js";
import { hash } from "bcrypt";

const prisma = prismaClient;

(async () => {
  await prisma.movie.createMany({
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

  const movie = await prisma.movie.findFirst();

  await prisma.session.create({
    data: {
      sessionDate: new Date(),
      room: "IMAX",
      movie: {
        connect: { id: movie.id },
      },
    },
  });

  await prisma.user.create({
    data: {
      name: "Natalia",
      email: "nat@nat.nat",
      password: await hash("123456", 10),
      birthDate: new Date("1995-02-03"),
    },
  });
})();
