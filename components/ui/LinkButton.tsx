import Link from "next/link";

interface LinkButtonProps {
  link: string;
  text: string;
}

const LinkButton = ({ link, text }: LinkButtonProps) => {
  return (
    <Link href={link}>
      <button className="w-full sm:w-auto px-6 py-3 bg-primary-bg text-secondary font-semibold rounded-md shadow-md hover:bg-accent-1 cursor-pointer transition duration-300">
        {text}
      </button>
    </Link>
  );
};

export default LinkButton;
