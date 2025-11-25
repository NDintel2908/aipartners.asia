import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Factory,
  Users,
  Target,
  Lightbulb,
  Network,
  CheckCircle2,
  Building2,
  Handshake,
  TrendingUp,
  FileCheck,
  Calendar,
  UserCheck,
  ClipboardList,
  Rocket,
  Zap,
  Shield,
  Award,
  BarChart3,
  Cog,
  Globe,
} from "lucide-react";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScpxsHe97q0aG9jgCqffy1CsY19CeliN-p7h4b6UyjT9DZpog/viewform?usp=header";

// Full-width section wrapper - breaks out of parent container
const FullWidthSection = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={`relative w-[100vw] left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] ${className}`}
    >
      {children}
    </section>
  );
};

// Content container - keeps content centered with max-width
const ContentContainer = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

// Reusable CTA Button Component
const CTAButton = ({
  variant = "primary",
}: {
  variant?: "primary" | "secondary" | "white";
}) => {
  const baseStyles =
    "px-6 py-4 md:px-8 md:py-5 text-sm md:text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]";
  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800 text-white",
    secondary:
      "bg-white text-indigo-700 hover:bg-indigo-50 border-2 border-indigo-200",
    white: "bg-white text-gray-900 hover:bg-gray-50",
  };

  return (
    <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
      <Button className={`${baseStyles} ${variants[variant]}`}>
        Đăng ký ngay
        <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
      </Button>
    </a>
  );
};

