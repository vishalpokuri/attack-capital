import { Stethoscope } from "lucide-react";
import React from "react";

type LogoProps = {
  size?: "small" | "medium" | "large";
};

function Logo({ size = "medium" }: LogoProps) {
  const sizeClasses = {
    small: {
      icon: "h-6 w-6",
      text: "text-xl",
    },
    medium: {
      icon: "h-8 w-8",
      text: "text-2xl",
    },
    large: {
      icon: "h-10 w-10",
      text: "text-3xl",
    },
  };

  return (
    <div className="flex items-center space-x-2">
      <Stethoscope className={`${sizeClasses[size].icon} text-primary`} />
      <span className={`${sizeClasses[size].text} font-bold text-foreground`}>
        MedAI
      </span>
    </div>
  );
}

export default Logo;
