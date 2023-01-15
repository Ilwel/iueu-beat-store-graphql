import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      username: "ilwel",
      password: await hash(process.env.ADMIN_PASSWORD as string, 10),
      instagram: "_ilwel",
      youtubeLink: "https://www.youtube.com/@Ilwel/featured",
      spotifyLink: "https://open.spotify.com/artist/0pZF9D0uMuZpBMoBjWpo4F?si=irLkFk-GTYC6qJ_46cWkSQ",
      isAdmin: true
    }
  })
}

main()
  .catch((e) => {

    console.log(`❌ An error ocurred: ${e}`)
    process.exit(1)

  })
  .finally(() => {

    prisma.$disconnect()

  })