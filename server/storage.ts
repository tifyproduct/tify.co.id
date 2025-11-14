import {
  type BlogPost,
  type InsertBlogPost,
  type Course,
  type InsertCourse,
  type Product,
  type InsertProduct,
  type Testimonial,
  type InsertTestimonial,
  type TeamMember,
  type InsertTeamMember,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Blog Posts
  getBlogPosts(category?: string): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;

  // Courses
  getCourses(category?: string, format?: string, sortBy?: string): Promise<Course[]>;
  getCourseBySlug(slug: string): Promise<Course | undefined>;

  // Products
  getProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;

  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;

  // Team Members
  getTeamMembers(): Promise<TeamMember[]>;
}

export class MemStorage implements IStorage {
  private blogPosts: Map<string, BlogPost>;
  private courses: Map<string, Course>;
  private products: Map<string, Product>;
  private testimonials: Map<string, Testimonial>;
  private teamMembers: Map<string, TeamMember>;

  constructor() {
    this.blogPosts = new Map();
    this.courses = new Map();
    this.products = new Map();
    this.testimonials = new Map();
    this.teamMembers = new Map();
    
    this.seedData();
  }

  private seedData() {
    // Seed Blog Posts
    const blogPosts: BlogPost[] = [
      {
        id: randomUUID(),
        title: "The Future of AI in Financial Planning",
        slug: "future-of-ai-financial-planning",
        excerpt: "Discover how artificial intelligence is revolutionizing personal finance management and investment strategies for the modern era.",
        content: "Artificial intelligence is transforming the financial planning landscape in unprecedented ways. From automated portfolio management to predictive analytics, AI is making sophisticated financial strategies accessible to everyone.\n\nKey developments include:\n\n1. Personalized Investment Recommendations\nAI algorithms can analyze your financial goals, risk tolerance, and market conditions to provide tailored investment advice.\n\n2. Real-time Financial Monitoring\nModern AI systems can track your spending patterns and alert you to potential issues before they become problems.\n\n3. Predictive Analytics\nMachine learning models can forecast market trends and help you make more informed financial decisions.\n\nThe future of financial planning is here, and it's powered by AI.",
        category: "Financial Literacy",
        authorName: "Sarah Johnson",
        authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
        featuredImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
        publishedDate: "2025-11-10",
        readTime: 8,
      },
      {
        id: randomUUID(),
        title: "Raising Tech-Savvy Kids in a Digital World",
        slug: "raising-tech-savvy-kids",
        excerpt: "Learn effective strategies to guide your children's technology use while fostering healthy digital habits and creativity.",
        content: "In today's digital age, raising children requires a new set of parenting skills. Technology is ubiquitous, and rather than fighting it, we need to embrace it thoughtfully.\n\nPractical strategies for digital parenting:\n\n1. Set Clear Boundaries\nEstablish screen time limits and tech-free zones in your home.\n\n2. Lead by Example\nModel healthy technology use through your own behavior.\n\n3. Encourage Creative Use\nHelp children use technology for creation, not just consumption.\n\n4. Maintain Open Communication\nTalk regularly about online experiences and digital citizenship.\n\n5. Use Parental Controls Wisely\nImplement age-appropriate monitoring without being overly restrictive.\n\nThe goal is to raise children who can navigate the digital world safely and productively.",
        category: "Parenting",
        authorName: "Michael Chen",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        featuredImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
        publishedDate: "2025-11-08",
        readTime: 6,
      },
      {
        id: randomUUID(),
        title: "Understanding Cryptocurrency: A Beginner's Guide",
        slug: "cryptocurrency-beginners-guide",
        excerpt: "Demystifying blockchain, Bitcoin, and the world of digital currencies for those just starting their crypto journey.",
        content: "Cryptocurrency has moved from the fringes to mainstream financial discussions. But what exactly is it, and should you invest?\n\nBasic Concepts:\n\n1. Blockchain Technology\nA decentralized ledger that records all transactions across a network.\n\n2. Bitcoin and Altcoins\nBitcoin is the first cryptocurrency, but thousands of alternatives exist.\n\n3. Digital Wallets\nSecure storage for your cryptocurrency holdings.\n\n4. Mining and Validation\nHow new coins are created and transactions are verified.\n\nRisks and Considerations:\n- High volatility\n- Regulatory uncertainty\n- Security concerns\n- Environmental impact\n\nBefore investing in cryptocurrency, educate yourself thoroughly and only invest what you can afford to lose.",
        category: "Crypto",
        authorName: "David Martinez",
        authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
        featuredImage: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800",
        publishedDate: "2025-11-05",
        readTime: 10,
      },
      {
        id: randomUUID(),
        title: "Global Economic Trends to Watch in 2025",
        slug: "global-economic-trends-2025",
        excerpt: "An analysis of macroeconomic indicators and trends that will shape financial markets and business strategies this year.",
        content: "As we navigate through 2025, several macroeconomic trends are shaping the global economy.\n\nKey Trends:\n\n1. Interest Rate Normalization\nCentral banks worldwide are adjusting rates in response to inflation dynamics.\n\n2. AI-Driven Productivity\nArtificial intelligence is creating new economic efficiencies across industries.\n\n3. Green Energy Transition\nMassive capital flows into sustainable energy infrastructure.\n\n4. Geopolitical Shifts\nChanging trade relationships and supply chain restructuring.\n\n5. Digital Currency Adoption\nCentral bank digital currencies gaining traction.\n\nWhat this means for you:\n- Diversify investments across asset classes\n- Stay informed about technological disruptions\n- Consider sustainability in investment decisions\n- Monitor inflation and interest rate trends\n\nUnderstanding these macro trends helps position your portfolio for success.",
        category: "Macro Economics",
        authorName: "Emma Williams",
        authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
        featuredImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
        publishedDate: "2025-11-01",
        readTime: 12,
      },
      {
        id: randomUUID(),
        title: "Building Emotional Intelligence in Children",
        slug: "building-emotional-intelligence-children",
        excerpt: "Practical techniques to help your children develop emotional awareness, empathy, and resilience from an early age.",
        content: "Emotional intelligence is one of the most important skills children can develop. It affects their relationships, academic success, and overall well-being.\n\nFive Pillars of Emotional Intelligence:\n\n1. Self-Awareness\nHelp children recognize and name their emotions.\n\n2. Self-Regulation\nTeach coping strategies for managing difficult feelings.\n\n3. Motivation\nEncourage intrinsic motivation and goal-setting.\n\n4. Empathy\nFoster understanding of others' feelings and perspectives.\n\n5. Social Skills\nPractice communication and conflict resolution.\n\nPractical Activities:\n- Emotion charts and feelings vocabulary\n- Role-playing scenarios\n- Mindfulness exercises\n- Reading books about emotions\n- Family discussions about feelings\n\nBy investing in emotional intelligence, you're giving your children tools for lifelong success.",
        category: "Parenting",
        authorName: "Lisa Anderson",
        authorImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
        featuredImage: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800",
        publishedDate: "2025-10-28",
        readTime: 7,
      },
      {
        id: randomUUID(),
        title: "Diversification Strategies for Your Investment Portfolio",
        slug: "diversification-strategies-investment-portfolio",
        excerpt: "Learn how to protect your wealth by spreading risk across different asset classes, sectors, and geographic regions.",
        content: "The old adage 'don't put all your eggs in one basket' is fundamental to investment success. Diversification is your best defense against market volatility.\n\nDiversification Dimensions:\n\n1. Asset Class Diversification\n- Stocks\n- Bonds\n- Real Estate\n- Commodities\n- Cash equivalents\n\n2. Geographic Diversification\nSpread investments across different countries and regions.\n\n3. Sector Diversification\nInvest in various industries to reduce sector-specific risk.\n\n4. Time Diversification\nDollar-cost averaging spreads investments over time.\n\nBuilding Your Diversified Portfolio:\n- Assess your risk tolerance\n- Define investment timeline\n- Rebalance regularly\n- Consider low-cost index funds\n- Don't over-diversify\n\nRemember: diversification doesn't guarantee profits but helps manage risk.",
        category: "Financial Literacy",
        authorName: "Robert Kim",
        authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
        featuredImage: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800",
        publishedDate: "2025-10-25",
        readTime: 9,
      },
    ];

    blogPosts.forEach(post => this.blogPosts.set(post.id, post));

    // Seed Courses
    const courses: Course[] = [
      {
        id: randomUUID(),
        title: "AI-Powered Financial Planning Masterclass",
        slug: "ai-financial-planning-masterclass",
        description: "Master the intersection of artificial intelligence and personal finance management",
        category: "Financial Literacy",
        format: "Online Live",
        price: 1500000,
        duration: "8 weeks",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
        instructorName: "Dr. Sarah Johnson",
        instructorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
        instructorBio: "Dr. Johnson is a financial technology expert with over 15 years of experience in AI and fintech innovation.",
        instructorCredentials: "PhD in Financial Technology, MIT",
        overview: "This comprehensive course teaches you how to leverage AI tools for smarter financial planning, investment strategies, and wealth management. You'll learn to use cutting-edge AI platforms to analyze markets, automate portfolio management, and make data-driven financial decisions.",
        learningPoints: [
          "Understanding AI algorithms for financial analysis",
          "Implementing automated portfolio management",
          "Using predictive analytics for investment decisions",
          "Risk assessment with machine learning",
          "Building personalized financial planning systems",
        ],
        modules: [
          "Introduction to AI in Finance",
          "Data Analysis and Market Prediction",
          "Automated Trading Systems",
          "Portfolio Optimization Techniques",
          "Risk Management with AI",
          "Personal Finance Automation",
          "Advanced Analytics and Reporting",
          "Final Project: Building Your AI Financial Advisor",
        ],
        popularity: 95,
      },
      {
        id: randomUUID(),
        title: "Modern Parenting in the Digital Age",
        slug: "modern-parenting-digital-age",
        description: "Navigate the challenges of raising children in a technology-driven world",
        category: "Parenting",
        format: "Offline",
        price: 800000,
        duration: "4 weeks",
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
        instructorName: "Michael Chen",
        instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        instructorBio: "Michael is a child psychologist and parenting coach specializing in technology and child development.",
        instructorCredentials: "Licensed Child Psychologist, Parenting Coach",
        overview: "Learn evidence-based strategies for raising emotionally intelligent, tech-savvy children. This course covers digital wellness, screen time management, online safety, and fostering creativity in a digital world.",
        learningPoints: [
          "Setting healthy technology boundaries",
          "Teaching digital citizenship",
          "Balancing screen time with real-world activities",
          "Protecting children online",
          "Fostering creativity and critical thinking",
        ],
        modules: [
          "Understanding Child Development in Digital Era",
          "Screen Time Guidelines by Age",
          "Online Safety and Privacy",
          "Digital Citizenship Education",
          "Balancing Technology and Play",
          "Managing Gaming and Social Media",
          "Communication Strategies",
          "Building Family Digital Wellness Plans",
        ],
        popularity: 88,
      },
      {
        id: randomUUID(),
        title: "Cryptocurrency Investment Fundamentals",
        slug: "cryptocurrency-investment-fundamentals",
        description: "From blockchain basics to advanced crypto trading strategies",
        category: "Crypto",
        format: "Recorded",
        price: 0,
        duration: "6 weeks",
        thumbnail: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600",
        instructorName: "David Martinez",
        instructorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
        instructorBio: "David is a blockchain consultant and crypto investor with expertise in digital asset management.",
        instructorCredentials: "Certified Blockchain Expert, Financial Analyst",
        overview: "This free introductory course demystifies cryptocurrency and blockchain technology. Learn the fundamentals of Bitcoin, Ethereum, and other digital assets, understand blockchain mechanics, and explore investment strategies.",
        learningPoints: [
          "Blockchain technology fundamentals",
          "Major cryptocurrencies and their use cases",
          "Setting up and securing digital wallets",
          "Basic trading strategies",
          "Risk management in crypto investing",
        ],
        modules: [
          "Introduction to Blockchain",
          "Bitcoin and Major Cryptocurrencies",
          "Digital Wallets and Security",
          "Exchanges and Trading Platforms",
          "Technical Analysis Basics",
          "Fundamental Analysis of Crypto Projects",
          "DeFi and NFTs Overview",
          "Building Your Crypto Portfolio",
        ],
        popularity: 120,
      },
      {
        id: randomUUID(),
        title: "Macroeconomics for Investors",
        slug: "macroeconomics-for-investors",
        description: "Understand global economic forces that drive investment markets",
        category: "Macro Economics",
        format: "Online Live",
        price: 2000000,
        duration: "10 weeks",
        thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600",
        instructorName: "Dr. Emma Williams",
        instructorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
        instructorBio: "Dr. Williams is an economist specializing in global markets and investment strategy.",
        instructorCredentials: "PhD Economics, Harvard University",
        overview: "Gain deep insights into macroeconomic indicators, central bank policies, and global economic trends. Learn to interpret economic data and make informed investment decisions based on macro analysis.",
        learningPoints: [
          "Understanding GDP, inflation, and employment data",
          "Central bank policies and monetary systems",
          "Global trade and currency markets",
          "Economic cycles and market timing",
          "Geopolitical factors in investing",
        ],
        modules: [
          "Macroeconomic Indicators Overview",
          "Monetary Policy and Central Banking",
          "Fiscal Policy and Government Impact",
          "International Trade and Exchange Rates",
          "Economic Cycles and Business Trends",
          "Inflation and Interest Rate Analysis",
          "Geopolitical Risk Assessment",
          "Global Market Integration",
          "Recession Indicators and Protection",
          "Building Macro-Informed Portfolios",
        ],
        popularity: 72,
      },
      {
        id: randomUUID(),
        title: "Positive Discipline Techniques",
        slug: "positive-discipline-techniques",
        description: "Effective, respectful approaches to guiding children's behavior",
        category: "Parenting",
        format: "Offline",
        price: 600000,
        duration: "3 weeks",
        thumbnail: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600",
        instructorName: "Lisa Anderson",
        instructorImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
        instructorBio: "Lisa is a certified Positive Discipline trainer and family therapist with 20 years of experience.",
        instructorCredentials: "Certified Positive Discipline Trainer, LMFT",
        overview: "Learn proven techniques for raising responsible, respectful children without punishment or permissiveness. This course teaches the principles of positive discipline, effective communication, and problem-solving skills.",
        learningPoints: [
          "Positive discipline principles and philosophy",
          "Effective communication with children",
          "Setting clear boundaries with kindness",
          "Problem-solving and conflict resolution",
          "Building strong parent-child relationships",
        ],
        modules: [
          "Understanding Positive Discipline",
          "Encouragement vs. Praise",
          "Natural and Logical Consequences",
          "Family Meetings and Routines",
          "Age-Appropriate Expectations",
          "Handling Power Struggles",
          "Time-Out vs. Time-In",
          "Putting It All Together",
        ],
        popularity: 65,
      },
    ];

    courses.forEach(course => this.courses.set(course.id, course));

    // Seed Products
    const products: Product[] = [
      {
        id: randomUUID(),
        name: "Personal Finance Management",
        slug: "finance",
        description: "AI-powered personal finance management application that helps you track expenses, manage budgets, and achieve your financial goals.",
        demoVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        freeTier: "Basic budgeting, 1 account sync, Monthly reports",
        advancedTier: "Basic budgeting, 1 account sync, Monthly reports, Unlimited accounts, AI insights, Investment tracking, Bill reminders, Custom categories, Export data",
        advancedPrice: 250000,
        enterpriseTier: "Basic budgeting, 1 account sync, Monthly reports, Unlimited accounts, AI insights, Investment tracking, Bill reminders, Custom categories, Export data, White-label solution, API access, Custom integrations, Dedicated support, Priority updates",
      },
      {
        id: randomUUID(),
        name: "Kids & Parenting Application",
        slug: "parenting",
        description: "Comprehensive parenting companion app with development tracking, activity suggestions, and expert guidance for raising happy, healthy children.",
        demoVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        freeTier: "Basic development tracking, 1 child profile, Weekly tips",
        advancedTier: "Basic development tracking, 1 child profile, Weekly tips, Unlimited child profiles, AI parenting assistant, Activity library, Behavior tracking, Screen time management, Milestone alerts",
        advancedPrice: 250000,
        enterpriseTier: "Basic development tracking, 1 child profile, Weekly tips, Unlimited child profiles, AI parenting assistant, Activity library, Behavior tracking, Screen time management, Milestone alerts, School integration, Multi-family access, Custom content, Dedicated support, Advanced analytics",
      },
    ];

    products.forEach(product => this.products.set(product.id, product));

    // Seed Testimonials
    const testimonials: Testimonial[] = [
      {
        id: randomUUID(),
        name: "Jennifer Lee",
        role: "CEO",
        company: "TechStart Inc",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
        content: "Tify's AI consultancy transformed our business operations completely. Their expertise in implementing AI solutions helped us increase efficiency by 40% and reduce costs significantly. The team is professional, knowledgeable, and genuinely cares about client success.",
        rating: 5,
      },
      {
        id: randomUUID(),
        name: "Marcus Johnson",
        role: "Product Manager",
        company: "FinanceFlow",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
        content: "The financial planning course exceeded all my expectations. Dr. Johnson's teaching style is engaging and the AI tools we learned are now integral to my daily workflow. This investment in education has paid off many times over.",
        rating: 5,
      },
      {
        id: randomUUID(),
        name: "Priya Patel",
        role: "Parent & Entrepreneur",
        company: "Self-Employed",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
        content: "As a busy entrepreneur and parent, the parenting course helped me find balance and develop better communication with my children. The strategies I learned have made our family life so much more harmonious. Highly recommended!",
        rating: 5,
      },
    ];

    testimonials.forEach(testimonial => this.testimonials.set(testimonial.id, testimonial));

    // Seed Team Members
    const teamMembers: TeamMember[] = [
      {
        id: randomUUID(),
        name: "Dr. Sarah Johnson",
        title: "Chief AI Strategist",
        bio: "Leading AI researcher with 15+ years in financial technology",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
        order: 1,
      },
      {
        id: randomUUID(),
        name: "Michael Chen",
        title: "Head of Education",
        bio: "Child psychologist and parenting expert",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        order: 2,
      },
      {
        id: randomUUID(),
        name: "David Martinez",
        title: "Blockchain Consultant",
        bio: "Cryptocurrency and blockchain technology specialist",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
        order: 3,
      },
      {
        id: randomUUID(),
        name: "Dr. Emma Williams",
        title: "Chief Economist",
        bio: "Global markets expert and investment strategist",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
        order: 4,
      },
    ];

    teamMembers.forEach(member => this.teamMembers.set(member.id, member));
  }

  async getBlogPosts(category?: string): Promise<BlogPost[]> {
    let posts = Array.from(this.blogPosts.values());
    if (category && category !== "All") {
      posts = posts.filter(post => post.category === category);
    }
    return posts.sort((a, b) => 
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    );
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async getCourses(category?: string, format?: string, sortBy?: string): Promise<Course[]> {
    let courses = Array.from(this.courses.values());
    
    if (category && category !== "All") {
      courses = courses.filter(course => course.category === category);
    }
    
    if (format && format !== "All") {
      courses = courses.filter(course => course.format === format);
    }
    
    if (sortBy === "popular") {
      courses.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === "price") {
      courses.sort((a, b) => a.price - b.price);
    } else {
      // Default to newest (by id as proxy)
      courses.sort((a, b) => b.id.localeCompare(a.id));
    }
    
    return courses;
  }

  async getCourseBySlug(slug: string): Promise<Course | undefined> {
    return Array.from(this.courses.values()).find(course => course.slug === slug);
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(product => product.slug === slug);
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values()).sort((a, b) => a.order - b.order);
  }
}

export const storage = new MemStorage();
