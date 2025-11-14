import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Facebook, Twitter, Linkedin, ArrowLeft } from "lucide-react";
import type { BlogPost } from "@shared/schema";
import { Separator } from "@/components/ui/separator";

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const post = blogPosts?.find((p) => p.slug === slug);
  const relatedPosts = blogPosts?.filter((p) => p.category === post?.category && p.id !== post?.id).slice(0, 3) || [];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-96 w-full mb-8" />
        <div className="max-w-4xl mx-auto space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
        <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
        <Link href="/blog">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Image */}
      <div className="w-full aspect-[21/9] overflow-hidden">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/blog">
            <Button variant="ghost" className="mb-6" data-testid="button-back-to-blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6" data-testid="text-post-title">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <img
                  src={post.authorImage}
                  alt={post.authorName}
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-medium">{post.authorName}</span>
              </div>
              <span>•</span>
              <span>{post.publishedDate}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex gap-2 mb-8">
            <Button variant="outline" size="icon" data-testid="button-share-twitter">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" data-testid="button-share-linkedin">
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" data-testid="button-share-facebook">
              <Facebook className="h-4 w-4" />
            </Button>
          </div>

          <Separator className="mb-8" />

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12" data-testid="text-post-content">
            <p className="text-xl text-muted-foreground mb-8">{post.excerpt}</p>
            <div className="whitespace-pre-wrap">{post.content}</div>
          </div>

          <Separator className="mb-12" />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold font-serif mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <Card className="hover-elevate cursor-pointer h-full" data-testid={`card-related-${relatedPost.id}`}>
                      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                        <img
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader>
                        <Badge className="w-fit mb-2">{relatedPost.category}</Badge>
                        <CardTitle className="font-serif line-clamp-2">{relatedPost.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
