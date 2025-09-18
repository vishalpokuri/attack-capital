import Divider from "@/components/auth/Divider";
import SocialTray from "@/components/auth/SocialTray";
import AuthPageFooter from "@/components/auth/AuthPageFooter";
import AuthHeaderText from "@/components/auth/AuthHeaderText";
import LoginComponent from "@/components/auth/LoginComponent";
import Logo from "@/components/global/Logo";
import ReviewCard from "@/components/auth/ReviewCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function Login() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-background font-manrope">
      <div className="w-full h-[95vh] overflow-hidden bg-background">
        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="flex h-full">
          {/* Left Section - Review Card */}
          <ReviewCard />

          {/* Right Section - Login Form */}
          <div className="w-1/2 flex flex-col items-center justify-center px-16 h-[90vh] my-auto">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Logo />
            </div>
            <div className="w-full max-w-lg space-y-6 flex-1 flex flex-col justify-center">
              {/* Welcome Header */}
              <AuthHeaderText />

              {/* Login Form */}
              <LoginComponent />

              {/* Divider */}
              <Divider />

              {/* Social Login Icons */}
              <SocialTray />
            </div>
            {/* Sign Up Link */}
            <AuthPageFooter type="login" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