export default function FactoryTour() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* ============================================
          HERO SECTION - Full Width Edge-to-Edge (GIỮ BACKGROUND)
          ============================================ */}
      <FullWidthSection className="min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-900 via-purple-900 to-slate-900" />

        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/30 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-gradient-to-br from-purple-500/25 to-pink-600/15 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-cyan-500/20 to-blue-600/10 rounded-full blur-3xl" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <ContentContainer className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium tracking-wide">
                WISE HCMC+ 2025
              </span>
            </motion.div>

            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Từ slide đến{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Nhà máy thực tế
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              BCP AI Partners & Factory Tour 2025 — Kết nối trực tiếp với CEO
              nhà máy, nhận tech leads thật mỗi tuần, đồng hành triển khai dự
              án AI/IoT/Automation.
            </p>

            {/* Key benefits */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-white/70 text-sm md:text-base">
              {[
                { icon: CheckCircle2, text: "25+ ngành nghề" },
                { icon: CheckCircle2, text: "Tech leads hằng tuần" },
                { icon: CheckCircle2, text: "Gặp trực tiếp CEO" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon className="h-5 w-5 text-green-400" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-6"
            >
              <CTAButton variant="white" />
              <p className="text-white/50 text-sm mt-5">
                Chỉ mất 3 phút đăng ký • BCP liên hệ trong 3–5 ngày
              </p>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="h-7 w-7 text-white/40 animate-bounce" />
          </motion.div>
        </ContentContainer>
      </FullWidthSection>

      {/* ============================================
          PROBLEM SECTION - No Background
          ============================================ */}
      <section className="py-20 md:py-28">
        <ContentContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-14"
          >
            {/* Section header */}
            <div className="text-center space-y-5">
              <span className="inline-block px-4 py-1.5 bg-red-100 text-red-600 text-sm font-semibold rounded-full">
                Vấn đề
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
                Tại sao AI giỏi vẫn khó có dự án?
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Nhiều đội ngũ AI/IoT xuất sắc vẫn đang gặp những rào cản này:
              </p>
            </div>

            {/* Pain points grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {[
                {
                  icon: Users,
                  title: "Không gặp được người quyết định",
                  desc: "Chỉ dừng lại ở phòng IT, không tiếp cận CEO, Giám đốc nhà máy",
                },
                {
                  icon: TrendingUp,
                  title: "Chi phí lead quá cao",
                  desc: "Quảng cáo, hội thảo, cold call nhưng tỷ lệ chuyển đổi thấp",
                },
                {
                  icon: Factory,
                  title: "Thiếu bối cảnh thực tế",
                  desc: "Không có cơ hội đi sâu vào dây chuyền, quy trình nhà máy",
                },
                {
                  icon: Shield,
                  title: "Khách hàng mất niềm tin",
                  desc: "Từ trải nghiệm tệ với các đơn vị triển khai trước đó",
                },
                {
                  icon: Network,
                  title: "Thiếu hệ thống bán hàng",
                  desc: "Kỹ thuật mạnh nhưng không có kênh vào doanh nghiệp sản xuất",
                },
                {
                  icon: Target,
                  title: "Giải pháp tốt, vẫn mắc kẹt",
                  desc: "Sản phẩm chất lượng nhưng chỉ dừng ở demo, không ra doanh thu",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-red-200 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-100 rounded-xl group-hover:bg-red-200 transition-colors">
                      <item.icon className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1.5 text-lg">
                        {item.title}
                      </h3>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ContentContainer>
      </section>

      {/* ============================================
          SOLUTION - ABOUT BCP - No Background
          ============================================ */}
      <section className="py-20 md:py-28 border-t border-slate-100">
        <ContentContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-14"
          >
            {/* Section header */}
            <div className="text-center space-y-5">
              <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-600 text-sm font-semibold rounded-full">
                Giải pháp
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
                BCP — Cầu nối vào nhà máy
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Business Connecting Platform kết nối nhu cầu MUA - BÁN - HỢP TÁC
                giữa 25+ ngành nghề bằng AI matching thông minh.
              </p>
            </div>

            {/* 3 Pillars */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: Lightbulb,
                  gradient: "from-indigo-500 to-blue-600",
                  title: "AI Matching",
                  desc: "Kết nối đúng AI Partner với đúng doanh nghiệp, dựa trên ngành nghề và bài toán cụ thể",
                },
                {
                  icon: Shield,
                  gradient: "from-purple-500 to-pink-600",
                  title: "Ecosystem tin cậy",
                  desc: "Doanh nghiệp và đối tác được sàng lọc kỹ, giảm rủi ro dự án ảo và khách hàng không nghiêm túc",
                },
                {
                  icon: Handshake,
                  gradient: "from-cyan-500 to-teal-600",
                  title: "Co-build & Co-sell",
                  desc: "Đồng hành từ khảo sát, đề xuất đến triển khai — không chỉ giới thiệu rồi bỏ",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="p-8 bg-white rounded-3xl text-center border border-slate-200 shadow-sm hover:shadow-lg transition-all"
                >
                  <div
                    className={`bg-gradient-to-br ${item.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  >
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* What BCP AI Partners do */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
              <h3 className="font-bold text-xl text-slate-900 mb-6 text-center">
                BCP AI Partners làm gì?
              </h3>
              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  {
                    icon: BarChart3,
                    text: "Khai thác & sàng lọc tech leads từ cộng đồng BCP",
                  },
                  {
                    icon: Cog,
                    text: "Khảo sát, đề xuất & triển khai dự án AI/IoT/Data",
                  },
                  {
                    icon: Building2,
                    text: "Tham gia Factory Tour gặp trực tiếp nhà máy, FDI, SMEs",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200"
                  >
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <item.icon className="h-5 w-5 text-indigo-600" />
                    </div>
                    <span className="text-slate-700 font-medium">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </ContentContainer>
      </section>

      {/* ============================================
          BENEFITS SECTION - No Background
          ============================================ */}
      <section className="py-20 md:py-28 border-t border-slate-100">
        <ContentContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-14"
          >
            {/* Section header */}
            <div className="text-center space-y-5">
              <span className="inline-block px-4 py-1.5 bg-green-100 text-green-600 text-sm font-semibold rounded-full">
                Quyền lợi
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
                Bạn nhận được gì?
              </h2>
            </div>

            {/* Benefits grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {[
                {
                  icon: Zap,
                  title: "Tech leads thật hằng tuần",
                  desc: "Nhu cầu từ nhà máy, FDI, SMEs được BCP tổng hợp và gửi đến bạn",
                },
                {
                  icon: Factory,
                  title: "Factory tours chuyên sâu",
                  desc: "Đi thực tế, quan sát quy trình, gặp ban lãnh đạo — không chỉ đọc email",
                },
                {
                  icon: FileCheck,
                  title: "Hỗ trợ xây dựng proposal",
                  desc: "BCP đồng hành khi bạn đề xuất giải pháp cho doanh nghiệp",
                },
                {
                  icon: Globe,
                  title: "Hiện diện trên Ecosystem Map",
                  desc: "Logo, profile, case study xuất hiện trên website và kênh truyền thông BCP",
                },
                {
                  icon: Calendar,
                  title: "Ưu tiên workshop & demo day",
                  desc: "Tham gia các chương trình với doanh nghiệp có nhu cầu thật",
                },
                {
                  icon: Award,
                  title: "Kết nối nhà đầu tư",
                  desc: "Cơ hội gặp quỹ đầu tư và đối tác chiến lược nếu case phù hợp",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-green-200 transition-all duration-300"
                >
                  <div className="p-3 bg-green-100 rounded-xl w-fit mb-5 group-hover:bg-green-200 transition-colors">
                    <item.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    {item.title}
                  </h3>
                  <p className="text-slate-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center pt-6">
              <CTAButton variant="primary" />
            </div>
          </motion.div>
        </ContentContainer>
      </section>

      {/* ============================================
          CASE STUDY - No Background
          ============================================ */}
      <section className="py-20 md:py-28 border-t border-slate-100">
        <ContentContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Section header */}
            <div className="text-center space-y-5">
              <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-600 text-sm font-semibold rounded-full">
                Case Study
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
                Factory Tour: Nhựa Hiệp Thành
              </h2>
              <p className="text-slate-600 text-lg">
                Doanh nghiệp sản xuất nhựa & bao bì lớn tại TP.HCM
              </p>
            </div>

            {/* Case study content */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Before - Process */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-indigo-100 rounded-xl">
                    <ClipboardList className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900">
                    Trước Factory Tour
                  </h3>
                </div>
                <div className="space-y-5">
                  {[
                    "Thu thập pain points từ ban lãnh đạo: sản xuất, kho, chất lượng, bảo trì",
                    "Thiết kế bộ khảo sát theo mảng: IoT, AI, MES, ERP, Data, Automation",
                    "Mời AI Partners phù hợp theo từng chuyên môn tham gia",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-slate-700 pt-1">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* After - Results */}
              <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-200">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-emerald-100 rounded-xl">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900">Kết quả</h3>
                </div>
                <div className="space-y-5">
                  {[
                    "Ban lãnh đạo chia sẻ cụ thể quy trình, dữ liệu và vấn đề thực tế",
                    "Hình thành hướng giải pháp: giám sát máy, tối ưu sản xuất, tracking",
                    "Nhiều AI Partners được mời vào vòng trao đổi để xây dựng proposal",
                    "BCP & nhà máy xây dựng bản đồ nhu cầu chuyển đổi số toàn diện",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <p className="text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="bg-indigo-50 rounded-2xl p-8 text-center border border-indigo-100">
              <p className="text-indigo-900 font-medium text-lg italic">
                "Mô hình Factory Tour sẽ được nhân rộng trong chuỗi chương trình
                2025, với AI Partners là lực lượng nòng cốt."
              </p>
            </div>
          </motion.div>
        </ContentContainer>
      </section>

      {/* ============================================
          TARGET AUDIENCE - No Background
          ============================================ */}
      <section className="py-20 md:py-28 border-t border-slate-100">
        <ContentContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Section header */}
            <div className="text-center space-y-5">
              <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-600 text-sm font-semibold rounded-full">
                Đối tượng
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
                Ai nên tham gia?
              </h2>
            </div>

            {/* Criteria grid */}
            <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {[
                {
                  icon: Cog,
                  text: "Công ty công nghệ, AI builder, startup phát triển AI/IoT/Automation/Data/ERP",
                },
                {
                  icon: Award,
                  text: "Đã có sản phẩm sẵn, từng làm POC hoặc triển khai cho SMEs/doanh nghiệp lớn",
                },
                {
                  icon: Factory,
                  text: "Muốn đi sâu vào sản xuất, logistics, thương mại, F&B, cơ khí, gỗ, điện tử",
                },
                {
                  icon: Handshake,
                  text: "Sẵn sàng đồng hành lâu dài, tối ưu giải pháp theo thực tế nhà máy",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-5 p-6 bg-white rounded-2xl shadow-sm border border-slate-200"
                >
                  <div className="p-3 bg-purple-100 rounded-xl flex-shrink-0">
                    <item.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-slate-700 font-medium pt-1">{item.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Note for early-stage startups */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-amber-800 text-center">
                <strong>Startup giai đoạn đầu?</strong> Nếu có công nghệ tiềm
                năng, vẫn có thể đăng ký — BCP sẽ xem xét và kết nối trong case
                phù hợp.
              </p>
            </div>
          </motion.div>
        </ContentContainer>
      </section>

      {/* ============================================
          PROCESS - 4 STEPS - No Background
          ============================================ */}
      <section className="py-20 md:py-28 border-t border-slate-100">
        <ContentContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-14"
          >
            {/* Section header */}
            <div className="text-center space-y-5">
              <span className="inline-block px-4 py-1.5 bg-cyan-100 text-cyan-600 text-sm font-semibold rounded-full">
                Quy trình
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
                4 bước tham gia
              </h2>
            </div>

            {/* Steps */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  icon: ClipboardList,
                  title: "Đăng ký online",
                  desc: "Điền form với thông tin công ty, giải pháp, công nghệ và mong muốn",
                },
                {
                  step: "02",
                  icon: UserCheck,
                  title: "Sàng lọc & kết nối",
                  desc: "BCP đánh giá năng lực, đề xuất nhóm kết nối theo ngành và bài toán",
                },
                {
                  step: "03",
                  icon: Factory,
                  title: "Factory Tour",
                  desc: "Tham dự tour, workshop, trao đổi trực tiếp với nhà máy",
                },
                {
                  step: "04",
                  icon: Rocket,
                  title: "Đề xuất & triển khai",
                  desc: "Xây dựng proposal, BCP đồng hành trong quá trình triển khai",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Connector line */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-cyan-300 to-transparent" />
                  )}

                  <div className="bg-white rounded-3xl p-8 text-center h-full border border-slate-200 shadow-sm">
                    {/* Step number */}
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-2xl mb-5 shadow-lg">
                      {item.step}
                    </div>

                    {/* Icon */}
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                      <item.icon className="h-7 w-7 text-cyan-600" />
                    </div>

                    <h3 className="font-bold text-slate-900 mb-3 text-lg">
                      {item.title}
                    </h3>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ContentContainer>
      </section>

      {/* ============================================
          FINAL CTA - Keep gradient as it's important
          ============================================ */}
      <FullWidthSection className="py-24 md:py-32 overflow-hidden">
        {/* Vibrant gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700" />

        <ContentContainer className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-10 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Sẵn sàng có dự án AI/IoT thực sự?
            </h2>

            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
              Thị trường đông, nhưng dự án thật và khách hàng nghiêm túc thì ít.
              BCP giúp bạn kết nối với những cơ hội đó.
            </p>

            <div className="pt-4">
              <CTAButton variant="white" />
            </div>

            <p className="text-white/60 text-sm">
              Chỉ mất 3 phút đăng ký • BCP liên hệ trong 3–5 ngày làm việc
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-white/80 text-sm">
              {[
                { icon: Shield, text: "Sàng lọc kỹ lưỡng" },
                { icon: Users, text: "25+ ngành nghề" },
                { icon: Award, text: "Đối tác uy tín" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon className="h-5 w-5" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </ContentContainer>
      </FullWidthSection>
    </div>
  );
}
