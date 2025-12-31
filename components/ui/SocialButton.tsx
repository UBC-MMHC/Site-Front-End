import { SocialIcon } from "react-social-icons";

type SocialButtonSize = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<SocialButtonSize, number> = {
  sm: 40,
  md: 48,
  lg: 64,
  xl: 72,
};

interface SocialLinkIconProps {
  network: string;
  url: string;
  size?: SocialButtonSize;
}

const SocialLinkIcon = ({ network, url, size = "xl" }: SocialLinkIconProps) => {
  return (
    <SocialIcon
      network={network}
      href={url}
      fgColor="#FFFFFF"
      bgColor="transparent"
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
      }}
      target="_blank"
      rel="noopener noreferrer"
    />
  );
};

export default SocialLinkIcon;
