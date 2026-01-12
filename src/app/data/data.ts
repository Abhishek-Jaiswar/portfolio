import { TProject } from "@/src/lib/types/types";
import { generateRandomId } from "@/src/lib/utils/generateId";

export const projectData: TProject[] = [
  {
    id: generateRandomId(),
    title: "Real-time Chat Application",
    description:
      "A scalable real-time chat system built with WebSockets, featuring authentication, one-to-one messaging, message persistence, and online presence tracking.",
    image: "/projects/chat-app.png",
    sourceCodeUrl: "https://github.com/yourusername/chat-app",
    hostedUrl: "https://chatapp.example.com",
  },
  {
    id: generateRandomId(),
    title: "Role-Based Access Control System",
    description:
      "A backend-focused system implementing RBAC and policy-based access control with secure REST APIs, designed for multi-tenant applications.",
    image: "/projects/rbac-system.png",
    sourceCodeUrl: "https://github.com/yourusername/rbac-system",
    hostedUrl: null,
  },
  {
    id: generateRandomId(),
    title: "Project Management Platform",
    description:
      "A full-stack project management system with task workflows, real-time updates, team collaboration, and optimized database queries.",
    image: "/projects/project-manager.png",
    sourceCodeUrl: "https://github.com/yourusername/project-manager",
    hostedUrl: "https://pm.example.com",
  },
  {
    id: generateRandomId(),
    title: "Authentication & Session Service",
    description:
      "A standalone authentication service supporting JWT, refresh tokens, cookie-based auth, and session management for scalable applications.",
    image: null,
    sourceCodeUrl: "https://github.com/yourusername/auth-service",
    hostedUrl: null,
  },
];
