import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { ArrowLeft, ArrowRight, ArrowRight as ArrowRightIcon } from "lucide-react";
import { Phone, Mail, Users, Award, Briefcase, Trophy } from "lucide-react";


const aiAgents = [
  {
    title: "BCP AI",
    description: "Streamlines B2B matchmaking by prioritizing relevant and high-quality connections.",
    features: ["Priority Matching System", "Automated Lead Management", "Trust & Compliance Filters"],
    category: "B2B",
    image: "/src/pages/product/bcp.jpg"
  },
  {
    title: "AIFA",
    description: "Automates financial processes, enhances accuracy, and provides real-time insights for smarter decision-making.",
    features: ["Automated Bookkeeping", "Financial Insights & Forecasting", "Compliance & Fraud Detection"],
    category: "Finance",
    image: "https://www.springboard.com/blog/wp-content/uploads/2021/10/shutterstock_1053717473-scaled.jpg"
  },
  {
    title: "FutureBox",
    description: "Enhances efficiency through intelligent search, chatbot automation, and business support tools.",
    features: ["AI-powered Search & Retrieval", "Smart Chatbot FAQ", "Business Support System"],
    category: "B2B",
    image: "https://futurebox.vitalify.asia/images/hero_icon.svg"
  },
  {
    title: "NikoNiko",
    description: "AI-powered HR tool that tracks employee moods and engagement for better team management.",
    features: ["Mood Tracking", "Engagement Reports", "Team Analytics"],
    category: "Vision",
    image: "https://assets.st-note.com/img/1718853515506-fGEaX9U85w.png?width=800"
  },
  {
    title: "Viki",
    description: "Intelligent agent for data analysis, visualization, and insights generation",
    features: ["Data Visualization", "Predictive Analytics", "Pattern Recognition"],
    category: "Analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Smart Wiki",
    description: "Powerful NLP agent for text analysis, sentiment detection, and content generation",
    features: ["Content Generation", "Sentiment Analysis", "Text Classification"],
    category: "NLP",
    image: "https://images.wondershare.com/virtulook/articles/best-ai-product-photo-generators-1.jpg"
  },
  {
    title: "Connext",
    description: "Connext is an AI-powered customer engagement platform ultilizing conversational workflow agents to offer businesses with hightly effective conversations with their customers.",
    features: ["AI-powered CRM", "Internal/External communication", "Virtual assistants"],
    category: "Platform",
    image: "https://images.wondershare.com/virtulook/articles/best-ai-product-photo-generators-1.jpg"
  }
];

export default function AIStore() {
  return (
    <div className="w-full py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center space-y-4 text-center mb-12"
      >
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-black">
          AI Agents Market
        </h1>

        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          A portfolio of proven AI solutions—each is crafted by recognized industry specialists and deployed by esteemed enterprises and rigorously vetted to ensure guaranteed performance, exceptional value, and dedicated developer support.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {aiAgents.map((agent, index) => (
          <motion.div
            key={agent.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Card className="h-full flex flex-col overflow-hidden">
              <div className="h-40 w-full overflow-hidden">
                <img 
                  src={agent.image} 
                  alt={agent.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge className="mb-2">{agent.category}</Badge>
                  <span className="text-2xl font-bold text-primary">{agent.price}</span>
                </div>
                <CardTitle className="text-xl mb-2">{agent.title}</CardTitle>
                <CardDescription>{agent.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 mb-4">
                  {agent.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className="h-4 w-4 text-primary mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      

      {/* Contact Box */}
      <section className="py-20">
        <div className="w-full text-center">
          <h2 className="text-3xl font-bold mb-6">AI solutions marketplace: Discover & deploy!</h2>
          <Button size="lg" variant="secondary" className="mb-8">
            Get Consultant Now
          </Button>
          <p className="text-lg mb-6">
            Talent headhunters: Expand your network with us!
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="mailto:huong.le@aipartners.asia" className="flex items-center gap-2 hover:underline">
              <Mail className="h-5 w-5" />
              huynh.nguyen@aipartners.asia
            </a>
          </div>
        </div>
      </section>
      
    </div>
  );
}