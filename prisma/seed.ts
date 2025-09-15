import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const categories = [
        { name: 'Technology' },
        { name: 'Health' },
        { name: 'Education' },
        { name: 'Sports' },
        { name: 'Entertainment' },
    ];

    for (const category of categories) {
        await prisma.category.create({
            data: category,
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });