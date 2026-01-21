import Hero from "@/components/Hero";
import Image from "next/image";
import { EMAIL, INSTAGRAM_URL, LINKEDIN_URL, MEMBERSHIP_SIGNUP_URL } from "@/app/constants";
import EventList from "@/components/events/EventList";
import LinkButton from "@/components/ui/LinkButton";
import NewsletterSignup from "@/components/newsletter/newsletterSignup";
import SocialButton from "@/components/ui/SocialButton";
import AuthRedirect from "@/components/AuthRedirect";

const MMHCTag = () => {
    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-8 px-4 md:flex-row md:gap-5">
            <div className="flex flex-col gap-5">
                <p className="text-secondary text-shadow-4xl text-center text-4xl font-bold md:text-7xl">
                    UBC Men&apos;s Mental Health Club
                </p>
                <p className="text-secondary text-shadow-4xl text-center text-lg font-bold md:text-4xl">
                    Community. Grit. Growth.
                </p>

                <div className="mt-4 flex flex-col justify-center gap-5 sm:flex-row">
                    <LinkButton link={MEMBERSHIP_SIGNUP_URL} text="Become a Member" size="lg" />
                    <LinkButton link="/events" text="Events" size="lg" />
                </div>

                <div className="mt-4 flex flex-row justify-center gap-5">
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
        <AuthRedirect>
            <div className="bg-primary-bg text-primary-text w-full overflow-x-hidden text-center">
                <Hero
                    imageSrcs={[
                        "/hero/DiscussionHero.JPG",
                        "/hero/HikingGroup.png",
                        "/hero/Beachheader.jpg",
                    ]}
                >
                    {MMHCTag()}
                </Hero>
                <div className="w-full px-4">
                    {/* Who we are */}
                    <section className="bg-primary-bg w-full pt-20">
                        <div className="mx-auto max-w-4xl px-6 text-left">
                            <h2 className="text-primary-text mb-5 text-center text-4xl font-bold tracking-wide">
                                Who we are
                            </h2>
                            <p className="text-primary-text text-xl leading-relaxed">
                                We are a community of men dedicated to peer support, open
                                discussion, and self-improvement. Our mission is to eradicate the
                                stigma around men’s mental health by supporting, educating, and
                                providing peer support for students around campus.
                            </p>
                        </div>
                    </section>

                    {/* Our Pillars */}
                    <section className="w-full py-20">
                        <h2 className="text-primary-text mb-12 text-center text-4xl font-bold tracking-wide">
                            Our Pillars
                        </h2>
                        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 md:flex-row md:items-stretch">
                            {/* Community Card */}
                            <div className="w-full max-w-sm flex-1 rounded-xl border border-white/10 bg-linear-to-t from-white/5 to-white/2 p-8">
                                <h3 className="mb-6 text-2xl font-bold">Community</h3>
                                <p className="text-primary-text text-left text-xl leading-relaxed">
                                    Connecting individuals interested in mens mental health and
                                    self-improvement through social events, volunteering, and deep
                                    discussions.
                                </p>
                            </div>

                            {/* Grit Card */}
                            <div className="w-full max-w-sm flex-1 rounded-xl border border-white/10 bg-linear-to-t from-white/5 to-white/2 p-8">
                                <h3 className="mb-6 text-2xl font-bold">Grit</h3>
                                <p className="text-primary-text text-left text-xl leading-relaxed">
                                    Developing perseverance through regular physical challenges and
                                    workouts such as runs and cold plunges.
                                </p>
                            </div>

                            {/* Growth Card */}
                            <div className="w-full max-w-sm flex-1 rounded-xl border border-white/10 bg-linear-to-t from-white/5 to-white/2 p-8">
                                <h3 className="mb-6 text-2xl font-bold">Growth</h3>
                                <p className="text-primary-text text-left text-xl leading-relaxed">
                                    Encouraging self-development through action-based discussions,
                                    accountability systems, and grit challenges.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/*Upcoming Events*/}
                    <section className="w-full py-20">
                        <h2 className="text-primary-text mb-5 text-center text-4xl font-bold tracking-wide">
                            Upcoming Events
                        </h2>
                        <EventList />
                    </section>

                    {/*Newsletter*/}
                    <section className="w-full px-10 py-20">
                        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 sm:flex-row">
                            <div className="flex flex-1 flex-col items-center text-center sm:items-start sm:text-left">
                                <h2 className="text-primary-text mb-5 text-4xl font-bold tracking-wide">
                                    Stay Updated
                                </h2>
                                <p className="text-primary-text max-w-sm text-xl leading-relaxed">
                                    Subscribe to our weekly newsletter to stay up to date with new
                                    events news about the club
                                </p>
                            </div>

                            <div className="flex flex-1 flex-col items-center">
                                <div className="relative mb-4 h-48 w-48 overflow-hidden rounded-full md:h-56 md:w-56">
                                    <Image
                                        src="/MMHC_cropped_logo.png"
                                        alt="UBC MMHC logo"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <NewsletterSignup />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AuthRedirect>
    );
};

export default HomePage;
