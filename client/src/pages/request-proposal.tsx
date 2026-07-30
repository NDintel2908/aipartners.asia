import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import "./request-proposal.css";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzdnwkqv";

type Lang = "en" | "vi";
type ServiceKey = "consulting" | "training" | "build" | "not_sure";

// zod messages are stored as keys, then localized at render time via T[lang].err
const schema = z.object({
  name: z.string().min(2, "name"),
  email: z.string().email("email"),
  company: z.string().min(1, "company"),
  service: z.string().min(1, "service"),
  details: z.string().min(4, "details"),
  phone: z.string().optional(),
  industry: z.string().optional(),
  size: z.string().optional(),
  timeline: z.string().optional(),
  budget: z.string().optional(),
  hearabout: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

const T = {
  en: {
    title: "Request a Proposal | AIPartners.asia",
    eyebrow: "One-Stop Digital Transformation Station",
    h1: 'So, what do you want to build? <span class="g">You\'ll get a plan, not a pitch.</span>',
    sub: "From a single app to a full transformation, AIP helps you clarify the need, bring in the right specialists, and build a practical delivery roadmap. Access 60+ vetted partners without being locked into one vendor.",
    trust: [["36", "projects delivered"], ["60+", "partner ecosystem"], ["16+", "domain experts"], ["", "Vietnam · Japan · SEA"]],
    nextTitle: "What happens next",
    n1: "<b>We review and match.</b> Within 2 to 3 business days, we assess your needs and identify the right capabilities.",
    n2: "<b>We propose a way forward.</b> You receive a relevant shortlist, roadmap sketch, or quote based on your situation.",
    n3: "<b>You decide with no obligation.</b> The initial assessment is free, with no commitment to proceed.",
    freeTag: "Free first assessment · no obligation",
    fallback: 'Prefer to talk first? <a href="mailto:duc.truong@aipartners.asia">Email us</a> · 224A Điện Biên Phủ, Xuân Hòa Ward, HCMC',
    p1: "Need", p2: "Details", p3: "Contact",
    s1title: "What do you need?", s1sub: "Pick the closest option. You can explain more in the next step.",
    s3title: "Where do we send the plan?", s3sub: "One last step so we can reach you.",
    fDescribe: "Describe what you need",
    fIndustry: "Industry", fSize: "Company size", fTimeline: "Timeline", fBudget: "Budget range (USD)",
    fName: "Full name", fEmail: "Work email", fCompany: "Company / Organization", fPhone: "Phone / Zalo / WhatsApp",
    phName: "Your name", phEmail: "you@company.com", phCompany: "Company name", phPhone: "Optional",
    consent: "By submitting, you agree we may contact you about your request. We don't share your details outside AIP's vetted delivery team.",
    back: "← Back", next: "Next →", send: "Send my request", sending: "Sending…",
    okTitle: "Got it. Thank you.",
    okBody: 'Your request is with our team. We\'ll reply within <b>2–3 business days</b> with next steps. Urgent? <a href="mailto:duc.truong@aipartners.asia">Email us</a>.',
    errToast: "Something went wrong sending your request. Please try again, or email duc.truong@aipartners.asia.",
    err: { name: "Please enter your name.", email: "Please enter a valid email.", company: "Please enter your company.", service: "Please pick one.", details: "Please describe what you need." },
    services: [
      { v: "consulting", t: "Consulting & roadmap", d: "Not sure where to start? Get an audit and a plan." },
      { v: "training", t: "Team training", d: "Upskill your leaders and team on AI, hands-on." },
      { v: "build", t: "Build a solution", d: "An app, system, automation, dashboard, or AI." },
      { v: "not_sure", t: "Not sure yet", d: "Describe your situation and we'll help shape the right approach." },
    ],
    detailPaths: {
      build: {
        title: "Tell us about the solution",
        sub: "Choose any relevant prompts, then describe the workflow or outcome in your own words.",
        placeholder: "Describe the problem or workflow: what you want to improve, who will use it, and what a successful result looks like.",
        chipGroups: [
          { l: "What kind of solution", c: ["Booking / scheduling", "POS / payments", "Customer management (CRM)", "Loyalty / memberships", "Inventory", "Operations management", "Mobile app", "Web portal", "Dashboard / reporting", "Automation", "Website", "AI assistant", "Other"] },
          { l: "Where it runs", c: ["Phone app", "Web", "Internal tool", "Customer-facing"] },
          { l: "What you use today", c: ["Excel / Sheets", "Paper", "Existing POS", "Zalo", "Accounting software", "Nothing yet"] },
        ],
      },
      consulting: {
        title: "What should the roadmap address?",
        sub: "Choose the areas that matter now, then describe the decision or challenge you need to resolve.",
        placeholder: "What decision or challenge should this engagement help resolve? Include what you have already tried and the outcome you need.",
        chipGroups: [
          { l: "Focus areas", c: ["Digital strategy", "AI roadmap", "Process review", "Data strategy", "Automation roadmap", "Vendor selection", "Build vs buy", "Other"] },
          { l: "Current stage", c: ["Starting from scratch", "Exploring options", "Tools already in use", "Existing roadmap", "Need a second opinion"] },
        ],
      },
      training: {
        title: "What should the team learn?",
        sub: "Choose the audience and learning priorities, then add a little context about current skill levels.",
        placeholder: "Who is the training for, what should they be able to do afterwards, and are there any preferred dates or delivery requirements?",
        chipGroups: [
          { l: "Audience", c: ["Leadership team", "Department managers", "Business teams", "Technical teams", "Company-wide"] },
          { l: "Training focus", c: ["AI foundations", "Practical prompting", "Workflow automation", "AI for managers", "Role-specific use cases", "Responsible AI", "Custom programme"] },
          { l: "Format", c: ["In-person", "Online", "Hybrid", "Half-day workshop", "Multi-session programme"] },
        ],
      },
      not_sure: {
        title: "Tell us what is getting in the way",
        sub: "Choose the closest business need, then describe the current situation in your own words.",
        placeholder: "What would you like to improve, what is making it difficult today, and what outcome would be useful?",
        chipGroups: [
          { l: "Main goal", c: ["Improve operations", "Reduce manual work", "Better reporting", "Customer experience", "Train the team", "Explore AI", "Other"] },
          { l: "Current situation", c: ["Excel / Sheets", "Paper", "Existing software", "Multiple disconnected tools", "Nothing yet"] },
        ],
      },
    },
    industry: ["Select…", "B2B Professional Services", "Finance", "Retail & D2C", "Hospitality & Tourism", "Spa, Wellness & Beauty", "Food & Beverage (F&B)", "Healthcare", "Education", "Manufacturing", "Real Estate & Construction", "Logistics & Supply Chain", "Other"],
    size: ["Select…", "1–10", "11–50", "51–200", "200+"],
    timeline: ["Select…", "Just exploring", "Within 1 month", "1–3 months", "3+ months"],
    budget: ["Not sure yet", "< $5k", "$5k–$20k", "$20k–$50k", "$50k+"],
  },
  vi: {
    title: "Bắt đầu dự án | AIPartners.asia",
    eyebrow: "Đối tác chuyển đổi số toàn diện",
    h1: 'Chia sẻ nhu cầu. <span class="g">Chúng tôi đề xuất hướng đi phù hợp.</span>',
    sub: "Từ một ứng dụng cụ thể đến chương trình chuyển đổi toàn diện, AIP giúp doanh nghiệp làm rõ nhu cầu, lựa chọn đúng chuyên gia và xây dựng lộ trình triển khai phù hợp. Hơn 60 đối tác đã được thẩm định, không phụ thuộc vào một nhà cung cấp duy nhất.",
    trust: [["36", "dự án đã triển khai"], ["60+", "đối tác trong hệ sinh thái"], ["16+", "chuyên gia lĩnh vực"], ["", "Việt Nam · Nhật Bản · ĐNÁ"]],
    nextTitle: "Các bước tiếp theo",
    n1: "<b>Tiếp nhận và đánh giá.</b> Trong 2 đến 3 ngày làm việc, chúng tôi xem xét nhu cầu và lựa chọn năng lực phù hợp.",
    n2: "<b>Đề xuất hướng đi.</b> Bạn nhận được danh sách đối tác, phác thảo lộ trình hoặc báo giá phù hợp với thực tế.",
    n3: "<b>Bạn chủ động quyết định.</b> Đánh giá ban đầu miễn phí, không kèm cam kết triển khai.",
    freeTag: "Đánh giá ban đầu miễn phí · không ràng buộc",
    fallback: 'Bạn muốn trao đổi trước? Hãy <a href="mailto:duc.truong@aipartners.asia">gửi email cho chúng tôi</a> · 224A Điện Biên Phủ, phường Xuân Hòa, TP.HCM',
    p1: "Nhu cầu", p2: "Chi tiết", p3: "Liên hệ",
    s1title: "Bạn đang cần hỗ trợ về vấn đề nào?", s1sub: "Chọn phương án gần nhất. Bạn có thể mô tả chi tiết hơn ở bước tiếp theo.",
    s3title: "Chúng tôi liên hệ với bạn ở đâu?", s3sub: "Chỉ cần để lại thông tin để chúng tôi có thể liên hệ với bạn.",
    fDescribe: "Mô tả nhu cầu",
    fIndustry: "Lĩnh vực hoạt động", fSize: "Quy mô doanh nghiệp", fTimeline: "Thời gian dự kiến", fBudget: "Ngân sách dự kiến (VND)",
    fName: "Họ và tên", fEmail: "Email công việc", fCompany: "Công ty / Tổ chức", fPhone: "Điện thoại / Zalo / WhatsApp",
    phName: "Tên của bạn", phEmail: "ban@congty.com", phCompany: "Tên công ty", phPhone: "Không bắt buộc",
    consent: "Khi gửi biểu mẫu, bạn đồng ý để AIP liên hệ trao đổi về nhu cầu đã cung cấp. Chúng tôi chỉ chia sẻ thông tin với đội ngũ và đối tác triển khai đã được thẩm định khi cần thiết.",
    back: "← Quay lại", next: "Tiếp tục →", send: "Gửi yêu cầu", sending: "Đang gửi…",
    okTitle: "Chúng tôi đã nhận được yêu cầu. Cảm ơn bạn.",
    okBody: 'Đội ngũ AIP sẽ xem xét và phản hồi bước tiếp theo trong vòng <b>2–3 ngày làm việc</b>. Cần gấp? <a href="mailto:duc.truong@aipartners.asia">Gửi email cho chúng tôi</a>.',
    errToast: "Không thể gửi yêu cầu vào lúc này. Vui lòng thử lại hoặc gửi email tới duc.truong@aipartners.asia.",
    err: { name: "Vui lòng nhập họ tên.", email: "Vui lòng nhập email hợp lệ.", company: "Vui lòng nhập tên công ty.", service: "Vui lòng chọn một mục.", details: "Vui lòng mô tả nhu cầu của bạn." },
    services: [
      { v: "consulting", t: "Tư vấn và xây dựng lộ trình", d: "Chưa biết bắt đầu từ đâu? Hãy bắt đầu bằng bước đánh giá và một lộ trình phù hợp." },
      { v: "training", t: "Đào tạo đội ngũ", d: "Trang bị kiến thức và kỹ năng AI thực tiễn cho lãnh đạo và đội ngũ." },
      { v: "build", t: "Xây dựng giải pháp", d: "Ứng dụng, hệ thống, tự động hóa, dashboard hoặc AI." },
      { v: "not_sure", t: "Chưa xác định rõ", d: "Chia sẻ tình huống hiện tại để chúng tôi cùng bạn xác định hướng đi." },
    ],
    detailPaths: {
      build: {
        title: "Mô tả giải pháp bạn cần",
        sub: "Chọn các gợi ý phù hợp, sau đó mô tả quy trình hoặc kết quả mong muốn theo cách của bạn.",
        placeholder: "Bạn muốn cải thiện vấn đề hoặc quy trình nào, ai sẽ sử dụng giải pháp và kết quả như thế nào được xem là thành công?",
        chipGroups: [
          { l: "Loại giải pháp", c: ["Đặt chỗ / đặt lịch", "POS / thanh toán", "Quản lý khách hàng (CRM)", "Tích điểm / thành viên", "Quản lý kho", "Quản lý vận hành", "Ứng dụng di động", "Cổng thông tin", "Dashboard / báo cáo", "Tự động hóa", "Website", "Trợ lý AI", "Khác"] },
          { l: "Nền tảng sử dụng", c: ["Ứng dụng di động", "Web", "Công cụ nội bộ", "Dành cho khách hàng"] },
          { l: "Công cụ hiện tại", c: ["Excel / Sheets", "Sổ sách / giấy tờ", "POS hiện có", "Zalo", "Phần mềm kế toán", "Chưa dùng gì"] },
        ],
      },
      consulting: {
        title: "Bạn cần tư vấn về vấn đề nào?",
        sub: "Chọn các nội dung đang được quan tâm, sau đó chia sẻ quyết định hoặc vấn đề doanh nghiệp cần giải quyết.",
        placeholder: "Doanh nghiệp đang cần đưa ra quyết định hoặc giải quyết vấn đề gì? Bạn có thể chia sẻ những gì đã thử và kết quả mong muốn.",
        chipGroups: [
          { l: "Nội dung tư vấn", c: ["Chiến lược số", "Lộ trình AI", "Rà soát quy trình", "Chiến lược dữ liệu", "Lộ trình tự động hóa", "Lựa chọn nhà cung cấp", "Tự xây dựng hay mua sẵn", "Khác"] },
          { l: "Giai đoạn hiện tại", c: ["Chưa biết bắt đầu từ đâu", "Đang tìm hiểu", "Đã sử dụng một số công cụ", "Đã có lộ trình", "Cần thêm góc nhìn chuyên gia"] },
        ],
      },
      training: {
        title: "Đội ngũ cần được trang bị những gì?",
        sub: "Chọn nhóm học viên và nội dung ưu tiên, sau đó chia sẻ thêm về năng lực hiện tại của đội ngũ.",
        placeholder: "Chương trình dành cho ai, sau đào tạo họ cần làm được gì và doanh nghiệp có yêu cầu nào về thời gian hoặc hình thức tổ chức?",
        chipGroups: [
          { l: "Nhóm học viên", c: ["Ban lãnh đạo", "Quản lý phòng ban", "Khối kinh doanh", "Đội ngũ kỹ thuật", "Toàn doanh nghiệp"] },
          { l: "Nội dung đào tạo", c: ["Kiến thức nền tảng về AI", "Kỹ năng viết prompt", "Tự động hóa công việc", "AI dành cho quản lý", "Ứng dụng theo vị trí công việc", "Sử dụng AI có trách nhiệm", "Chương trình thiết kế riêng"] },
          { l: "Hình thức", c: ["Trực tiếp", "Trực tuyến", "Kết hợp", "Workshop nửa ngày", "Chương trình nhiều buổi"] },
        ],
      },
      not_sure: {
        title: "Điều gì đang cản trở doanh nghiệp?",
        sub: "Chọn nhu cầu gần nhất, sau đó mô tả tình hình hiện tại theo cách của bạn.",
        placeholder: "Bạn muốn cải thiện điều gì, khó khăn hiện tại là gì và kết quả nào sẽ thực sự hữu ích cho doanh nghiệp?",
        chipGroups: [
          { l: "Mục tiêu chính", c: ["Cải thiện vận hành", "Giảm công việc thủ công", "Báo cáo tốt hơn", "Nâng cao trải nghiệm khách hàng", "Đào tạo đội ngũ", "Tìm hiểu về AI", "Khác"] },
          { l: "Tình hình hiện tại", c: ["Excel / Sheets", "Sổ sách / giấy tờ", "Đã có phần mềm", "Nhiều công cụ rời rạc", "Chưa sử dụng công cụ"] },
        ],
      },
    },
    industry: ["Chọn…", "Dịch vụ chuyên môn B2B", "Tài chính", "Bán lẻ và D2C", "Khách sạn và du lịch", "Spa, chăm sóc sức khỏe và làm đẹp", "Nhà hàng và ẩm thực (F&B)", "Y tế", "Giáo dục và đào tạo", "Sản xuất", "Bất động sản và xây dựng", "Logistics và chuỗi cung ứng", "Khác"],
    size: ["Chọn…", "1–10", "11–50", "51–200", "200+"],
    timeline: ["Chọn…", "Đang tìm hiểu", "Trong 1 tháng", "1–3 tháng", "Trên 3 tháng"],
    budget: ["Chưa xác định", "Dưới 100 triệu", "100–500 triệu", "500 triệu – 1 tỷ", "Trên 1 tỷ"],
  },
} as const;

const TILE_ICONS = ["◎", "✦", "◧", "?"];

export default function RequestProposal() {
  const [lang, setLang] = useState<Lang>("vi");
  const [step, setStep] = useState(0);
  const [activeChips, setActiveChips] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const { toast } = useToast();
  const t = T[lang];

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      name: "", email: "", company: "", phone: "", service: "",
      industry: "", size: "", timeline: "", budget: "", details: "", hearabout: "",
    },
  });
  const { register, handleSubmit, setValue, getValues, watch, formState: { errors, submitCount } } = form;
  const showErr = submitCount > 0;

  const service = watch("service");
  const details = watch("details") || "";
  const detailPath = t.detailPaths[(service || "not_sure") as ServiceKey];

  useEffect(() => { document.title = t.title; }, [t.title]);

  const errMsg = (key?: string) => (key ? (t.err as Record<string, string>)[key] ?? "" : "");

  const nextEnabled = useMemo(() => {
    if (step === 0) return !!service;
    if (step === 1) return details.trim().length > 3;
    return true;
  }, [step, service, details]);

  const toggleChip = (label: string) => {
    const cur = getValues("details") || "";
    const tag = `[${label}] `;
    const next = new Set(activeChips);
    if (next.has(label)) {
      next.delete(label);
      setValue("details", cur.replace(tag, ""));
    } else {
      next.add(label);
      setValue("details", tag + cur);
    }
    setActiveChips(next);
  };

  const selectService = (value: ServiceKey) => {
    if (service !== value) {
      setValue("details", "");
      setActiveChips(new Set());
    }
    setValue("service", value);
  };

  const onSubmit = async (v: FormValues) => {
    setSubmitting(true);
    const serviceLabelEN = T.en.services.find((s) => s.v === v.service)?.t ?? v.service;
    const payload = {
      name: v.name,
      email: v.email,
      company: v.company,
      phone: v.phone || "",
      service: serviceLabelEN,
      industry: v.industry || "",
      company_size: v.size || "",
      timeline: v.timeline || "",
      budget: v.budget || "",
      details: v.details,
      hear_about: v.hearabout || "",
      _subject: `New RFP: ${serviceLabelEN}: ${v.company}`,
      source_page: "/start",
      language: lang,
      _replyto: v.email,
    };
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setDone(true);
      } else {
        toast({ title: t.errToast, variant: "destructive" });
      }
    } catch {
      toast({ title: t.errToast, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const goToStep = (nextStep: number) => {
    setStep(nextStep);
    window.setTimeout(() => {
      const panel = document.getElementById("rfp-form");
      const title = panel?.querySelector<HTMLElement>(".rfp-steptitle");
      if (!panel) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top: panel.getBoundingClientRect().top + window.scrollY - 84,
        behavior: reduceMotion ? "auto" : "smooth",
      });
      title?.focus({ preventScroll: true });
    }, 0);
  };

  const goNext = () => {
    if (step < 2) goToStep(step + 1);
  };

  const html = (s: string) => ({ dangerouslySetInnerHTML: { __html: s } });

  return (
    <div className="rfp-page">
      <div className="rfp-shell">
        <div className="rfp-aurora" />
        <div className="rfp-aurora two" />
        <div className="rfp-topfade" />

        <div className="rfp-frame">
          <div className="rfp-brandrow">
            <div className="rfp-langtoggle" role="group" aria-label="Language">
              <button type="button" className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
              <button type="button" className={lang === "vi" ? "on" : ""} onClick={() => setLang("vi")}>VI</button>
            </div>
          </div>

          <header className="rfp-heroarea">
            <span className="rfp-eyebrow">{t.eyebrow}</span>
            <h1 className="rfp-hero" {...html(t.h1)} />
            <p className="rfp-sub">{t.sub}</p>
            <div className="rfp-trust">
              {t.trust.map((x, i) => (
                <span key={i}>{x[0] ? <b>{x[0]}</b> : null}{x[1]}</span>
              ))}
            </div>
          </header>

          <main className="rfp-panelwrap" id="rfp-form">
            <div className="rfp-card">
              <div className="rfp-cardpad">
                <div className="rfp-prog">
                  <div aria-current={step === 0 ? "step" : undefined} className={`rfp-pstep ${step === 0 ? "active" : ""} ${step > 0 ? "done" : ""}`}>
                    <span className="pc">1</span><span className="pl">{t.p1}</span>
                  </div>
                  <div className={`rfp-pbar ${step > 0 ? "fill" : ""}`}><i /></div>
                  <div aria-current={step === 1 ? "step" : undefined} className={`rfp-pstep ${step === 1 ? "active" : ""} ${step > 1 ? "done" : ""}`}>
                    <span className="pc">2</span><span className="pl">{t.p2}</span>
                  </div>
                  <div className={`rfp-pbar ${step > 1 ? "fill" : ""}`}><i /></div>
                  <div aria-current={step === 2 ? "step" : undefined} className={`rfp-pstep ${step === 2 ? "active" : ""}`}>
                    <span className="pc">3</span><span className="pl">{t.p3}</span>
                  </div>
                </div>

                {done ? (
                  <div className="rfp-success">
                    <div className="badge">✓</div>
                    <h3>{t.okTitle}</h3>
                    <p {...html(t.okBody)} />
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  {step === 0 && (
                    <section className="rfp-stepview">
                      <div className="rfp-steptitle" role="heading" aria-level={2} tabIndex={-1}>{t.s1title}</div>
                      <div className="rfp-stepsub">{t.s1sub}</div>
                      <div className="rfp-tiles">
                        {t.services.map((s, i) => (
                          <button
                            type="button"
                            key={s.v}
                            className={`rfp-tile ${service === s.v ? "sel" : ""}`}
                            onClick={() => selectService(s.v)}
                          >
                            <span className="ic">{TILE_ICONS[i]}</span>
                            <h5>{s.t}</h5>
                            <p>{s.d}</p>
                          </button>
                        ))}
                      </div>
                    </section>
                  )}

                  {step === 1 && (
                    <section className="rfp-stepview">
                      <div className="rfp-steptitle" role="heading" aria-level={2} tabIndex={-1}>{detailPath.title}</div>
                      <div className="rfp-stepsub">{detailPath.sub}</div>
                      <div className="rfp-detail-layout">
                        <div className="rfp-chip-panel">
                          {detailPath.chipGroups.map((g, gi) => (
                            <div className="rfp-cgroup" key={gi}>
                              <div className="rfp-cglabel">{g.l}</div>
                              <div className="rfp-chips">
                                {g.c.map((c) => (
                                  <button
                                    type="button"
                                    key={c}
                                    className={`rfp-chip ${activeChips.has(c) ? "on" : ""}`}
                                    onClick={() => toggleChip(c)}
                                  >
                                    {c}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="rfp-detail-panel">
                          <div className="rfp-field">
                            <label className="rfp-fl">{t.fDescribe} <span className="req">*</span></label>
                            <textarea
                              {...register("details")}
                              placeholder={detailPath.placeholder}
                              aria-invalid={showErr && !!errors.details}
                            />
                            {showErr && errors.details && <div className="rfp-err">{errMsg(errors.details.message as string)}</div>}
                          </div>
                          <div className="rfp-grid2">
                            <div className="rfp-field">
                              <label className="rfp-fl">{t.fIndustry}</label>
                              <select {...register("industry")}>
                                {t.industry.map((o, i) => <option key={o} value={i === 0 ? "" : o}>{o}</option>)}
                              </select>
                            </div>
                            <div className="rfp-field">
                              <label className="rfp-fl">{t.fSize}</label>
                              <select {...register("size")}>
                                {t.size.map((o, i) => <option key={o} value={i === 0 ? "" : o}>{o}</option>)}
                              </select>
                            </div>
                            <div className="rfp-field">
                              <label className="rfp-fl">{t.fTimeline}</label>
                              <select {...register("timeline")}>
                                {t.timeline.map((o, i) => <option key={o} value={i === 0 ? "" : o}>{o}</option>)}
                              </select>
                            </div>
                            <div className="rfp-field">
                              <label className="rfp-fl">{t.fBudget}</label>
                              <select {...register("budget")}>
                                {t.budget.map((o) => <option key={o} value={o}>{o}</option>)}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {step === 2 && (
                    <section className="rfp-stepview">
                      <div className="rfp-steptitle" role="heading" aria-level={2} tabIndex={-1}>{t.s3title}</div>
                      <div className="rfp-stepsub">{t.s3sub}</div>
                      <div className="rfp-grid2">
                        <div className="rfp-field">
                          <label className="rfp-fl">{t.fName} <span className="req">*</span></label>
                          <input {...register("name")} placeholder={t.phName} aria-invalid={showErr && !!errors.name} />
                          {showErr && errors.name && <div className="rfp-err">{errMsg(errors.name.message as string)}</div>}
                        </div>
                        <div className="rfp-field">
                          <label className="rfp-fl">{t.fEmail} <span className="req">*</span></label>
                          <input {...register("email")} type="email" placeholder={t.phEmail} aria-invalid={showErr && !!errors.email} />
                          {showErr && errors.email && <div className="rfp-err">{errMsg(errors.email.message as string)}</div>}
                        </div>
                        <div className="rfp-field">
                          <label className="rfp-fl">{t.fCompany} <span className="req">*</span></label>
                          <input {...register("company")} placeholder={t.phCompany} aria-invalid={showErr && !!errors.company} />
                          {showErr && errors.company && <div className="rfp-err">{errMsg(errors.company.message as string)}</div>}
                        </div>
                        <div className="rfp-field">
                          <label className="rfp-fl">{t.fPhone}</label>
                          <input {...register("phone")} placeholder={t.phPhone} />
                        </div>
                      </div>
                      <p className="rfp-consent">{t.consent}</p>
                    </section>
                  )}

                  <div className="rfp-actions">
                    <button
                      type="button"
                      className="rfp-btn ghost"
                      onClick={() => goToStep(Math.max(0, step - 1))}
                      disabled={step === 0}
                    >
                      {t.back}
                    </button>
                    {step < 2 ? (
                      <button type="button" key="rfp-next" className="rfp-btn primary" onClick={goNext} disabled={!nextEnabled}>
                        {t.next}
                      </button>
                    ) : (
                      <button type="button" key="rfp-submit" className="rfp-btn primary" onClick={handleSubmit(onSubmit)} disabled={submitting}>
                        {submitting ? t.sending : t.send}
                      </button>
                    )}
                  </div>
                  </form>
                )}
              </div>
            </div>
          </main>

          <section className="rfp-next" aria-labelledby="rfp-next-title">
            <div className="rfp-nexthead">
              <h2 id="rfp-next-title">{t.nextTitle}</h2>
              <span className="rfp-noobligation"><span className="d" />{t.freeTag}</span>
            </div>
            <div className="rfp-steps">
              <div className="rfp-snode"><span className="num">1</span><p {...html(t.n1)} /></div>
              <div className="rfp-snode"><span className="num">2</span><p {...html(t.n2)} /></div>
              <div className="rfp-snode"><span className="num">3</span><p {...html(t.n3)} /></div>
            </div>
          </section>

          <p className="rfp-fallback" {...html(t.fallback)} />
        </div>
      </div>
    </div>
  );
}
