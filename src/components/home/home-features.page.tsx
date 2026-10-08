"use client";

import { motion } from "framer-motion";

interface SolutionItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface HomeFeaturesContent {
  heading: string;
  solutions: SolutionItem[];
}

const homeFeaturesContent: HomeFeaturesContent = {
  heading: "SOLUTIONS",
  solutions: [
    {
      id: "hris-payroll",
      title: "HRIS Payroll",
      description:
        "HRIS, which is also known as a human resource information system or human resource management system (HRMS), is basically an intersection of human resources and information technology through HR software. This allows HR activities and processes to occur electronically.",
      image: "/images/hris-payroll.jpg",
    },
    {
      id: "rfid-asset-tracking",
      title: "RFID Asset Tracking System",
      description:
        "Simple and flexible Fixed Asset Tracking and management. ... Our easy-to-use software offers a simple solution for all of your fixed asset ...RFID tags give whatever they are attached to a unique identity, electronically stored and easily retrieved.",
      image: "/images/rfid-asset-tracking.jpg",
    },
    {
      id: "id-printing-solution",
      title: "ID Printing Solution",
      description:
        "With a wide variety of card application. Visual Identity, Physical Access Control, Time and Attendance, Loyalty and Membership, Data Storage and Payments. We customize your hologram to your design built-in with the system.",
      image: "/images/Id-printing-solution.jpg",
    },
  ],
};

export function HomeFeaturesPage() {
  const content = homeFeaturesContent;

  return (
    <section className="relative bg-background py-20 lg:py-28 scroll-mt-28" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            {content.heading}
          </h2>
        </motion.div>

        <div
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
        >
          {content.solutions.map((solution) => (
            <div key={solution.id}>
              <SolutionCard solution={solution} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionCard({ solution }: { solution: SolutionItem }) {
  return (
    <div className="card-grid-item group h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
      <img
        src={solution.image}
        alt={solution.title}
        className="h-52 w-full object-contain"
      />
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground">
          {solution.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {solution.description}
        </p>
      </div>
    </div>
  );
}
