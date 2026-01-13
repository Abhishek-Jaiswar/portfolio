const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

async function main() {
    // Clear existing
    await prisma.project.deleteMany({});
    await prisma.blog.deleteMany({});
    await prisma.caseStudy.deleteMany({});

    console.log("Seeding database...");

    // Seed Projects
    await prisma.project.create({
        data: {
            title: "Lume Chat",
            description: "A real-time AI-integrated chatting application with quoting and reply features.",
            hostedUrl: "https://lume-chat.vercel.app",
            sourceCodeUrl: "https://github.com/Abhishek-Jaiswar/lume-chat",
            image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=2000&auto=format&fit=crop"
        }
    });

    // Seed Blog
    await prisma.blog.create({
        data: {
            title: "How to use WebSockets in Next.js",
            slug: "websockets-in-nextjs",
            excerpt: "Learn how to implement real-time features using WebSockets in a Next.js application.",
            content: "Full content here...",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2000&auto=format&fit=crop"
        }
    });

    // Seed Case Study
    await prisma.caseStudy.create({
        data: {
            title: "Eco-Fleet Logistics Optimization",
            description: "A comprehensive restructuring of a massive logistics platform.",
            challenge: "Managing thousands of real-time route changes.",
            solution: "Implemented a distributed queue system with Go.",
            outcome: "40% reduction in route delays.",
            image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop"
        }
    });

    console.log("Seeding complete.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
