import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import "./request-proposal.css";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzdnwkqv";

type Lang = "en" | "vi";

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
    sub: "From a single app to a full transformation: booking systems, dashboards, mobile apps, automation, data platforms, or AI. We assess your case across an ecosystem of 60+ vetted partners and come back with a staged, de-risked roadmap. No single-vendor lock-in.",
    trust: [["36", "projects delivered"], ["60+", "partner ecosystem"], ["16+", "domain experts"], ["", "Vietnam · Japan · SEA"]],
    nextTitle: "What happens next",
    n1: "<b>We review &amp; match.</b> Within 2–3 business days we assess your case and match the right people or partners.",
    n2: "<b>We come back with a plan.</b> A shortlist, roadmap sketch, or quote sized to you, not a generic deck.",
    n3: "<b>You decide, no obligation.</b> The initial assessment costs nothing. You commit only when the path is clear.",
    freeTag: "Free first assessment · no obligation",
    fallback: 'Prefer to talk first? <a href="mailto:duc.truong@aipartners.asia">Email us</a> · 224A Điện Biên Phủ, Xuân Hòa Ward, HCMC',
    p1: "Need", p2: "Details", p3: "Contact",
    s1title: "What do you need?", s1sub: "Pick the closest option. You can explain more in the next step.",
    s2title: "Tell us about it", s2sub: "Tap the chips to add details, then describe it in your own words.",
    s3title: "Where do we send the plan?", s3sub: "One last step so we can reach you.",
    fDescribe: "Describe what you need",
    phDescribe: "Describe the problem or workflow in plain words: what you're trying to do, who will use it, and what 'done' looks like. Tap the chips above to add details.",
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
    chipGroups: [
      { l: "What kind of solution", c: ["Booking / scheduling", "POS / payments", "Customer management (CRM)", "Loyalty / memberships", "Inventory", "Multi-branch", "Mobile app", "Web portal", "Dashboard / reporting", "Automation", "Website", "AI assistant", "Other"] },
      { l: "Where it runs", c: ["Phone app", "Web", "Internal tool", "Customer-facing"] },
      { l: "What you use today", c: ["Excel / Sheets", "Paper", "Existing POS", "Zalo", "Accounting software", "Nothing yet"] },
    ],
    industry: ["Select…", "B2B Professional Services", "Finance", "Retail & D2C", "Hospitality & Tourism", "Spa, Wellness & Beauty", "Food & Beverage (F&B)", "Healthcare", "Education", "Manufacturing", "Real Estate & Construction", "Logistics & Supply Chain", "Other"],
    size: ["Select…", "1–10", "11–50", "51–200", "200+"],
    timeline: ["Select…", "Just exploring", "Within 1 month", "1–3 months", "3+ months"],
    budget: ["Not sure yet", "< $5k", "$5k–$20k", "$20k–$50k", "$50k+"],
  },
  vi: {
    title: "Bắt đầu dự án | AIPartners.asia",
    eyebrow: "Đối tác chuyển đổi số toàn diện",
    h1: 'Chia sẻ nhu cầu. <span class="g">Chúng tôi đề xuất hướng đi phù hợp.</span>',
    sub: "Dù bạn cần một hệ thống đặt lịch, dashboard, ứng dụng di động hay chương trình chuyển đổi toàn diện về tự động hóa, dữ liệu và AI, AIP đều bắt đầu từ nhu cầu thực tế của doanh nghiệp. Chúng tôi lựa chọn chuyên gia và đối tác phù hợp từ mạng lưới hơn 60 đơn vị đã được thẩm định, sau đó xây dựng lộ trình triển khai theo từng giai đoạn. Nhờ đó, doanh nghiệp có được giải pháp phù hợp hơn, giảm rủi ro và không bị ràng buộc vào một nhà cung cấp duy nhất.",
    trust: [["36", "dự án đã triển khai"], ["60+", "đối tác trong hệ sinh thái"], ["16+", "chuyên gia lĩnh vực"], ["", "Việt Nam · Nhật Bản · ĐNÁ"]],
    nextTitle: "Các bước tiếp theo",
    n1: "<b>Tiếp nhận &amp; kết nối.</b> Trong 2–3 ngày làm việc, chúng tôi xem xét nhu cầu và chọn chuyên gia hoặc đối tác phù hợp.",
    n2: "<b>Phản hồi bằng kế hoạch.</b> Danh sách đối tác, phác thảo lộ trình hoặc báo giá theo đúng thực tế của bạn, không dùng mẫu chung.",
    n3: "<b>Bạn quyết định, không ràng buộc.</b> Bước đánh giá ban đầu hoàn toàn miễn phí. Bạn chỉ triển khai khi phương án đã rõ ràng.",
    freeTag: "Đánh giá ban đầu miễn phí · không ràng buộc",
    fallback: 'Bạn muốn trao đổi trước? Hãy <a href="mailto:duc.truong@aipartners.asia">gửi email cho chúng tôi</a> · 224A Điện Biên Phủ, phường Xuân Hòa, TP.HCM',
    p1: "Nhu cầu", p2: "Chi tiết", p3: "Liên hệ",
    s1title: "Bạn đang cần hỗ trợ về vấn đề nào?", s1sub: "Chọn phương án gần nhất. Bạn có thể mô tả chi tiết hơn ở bước tiếp theo.",
    s2title: "Mô tả nhu cầu của bạn", s2sub: "Chạm vào các gợi ý để bổ sung chi tiết, rồi mô tả theo cách của bạn.",
    s3title: "Chúng tôi liên hệ với bạn ở đâu?", s3sub: "Chỉ cần để lại thông tin để chúng tôi có thể liên hệ với bạn.",
    fDescribe: "Mô tả nhu cầu",
    phDescribe: "Hãy mô tả nhu cầu theo cách đơn giản nhất: bạn muốn giải quyết vấn đề gì, ai sẽ sử dụng và kết quả mong đợi là gì. Chạm vào các gợi ý phía trên để bổ sung thông tin.",
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
    chipGroups: [
      { l: "Loại giải pháp", c: ["Đặt chỗ / đặt lịch", "POS / thanh toán", "Quản lý khách hàng (CRM)", "Tích điểm / thành viên", "Quản lý kho", "Nhiều chi nhánh", "Ứng dụng di động", "Cổng thông tin", "Dashboard / báo cáo", "Tự động hóa", "Website", "Trợ lý AI", "Khác"] },
      { l: "Nền tảng sử dụng", c: ["Ứng dụng di động", "Web", "Công cụ nội bộ", "Dành cho khách hàng"] },
      { l: "Công cụ hiện tại", c: ["Excel / Sheets", "Sổ sách / giấy tờ", "POS hiện có", "Zalo", "Phần mềm kế toán", "Chưa dùng gì"] },
    ],
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

  const goNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const html = (s: string) => ({ dangerouslySetInnerHTML: { __html: s } });

  return (
    <div className="rfp-page">
      <div className="rfp-shell">
        <div className="rfp-aurora" />
        <div className="rfp-aurora two" />
        <div className="rfp-topfade" />
        <div className="rfp-brandrow">
          <div className="rfp-langtoggle" role="group" aria-label="Language">
            <button type="button" className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
            <button type="button" className={lang === "vi" ? "on" : ""} onClick={() => setLang("vi")}>VI</button>
          </div>
        </div>

        {/* LEFT RAIL */}
        <aside className="rfp-rail">
          <div className="rfp-railbody">
            <span className="rfp-eyebrow">{t.eyebrow}</span>
            <h1 className="rfp-hero" {...html(t.h1)} />
            <p className="rfp-sub">{t.sub}</p>
            <div className="rfp-trust">
              {t.trust.map((x, i) => (
                <span key={i}>{x[0] ? <b>{x[0]}</b> : null}{x[1]}</span>
              ))}
            </div>
          </div>

          <div className="rfp-next">
            <h4>{t.nextTitle}</h4>
            <div className="rfp-steps">
              <div className="line" />
              <div className="rfp-snode"><span className="num">1</span><p {...html(t.n1)} /></div>
              <div className="rfp-snode"><span className="num">2</span><p {...html(t.n2)} /></div>
              <div className="rfp-snode"><span className="num">3</span><p {...html(t.n3)} /></div>
            </div>
            <span className="rfp-noobligation"><span className="d" />{t.freeTag}</span>
          </div>

          <p className="rfp-fallback" {...html(t.fallback)} />
        </aside>

        {/* RIGHT FORM */}
        <main className="rfp-panelwrap">
          <div className="rfp-card">
            <div className="rfp-cardpad">
              <div className="rfp-prog">
                <div className={`rfp-pstep ${step === 0 ? "active" : ""} ${step > 0 ? "done" : ""}`}>
                  <span className="pc">1</span><span className="pl">{t.p1}</span>
                </div>
                <div className={`rfp-pbar ${step > 0 ? "fill" : ""}`}><i /></div>
                <div className={`rfp-pstep ${step === 1 ? "active" : ""} ${step > 1 ? "done" : ""}`}>
                  <span className="pc">2</span><span className="pl">{t.p2}</span>
                </div>
                <div className={`rfp-pbar ${step > 1 ? "fill" : ""}`}><i /></div>
                <div className={`rfp-pstep ${step === 2 ? "active" : ""}`}>
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
                      <div className="rfp-steptitle">{t.s1title}</div>
                      <div className="rfp-stepsub">{t.s1sub}</div>
                      <div className="rfp-tiles">
                        {t.services.map((s, i) => (
                          <button
                            type="button"
                            key={s.v}
                            className={`rfp-tile ${service === s.v ? "sel" : ""}`}
                            onClick={() => setValue("service", s.v)}
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
                      <div className="rfp-steptitle">{t.s2title}</div>
                      <div className="rfp-stepsub">{t.s2sub}</div>
                      {t.chipGroups.map((g, gi) => (
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
                      <div className="rfp-field" style={{ marginTop: 6 }}>
                        <label className="rfp-fl">{t.fDescribe} <span className="req">*</span></label>
                        <textarea
                          {...register("details")}
                          placeholder={t.phDescribe}
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
                    </section>
                  )}

                  {step === 2 && (
                    <section className="rfp-stepview">
                      <div className="rfp-steptitle">{t.s3title}</div>
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
                      onClick={() => setStep(Math.max(0, step - 1))}
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
      </div>
    </div>
  );
}
