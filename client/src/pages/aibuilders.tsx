import { motion, useAnimation } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowRight as ArrowRightIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Phone, Mail, Users, Award, Briefcase, Trophy } from "lucide-react";
import logo1 from "./new_logo/1.png";
import logo2 from "./new_logo/2.png";
import logo3 from "./new_logo/3.png";
import logo4 from "./new_logo/4.png";
import logo5 from "./new_logo/5.png";
import logo6 from "./new_logo/6.png";
import { useLanguage } from "../contexts/LanguageContext";

const partnerCompanies = [
  { name: "Logo1", logo: logo1 },
  { name: "Logo2", logo: logo2 },
  { name: "Logo3", logo: logo3 },
  { name: "Logo4", logo: logo4 },
  { name: "Logo5", logo: logo5 },
  { name: "Logo6", logo: logo6 }
];


const applications = [
  {
    title: "AI Transformation",
    description: "Tailored AI solutions built specifically for your business needs.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
  },
  {
    title: "AI Agent",
    description: "Seamlessly integrate AI capabilities into your existing systems.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
  },
  {
    title: "Data Solutions",
    description: "Expert guidance on implementing AI strategies in your organization.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
  },
  {
    title: "Smart factory",
    description: "Build robust AI infrastructure for scalable solutions.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
  },
  {
    title: "Development",
    description: "Tailored AI solutions built specifically for your business needs.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
  },
  {
    title: "Mobile Application",
    description: "Seamlessly integrate AI capabilities into your existing systems.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
  },
  {
    title: "Web Application",
    description: "Expert guidance on implementing AI strategies in your organization.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
  },
  {
    title: "Migration",
    description: "Build robust AI infrastructure for scalable solutions.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
  }
];



export default function AIBuilders() {
  const { t } = useLanguage();
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const controls = useAnimation();

  return (
    <div className="container py-12 px-4 md:px-6">
      {/* Heading Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center space-y-4 text-center mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {t('aibuilders.title')}
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mb-8">
          {t('aibuilders.subtitle')}
        </p>
      </motion.div>

      {/* Partners Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-8 mt-8"
      >
        <p className="text-2xl text-center mb-1">AI Development & Outsourcing Companies recommended by AIPartners</p>
        <div className="bg-background py-12 px-6 rounded-lg shadow-inner">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partnerCompanies.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="w-28 md:w-32 lg:w-36 hover:scale-110 transition-transform duration-300"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Applications Section */}
      <h2 className="text-4xl font-bold mt-12 mb-8 text-center w-full">Applications</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {applications.map((app, index) => (
          <motion.div
            key={app.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Card className="overflow-hidden">
              <img
                src={app.image}
                alt={app.title}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle>{app.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{app.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>



      {/* Contact Box */}
      <section className="py-20">
        <div className="w-full text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to build cutting-edge AI solutions?</h2>
          <Button size="lg" variant="secondary" className="mb-8">
            Get Consultant Now
          </Button>
          <p className="text-lg mb-6">
            AI innovators: Build the future with us!
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="mailto:huong.le@aipartners.asia" className="flex items-center gap-2 hover:underline">
              <Mail className="h-5 w-5" />
              tan.mai@aipartners.asia
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}