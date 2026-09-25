import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.profile.deleteMany();

  await prisma.profile.create({
    data: {
      name: 'Eduard Tavalbi',
      description: 'Backend Developer',
      github: 'https://github.com/eduardtavalbi',

      skills: {
        create: [
          { name: 'Python' },
          { name: 'FastAPI' },
          { name: 'PostgreSQL' },
          { name: 'SQL' },
          { name: 'SQLAlchemy' },
          { name: 'REST API' },
          { name: 'Git' },
          { name: 'Docker' },
          { name: 'TypeScript' },
          { name: 'NestJS' },
          { name: 'GraphQL' },
          { name: 'Prisma' },
        ],
      },

      experience: {
        create: [
          {
            company: 'X5 / Pyaterochka',
            position: 'Logistics',
            startDate: new Date('2025-05-01'),
            endDate: new Date('2025-07-01'),
            achievements: [
              'Worked with warehouse storage locations and inventory processes',
              'Worked with operational data and internal processes',
            ],
          },
        ],
      },

      projects: {
        create: [
          {
            name: 'Telegram Expense Bot',
            description:
              'Telegram bot for managing expenses, plans and goals with a SQLAlchemy database.',
            url: 'https://github.com/eduardtavalbi',
          },
          {
            name: 'Telegram Crypto Game Automation',
            description:
              'Team project with automation scripts for Telegram games and account management.',
            url: 'https://github.com/eduardtavalbi',
          },
        ],
      },
    },
  });

  console.log('Database seeded successfully');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });