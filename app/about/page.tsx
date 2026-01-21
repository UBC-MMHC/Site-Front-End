import Hero from "@/components/Hero";
import Image from "next/image";
import "../globals.css";

const About = () => {
    return (
        <div className="text-s-text w-full overflow-x-hidden bg-white text-center">
            <Hero
                imageSrcs={[
                    "/hero/HikingGroup.png",
                    "/events/BeachRunGroup.jpeg",
                    "/hero/DiscussionTableHero.JPG",
                ]}
            >
                <p className="text-secondary text-shadow-4xl text-center text-4xl font-bold">
                    About Us
                </p>
            </Hero>

            {/* Mission */}
            <section className="w-full pt-20">
                <div className="mx-auto max-w-4xl px-6 text-left">
                    <div className="relative mb-8 flex h-64 w-full justify-center sm:h-90">
                        <Image
                            src="/about/DanielWhyWeJournal.jpg"
                            alt="Our mission"
                            fill
                            className="max-w-3xl rounded-lg object-cover shadow-lg"
                        />
                    </div>

                    <h2 className="text-secondary-text mb-5 text-center text-4xl font-bold tracking-wide">
                        Our Mission
                    </h2>

                    <p className="text-secondary-text text-xl leading-relaxed">
                        Mental health issues are very prevalent on university campuses. Generally,
                        the first and most difficult step for men in treating their mental health is
                        reaching out and seeking help. It is crucial to encourage open conversation
                        and we are striving to be that first step for the countless men on campus
                        that feel helpless and uncared for. In the process of promoting admission of
                        mental health issues, and how to start improving, we will talk about daily
                        habitual activities and behaviour that will, in the least, aid with mental
                        health.
                    </p>
                </div>
            </section>

            <section className="w-full py-20">
                <div className="mx-auto max-w-4xl px-6 text-left">
                    <div className="relative mb-8 flex h-64 w-full justify-center sm:h-90">
                        <Image
                            src="/hero/Beachheader.jpg"
                            alt="Our mission"
                            fill
                            className="max-w-3xl rounded-lg object-cover shadow-lg"
                        />
                    </div>

                    <p className="text-secondary-text text-xl leading-relaxed">
                        We hope to see a positive impact in the lives of our members, and to have
                        them walk out more confident, self-aware, and healthier than they had walked
                        in. We believe that our meetings can act as a checkup for our members where
                        they can evaluate their improvement and be motivated as a group to take care
                        of their mental wellbeing.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default About;
