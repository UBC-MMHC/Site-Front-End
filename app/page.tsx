import Hero from "@/components/Hero";
import Image from "next/image";
import { MEMBERSHIP_SIGNUP_URL } from "@/app/constants";
import EventList from "@/components/events/EventList";
import LinkButton from "@/components/ui/LinkButton";

const MMHCTag = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-5 w-full max-w-6xl mx-auto px-4 justify-center">
      <div className="relative w-60 h-70 md:w-70 md:h-80 rounded-full overflow-hidden">
        <Image src="/MMHC_cropped_logo.png" alt="UBC MMHC logo" fill className="object-cover" />
      </div>

      <div className="flex flex-col gap-5">
        <p className="text-4xl md:text-5xl font-bold text-secondary text-shadow-2xs text-center">UBC's</p>
        <p className="text-4xl md:text-5xl font-bold text-secondary text-shadow-2xs text-center">
          Mens Mental Health Club
        </p>
        <p className="text-lg md:text-xl font-medium text-secondary text-shadow-2xs text-center">
          Community of peer support, open discussion, and self-improvement
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5 mt-4">
          <LinkButton link={MEMBERSHIP_SIGNUP_URL} text="Become a Member" />
          <LinkButton link="/events" text="Events" />
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="w-full overflow-x-hidden bg-primary-bg text-primary-text text-center">
      <Hero imageSrc="/hero/Hero1.jpeg" children={MMHCTag()} />
      {/* Our Mission */}
      <section className="w-full pt-20 bg-primary-bg">
        <div className="max-w-6xl mx-auto px-6 text-left">
          <div className="flex items-start mb-7">
            <h2 className="flex flex-col text-primary-text font-bold text-4xl mr-8">
              <span>OUR</span>
              <span>MISSION</span>
            </h2>
            <p className="text-xl leading-relaxed text-primary-text">
              MMHC is dedicated to fostering a safe and supportive community where men can grow, connect, and thrive.
              Anchored by our core values Community, Grit, and Growth. We encourage members to build meaningful
              connections, overcome challenges, and reach their full potential.
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
      <section className="w-full pb-20">
        <h2 className="text-4xl font-bold text-primary-text text-center mb-5 tracking-wide uppercase">
          Upcoming Events
        </h2>
        <EventList />
      </section>
      {/*Upcoming Events*/}
      <section className="w-full pb-20">
        <h2 className="text-4xl font-bold text-primary-text text-center mb-5 tracking-wide uppercase">Stay Updated</h2>
        <p className="text-primary-text"> Newsletter call here?</p>
      </section>
      {/*Our Team*/}
      {/* <section className="w-full py-20">
        <h2 className="text-4xl font-bold text-primary-text text-center mb-5 tracking-wide uppercase">Our Team</h2>
      </section> */}
    </div>
  );
};

export default HomePage;
