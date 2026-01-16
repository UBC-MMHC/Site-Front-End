import Link from "next/link";

type LinkButtonSize = "sm" | "md" | "lg" | "xl";

interface LinkButtonProps {
  link: string;
  text: string;
  size?: LinkButtonSize;
}

const sizeClasses: Record<LinkButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  xl: "px-10 py-5 text-xl",
};

const LinkButton = ({ link, text, size = "md" }: LinkButtonProps) => {
  return (
    <Link href={link}>
      <button
        className={`
          w-full sm:w-auto
          ${sizeClasses[size]}
          bg-primary-bg text-secondary font-semibold
          rounded-md shadow-md
          hover:bg-accent-1
          cursor-pointer transition duration-300
        `}>
        {text}
      </button>
    </Link>
  );
};

export default LinkButton;
