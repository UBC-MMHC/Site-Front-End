import Hero from "@/components/Hero";
import "../globals.css";

const About = () => {
  return (
    <div className="w-full overflow-x-hidden bg-white text-s-text text-center">
      <Hero
        imageSrcs={["/hero/HikingGroup.png", "/events/BeachRunGroup.jpeg", "/hero/DiscussionTableHero.JPG"]}
        children={<p className="text-lg md:text-4xl font-bold text-secondary text-shadow-4xl text-center">About Us</p>}
      />

      {/* Mission */}
      <section className="w-full pt-20">
        <div className="max-w-4xl mx-auto px-6 text-left">
          <div className="w-full flex justify-center mb-8">
            <img
              src="/about/DanielWhyWeJournal.jpg"
              alt="Our mission"
              className="
                w-9/10
                max-w-3xl
                h-64
                sm:h-90
                object-cover
                rounded-lg
                shadow-lg
              "
            />
          </div>

          <h2 className="text-4xl font-bold text-secondary-text text-center mb-5 tracking-wide">Our Mission</h2>

          <p className="text-xl leading-relaxed text-secondary-text">
            Mental health issues are very prevalent on university campuses. Generally, the first and most difficult step
            for men in treating their mental health is reaching out and seeking help. It is crucial to encourage open
            conversation and we are striving to be that first step for the countless men on campus that feel helpless
            and uncared for. In the process of promoting admission of mental health issues, and how to start improving,
            we will talk about daily habitual activities and behaviour that will, in the least, aid with mental health.
          </p>
        </div>
      </section>

      <section className="w-full py-20">
        <div className="max-w-4xl mx-auto px-6 text-left">
          <div className="w-full flex justify-center mb-8">
            <img
              src="/hero/Beachheader.jpg"
              alt="Our mission"
              className="
                w-9/10
                max-w-3xl
                h-64
                sm:h-90
                object-cover
                rounded-lg
                shadow-lg
              "
            />
          </div>

          <p className="text-xl leading-relaxed text-secondary-text">
            We hope to see a positive impact in the lives of our members, and to have them walk out more confident,
            self-aware, and healthier than they had walked in. We believe that our meetings can act as a checkup for our
            members where they can evaluate their improvement and be motivated as a group to take care of their mental
            wellbeing.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
