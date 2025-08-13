
import { motion } from "framer-motion";
import { Wrench, Clock, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Maintenance() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-8"
            >
              <div className="bg-orange-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Wrench className="h-12 w-12 text-orange-600" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-4xl font-bold text-gray-800 mb-4"
            >
              Đang Bảo Trì
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl font-semibold text-gray-600 mb-6"
            >
              Under Maintenance
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="space-y-4 mb-8"
            >
              <p className="text-gray-600 text-lg leading-relaxed">
                Chúng tôi đang thực hiện bảo trì hệ thống để mang đến trải nghiệm tốt hơn cho bạn.
              </p>
              <p className="text-gray-500">
                We are currently performing system maintenance to bring you a better experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex items-center justify-center space-x-2 text-blue-600 mb-8"
            >
              <Clock className="h-5 w-5" />
              <span className="font-medium">Dự kiến hoàn thành trong vài giờ tới</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="space-y-4"
            >
              <p className="text-gray-500 text-sm">
                Nếu bạn cần hỗ trợ khẩn cấp, vui lòng liên hệ:
              </p>
              <Button variant="outline" className="inline-flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@aipartners.asia</span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-8 pt-8 border-t border-gray-200"
            >
              <p className="text-sm text-gray-400">
                Cảm ơn bạn đã kiên nhẫn chờ đợi • Thank you for your patience
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
