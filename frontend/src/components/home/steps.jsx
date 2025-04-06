import React from "react";
import { motion } from "framer-motion";
import { InfoIcon } from "lucide-react";

const Steps2 = () => {
  const steps = [
    { title: "Sign Up", desc: "New to our website? Sign up and get started!", num: "01" },
    { title: "Create Post", desc: "Facing an issue? Share your experience with a post.", num: "02" },
    { title: "Read Posts", desc: "Curious about what's happening around you? Explore posts.", num: "03" },
    { title: "Access Helplines", desc: "Need help but unsure where to go? Find trusted helplines.", num: "04" },
    { title: "Read Blogs", desc: "Want quick safety tips or the latest updates? Check out our blogs.", num: "05" },
    { title: "About Us", desc: "Have doubts about our platform? Learn more about us.", num: "06" },
    { title: "Contact Us", desc: "Facing issues and need to connect? Reach out to us anytime.", num: "07" }
  ];

  const leftSections = [
    {
      title: (
        <div className="flex items-center gap-2 text-[#7A2F46]">
          <InfoIcon className="w-6 h-6 text-[#7A2F46]" />
          <span className="font-semibold">Did You Know?</span>
        </div>
      ),
      content: (
        <ul className="list-disc ml-6 text-[#7A2F46] space-y-1 text-justify">
          <li>Poorly lit streets are 2.5x more likely to become hotspots for harassment and stalking at night.</li>
          <li>Areas without CCTV cameras see a 70% lower reporting rate, making it easier for offenders to get away.</li>
          <li>Eve teasing, often brushed off as “minor,” is a common precursor to more violent crimes against women.</li>
          <li>Eve teasing, often brushed off as “minor,” is a common precursor to more violent crimes against women.</li>
        </ul>
      )
    },
    {
      title: "🗣 Words from Women Like You",
      content: (
        <div className="space-y-3 text-[#7A2F46] italic">
          <p>"Walking alone at night shouldn’t feel like an act of bravery." – <strong>Ayesha, 23</strong></p>
          <p>"This platform gave me the courage to speak up." – <strong>Neha, 29</strong></p>
          <p>"People always told me to stay quiet. But silence doesn’t bring change." – <strong>Meera, 35</strong></p>
          <p>"A safe world for women is a better world for everyone." – <strong>Riya, 27</strong></p>
        </div>
      )
    },

    {
      title: "💡 Did You Know These Rights?",
      content: (
        <ul className="list-disc ml-6 text-[#7A2F46] space-y-1 ">
          <li>You have the right to file an FIR at any police station in India.</li>
          <li>Section 354D of IPC protects women against cyberstalking.</li>
          <li>Workplaces must follow POSH (Prevention of Sexual Harassment) Act guidelines.</li>
          <li>You can seek help anonymously in many helpline portals.</li>
        </ul>
      )
    }
    
  ];

  return (
    <div className="w-full flex flex-col items-center px-6 py-8 bg-slate-180">
      <motion.h3
        className="text-3xl font-bold text-rose-800 mb-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        How to Use Our Platform
      </motion.h3>

      <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-12">
        {/* Left Content Sections */}
        <div className="lg:w-9/10 space-y-10">
          {leftSections.map((section, idx) => (
            <motion.div
              key={idx}
              className="bg-gradient-to-r from-rose-50 to-slate-100 p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 sm:text-2xl mb-6">{section.title}</h2>
              <div className="text-md">{section.content}</div>
            </motion.div>
          ))}
        </div>

        {/* Right Steps Section */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`relative p-6 bg-rose-300 text-white rounded-xl shadow-lg transition duration-200 ease-out cursor-pointer 
                ${index % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]"} 
                hover:scale-105 hover:bg-rose-600 hover:shadow-2xl 
                hover:${index % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]"}
              `}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <h2 className="text-xl font-semibold">{step.title}</h2>
              <p className="text-sm">{step.desc}</p>
              <span className="absolute top-3 right-3 text-4xl font-bold text-white opacity-80">
                {step.num}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Steps2;
