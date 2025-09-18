interface ButtonProps {
  title: string;
  classes?: string;
  padding?: string;
  rounded?: string;
  font?: string;
  text?: string;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5 text-white mr-2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  );
}

function RoseGradientButton({
  title,
  classes = "",
  padding = "px-5 py-2",
  rounded = "rounded-full",
  font = "font-reg",
  text = "text-sm",
  loading = false,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center disabled:opacity-50 ${classes} ${padding} ${rounded} ${font} ${text}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading && <Spinner />}
      <span>{title}</span>
    </button>
  );
}

export default RoseGradientButton;
