import Hero from "@/components/Hero";
import Image from "next/image";
import { EMAIL, INSTAGRAM_URL, LINKEDIN_URL, MEMBERSHIP_SIGNUP_URL } from "@/app/constants";
import EventList from "@/components/events/EventList";
import LinkButton from "@/components/ui/LinkButton";
import NewsletterSignup from "@/components/newsletter/newsletterSignup";
import { SocialIcon } from "react-social-icons";
import SocialButton from "@/components/ui/SocialButton";

const MMHCTag = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-5 w-full max-w-6xl mx-auto px-4 justify-center">
      {/* <div className="relative w-60 h-70 md:w-70 md:h-80 rounded-full overflow-hidden">
        <Image src="/MMHC_cropped_logo.png" alt="UBC MMHC logo" fill className="object-cover" />
      </div> */}

      <div className="flex flex-col gap-5">
        <p className="text-4xl md:text-7xl font-bold text-secondary text-shadow-2xs text-center">
          UBC Men's Mental Health Club
        </p>
        <p className="text-lg md:text-4xl font-bold text-secondary text-shadow-2xs text-center">
          Community. Grit. Growth.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5 mt-4">
          <LinkButton link={MEMBERSHIP_SIGNUP_URL} text="Become a Member" size="lg" />
          <LinkButton link="/events" text="Events" size="lg" />
        </div>

        <div className="flex flex-row justify-center gap-5 mt-4">
          <SocialButton network="instagram" url={INSTAGRAM_URL} />
          <SocialButton network="linkedin" url={LINKEDIN_URL} />
          <SocialButton network="email" url={`mailto:${EMAIL}`} />
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="w-full overflow-x-hidden bg-primary-bg text-primary-text text-center">
      <Hero imageSrc="/hero/MMHCHeroImage.png" children={MMHCTag()} />
      {/* Who we are */}
      <section className="w-full py-20 bg-primary-bg">
        <div className="max-w-6xl mx-auto px-6 text-left">
          <div className="flex items-start mb-7">
            {/* <h2 className="flex flex-col text-primary-text font-bold text-4xl mr-8">
              <span>OUR</span>
              <span>MISSION</span>
            </h2> */}
            <p className="text-xl leading-relaxed text-primary-text">
              We are a community of men dedicated to peer support, open discussion, and self-improvement. Our mission is
              to eradicate the stigma around men’s mental health by supporting, educating, and providing peer support
              for students around campus.
            </p>
          </div>
          {/*<div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-primary-text">*/}
          {/*    /!* Community *!/*/}
          {/*    <div*/}
          {/*        className="relative bg-card-primary rounded-2xl shadow-md overflow-hidden group cursor-pointer max-h-[75px] flex flex-col items-center justify-center">*/}
          {/*        <h3 className="text-2xl font-semibold text-primary-text z-10 relative transition-opacity duration-300 group-hover:opacity-0 uppercase tracking-wide">*/}
          {/*            Community*/}
          {/*        </h3>*/}
          {/*        <p className=" opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute p-12">*/}
          {/*            We strive to build a strong community through social events, discussion,*/}
          {/*            and supporting one another to form a strong brotherhood.*/}
          {/*        </p>*/}
          {/*    </div>*/}

          {/*    /!* Grit *!/*/}
          {/*    <div*/}
          {/*        className="relative bg-card-primary rounded-2xl shadow-md overflow-hidden group cursor-pointer max-h-[75px] flex flex-col items-center justify-center">*/}
          {/*        <h3 className="text-2xl font-semibold text-primary-text z-10 relative transition-opacity duration-300 group-hover:opacity-0 uppercase tracking-wide">*/}
          {/*            Grit*/}
          {/*        </h3>*/}
          {/*        <p className=" opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute p-12">*/}
          {/*            The ability to stand strong is something we value, whether that means*/}
          {/*            pushing yourself on a run, or facing your fears with a cold plunge.*/}
          {/*        </p>*/}
          {/*    </div>*/}

          {/*    /!* Growth *!/*/}
          {/*    <div*/}
          {/*        className="relative bg-card-primary rounded-2xl shadow-md overflow-hidden group cursor-pointer min-h-[75px] flex flex-col items-center justify-center">*/}
          {/*        <h3 className="text-2xl font-semibold text-primary-text z-10 relative transition-opacity duration-300 group-hover:opacity-0 uppercase tracking-wide">*/}
          {/*            Growth*/}
          {/*        </h3>*/}
          {/*        <p className=" opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute p-12">*/}
          {/*            We focus on pushing ourselves mentally and physically to grow as*/}
          {/*            individuals and support each other's development.*/}
          {/*        </p>*/}
          {/*    </div>*/}
          {/*</div>*/}
        </div>
      </section>
      {/*Upcoming Events*/}
      <section className="w-full py-20">
        <h2 className="text-4xl font-bold text-primary-text text-center mb-5 tracking-wide">Upcoming Events</h2>
        <EventList />
      </section>

      {/*Newsletter*/}
      <section className="w-full py-20 px-10">
        <div className="flex flex-col sm:flex-row items-center mx-auto max-w-4xl gap-8">
          {/* Left column */}
          <div className="flex flex-col flex-1 items-center sm:items-start text-center sm:text-left">
            <h2 className="text-4xl font-bold text-primary-text mb-5 tracking-wide">Stay Updated</h2>

            <p className="text-xl leading-relaxed text-primary-text max-w-sm">
              Subscribe to our weekly newsletter to stay up to date with new events news about the club
            </p>
          </div>

          {/* Right column */}
          <div className="flex flex-col flex-1 items-center">
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-4">
              <Image src="/MMHC_cropped_logo.png" alt="UBC MMHC logo" fill className="object-cover" />
            </div>

            <NewsletterSignup />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
