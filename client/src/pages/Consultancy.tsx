import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, GraduationCap, MessageSquare, ArrowRight } from "lucide-react";

export default function Consultancy() {
  const services = [
    {
      icon: Sparkles,
      title: "AI Strategy & Implementation",
      description: "Transform your business with cutting-edge AI solutions tailored to your needs",
      deliverables: [
        "AI readiness assessment",
        "Custom AI strategy roadmap",
        "Implementation support",
        "Team training and onboarding",
      ],
    },
    {
      icon: TrendingUp,
      title: "Financial Planning & Banking Solutions",
      description: "Optimize your financial operations with expert guidance and innovative solutions",
      deliverables: [
        "Financial process optimization",
        "Banking technology integration",
        "Risk management frameworks",
        "Compliance and security review",
      ],
    },
    {
      icon: GraduationCap,
      title: "Corporate Training Programs",
      description: "Upskill your team with customized training programs in AI and finance",
      deliverables: [
        "Customized training curriculum",
        "Hands-on workshops",
        "Ongoing mentorship",
        "Certification programs",
      ],
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Initial Consultation",
      description: "Free 15-minute call to understand your needs and challenges",
    },
    {
      number: "02",
      title: "Needs Assessment",
      description: "In-depth analysis of your current processes and goals",
    },
    {
      number: "03",
      title: "Custom Proposal",
      description: "Tailored solution with clear deliverables and timeline",
    },
    {
      number: "04",
      title: "Implementation & Support",
      description: "Hands-on execution with continuous guidance and support",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary via-secondary to-foreground text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-serif" data-testid="text-consultancy-title">
              Expert AI & Finance Consultancy
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              Schedule a call to discuss custom solutions tailored to your business needs
            </p>
            <Button size="lg" variant="outline" className="bg-background/10 backdrop-blur-sm hover:bg-background/20 border-primary-foreground/30 text-primary-foreground" data-testid="button-hero-schedule">
              Schedule Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive consulting services to transform your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover-elevate">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold mb-2">Typical Deliverables:</p>
                    <ul className="space-y-2">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="outline" className="w-full mt-6" data-testid={`button-service-${index}`}>
                    Contact for Pricing
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Our Process</h2>
            <p className="text-muted-foreground">A proven approach to delivering results</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="h-full">
                  <CardHeader>
                    <Badge className="w-fit mb-2 text-lg px-3 py-1">{step.number}</Badge>
                    <CardTitle className="font-serif text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary via-secondary to-foreground text-primary-foreground border-0">
            <CardContent className="p-12">
              <div className="max-w-2xl mx-auto text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold font-serif">
                  Interested? Let's Talk
                </h2>
                <p className="text-lg text-primary-foreground/90">
                  Schedule a free consultation call to discuss how we can help transform your business
                </p>
                <Button size="lg" variant="outline" className="bg-background/10 backdrop-blur-sm hover:bg-background/20 border-primary-foreground/30 text-primary-foreground gap-2" data-testid="button-cta-call">
                  <MessageSquare className="h-5 w-5" />
                  Call Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
