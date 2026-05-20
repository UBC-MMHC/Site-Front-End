import HomeHero from "@/components/home/HomeHero";
import VisionSection from "@/components/home/VisionSection";
import PillarsSection from "@/components/home/PillarsSection";
import HomeEventsSection from "@/components/home/HomeEventsSection";
import MembershipCta from "@/components/home/MembershipCta";
import AuthRedirect from "@/components/AuthRedirect";
import { pageShell } from "@/lib/theme";

const HomePage = () => {
	return (
		<AuthRedirect>
			<div className={`scroll-smooth ${pageShell}`}>
				<HomeHero />
				<VisionSection />
				<PillarsSection />
				<HomeEventsSection limit={4} />
				<MembershipCta />
			</div>
		</AuthRedirect>
	);
};

export default HomePage;
