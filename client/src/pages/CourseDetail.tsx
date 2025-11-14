import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, User, Check } from "lucide-react";
import type { Course } from "@shared/schema";
import { Separator } from "@/components/ui/separator";

export default function CourseDetail() {
  const [, params] = useRoute("/courses/:slug");
  const slug = params?.slug;

  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const course = courses?.find((c) => c.slug === slug);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-96 w-full mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Course not found</h1>
        <p className="text-muted-foreground">The course you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex gap-2 mb-4 flex-wrap">
              <Badge variant="outline">{course.format}</Badge>
              <Badge>{course.category}</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4" data-testid="text-course-title">
              {course.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {course.description}
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{course.instructorName}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Course Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{course.overview}</p>
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {course.learningPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Modules */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Course Modules</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.modules.map((module, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-sm font-mono text-muted-foreground">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                      <span>{module}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold">
                  {course.price === 0 ? "Free" : `Rp ${course.price.toLocaleString()}`}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" size="lg" data-testid="button-interested">
                  Interested in this course?
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Click to chat with us about enrollment
                </p>
              </CardContent>
            </Card>

            {/* Instructor */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Instructor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={course.instructorImage}
                    alt={course.instructorName}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{course.instructorName}</p>
                    <p className="text-sm text-muted-foreground">{course.instructorCredentials}</p>
                  </div>
                </div>
                <Separator />
                <p className="text-sm text-muted-foreground">{course.instructorBio}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
