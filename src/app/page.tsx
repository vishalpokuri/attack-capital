import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Logo from "@/components/global/Logo";

export default function LandingPage() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-background font-manrope">
      {/* Header */}
      <LocalHeader />

      {/* Hero Section */}
      <div className="container mx-auto px-6 h-[calc(100vh-80px)]">
        <div className="flex items-center gap-8 h-full">
          <HeroSection />
        </div>
      </div>
    </div>
  );
}

function LocalHeader() {
  return (
    <header className="bg-background">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo size="medium" />

          <nav className="flex items-center space-x-8">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/auth">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <div className="w-full relative h-full">
      <div className="rounded-2xl overflow-hidden shadow-2xl bg-card relative h-full">
        <Image
          src="/HeroSection.png"
          alt="Medical AI Interface"
          priority
          fill
          className="object-cover rounded-2xl "
          quality={100}
        />

        {/* Text content over image */}
        <div className="absolute inset-0 flex items-center justify-start p-12">
          <div className="text-center max-w-lg flex items-center flex-col mx-auto">
            <h1 className="text-5xl font-bold mb-4 text-black/90 leading-tight">
              Transforming <span className="text-rose-600">Healthcare</span>{" "}
              with{" "}
              <span className="text-rose-600">Artificial Intelligence</span>
            </h1>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Empowering your health journey with cutting-edge AI solutions for
              better diagnosis, personalized care, and faster results.
            </p>

            <div className="flex gap-4 font-semibold">
              <Button
                size="lg"
                className="text-lg  px-6 py-3 bg-rose-500 hover:bg-rose-600"
                asChild
              >
                <Link href="/dashboard">
                  Start Your Health Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-6 py-3 border-white text-gray-700 hover:bg-white hover:text-black"
                asChild
              >
                <Link href="/auth">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
