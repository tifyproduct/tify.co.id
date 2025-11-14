import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog Posts
  app.get("/api/blog", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const posts = await storage.getBlogPosts(category);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  // Courses
  app.get("/api/courses", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const format = req.query.format as string | undefined;
      const sortBy = req.query.sortBy as string | undefined;
      const courses = await storage.getCourses(category, format, sortBy);
      res.json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });

  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  // Team Members
  app.get("/api/team", async (req, res) => {
    try {
      const teamMembers = await storage.getTeamMembers();
      res.json(teamMembers);
    } catch (error) {
      console.error("Error fetching team members:", error);
      res.status(500).json({ error: "Failed to fetch team members" });
    }
  });

  // Chat Webhook - Forward to n8n
  app.post("/api/chat/send", async (req, res) => {
    try {
      const result = chatMessageSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ error: "Invalid message format" });
      }

      const { message, pageSource, timestamp } = result.data;

      // Get n8n webhook config from environment variables
      const n8nUrl = process.env.N8N_WEBHOOK_URL;
      const authHeader = process.env.N8N_AUTH_HEADER;

      if (!n8nUrl || !authHeader) {
        console.warn("n8n webhook not configured - skipping webhook call");
        return res.status(200).json({
          message: "Thank you for your message! Our team will get back to you shortly.",
        });
      }

      const response = await fetch(n8nUrl, {
        method: "POST",
        headers: {
          "Authorization": authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          page_source: pageSource,
          timestamp,
        }),
      });

      if (!response.ok) {
        console.error("n8n webhook error:", response.statusText);
        return res.status(200).json({
          message: "Thank you for your message! Our team will get back to you shortly.",
        });
      }

      const n8nResponse = await response.json().catch(() => ({}));
      
      res.json({
        message: n8nResponse.message || "Thank you for your message! Our team will get back to you shortly.",
      });
    } catch (error) {
      console.error("Error forwarding chat message:", error);
      // Return success to user even if webhook fails
      res.status(200).json({
        message: "Thank you for your message! Our team will get back to you shortly.",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
