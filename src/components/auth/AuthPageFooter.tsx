import Link from "next/link";

function AuthPageFooter({ type }: { type: "login" | "register" }) {
  return (
    <div className="text-center h-[20px] flex flex-row space-x-1 font-reg">
      <p className="text-base text-gray-600">
        {type === "login"
          ? "Don't have an account?"
          : "Already have an account?"}
      </p>
      <Link
        href={type === "login" ? "/auth/register" : "/auth/login"}
        className="text-rose-500 hover:text-rose-600 font-semibold transition-colors"
      >
        {type === "login" ? "Sign Up" : "Sign In"}
      </Link>
    </div>
  );
}

export default AuthPageFooter;
