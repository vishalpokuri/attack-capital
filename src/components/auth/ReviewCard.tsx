import Image from "next/image";
import { Star, Quote } from "lucide-react";

function ReviewCard() {
  return (
    <div className="w-1/2 h-[90vh] my-auto relative flex items-center justify-center px-16 ">
      <div className="rounded-2xl overflow-hidden shadow-2xl bg-card relative h-full w-full ">
        <Image
          src="/HeroSection.png"
          alt="Professional Doctor"
          fill
          priority
          className="object-cover rounded-2xl"
          quality={100}
        />

        {/* Review Card */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <Quote className="h-6 w-6 text-rose-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  {`MedAI has revolutionized how I manage patient consultations.
                  The AI insights help me provide better, faster diagnoses.`}
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    - Dr. Sarah Chen, Cardiologist
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
