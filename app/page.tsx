import Hero from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";

const MMHCTag = () => {
    return (
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-5 w-full max-w-6xl mx-auto px-4">
            <div className="relative w-60 h-70 md:w-70 md:h-80 rounded-full overflow-hidden">
                <Image
                    src="/MMHC_cropped_logo.png"
                    alt="UBC MMHC logo"
                    fill
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
                        <button
                            className="w-full sm:w-auto px-6 py-3 bg-primary-bg text-secondary font-semibold rounded-lg shadow-md hover:bg-secondary-bg transition duration-300">
                            Become a Member
                        </button>
                    </Link>
                    <Link href="/events">
                        <button
                            className="w-full sm:w-auto px-6 py-3 bg-primary-bg text-secondary font-semibold rounded-lg shadow-md hover:bg-secondary-bg transition duration-300">
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
        <div className="w-full overflow-x-hidden bg-secondary-bg text-primary-text">
            <Hero imageSrc="/hero/Hero1.jpeg" children={MMHCTag()}/>
            <section className="w-full py-20 bg-secondary-bg">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col text-primary-text text-center mb-7  ">
                        <h2 className="text-4xl font-bold text-secondary-text text-center mb-5 tracking-wide uppercase">
                            Our Mission
                        </h2>
                        <p className="text-2xl leading-relaxed text-gray-700 max-w-3xl mx-auto text-center">
                        MMHC is determined to create a safe community for all men to
                            feel welcomed by focusing on our core values: </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-primary-text">
                        {/* Community */}
                        <div className="relative bg-card-primary rounded-2xl shadow-md overflow-hidden group cursor-pointer min-h-[200px] flex flex-col items-center justify-center">
                            <h3 className="text-2xl font-semibold text-primary-text z-10 relative transition-opacity duration-300 group-hover:opacity-0 uppercase tracking-wide">
                                Community
                            </h3>
                            <p className=" opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute p-12">
                                We strive to build a strong community through social events, discussion,
                                and supporting one another to form a strong brotherhood.
                            </p>
                        </div>

                        {/* Grit */}
                        <div className="relative bg-card-primary rounded-2xl shadow-md overflow-hidden group cursor-pointer min-h-[200px] flex flex-col items-center justify-center">
                            <h3 className="text-2xl font-semibold text-primary-text z-10 relative transition-opacity duration-300 group-hover:opacity-0 uppercase tracking-wide">
                                Grit
                            </h3>
                            <p className=" opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute p-12">
                                The ability to stand strong is something we value, whether that means
                                pushing yourself on a run, or facing your fears with a cold plunge.
                            </p>
                        </div>

                        {/* Growth */}
                        <div className="relative bg-card-primary rounded-2xl shadow-md overflow-hidden group cursor-pointer min-h-[200px] flex flex-col items-center justify-center">
                            <h3 className="text-2xl font-semibold text-primary-text z-10 relative transition-opacity duration-300 group-hover:opacity-0 uppercase tracking-wide">
                                Growth
                            </h3>
                            <p className=" opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute p-12">
                                We focus on pushing ourselves mentally and physically to grow as
                                individuals and support each other's development.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            <section className="w-full py-20 bg-white"></section>

        </div>
    );
};

export default HomePage;