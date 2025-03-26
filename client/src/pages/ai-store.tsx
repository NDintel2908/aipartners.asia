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
    description: "Powerful NLP agent for text analysis, sentiment detection, and content generation",
    features: ["Content Generation", "Sentiment Analysis", "Text Classification"],
    category: "NLP",
    image: "https://tse3.mm.bing.net/th?id=OIP.sGk8A4qOiMs51cAyaRxTxgHaHa&pid=Api&P=0&h=180"
  },
  {
    title: "NikoNiko",
    description: "Advanced image recognition and processing capabilities for various applications",
    features: ["Object Detection", "Face Recognition", "Image Segmentation"],
    category: "Vision",
    image: "https://images.unsplash.com/photo-1576400883215-7083980b6193?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Data Analytics Bot",
    description: "Intelligent agent for data analysis, visualization, and insights generation",
    features: ["Data Visualization", "Predictive Analytics", "Pattern Recognition"],
    category: "Analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Conversation AI",
    description: "Natural language processing agent for human-like conversations and customer support",
    features: ["24/7 Support", "Multi-language", "Context Awareness"],
    category: "Chatbot",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Text Analysis Agent",
    description: "Powerful NLP agent for text analysis, sentiment detection, and content generation",
    features: ["Content Generation", "Sentiment Analysis", "Text Classification"],
    category: "NLP",
    image: "https://images.wondershare.com/virtulook/articles/best-ai-product-photo-generators-1.jpg"
  },
  {
    title: "Computer Vision Assistant",
    description: "Advanced image recognition and processing capabilities for various applications",
    features: ["Object Detection", "Face Recognition", "Image Segmentation"],
    category: "Vision",
    image: "https://i.pinimg.com/originals/e3/02/0c/e3020c84aa4e898270fd9ca4c2f5c712.png"
  },
  {
    title: "Data Analytics Bot",
    description: "Intelligent agent for data analysis, visualization, and insights generation",
    features: ["Data Visualization", "Predictive Analytics", "Pattern Recognition"],
    category: "Analytics",
    image: "https://www.epicvibesng.com/wp-content/uploads/2017/06/fut.jpg"
  },
  {
    title: "Conversation AI",
    description: "Natural language processing agent for human-like conversations and customer support",
    features: ["24/7 Support", "Multi-language", "Context Awareness"],
    category: "Chatbot",
    image: "https://i.ytimg.com/vi/9jYKUVP49Po/maxresdefault.jpg"
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
          AI Agent Marketplace
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
      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center mt-16 mb-12"
      >
        <Button 
          className="w-[200px] h-[50px] bg-blue-600 hover:bg-blue-700 text-white text-lg transition-colors"
          style={{ width: "200px", height: "50px" }}
        >
          Get Consult Now
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>

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