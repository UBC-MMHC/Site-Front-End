import Hero from "@/components/Hero";
import Image from "next/image";

const HomePage = () => {
  const MMHCTag = () => {
    return (
      <div className="flex flex-col align-middle gap-15">
        <p className="text-5xl font-bold text-white text-shadow-2xs">UBC's</p>
        <p className="text-5xl font-bold text-white text-shadow-2xs">Mens Mental Health Club</p>
        <p className="text-xl font-medium text-white text-shadow-2xs">
          A community of dedicated peer support, open discussion, and self-improvement
        </p>
      </div>
    );
  };

  return (
    <div className="w-screen bg-primary-bg text-primary-text">
      <Hero imageSrc="/Hero1.jpeg" children={MMHCTag()} />
      <div className="flex flex-col gap-10 mx-auto justify-center text-center max-w-[70vw] p-8">
        <div className="flex flex-col gap-5 items-baseline">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-xl mb-10">
            MMHC is a club with the purpose of providing dedicated peer support, a place for open discussion, and a goal
            of self-improvemnt. We base this mission on our three core-pillars
          </p>
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
    </div>
  );
};

export default HomePage;
