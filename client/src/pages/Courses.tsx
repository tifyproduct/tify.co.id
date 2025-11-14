import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, User } from "lucide-react";
import type { Course } from "@shared/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Courses() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [formatFilter, setFormatFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses", categoryFilter, formatFilter, sortBy],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (categoryFilter && categoryFilter !== "All") params.append("category", categoryFilter);
      if (formatFilter && formatFilter !== "All") params.append("format", formatFilter);
      if (sortBy) params.append("sortBy", sortBy);
      
      const url = `/api/courses${params.toString() ? `?${params.toString()}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch courses");
      return response.json();
    },
  });

  const categories = ["All", "Parenting", "Financial Literacy", "Crypto", "Macro Economics"];
  const formats = ["All", "Online Live", "Offline", "Recorded"];

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4" data-testid="text-courses-title">
            Expert-Led Courses
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Master AI, finance, and parenting skills with our comprehensive courses
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-[200px]">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger data-testid="select-category-filter">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <Select value={formatFilter} onValueChange={setFormatFilter}>
              <SelectTrigger data-testid="select-format-filter">
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                {formats.map((format) => (
                  <SelectItem key={format} value={format}>
                    {format}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger data-testid="select-sort">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price">Price</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Courses Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <Skeleton className="h-48 w-full rounded-t-lg" />
                <CardHeader>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link key={course.id} href={`/courses/${course.slug}`}>
                <Card className="hover-elevate cursor-pointer h-full flex flex-col" data-testid={`card-course-${course.id}`}>
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="flex-1">
                    <div className="flex gap-2 mb-2 flex-wrap">
                      <Badge variant="outline">{course.format}</Badge>
                      <Badge>{course.category}</Badge>
                    </div>
                    <CardTitle className="font-serif line-clamp-2">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{course.instructorName}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold">
                        {course.price === 0 ? "Free" : `Rp ${course.price.toLocaleString()}`}
                      </p>
                      <Button variant="outline" size="sm" data-testid={`button-view-course-${course.id}`}>
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No courses found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
