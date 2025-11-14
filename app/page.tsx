import Hero from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";

const MMHCTag = () => {
    return (
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-5 w-full max-w-6xl mx-auto px-4">

            <div className="relative w-60 h-70 md:w-80 md:h-100 rounded-full overflow-hidden">
                <Image
                    src="/MMHC_cropped_logo.png"
                    alt="UBC MMHC logo"
                    width={400}
                    height={400}
                    className="object-cover"
                />
            </div>

            <div className="flex flex-col gap-5">
                <p className="text-4xl md:text-5xl font-bold text-secondary text-shadow-2xs text-center">
                    UBC's
                </p>
                <p className="text-4xl md:text-5xl font-bold text-secondary text-shadow-2xs text-center">
                    Mens Mental Health Club
                </p>
                <p className="text-lg md:text-xl font-medium text-secondary text-shadow-2xs text-center">
                    Community of peer support, open discussion, and self-improvement
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-5 mt-4">
                    <Link href="/memberregistration">
                        <button className="w-full sm:w-auto px-6 py-3 bg-primary-bg text-secondary font-semibold rounded-lg shadow-md hover:bg-secondary-bg transition duration-300">
                            Become a Member
                        </button>
                    </Link>
                    <Link href="/events">
                        <button className="w-full sm:w-auto px-6 py-3 bg-primary-bg text-secondary font-semibold rounded-lg shadow-md hover:bg-secondary-bg transition duration-300">
                            Events
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

const HomePage = () => {
  return (
    <div className="w-full overflow-x-hidden bg-primary-bg text-primary-text">
      <Hero imageSrc="/hero/Hero1.jpeg" children={MMHCTag()} />
      <div className="flex flex-col gap-10 mx-auto justify-center text-center max-w-[70vw] p-8">

            {/*About us Section*/}
            <div className="">
              <h1 className="text-4xl font-bold mb-4">About Us</h1>
              <p className="text-xl mb-10">
                MMHC is a club with the purpose of providing dedicated peer support, a place for open discussion, and a goal
                of self-improvemnt. We base this mission on our three core-pillars
              </p>
            </div>

          {/*  Our Value / Mission*/}
          <div className="flex flex-col items-baseline gap-0">
            <h2 className="text-3xl font-bold mb-4">Community</h2>
            <div className="flex flex-col md:flex-row gap-5">
              <Image
                src="/MMHC_Circle_Logo.jpg"
                alt="UBC MMHC logo"
                width={120}
                height={120}
                className="rounded-full"
              />

              <p className="text-xl">
                We strive to build a strong community through social events, discussion, etc and build a strong
                brotherhood.....
              </p>
            </div>
          </div>
          <div className="flex flex-col items-baseline gap-0">
            <h2 className="text-3xl font-bold mb-4">Grit</h2>
            <div className="flex flex-col md:flex-row gap-5">
              <Image
                src="/MMHC_Circle_Logo.jpg"
                alt="UBC MMHC logo"
                width={120}
                height={120}
                className="rounded-full"
              />

              <p className="text-xl">
                The ability to stand strong is something we value, whether that means pushing yourself on a run, or
                facing your fears and doing a cold-plunge no matter the weather outside.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-baseline gap-0">
            <h2 className="text-3xl font-bold mb-4">Growth</h2>
            <div className="flex flex-col md:flex-row gap-5">
              <Image
                src="/MMHC_Circle_Logo.jpg"
                alt="UBC MMHC logo"
                width={120}
                height={120}
                className="rounded-full"
              />

              <p className="text-xl">
                The ability to stand strong is something we value, whether that means pushing yourself on a run, or
                facing your fears and doing a cold-plunge no matter the weather outside.
              </p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default HomePage;
