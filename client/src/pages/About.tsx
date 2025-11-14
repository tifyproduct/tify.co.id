import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Target, Eye, Heart, Users, Award, TrendingUp } from "lucide-react";
import type { TeamMember } from "@shared/schema";

export default function About() {
  const { data: teamMembers, isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
  });

  const values = [
    {
      icon: Target,
      title: "Mission",
      description: "To empower businesses and individuals with cutting-edge AI solutions that drive innovation and growth.",
    },
    {
      icon: Eye,
      title: "Vision",
      description: "A world where AI technology is accessible and beneficial to everyone, transforming how we work and live.",
    },
    {
      icon: Heart,
      title: "Values",
      description: "Innovation, integrity, and excellence in everything we do. We believe in transparency and client success.",
    },
  ];

  const differentiators = [
    {
      title: "Expert Team",
      description: "Industry veterans with decades of combined experience in AI, finance, and education",
    },
    {
      title: "Proven Track Record",
      description: "Successfully delivered 100+ projects for businesses of all sizes",
    },
    {
      title: "Custom Solutions",
      description: "Tailored approaches that fit your unique needs and challenges",
    },
    {
      title: "Ongoing Support",
      description: "Continuous guidance and support throughout your transformation journey",
    },
  ];

  const stats = [
    { icon: Users, label: "Years in Operation", value: "5+" },
    { icon: Award, label: "Clients Served", value: "150+" },
    { icon: TrendingUp, label: "Courses Delivered", value: "500+" },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary via-secondary to-foreground text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-serif" data-testid="text-about-title">
              About Tify
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              Your trusted partner in AI transformation, financial innovation, and educational excellence
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="hover-elevate">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground">The experts behind Tify's success</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="w-32 h-32 rounded-full mx-auto mb-4" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mx-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : teamMembers && teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <Card key={member.id} className="hover-elevate" data-testid={`card-team-${member.id}`}>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{member.title}</p>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Why Choose Tify */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Why Choose Tify</h2>
            <p className="text-muted-foreground">What sets us apart from the competition</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {differentiators.map((item, index) => (
              <Card key={index} className="hover-elevate">
                <CardHeader>
                  <CardTitle className="font-serif">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <p className="text-4xl font-bold font-serif mb-2" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
                  {stat.value}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
