import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, X } from "lucide-react";
import type { Product } from "@shared/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Products() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-12 w-64 mb-8" />
        <div className="space-y-12">
          {[1, 2].map((i) => (
            <div key={i}>
              <Skeleton className="h-8 w-48 mb-6" />
              <Skeleton className="h-96 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const pricingTiers = [
    {
      name: "FREE",
      price: "Rp 0",
      color: "default" as const,
    },
    {
      name: "ADVANCED",
      price: "Rp 250k/mo",
      color: "default" as const,
    },
    {
      name: "ENTERPRISE",
      price: "Custom",
      color: "default" as const,
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4" data-testid="text-products-title">
            AI-Powered Solutions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Transform your daily life with our innovative products designed to simplify finance management and parenting
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-20">
        {products?.map((product, index) => (
          <section key={product.id} id={product.slug}>
            {/* Product Header */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4" data-testid={`text-product-${product.slug}`}>
                {product.name}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                {product.description}
              </p>
            </div>

            {/* Demo Video */}
            {product.demoVideoUrl && (
              <div className="mb-8">
                <Card>
                  <CardContent className="p-0">
                    <div className="aspect-video w-full">
                      <iframe
                        src={product.demoVideoUrl}
                        title={`${product.name} Demo`}
                        className="w-full h-full rounded-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        data-testid={`video-demo-${product.slug}`}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Pricing Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Features</TableHead>
                    {pricingTiers.map((tier) => (
                      <TableHead key={tier.name} className="text-center">
                        <div className="space-y-2">
                          <Badge variant={tier.color}>{tier.name}</Badge>
                          <p className="font-bold text-lg">{tier.price}</p>
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Parse features from product tiers */}
                  {product.freeTier.split(',').map((feature, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{feature.trim()}</TableCell>
                      <TableCell className="text-center">
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        {idx < product.advancedTier.split(',').length ? (
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      </TableCell>
                    </TableRow>
                  ))}
                  {product.advancedTier.split(',').slice(product.freeTier.split(',').length).map((feature, idx) => (
                    <TableRow key={`advanced-${idx}`}>
                      <TableCell className="font-medium">{feature.trim()}</TableCell>
                      <TableCell className="text-center">
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      </TableCell>
                    </TableRow>
                  ))}
                  {product.enterpriseTier.split(',').filter(f => !product.advancedTier.includes(f) && !product.freeTier.includes(f)).map((feature, idx) => (
                    <TableRow key={`enterprise-${idx}`}>
                      <TableCell className="font-medium">{feature.trim()}</TableCell>
                      <TableCell className="text-center">
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-8 justify-center">
              <Button size="lg" data-testid={`button-trial-${product.slug}`}>
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" data-testid={`button-demo-${product.slug}`}>
                Request Enterprise Demo
              </Button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
