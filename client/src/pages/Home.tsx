import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Briefcase, Sparkles, ArrowRight, Star } from "lucide-react";
import type { BlogPost, Testimonial } from "@shared/schema";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  const { data: blogPosts, isLoading: blogLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const { data: testimonials, isLoading: testimonialsLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const latestPosts = blogPosts?.slice(0, 3) || [];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-foreground text-primary-foreground py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-tight" data-testid="text-hero-title">
              Your Digital AI Partner
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90" data-testid="text-hero-subtitle">
              Transforming businesses through AI consultancy, education, and innovative solutions
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link href="/consultancy">
                <Button size="lg" variant="outline" className="bg-background/10 backdrop-blur-sm hover:bg-background/20 border-primary-foreground/30 text-primary-foreground" data-testid="button-hero-consultation">
                  Book Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button size="lg" variant="outline" className="bg-background/10 backdrop-blur-sm hover:bg-background/20 border-primary-foreground/30 text-primary-foreground" data-testid="button-hero-courses">
                  Explore Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-serif">Products</CardTitle>
                <CardDescription>
                  AI-powered finance & parenting solutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Transform your daily life with our innovative Personal Finance Management and Kids & Parenting applications powered by cutting-edge AI technology.
                </p>
                <Link href="/products">
                  <Button variant="ghost" className="w-full" data-testid="button-service-products">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-serif">Courses</CardTitle>
                <CardDescription>
                  Offline, online, and recorded learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Master AI, finance, and parenting skills through our comprehensive courses taught by industry experts. Choose your preferred learning format.
                </p>
                <Link href="/courses">
                  <Button variant="ghost" className="w-full" data-testid="button-service-courses">
                    Browse Courses
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-serif">Consultancy</CardTitle>
                <CardDescription>
                  Expert guidance for AI, finance, banking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Get personalized consulting services to implement AI strategies, optimize financial operations, and transform your business processes.
                </p>
                <Link href="/consultancy">
                  <Button variant="ghost" className="w-full" data-testid="button-service-consultancy">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Latest Insights</h2>
            <p className="text-muted-foreground">Stay updated with our latest articles on AI, finance, and parenting</p>
          </div>

          {blogLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <Skeleton className="h-48 w-full rounded-t-lg" />
                  <CardHeader>
                    <Skeleton className="h-6 w-24 mb-2" />
                    <Skeleton className="h-6 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="hover-elevate cursor-pointer h-full" data-testid={`card-blog-${post.id}`}>
                    <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <Badge className="w-fit mb-2">{post.category}</Badge>
                      <CardTitle className="font-serif line-clamp-2">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <img
                          src={post.authorImage}
                          alt={post.authorName}
                          className="w-6 h-6 rounded-full"
                        />
                        <span>{post.authorName}</span>
                        <span>•</span>
                        <span>{post.readTime} min read</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link href="/blog">
              <Button variant="outline" data-testid="button-view-all-blog">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground">Trusted by businesses and individuals worldwide</p>
          </div>

          {testimonialsLoading ? (
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <Skeleton className="h-24 w-full mb-4" />
                  <Skeleton className="h-6 w-32" />
                </CardContent>
              </Card>
            </div>
          ) : testimonials && testimonials.length > 0 ? (
            <div className="max-w-4xl mx-auto">
              <Carousel className="w-full">
                <CarouselContent>
                  {testimonials.map((testimonial) => (
                    <CarouselItem key={testimonial.id}>
                      <Card>
                        <CardContent className="p-8">
                          <div className="flex gap-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                            ))}
                          </div>
                          <p className="text-lg mb-6 italic">{testimonial.content}</p>
                          <div className="flex items-center gap-4">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-12 h-12 rounded-full"
                            />
                            <div>
                              <p className="font-semibold">{testimonial.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {testimonial.role} at {testimonial.company}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          ) : null}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-secondary to-foreground text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold font-serif">
              Ready to transform your business?
            </h2>
            <p className="text-lg text-primary-foreground/90">
              Schedule a free consultation with our experts and discover how AI can revolutionize your operations
            </p>
            <Link href="/consultancy">
              <Button size="lg" variant="outline" className="bg-background/10 backdrop-blur-sm hover:bg-background/20 border-primary-foreground/30 text-primary-foreground" data-testid="button-cta-consultation">
                Book Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
