import type { Lang } from "./langs";

export { LANGS, LANG_LABELS, DEFAULT_LANG, SECONDARY_LANGS, isLang } from "./langs";
export type { Lang } from "./langs";

const en = {
  meta: {
    title: "Frozen Crypto Account Recovery — Binance & Bybit Appeals",
    description:
      "Locked out by an AML flag, a stalled KYC check or a compliance hold? We identify the trigger, build the appeal and deal with the exchange. Documented cases, screenshot-backed.",
  },
  nav: {
    links: [
      { label: "Why accounts freeze", href: "#problems" },
      { label: "Documented cases", href: "#cases" },
      { label: "Process", href: "#process" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Get a free case review",
    menu: "Menu",
    lang: "Lang",
    home: "Home",
    primary: "Main navigation",
  },
  hero: {
    eyebrow: "Crypto Account Recovery",
    headline: "Frozen\ncrypto\naccount\nrecovery.",
    sub: "Exchanges freeze accounts for AML flags, stalled verification and compliance reviews — and rarely explain which one. We identify the real trigger, assemble the evidence the exchange needs, and argue the case until your balance moves again.",
    ctaPrimary: "Get a free case review",
    ctaSecondary: "See documented cases",
    detail: "Free first review · Answered within 24 hours · Complete confidentiality",
  },
  problems: {
    eyebrow: "Why Accounts Get Blocked",
    headline: "Six reasons exchanges freeze access — and what each one really means",
    items: [
      { num: "01", title: "AML flag on incoming funds", desc: "Exchanges score every deposit against chain-analysis databases. If coins you received have passed through a mixer, a sanctioned address or a flagged exchange — even several hops before they reached you — the balance is quarantined. You did nothing wrong; the coins carry the history. This is the single most common freeze, and it is resolved with a documented source-of-funds trail, not with support tickets." },
      { num: "02", title: "KYC verification that never completes", desc: "A rejected document, a name that does not match the bank record, a selfie check that loops forever. The account is not banned, it is stuck — and automated support will keep asking for the same upload. Some exchanges close permanently after repeated failures, which makes the timing of your response matter more than its content." },
      { num: "03", title: "Suspicious activity triggers", desc: "Logging in from a new country, a sudden change in trading volume, rapid deposit-and-withdraw cycles, or a VPN. Risk engines act first and review later, so access is cut instantly and a human only looks at the case once someone escalates it properly." },
      { num: "04", title: "Compliance and regulatory review", desc: "Periodic audits, a new licence in the exchange's jurisdiction, or a request from a regulator can put an account into review with no end date. These are the cases where knowing which department to reach, and in what format, changes weeks into days." },
      { num: "05", title: "Erroneous or tainted transfers", desc: "A deposit to the wrong network, a transfer from an address later linked to fraud, or funds a third party has disputed. The exchange freezes the balance to protect itself while the claim is open — and will keep it frozen until someone answers the claim on your behalf." },
      { num: "06", title: "Security lockouts and account takeovers", desc: "After a suspected compromise, a 2FA reset or a device change, exchanges lock the account by default. Recovery is procedural rather than technical: proving continuity of identity and ownership in the exact sequence the exchange's security team expects." },
    ],
  },
  objections: {
    eyebrow: "Straight Answers",
    headline: "What you are actually wondering",
    items: [
      {
        num: "01",
        title: "How is this not just another recovery scam?",
        desc: "Fair question — the niche is full of them. Two things separate us. First, we never ask for your password, your seed phrase, your 2FA codes or remote access to your device; no legitimate recovery work needs any of them, and anyone who asks is stealing from you. Second, every outcome on this page is published with the exchange's own screenshot behind it. Click any case and read the evidence before you contact us.",
      },
      {
        num: "02",
        title: "What do you actually need from me?",
        desc: "The exchange's messages to you, your transaction history, and proof of where the funds came from. That is the material an appeal is built from. We work with what you already have access to — nothing that would let us move your assets, and nothing that would compromise your account if our systems were breached.",
      },
      {
        num: "03",
        title: "What if you cannot recover it?",
        desc: "Some cases cannot be won — a confirmed sanctions match, or funds already surrendered to a law-enforcement order. We tell you that in the first review rather than after taking your money. Where recovery is genuinely impossible we will say so, and where the realistic outcome is partial — a manual transfer out before closure rather than a fully restored account — we say that too.",
      },
      {
        num: "04",
        title: "Why can I not just appeal myself?",
        desc: "You can, and if your case is simple you should. What we add is knowing which route a given exchange actually reads, what evidence format ends a source-of-funds request in one round instead of six, and how to escalate when the first-line agent is a script. Most cases that reach us have already been through months of support tickets that went nowhere.",
      },
    ],
  },
  why: {
    eyebrow: "What We Promise — And What We Do Not",
    headline: "Every recovery service guarantees results. We would rather tell you the truth.",
    items: [
      { num: "01", title: "We never guarantee recovery", desc: "Outcomes depend on the exchange, the trigger and the facts. Anyone promising a certain result before reading your case is selling you something. We give you an honest read in the first review — including when it is not winnable." },
      { num: "02", title: "We never ask for credentials", desc: "Not your password, not your seed phrase, not your 2FA codes, not remote access. No legitimate recovery requires them. If anyone claiming to be us asks, it is not us." },
      { num: "03", title: "We do not take hopeless cases", desc: "A confirmed sanctions match or funds seized under a court order will not be argued away. We turn those down rather than bill for the attempt." },
      { num: "04", title: "Evidence, not testimonials", desc: "The outcomes on this page are published with the exchange's own screenshots attached. No stock photos, no invented client quotes, no numbers you cannot check against the evidence." },
      { num: "05", title: "One case manager, direct line", desc: "You talk to the person handling your file, not a rotating support queue — in English, Ukrainian or Russian." },
      { num: "06", title: "Strict confidentiality", desc: "Case details are never shared with third parties, and leads are not sold on. Identifying details in our published cases are redacted at the client's request." },
    ],
  },
  process: {
    eyebrow: "How It Works",
    headline: "From application to resolution",
    steps: [
      { num: "01", title: "Free case review — 24 hours", desc: "Send the exchange's messages and a short description. We tell you which of the six triggers you are facing, whether the case is winnable, and what it will take. No charge, and no obligation to continue." },
      { num: "02", title: "Root-cause analysis", desc: "The stated reason and the real reason are often different. We read the freeze notice against the account's transaction history to find what the risk engine actually flagged — because appealing the wrong trigger is why most self-filed appeals fail." },
      { num: "03", title: "Evidence package", desc: "Source-of-funds trail, chain analysis for the deposits in question, identity continuity, and the exchange's own correspondence assembled into the format that specific exchange's compliance desk accepts." },
      { num: "04", title: "Filing and escalation", desc: "The appeal goes to the route that is actually read, not the first-line ticket queue. If it stalls we escalate — and we know at which point escalation helps and at which point it resets your place in line." },
      { num: "05", title: "You stay informed", desc: "You deal with one case manager, not a queue. You are told what was filed, what came back, and what the realistic timeline is — including when the honest answer is that the exchange is simply slow." },
      { num: "06", title: "Resolution", desc: "Access restored, the balance released, or — where the account cannot be saved — a manual transfer of the funds to a wallet you control. You keep the full case file either way." },
    ],
  },
  form: {
    eyebrow: "Get Started",
    headline: "Submit your request",
    sub: "All applications are reviewed within 24 hours. Your information is handled with complete confidentiality.",
    name: "Full Name",
    email: "Email Address",
    telegram: "Telegram",
    phone: "Phone Number",
    exchange: "Exchange or Wallet",
    situation: "Describe your situation",
    submit: "Submit Application",
    submitting: "Sending...",
    ph_name: "John Smith",
    ph_email: "john@example.com",
    ph_telegram: "@username",
    ph_phone: "+1 (000) 000-0000",
    ph_exchange: "Binance, Coinbase, MetaMask...",
    ph_situation: "When was the account frozen? What messages did you receive from the exchange?",
    privacy: "Your data is protected. We maintain strict confidentiality on all case details.",
    success_title: "Application received",
    success_body: "We will contact you within 24 hours.",
    error: "Something went wrong. Please try again or contact us directly.",
  },
  contacts: {
    eyebrow: "Contact Us",
    headline: "Get in touch",
    sub: "Reach out through any of the channels below. We respond to every message.",
    email_label: "Email",
    telegram_label: "Telegram",
    instagram_label: "Instagram",
  },
  cases: {
    eyebrow: "Client Outcomes",
    headline: "Cases we've resolved",
    sub: "Each case is backed by the exchange correspondence or account screenshot it describes. Click any card to view the evidence. Identifying details are redacted at the client's request.",
    view_proof: "View proof",
    disclaimer:
      "Outcomes depend on the exchange, the reason for the freeze, and the specifics of each case. Past results do not guarantee a similar outcome.",
    items: {
      appeal: {
        body: "A balance was isolated under Bybit's “Abnormal Asset Origin” policy, leaving the funding account at zero. We mapped the flag, prepared the documentation, and filed the appeal. The flag was lifted and the assets released.",
        label: "Bybit",
        meta: "Abnormal asset origin · appeal",
        outcome: "Appeal granted · 21,267 USDT released",
        proof: "Bybit funding account, Pending Assets: 21,267 USDT (TRON TRC-20), status “Appeal Successful”.",
      },
      withdrawal: {
        body: "A withdrawal was held during compliance review. Following our submission to the exchange, the transfer was approved and broadcast on-chain.",
        label: "Bybit",
        meta: "Withdrawal held in review",
        outcome: "Released · 27,576.98 USDT sent",
        proof: "Bybit confirmation email: withdrawal status changed to “sent” — 27,576.9793 USDT via Ethereum (ERC-20).",
      },
      manual_transfer: {
        body: "When verification cannot be completed, the account is closed permanently. We secured the exit that preserves the balance — a one-time manual transfer of the full amount to a wallet the client controls.",
        label: "Bybit",
        meta: "Verification could not be completed",
        outcome: "Funds returned to the client's wallet",
        proof: "Bybit Customer Support authorising a one-time manual transfer of available assets to an external wallet address before permanent account closure.",
      },
      binance_withdrawal: {
        body: "Once the account was cleared, the client moved the balance out. The withdrawal was accepted and sent to the network — 171,867 USDT, back in the client's hands.",
        label: "Binance",
        meta: "Balance released · withdrawal",
        outcome: "Withdrawal submitted · 171,867 USDT",
        proof: "Binance Withdraw Crypto — “Withdrawal Request Submitted”: the receiver gets 171,867.37 USDT via Tron (TRC-20), from the Spot Wallet.",
      },
    },
  },
  caseStudies: {
    index: {
      title: "Documented Crypto Account Recovery Cases — Bybit & Binance",
      description:
        "Four resolved cases published with the exchange's own screenshots: an Abnormal Asset Origin appeal, a withdrawal held in compliance review, a manual transfer before closure, and a released Binance balance.",
      heading: "Documented cases",
      intro:
        "Four resolved cases, each published with the exchange correspondence or account screenshot behind it. Each one is written up so the mechanism is useful to you whether or not you ever contact us — what the exchange's system actually flagged, and what it takes to answer it. Identifying details are redacted at the client's request.",
    },
    labels: {
      breadcrumb: "Cases",
      exchange: "Exchange",
      trigger: "Trigger",
      outcome: "Outcome",
      evidence: "The evidence",
      read: "Read the full case",
      back: "All documented cases",
      related: "Other documented cases",
    },
    cta: {
      headline: "Is your case like this one?",
      sub: "Send the exchange's messages and a short description. Within 24 hours you get an honest read on which trigger you are facing and whether the case is winnable — free, and with no obligation to continue.",
      button: "Get a free case review",
    },
    items: {
      appeal: {
        title: "Bybit “Abnormal Asset Origin”: 21,267 USDT Released on Appeal",
        description:
          "A Bybit balance isolated under the Abnormal Asset Origin policy, released after appeal. What the flag actually means and what an appeal against it has to contain.",
        heading: "Bybit “Abnormal Asset Origin”: 21,267 USDT released after appeal",
        intro:
          "A Bybit funding account reading zero, with 21,267 USDT held under the exchange's “Abnormal Asset Origin” policy. The flag was lifted and the assets released. Below is what that policy actually is, and what an appeal against it has to contain.",
        sections: [
          {
            title: "What happened",
            body: "The balance was isolated under Bybit's “Abnormal Asset Origin” policy, which left the funding account showing nothing available. We mapped which deposit had triggered the flag, assembled the documentation for it, and filed the appeal through the route that reaches the compliance desk rather than first-line support. The flag was lifted and the assets were released.",
          },
          {
            title: "What “Abnormal Asset Origin” actually means",
            body: "It is not an accusation against you. Bybit scores incoming deposits against chain-analysis databases, and the label means the coins you received have an on-chain history that touched something scored as high risk — a mixer, a sanctioned address, a cluster attributed to a hacked exchange, sometimes a peer-to-peer desk. That contact may have happened several hops before the coins ever reached you. Because the score attaches to the coins rather than to your conduct, the hold is automatic and there is nothing for a first-line agent to negotiate. The balance sits in an isolated or pending state: visible in the interface, not tradeable, not withdrawable, with no stated end date.",
          },
          {
            title: "Why most self-filed appeals fail here",
            body: "The instinctive response — explaining that you personally did nothing wrong — is not responsive to what was actually asked, so it does not move the case. What moves it is a documented trail from an identifiable origin to the flagged deposit: exchange statements, peer-to-peer trade records, invoices or a payroll trail, with the transaction hashes tying each step together and an explanation of the counterparty. It has to be assembled so a reviewer can follow the chain without asking a follow-up question, because every round trip adds another wait with no clock on it. Identifying which deposit was flagged, before writing anything, is the part people skip.",
          },
        ],
      },
      withdrawal: {
        title: "Bybit Withdrawal Held in Compliance Review — 27,576.98 USDT Released",
        description:
          "A Bybit withdrawal frozen in compliance review and released after submission. Why withdrawals get held when the account itself is fine, and what actually moves one.",
        heading: "Bybit withdrawal held in compliance review: 27,576.98 USDT released",
        intro:
          "A withdrawal stopped during compliance review while the account itself kept working normally. After our submission the transfer was approved and broadcast on-chain. This is a different mechanism from an account freeze, and it fails for a different reason.",
        sections: [
          {
            title: "What happened",
            body: "The withdrawal was held during compliance review. We submitted to the exchange on the client's behalf, the transfer was approved, and it was broadcast to the network — 27,576.9793 USDT via Ethereum (ERC-20), confirmed by Bybit's own status change to “sent”.",
          },
          {
            title: "Why a withdrawal is held when the account looks fine",
            body: "A hold at the withdrawal step is not an account freeze. You can still log in, still trade, still see your full balance — only the transfer out enters manual review. The common triggers are a destination address carrying its own risk score, a first withdrawal to an address the account has never used, an amount that is an outlier for that account's history, a device or country change shortly beforehand, or simple periodic sampling. Because nothing about the account appears broken, this is the case people are most likely to wait out. That is the failure mode: a compliance hold has no built-in expiry, and an unanswered one can sit indefinitely.",
          },
          {
            title: "What actually moves a held transfer",
            body: "The submission has to be about the transaction, not about the account — that is the distinction that decides whether it lands with anyone who can act on it. In practice that means establishing what the destination address is and that it belongs to you, documenting the origin of the specific balance being moved, and putting it in front of the queue that handles transaction review rather than general support. Filing it as an account complaint is the most common way a straightforward hold turns into a months-long ticket thread.",
          },
        ],
      },
      manual_transfer: {
        title: "Verification Could Not Be Completed — Full Balance Recovered Before Closure",
        description:
          "When an exchange cannot complete verification the account closes permanently. Balance return is a separate process with a finite window — here is how that exit is secured.",
        heading: "Verification could not be completed: the full balance recovered before closure",
        intro:
          "When verification cannot be completed, the account is closed permanently and the account itself is not coming back. What is still recoverable is the balance — through a separate process, on a finite window, that most people spend arguing about their documents instead.",
        sections: [
          {
            title: "What happened",
            body: "Verification could not be completed, which meant permanent closure. We secured the exit that preserves the balance: a one-time manual transfer of the full amount to a wallet the client controls, authorised by Bybit Customer Support before the account was closed.",
          },
          {
            title: "Why this is a deadline, not a dispute",
            body: "This outcome is misread more often than any other. It is not a punishment and not an accusation — it happens when the documents simply cannot satisfy the check: a document type the exchange does not accept from your jurisdiction, a name that does not match the supporting record, a residency the exchange no longer serves, a liveness check that keeps failing. Once the exchange has reached that conclusion, the account will not be restored no matter how the appeal is worded. The part that matters is that closure and balance return are handled as two separate processes, and the window in which a manual transfer can still be requested is finite.",
          },
          {
            title: "The ask has to change",
            body: "The right move is to stop appealing the verification and start requesting the exit — a different request, to a different team, with different requirements: proof of continuity of ownership, an external address you control, and an explicit acknowledgement that the account will close. Continuing to argue verification while that window runs is how balances end up stranded inside closed accounts. Recognising which of the two situations you are in, early, is worth more than any argument you can make about the documents.",
          },
        ],
      },
      binance_withdrawal: {
        title: "Binance Balance Released — 171,867 USDT Withdrawn After Clearance",
        description:
          "A cleared Binance account and a 171,867 USDT withdrawal accepted to the network. Why clearing the restriction and getting the balance out are two separate problems.",
        heading: "Binance balance released: 171,867 USDT withdrawn after clearance",
        intro:
          "Once the account was cleared the client moved the balance out, and the withdrawal was accepted and sent to the network. Getting a restriction lifted is not the end of the case — the exit is its own step, and it is the one where recovered balances most often get stuck a second time.",
        sections: [
          {
            title: "What happened",
            body: "With the account cleared, the client submitted the withdrawal and it was accepted — 171,867.37 USDT to the receiving address via Tron (TRC-20), out of the Spot Wallet, confirmed by Binance's own “Withdrawal Request Submitted” screen.",
          },
          {
            title: "Clearing the account and getting the money out are two problems",
            body: "A released account is not a finished case. From the risk engine's point of view, an account that was recently restricted and is now moving its entire balance is a textbook pattern, and it is common for a large post-restriction withdrawal to re-enter review on its own. The moment a balance is released is therefore the moment to plan the exit deliberately, rather than to move everything at once and discover that the same evidence is needed again — this time without the momentum of an open case behind it.",
          },
          {
            title: "What that means in practice",
            body: "Keep the source-of-funds package assembled rather than filing it away, since a second review will ask for the same material. Expect address whitelisting to impose its own delay and start it before you need it. Choose the network deliberately: a chain with lower fees is not automatically the one the exchange treats as lower risk for a large transfer. None of this is dramatic, and all of it is easier to do before the balance is released than after a second hold has already landed.",
          },
        ],
      },
    },
  },
  faq: {
    eyebrow: "Questions",
    headline: "Frequently asked",
    items: [
      { q: "How long does it take to unfreeze a crypto account?", a: "It depends on which trigger caused the freeze and how quickly the exchange's compliance desk responds — neither of which any service controls. A source-of-funds request answered in the right format can close in days; a case sitting with a regulator takes considerably longer. We give you a realistic range for your case after the first review, including when the honest answer is that the exchange is simply slow." },
      { q: "Do you guarantee my account will be recovered?", a: "No, and you should be wary of anyone who does. The outcome depends on the exchange's policies, the reason for the freeze and the facts of your case. What we commit to is an honest assessment in the first review — including telling you when a case is not winnable, rather than billing you for the attempt." },
      { q: "Which exchanges do you handle cases for?", a: "The cases published on this page, with the exchange's own screenshots behind them, are Bybit and Binance. We take cases on other major centralised exchanges too, since the appeal mechanics are broadly similar — but we only claim a documented track record where we can show you the evidence. Tell us which exchange you are dealing with and we will say plainly whether we have handled it." },
      { q: "Will you ever ask for my password, seed phrase or 2FA codes?", a: "Never. No part of preparing an appeal requires them, and anyone who asks for them is stealing from you — including anyone claiming to act on our behalf. We work from the exchange's messages to you, your transaction history and your proof of where the funds came from. Nothing we ask for would let us move your assets." },
      { q: "What does it cost?", a: "The first review is free and carries no obligation. Fees for anything beyond it are set per case, according to complexity and what the appeal requires, and are agreed with you in writing before chargeable work begins. We do not start paid work without your agreement." },
      { q: "Is my information kept confidential?", a: "Yes. Case details are not shared with third parties and enquiries are never sold on. Submissions go to a private chat used solely for handling them — this site keeps no database of applications. Where we publish an outcome as a case study, identifying details are redacted, and only with the client's agreement." },
      { q: "How do I start?", a: "Send the exchange's messages and a short description of what happened through the form on this page. Within 24 hours you get an answer covering which of the common triggers you are most likely facing, whether the case looks winnable, and what it would take. No charge, and no obligation to continue." },
    ],
  },
  closing: {
    headline: "Find out whether your case is winnable",
    sub: "A free review, answered within 24 hours. You will be told the likely trigger, the realistic outcome and what it would take — with no obligation to go further.",
    cta: "Get a free case review",
    reassurance: "We never ask for passwords, seed phrases or 2FA codes.",
  },
  legal: {
    privacy: {
      title: "Privacy Policy — CORESEC FINANCE",
      description:
        "How CORESEC FINANCE collects, uses and stores the information you submit when requesting help with a frozen crypto account.",
      heading: "Privacy Policy",
      intro:
        "This policy explains what we collect when you contact us about a frozen account, why we collect it, and what we do not do with it.",
      sections: [
        { title: "What we collect", body: "Only what you type into the form on this site: your name, email address, and optionally your Telegram handle, phone number, the exchange or wallet involved, and your description of the situation. If you arrived through a partner link, we also record that referral code and the page that referred you." },
        { title: "What we never ask for", body: "We never ask for exchange passwords, seed phrases, private keys, 2FA codes or remote access to your device. No part of the recovery process requires them. Do not send them to us, or to anyone else claiming to act on our behalf." },
        { title: "Who else sees it", body: "Case details are not sold, rented or shared with third parties for marketing. Information is disclosed to an exchange, or to a professional adviser, only where doing so is necessary to advance your case and you have asked us to act. Telegram acts as the messaging provider for delivery." },
        { title: "Your rights", body: "You can ask what we hold about you, ask for it to be corrected, or ask for it to be deleted. Email the address in the footer and we will act on the request. Deletion may end an open case, since we would no longer hold the material needed to work it." },
        { title: "Cookies and analytics", body: "This site sets no advertising or tracking cookies. Your language choice and any referral code are held in your own browser's session storage so the form can include them, and they are cleared when you close the tab." },
      ],
    },
    terms: {
      title: "Terms of Service — CORESEC FINANCE",
      description:
        "The terms under which CORESEC FINANCE provides crypto account recovery consulting, including scope, fees and limitations.",
      heading: "Terms of Service",
      intro:
        "These terms describe what we do, what we do not do, and the limits of what any recovery service can promise.",
      sections: [
        { title: "What the service is", body: "We provide consulting and case-preparation for people whose exchange accounts or wallets have been frozen, restricted or placed under review. That means analysing the cause, assembling the evidence, preparing the appeal and corresponding with the exchange on your behalf." },
        { title: "What the service is not", body: "We are not a law firm and nothing here is legal advice; where a case needs a lawyer we will say so. We do not break into accounts, bypass security, recover lost seed phrases, or reverse completed blockchain transactions. Anyone offering those things is not offering a real service." },
        { title: "No guaranteed outcome", body: "Recovery depends on the exchange's policies, the reason for the freeze and the facts of your case — none of which we control. We do not guarantee that access will be restored or that funds will be released. Past outcomes shown on this site do not predict a similar result in your case." },
        { title: "The first review is free", body: "The initial case review costs nothing and carries no obligation. Fees for work beyond that are agreed with you in writing before it begins, and are set per case according to complexity. We will not begin chargeable work without your agreement." },
        { title: "What we need from you", body: "Accurate information, and the exchange's correspondence as you received it. Cases fail when material facts are withheld. If information you provide is untrue or incomplete in a way that matters, we may stop work." },
        { title: "Limitation of liability", body: "Our responsibility is limited to the fees you have paid us for the case concerned. We are not liable for the decisions of an exchange, for movements in asset value while a case is open, or for losses arising from information you gave us that proved inaccurate." },
        { title: "Confidentiality", body: "We keep case details confidential. Where we publish an outcome as a case study, identifying details are redacted, and we do so only with the client's agreement." },
      ],
    },
  },
  footer: {
    tagline:
      "Appeals and case preparation for frozen exchange accounts — AML holds, stalled verification and compliance reviews.",
    language: "Language",
    legal: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    contact: "Contact",
    email: "core.sec.finance@gmail.com",
    telegram: "@coresec_finance",
    instagram: "coresec.finance",
    rights: "All rights reserved.",
  },
};

export type Dictionary = typeof en;

const uk: Dictionary = {
  meta: {
    title: "Розблокування криптоакаунта — апеляції Binance і Bybit",
    description:
      "Заблокували акаунт через AML, KYC чи комплаєнс-перевірку? Визначаємо причину, готуємо апеляцію та ведемо комунікацію з біржею. Кейси підтверджено скриншотами.",
  },
  nav: {
    links: [
      { label: "Чому блокують", href: "#problems" },
      { label: "Документовані кейси", href: "#cases" },
      { label: "Процес", href: "#process" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Безкоштовний розбір",
    menu: "Меню",
    lang: "Мова",
    home: "Головна",
    primary: "Основна навігація",
  },
  hero: {
    eyebrow: "Відновлення криптоакаунтів",
    headline: "Акаунт\nна біржі\nзаблокували?\nПовернемо.",
    sub: "Біржі блокують акаунти через AML-мітки, незавершену верифікацію та комплаєнс-перевірки — і рідко пояснюють, через що саме. Ми визначаємо справжню причину, збираємо докази, яких вимагає біржа, і ведемо справу, доки ваш баланс не розблокують.",
    ctaPrimary: "Безкоштовний розбір",
    ctaSecondary: "Дивитися кейси",
    detail: "Перший розбір безкоштовно · Відповідь протягом 24 годин · Повна конфіденційність",
  },
  problems: {
    eyebrow: "Чому блокують акаунти",
    headline: "Шість причин, через які біржі закривають доступ — і що кожна означає насправді",
    items: [
      { num: "01", title: "AML-мітка на вхідних коштах", desc: "Біржі перевіряють кожен депозит за базами чейн-аналітики. Якщо монети, які ви отримали, проходили через міксер, санкційну чи позначену адресу — навіть за кілька переказів до вас — баланс потрапляє в карантин. Ви нічого не порушували: історію несуть самі монети. Це найпоширеніша причина блокування, і вирішується вона документально підтвердженим походженням коштів, а не зверненнями в підтримку." },
      { num: "02", title: "Верифікація, яка ніколи не завершується", desc: "Відхилений документ, ім'я, що не збігається з банківськими даними, нескінченна перевірка селфі. Акаунт не забанено — він застряг, а автоматична підтримка знову й знову просить той самий файл. Деякі біржі після кількох невдалих спроб закривають акаунт назавжди, тому час вашої реакції важить більше за її зміст." },
      { num: "03", title: "Тригери підозрілої активності", desc: "Вхід із нової країни, різка зміна обсягів торгівлі, швидкі цикли поповнення й виведення або VPN. Ризик-системи спершу діють, а розбираються потім: доступ закривають миттєво, і людина подивиться на справу лише тоді, коли її грамотно ескалюють." },
      { num: "04", title: "Комплаєнс і регуляторні перевірки", desc: "Планові аудити, нова ліцензія в юрисдикції біржі або запит регулятора можуть відправити акаунт на перевірку без будь-яких термінів. Саме тут знання, до якого відділу звертатися і в якому форматі, перетворює тижні на дні." },
      { num: "05", title: "Помилкові або «брудні» перекази", desc: "Депозит у неправильній мережі, переказ з адреси, яку згодом пов'язали з шахрайством, або кошти, які оскаржує третя сторона. Біржа заморожує баланс, щоб убезпечити себе на час розгляду — і триматиме його замороженим, доки хтось не відповість на претензію від вашого імені." },
      { num: "06", title: "Блокування з міркувань безпеки", desc: "Після підозри на злам, скидання 2FA чи зміни пристрою біржі блокують акаунт за замовчуванням. Відновлення тут процедурне, а не технічне: треба довести безперервність особи й володіння саме в тій послідовності, якої очікує служба безпеки біржі." },
    ],
  },
  objections: {
    eyebrow: "Чесні відповіді",
    headline: "Те, про що ви насправді думаєте",
    items: [
      {
        num: "01",
        title: "Чим ви відрізняєтесь від чергового скаму?",
        desc: "Питання справедливе — у цій ніші шахраїв вистачає. Відрізняє нас дві речі. По-перше, ми ніколи не просимо пароль, seed-фразу, коди 2FA чи віддалений доступ до вашого пристрою; жодна легальна робота з відновлення їх не потребує, і той, хто просить, вас обкрадає. По-друге, кожен результат на цій сторінці опубліковано зі скриншотом від самої біржі. Відкрийте будь-який кейс і подивіться докази ще до звернення.",
      },
      {
        num: "02",
        title: "Що саме вам від мене потрібно?",
        desc: "Повідомлення від біржі, історія ваших транзакцій і підтвердження походження коштів. Саме з цього будується апеляція. Ми працюємо з тим, до чого ви вже маєте доступ, — нічого, що дозволило б нам розпоряджатися вашими активами, і нічого, що зашкодило б акаунту, якби наші системи зламали.",
      },
      {
        num: "03",
        title: "А якщо повернути не вдасться?",
        desc: "Частину справ виграти неможливо — підтверджений санкційний збіг або кошти, вилучені за рішенням правоохоронних органів. Ми скажемо про це на першому розборі, а не після оплати. Якщо повернення справді неможливе — так і скажемо; якщо реалістичний результат частковий (ручний вивід коштів перед закриттям акаунта замість повного відновлення) — скажемо і про це.",
      },
      {
        num: "04",
        title: "Чому я не можу подати апеляцію сам?",
        desc: "Можете, і якщо випадок простий — варто. Ми додаємо знання того, який канал конкретна біржа реально читає, який формат доказів закриває запит про походження коштів за один раунд замість шести, і як ескалювати, коли на першій лінії працює скрипт. Більшість справ доходять до нас після місяців звернень у підтримку, які нічим не завершились.",
      },
    ],
  },
  why: {
    eyebrow: "Що ми обіцяємо — і чого не обіцяємо",
    headline: "Кожен сервіс відновлення гарантує результат. Ми краще скажемо правду.",
    items: [
      { num: "01", title: "Ми не гарантуємо повернення", desc: "Результат залежить від біржі, причини блокування та обставин справи. Той, хто обіцяє конкретний результат, не прочитавши вашу справу, вам щось продає. Ми даємо чесну оцінку на першому розборі — зокрема тоді, коли справу виграти не можна." },
      { num: "02", title: "Ми ніколи не просимо доступи", desc: "Ні пароль, ні seed-фразу, ні коди 2FA, ні віддалений доступ. Легальне відновлення їх не потребує. Якщо хтось від нашого імені їх просить — це не ми." },
      { num: "03", title: "Ми не беремо безнадійні справи", desc: "Підтверджений санкційний збіг або кошти, вилучені за рішенням суду, оскаржити не вдасться. Такі справи ми відхиляємо, а не виставляємо рахунок за спробу." },
      { num: "04", title: "Докази, а не відгуки", desc: "Результати на цій сторінці опубліковано зі скриншотами від самих бірж. Жодних стокових фото, вигаданих цитат клієнтів чи цифр, які неможливо звірити з доказами." },
      { num: "05", title: "Один менеджер, пряма лінія", desc: "Ви спілкуєтеся з людиною, яка веде вашу справу, а не з чергою підтримки — українською, англійською або російською." },
      { num: "06", title: "Сувора конфіденційність", desc: "Деталі справ не передаються третім особам, а заявки не перепродаються. В опублікованих кейсах ідентифікуючі дані приховано на прохання клієнта." },
    ],
  },
  process: {
    eyebrow: "Як це працює",
    headline: "Від заявки до результату",
    steps: [
      { num: "01", title: "Безкоштовний розбір — 24 години", desc: "Надішліть повідомлення від біржі та короткий опис. Ми скажемо, з якою з шести причин ви зіткнулися, чи можна виграти справу і що для цього потрібно. Безкоштовно й без зобов'язань продовжувати." },
      { num: "02", title: "Пошук справжньої причини", desc: "Заявлена причина й реальна часто не збігаються. Ми звіряємо повідомлення про блокування з історією операцій, щоб зрозуміти, що саме позначила ризик-система, — бо апеляція не на ту причину і є головною причиною провалу самостійних звернень." },
      { num: "03", title: "Пакет доказів", desc: "Підтвердження походження коштів, чейн-аналіз спірних депозитів, безперервність особи та листування самої біржі — зібрані у форматі, який приймає комплаєнс саме цієї біржі." },
      { num: "04", title: "Подання та ескалація", desc: "Апеляція йде тим каналом, який реально читають, а не в загальну чергу тікетів. Якщо справа стоїть — ескалюємо, і знаємо, коли ескалація допомагає, а коли обнуляє вашу чергу." },
      { num: "05", title: "Ви в курсі на кожному етапі", desc: "Ви спілкуєтесь з одним менеджером, а не з чергою. Знаєте, що подано, що відповіли й які реальні терміни — зокрема тоді, коли чесна відповідь звучить як «біржа просто повільна»." },
      { num: "06", title: "Результат", desc: "Доступ відновлено, баланс розблоковано — або, якщо акаунт врятувати неможливо, кошти виведено вручну на гаманець, який контролюєте ви. Повний файл справи залишається у вас у будь-якому разі." },
    ],
  },
  form: {
    eyebrow: "Розпочніть",
    headline: "Подайте заявку",
    sub: "Усі заявки розглядаються протягом 24 годин. Ваша інформація обробляється з повною конфіденційністю.",
    name: "Повне ім'я",
    email: "Електронна пошта",
    telegram: "Telegram",
    phone: "Номер телефону",
    exchange: "Біржа або гаманець",
    situation: "Опишіть вашу ситуацію",
    submit: "Надіслати заявку",
    submitting: "Надсилаємо...",
    ph_name: "Іван Петренко",
    ph_email: "ivan@example.com",
    ph_telegram: "@username",
    ph_phone: "+380 (00) 000-00-00",
    ph_exchange: "Binance, Coinbase, MetaMask...",
    ph_situation: "Коли було заморожено акаунт? Які повідомлення надійшли від біржі?",
    privacy: "Ваші дані захищені. Ми зберігаємо сувору конфіденційність у всіх деталях справи.",
    success_title: "Заявку отримано",
    success_body: "Ми зв'яжемося з вами протягом 24 годин.",
    error: "Щось пішло не так. Спробуйте ще раз або зв'яжіться з нами напряму.",
  },
  contacts: {
    eyebrow: "Зв'язок",
    headline: "Зв'яжіться з нами",
    sub: "Пишіть нам будь-яким зручним каналом нижче. Ми відповідаємо на кожне повідомлення.",
    email_label: "Пошта",
    telegram_label: "Telegram",
    instagram_label: "Instagram",
  },
  cases: {
    eyebrow: "Результати клієнтів",
    headline: "Справи, які ми вирішили",
    sub: "Кожну справу підтверджує листування з біржею або скріншот акаунту, який вона описує. Натисніть на картку, щоб переглянути доказ. Ідентифікаційні дані приховані на прохання клієнта.",
    view_proof: "Переглянути доказ",
    disclaimer:
      "Результат залежить від біржі, причини блокування та обставин конкретної справи. Попередні результати не гарантують аналогічного результату.",
    items: {
      appeal: {
        body: "Баланс було ізольовано за політикою Bybit «Abnormal Asset Origin», фандинг-акаунт залишився на нулі. Ми визначили причину позначки, підготували документи та подали апеляцію. Позначку знято, активи розблоковано.",
        label: "Bybit",
        meta: "Аномальне походження активів · апеляція",
        outcome: "Апеляцію задоволено · 21 267 USDT розблоковано",
        proof: "Фандинг-акаунт Bybit, Pending Assets: 21 267 USDT (TRON TRC-20), статус «Appeal Successful».",
      },
      withdrawal: {
        body: "Виведення було затримано під час комплаєнс-перевірки. Після нашого звернення до біржі переказ схвалено та відправлено в мережу.",
        label: "Bybit",
        meta: "Виведення затримано на перевірці",
        outcome: "Розблоковано · 27 576,98 USDT відправлено",
        proof: "Лист-підтвердження Bybit: статус виведення змінено на «відправлено» — 27 576,9793 USDT через Ethereum (ERC-20).",
      },
      manual_transfer: {
        body: "Якщо верифікацію завершити неможливо, акаунт закривають назавжди. Ми забезпечили вихід, що зберігає баланс — одноразовий ручний переказ усієї суми на гаманець, який контролює клієнт.",
        label: "Bybit",
        meta: "Верифікацію завершити неможливо",
        outcome: "Кошти повернуто на гаманець клієнта",
        proof: "Служба підтримки Bybit погоджує одноразовий ручний переказ доступних активів на зовнішній гаманець перед остаточним закриттям акаунту.",
      },
      binance_withdrawal: {
        body: "Щойно акаунт розблокували, клієнт вивів кошти. Запит на виведення прийнято та відправлено в мережу — 171 867 USDT повернулися під контроль клієнта.",
        label: "Binance",
        meta: "Кошти розблоковано · виведення",
        outcome: "Виведення підтверджено · 171 867 USDT",
        proof: "Binance Withdraw Crypto — «Withdrawal Request Submitted»: одержувач отримає 171 867,37 USDT через Tron (TRC-20), зі Spot-гаманця.",
      },
    },
  },
  caseStudies: {
    index: {
      title: "Документовані кейси розблокування криптоакаунтів — Bybit і Binance",
      description:
        "Чотири вирішені справи зі скриншотами від самих бірж: апеляція за Abnormal Asset Origin, виведення на комплаєнс-перевірці, ручний переказ перед закриттям і розблокований баланс Binance.",
      heading: "Документовані кейси",
      intro:
        "Чотири вирішені справи, кожну опубліковано з листуванням біржі або скриншотом акаунта, який її підтверджує. Кожен кейс розписано так, щоб механіка була корисною вам незалежно від того, чи звернетесь ви до нас, — що саме позначила система біржі і що потрібно, щоб на це відповісти. Ідентифікуючі дані приховано на прохання клієнта.",
    },
    labels: {
      breadcrumb: "Кейси",
      exchange: "Біржа",
      trigger: "Причина",
      outcome: "Результат",
      evidence: "Доказ",
      read: "Читати кейс повністю",
      back: "Усі документовані кейси",
      related: "Інші документовані кейси",
    },
    cta: {
      headline: "Ваша ситуація схожа?",
      sub: "Надішліть повідомлення від біржі та короткий опис. Протягом 24 годин отримаєте чесну оцінку: з якою причиною ви зіткнулися і чи можна виграти справу — безкоштовно й без зобов'язань продовжувати.",
      button: "Безкоштовний розбір",
    },
    items: {
      appeal: {
        title: "Bybit «Abnormal Asset Origin»: 21 267 USDT розблоковано за апеляцією",
        description:
          "Баланс на Bybit ізольовано за політикою Abnormal Asset Origin і розблоковано після апеляції. Що насправді означає ця позначка і що має містити апеляція.",
        heading: "Bybit «Abnormal Asset Origin»: 21 267 USDT розблоковано після апеляції",
        intro:
          "Фандинг-акаунт Bybit показує нуль, а 21 267 USDT утримуються за політикою біржі «Abnormal Asset Origin». Позначку знято, активи розблоковано. Нижче — що це за політика насправді і що має містити апеляція проти неї.",
        sections: [
          {
            title: "Що сталося",
            body: "Баланс було ізольовано за політикою Bybit «Abnormal Asset Origin», через що фандинг-акаунт не показував нічого доступного. Ми визначили, який саме депозит спричинив позначку, зібрали документи щодо нього та подали апеляцію тим каналом, який доходить до комплаєнсу, а не до першої лінії підтримки. Позначку знято, активи розблоковано.",
          },
          {
            title: "Що насправді означає «Abnormal Asset Origin»",
            body: "Це не звинувачення на вашу адресу. Bybit оцінює вхідні депозити за базами чейн-аналітики, і ця позначка означає, що монети, які ви отримали, мають ончейн-історію з контактом із чимось високоризиковим — міксером, санкційною адресою, кластером, віднесеним до зламаної біржі, іноді P2P-майданчиком. Цей контакт міг статися за кілька переказів до того, як монети взагалі дійшли до вас. Оскільки оцінка прив'язана до монет, а не до вашої поведінки, утримання відбувається автоматично, і першій лінії підтримки просто нічого обговорювати. Баланс лишається в ізольованому стані: видимий в інтерфейсі, недоступний для торгівлі й виведення, без жодних заявлених термінів.",
          },
          {
            title: "Чому самостійні апеляції тут зазвичай провалюються",
            body: "Інстинктивна реакція — пояснити, що особисто ви нічого не порушували — не відповідає на поставлене питання, тому справу не рухає. Рухає її документований ланцюг від зрозумілого джерела до позначеного депозиту: виписки з бірж, записи P2P-угод, рахунки або підтвердження зарплати, з хешами транзакцій, що зв'язують кожен крок, і поясненням щодо контрагента. Усе це має бути зібрано так, щоб перевіряльник пройшов ланцюг без жодного уточнювального запитання, бо кожен такий обмін додає чергове очікування без будь-яких термінів. Визначити, який саме депозит було позначено, ще до того як щось писати, — саме той крок, який пропускають.",
          },
        ],
      },
      withdrawal: {
        title: "Виведення на Bybit затримано комплаєнсом — 27 576,98 USDT розблоковано",
        description:
          "Виведення на Bybit заморожено на комплаєнс-перевірці та розблоковано після звернення. Чому виведення затримують, коли з акаунтом усе гаразд, і що справді зрушує справу.",
        heading: "Виведення на Bybit затримано комплаєнсом: 27 576,98 USDT розблоковано",
        intro:
          "Виведення зупинили на комплаєнс-перевірці, тоді як сам акаунт працював нормально. Після нашого звернення переказ схвалено та відправлено в мережу. Це інша механіка, ніж блокування акаунта, і провалюється вона з іншої причини.",
        sections: [
          {
            title: "Що сталося",
            body: "Виведення було затримано під час комплаєнс-перевірки. Ми звернулися до біржі від імені клієнта, переказ схвалили та відправили в мережу — 27 576,9793 USDT через Ethereum (ERC-20), що підтверджує зміна статусу на «відправлено» в листі самої Bybit.",
          },
          {
            title: "Чому виведення затримують, коли з акаунтом усе гаразд",
            body: "Затримка на етапі виведення — це не блокування акаунта. Ви входите в акаунт, торгуєте, бачите весь баланс — на ручну перевірку йде тільки переказ назовні. Типові причини: адреса призначення з власним ризик-рейтингом, перше виведення на адресу, якою акаунт ніколи не користувався, сума, нетипова для історії цього акаунта, зміна пристрою чи країни незадовго до того, або звичайна вибіркова перевірка. Оскільки з акаунтом нічого не виглядає зламаним, саме тут люди найчастіше вирішують просто зачекати. У цьому й помилка: комплаєнс-затримка не має вбудованого терміну, і без відповіді вона може тривати як завгодно довго.",
          },
          {
            title: "Що справді зрушує затриманий переказ",
            body: "Звернення має бути про транзакцію, а не про акаунт — саме це вирішує, чи потрапить воно до тих, хто може щось зробити. На практиці це означає підтвердити, що це за адреса призначення і що вона ваша, задокументувати походження саме тієї суми, яка виводиться, і подати все в чергу, що займається перевіркою транзакцій, а не в загальну підтримку. Подати це як скаргу на акаунт — найпоширеніший спосіб перетворити просту затримку на місяці листування.",
          },
        ],
      },
      manual_transfer: {
        title: "Верифікацію завершити неможливо — повний баланс повернуто до закриття",
        description:
          "Якщо біржа не може завершити верифікацію, акаунт закривають назавжди. Повернення балансу — окремий процес із обмеженим вікном; ось як забезпечується цей вихід.",
        heading: "Верифікацію завершити неможливо: повний баланс повернуто до закриття",
        intro:
          "Якщо верифікацію завершити неможливо, акаунт закривають назавжди — і сам акаунт уже не повернути. Повернути можна баланс: через окремий процес, у обмежене вікно, яке більшість людей витрачає на суперечки про документи.",
        sections: [
          {
            title: "Що сталося",
            body: "Верифікацію завершити не вдалося, що означало остаточне закриття акаунта. Ми забезпечили вихід, який зберігає баланс: одноразовий ручний переказ усієї суми на гаманець, який контролює клієнт, погоджений службою підтримки Bybit до закриття акаунта.",
          },
          {
            title: "Чому це дедлайн, а не суперечка",
            body: "Цей сценарій тлумачать хибно частіше за інші. Це не покарання і не звинувачення — так буває, коли документи просто не можуть задовольнити перевірку: тип документа, який біржа не приймає з вашої юрисдикції, ім'я, що не збігається з підтверджувальним записом, резидентство, яке біржа більше не обслуговує, перевірка «живої» присутності, що раз за разом не проходить. Щойно біржа дійшла такого висновку, акаунт не відновлять, хоч би як була сформульована апеляція. Важливо інше: закриття акаунта й повернення балансу — це два окремі процеси, і вікно, у яке ще можна запросити ручний переказ, обмежене.",
          },
          {
            title: "Прохання має змінитися",
            body: "Правильний крок — перестати оскаржувати верифікацію і почати запитувати вихід. Це інше звернення, до іншої команди, з іншими вимогами: підтвердження безперервності володіння, зовнішня адреса під вашим контролем і пряме визнання того, що акаунт буде закрито. Продовжувати сперечатися про верифікацію, поки це вікно спливає, — саме так баланси й залишаються замкненими в закритих акаунтах. Вчасно зрозуміти, у якій із двох ситуацій ви перебуваєте, важить більше за будь-які аргументи щодо документів.",
          },
        ],
      },
      binance_withdrawal: {
        title: "Баланс Binance розблоковано — 171 867 USDT виведено після зняття обмежень",
        description:
          "Розблокований акаунт Binance і виведення 171 867 USDT, прийняте в мережу. Чому зняти обмеження і вивести кошти — це дві різні задачі.",
        heading: "Баланс Binance розблоковано: 171 867 USDT виведено після зняття обмежень",
        intro:
          "Щойно акаунт розблокували, клієнт вивів баланс, і запит на виведення прийняли та відправили в мережу. Зняття обмеження — ще не кінець справи: вихід є окремим етапом, і саме на ньому повернуті баланси найчастіше застрягають удруге.",
        sections: [
          {
            title: "Що сталося",
            body: "Після розблокування акаунта клієнт подав запит на виведення, і його прийняли — 171 867,37 USDT на адресу одержувача через Tron (TRC-20) зі Spot-гаманця, що підтверджує екран Binance «Withdrawal Request Submitted».",
          },
          {
            title: "Розблокувати акаунт і вивести кошти — це дві різні задачі",
            body: "Розблокований акаунт — ще не завершена справа. З погляду ризик-системи акаунт, який щойно мав обмеження і тепер виводить увесь баланс, — це хрестоматійний патерн, і велике виведення одразу після зняття обмежень нерідко саме по собі повертається на перевірку. Тому момент розблокування балансу — це момент, коли вихід треба спланувати свідомо, а не вивести все одразу й виявити, що ті самі докази потрібні знову, цього разу вже без інерції відкритої справи.",
          },
          {
            title: "Що це означає на практиці",
            body: "Тримайте пакет підтверджень походження коштів зібраним, а не відкладеним: повторна перевірка попросить ті самі матеріали. Закладайте затримку на внесення адреси в білий список і починайте це заздалегідь. Обирайте мережу свідомо: ланцюг із нижчою комісією не є автоматично тим, який біржа вважає менш ризиковим для великого переказу. Нічого драматичного в цьому немає — і все це значно легше зробити до розблокування балансу, ніж після того, як уже настала друга затримка.",
          },
        ],
      },
    },
  },
  faq: {
    eyebrow: "Запитання",
    headline: "Поширені запитання",
    items: [
      { q: "Скільки часу займає розблокування криптоакаунта?", a: "Залежить від причини блокування і від того, як швидко відповідає комплаєнс біржі, — жодного з цих чинників не контролює жоден сервіс. Запит про походження коштів, відповідь на який складено правильно, може закритися за кілька днів; справа, що лежить у регулятора, триває значно довше. Реалістичні терміни для вашої справи називаємо після першого розбору — зокрема тоді, коли чесна відповідь звучить як «біржа просто повільна»." },
      { q: "Чи гарантуєте ви повернення акаунта?", a: "Ні, і варто насторожитися щодо тих, хто гарантує. Результат залежить від політики біржі, причини блокування та обставин справи. Ми зобов'язуємось дати чесну оцінку на першому розборі — зокрема сказати, що справу виграти не можна, а не виставити рахунок за спробу." },
      { q: "З якими біржами ви працюєте?", a: "Кейси, опубліковані на цій сторінці зі скриншотами від самих бірж, — це Bybit і Binance. Беремо справи й на інших великих централізованих біржах, бо механіка апеляції там схожа, але заявляємо про підтверджений досвід лише там, де можемо показати докази. Напишіть, з якою біржею маєте справу, — скажемо прямо, чи працювали з нею." },
      { q: "Чи попросите ви пароль, seed-фразу або коди 2FA?", a: "Ніколи. Жоден етап підготовки апеляції їх не потребує, а той, хто їх просить, вас обкрадає — зокрема якщо стверджує, що діє від нашого імені. Ми працюємо з повідомленнями біржі до вас, історією ваших транзакцій і підтвердженням походження коштів. Ніщо з того, що ми просимо, не дає доступу до ваших активів." },
      { q: "Скільки це коштує?", a: "Перший розбір безкоштовний і ні до чого не зобов'язує. Вартість подальшої роботи визначається індивідуально — за складністю та обсягом того, що потребує апеляція, — і узгоджується з вами письмово до початку платної роботи. Без вашої згоди ми її не починаємо." },
      { q: "Чи зберігається конфіденційність моїх даних?", a: "Так. Деталі справ не передаються третім особам, а звернення не перепродаються. Заявки надходять у приватний чат, який використовується виключно для їх обробки, — сайт не веде бази даних заявок. Якщо результат публікується як кейс, ідентифікуючі дані приховуються, і лише за згодою клієнта." },
      { q: "Як розпочати?", a: "Надішліть повідомлення від біржі та короткий опис ситуації через форму на цій сторінці. Протягом 24 годин отримаєте відповідь: з якою з типових причин ви найімовірніше зіткнулися, чи виглядає справа виграшною і що для цього потрібно. Безкоштовно й без зобов'язань продовжувати." },
    ],
  },
  closing: {
    headline: "Дізнайтеся, чи можна виграти вашу справу",
    sub: "Безкоштовний розбір із відповіддю протягом 24 годин. Ми назвемо ймовірну причину блокування, реалістичний результат і те, що для нього потрібно — без жодних зобов'язань.",
    cta: "Безкоштовний розбір",
    reassurance: "Ми ніколи не просимо паролі, seed-фрази чи коди 2FA.",
  },
  legal: {
    privacy: {
      title: "Політика конфіденційності — CORESEC FINANCE",
      description:
        "Як CORESEC FINANCE збирає, використовує та зберігає інформацію, яку ви надсилаєте, звертаючись щодо заблокованого криптоакаунта.",
      heading: "Політика конфіденційності",
      intro:
        "Ця політика пояснює, що ми збираємо, коли ви звертаєтесь щодо заблокованого акаунта, навіщо це збираємо і чого з цими даними не робимо.",
      sections: [
        { title: "Що ми збираємо", body: "Лише те, що ви вводите у форму на цьому сайті: ім'я, email і за бажанням — Telegram, номер телефону, назву біржі чи гаманця та опис ситуації. Якщо ви прийшли за партнерським посиланням, ми також фіксуємо цей реферальний код і сторінку, з якої ви перейшли." },
        { title: "Чого ми ніколи не просимо", body: "Ми ніколи не просимо паролі від бірж, seed-фрази, приватні ключі, коди 2FA чи віддалений доступ до вашого пристрою. Жоден етап відновлення їх не потребує. Не надсилайте їх ні нам, ні будь-кому, хто стверджує, що діє від нашого імені." },
        { title: "Хто ще це бачить", body: "Деталі справ не продаються, не передаються в оренду та не надаються третім особам для маркетингу. Інформація розкривається біржі або профільному раднику лише тоді, коли це потрібно для просування вашої справи і ви попросили нас діяти. Telegram виступає провайдером доставки повідомлень." },
        { title: "Ваші права", body: "Ви можете запитати, які дані ми зберігаємо, вимагати їх виправлення або видалення. Напишіть на адресу у футері — ми виконаємо запит. Видалення може означати завершення відкритої справи, оскільки ми більше не матимемо матеріалів для роботи." },
        { title: "Файли cookie та аналітика", body: "Сайт не встановлює рекламних чи трекінгових cookie. Вибрана мова та реферальний код зберігаються у session storage вашого браузера, щоб форма могла їх передати, і очищуються після закриття вкладки." },
      ],
    },
    terms: {
      title: "Умови використання — CORESEC FINANCE",
      description:
        "Умови, на яких CORESEC FINANCE надає консультації з відновлення криптоакаунтів: обсяг послуг, оплата та обмеження.",
      heading: "Умови використання",
      intro:
        "Ці умови описують, що ми робимо, чого не робимо і які межі має будь-яка обіцянка сервісу з відновлення доступу.",
      sections: [
        { title: "Що таке ця послуга", body: "Ми надаємо консультації та готуємо справи для людей, чиї акаунти на біржах або гаманці заблоковано, обмежено чи відправлено на перевірку. Це аналіз причини, збір доказів, підготовка апеляції та листування з біржею від вашого імені." },
        { title: "Чим ця послуга не є", body: "Ми не юридична фірма, і ніщо тут не є юридичною консультацією; якщо справі потрібен адвокат, ми про це скажемо. Ми не зламуємо акаунти, не обходимо захист, не відновлюємо втрачені seed-фрази і не скасовуємо підтверджені транзакції. Той, хто це пропонує, не надає реальної послуги." },
        { title: "Результат не гарантується", body: "Відновлення залежить від політики біржі, причини блокування та обставин справи — ми не контролюємо жодного з цих чинників. Ми не гарантуємо відновлення доступу чи розблокування коштів. Результати, показані на сайті, не передбачають подібного результату у вашій справі." },
        { title: "Перший розбір безкоштовний", body: "Первинний розбір справи безкоштовний і ні до чого не зобов'язує. Вартість подальшої роботи узгоджується з вами письмово до її початку та визначається індивідуально за складністю. Ми не починаємо платну роботу без вашої згоди." },
        { title: "Що потрібно від вас", body: "Достовірна інформація та листування з біржею в тому вигляді, як ви його отримали. Справи програються тоді, коли істотні факти приховують. Якщо надана вами інформація виявиться неправдивою або істотно неповною, ми можемо припинити роботу." },
        { title: "Обмеження відповідальності", body: "Наша відповідальність обмежена сумою, яку ви сплатили за відповідну справу. Ми не відповідаємо за рішення біржі, за зміну вартості активів протягом розгляду та за збитки, спричинені наданою вами недостовірною інформацією." },
        { title: "Конфіденційність", body: "Ми зберігаємо конфіденційність деталей справ. Якщо результат публікується як кейс, ідентифікуючі дані приховуються, і робимо ми це лише за згодою клієнта." },
      ],
    },
  },
  footer: {
    tagline:
      "Апеляції та підготовка справ щодо заблокованих акаунтів на біржах — AML-мітки, незавершена верифікація, комплаєнс-перевірки.",
    language: "Мова",
    legal: "Правова інформація",
    privacy: "Політика конфіденційності",
    terms: "Умови використання",
    contact: "Контакти",
    email: "core.sec.finance@gmail.com",
    telegram: "@coresec_finance",
    instagram: "coresec.finance",
    rights: "Усі права захищені.",
  },
};

const ru: Dictionary = {
  meta: {
    title: "Разблокировка криптоаккаунта — апелляции Binance и Bybit",
    description:
      "Заблокировали аккаунт из-за AML, KYC или комплаенс-проверки? Определяем причину, готовим апелляцию и ведём переписку с биржей. Кейсы подтверждены скриншотами.",
  },
  nav: {
    links: [
      { label: "Почему блокируют", href: "#problems" },
      { label: "Документированные кейсы", href: "#cases" },
      { label: "Процесс", href: "#process" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Бесплатный разбор",
    menu: "Меню",
    lang: "Язык",
    home: "Главная",
    primary: "Основная навигация",
  },
  hero: {
    eyebrow: "Восстановление криптоаккаунтов",
    headline: "Аккаунт\nна бирже\nзаблокирован?\nВернём.",
    sub: "Биржи блокируют аккаунты из-за AML-меток, незавершённой верификации и комплаенс-проверок — и редко объясняют, из-за чего именно. Мы определяем настоящую причину, собираем доказательства, которых требует биржа, и ведём дело, пока ваш баланс не разблокируют.",
    ctaPrimary: "Бесплатный разбор",
    ctaSecondary: "Смотреть кейсы",
    detail: "Первый разбор бесплатно · Ответ в течение 24 часов · Полная конфиденциальность",
  },
  problems: {
    eyebrow: "Почему блокируют аккаунты",
    headline: "Шесть причин, по которым биржи закрывают доступ — и что каждая значит на самом деле",
    items: [
      { num: "01", title: "AML-метка на входящих средствах", desc: "Биржи проверяют каждый депозит по базам чейн-аналитики. Если полученные вами монеты проходили через миксер, санкционный или помеченный адрес — пусть даже за несколько переводов до вас — баланс отправляется в карантин. Вы ничего не нарушали: историю несут сами монеты. Это самая частая причина блокировки, и решается она документально подтверждённым происхождением средств, а не обращениями в поддержку." },
      { num: "02", title: "Верификация, которая не завершается", desc: "Отклонённый документ, имя, не совпадающее с банковскими данными, бесконечная проверка селфи. Аккаунт не забанен — он застрял, а автоматическая поддержка снова просит тот же файл. Некоторые биржи после нескольких неудачных попыток закрывают аккаунт навсегда, поэтому скорость вашей реакции важнее её содержания." },
      { num: "03", title: "Триггеры подозрительной активности", desc: "Вход из новой страны, резкое изменение объёмов торговли, быстрые циклы пополнения и вывода или VPN. Риск-системы сначала действуют, а разбираются потом: доступ закрывают мгновенно, и человек посмотрит на дело только после грамотной эскалации." },
      { num: "04", title: "Комплаенс и регуляторные проверки", desc: "Плановые аудиты, новая лицензия в юрисдикции биржи или запрос регулятора могут отправить аккаунт на проверку без каких-либо сроков. Именно здесь знание того, в какой отдел обращаться и в каком формате, превращает недели в дни." },
      { num: "05", title: "Ошибочные или «грязные» переводы", desc: "Депозит в неправильной сети, перевод с адреса, который позже связали с мошенничеством, или средства, которые оспаривает третья сторона. Биржа замораживает баланс, чтобы защитить себя на время разбирательства, — и будет держать его замороженным, пока кто-то не ответит на претензию от вашего имени." },
      { num: "06", title: "Блокировки по соображениям безопасности", desc: "После подозрения на взлом, сброса 2FA или смены устройства биржи блокируют аккаунт по умолчанию. Восстановление здесь процедурное, а не техническое: нужно доказать непрерывность личности и владения именно в той последовательности, которую ожидает служба безопасности биржи." },
    ],
  },
  objections: {
    eyebrow: "Честные ответы",
    headline: "То, о чём вы на самом деле думаете",
    items: [
      {
        num: "01",
        title: "Чем вы отличаетесь от очередного скама?",
        desc: "Вопрос справедливый — в этой нише мошенников хватает. Отличают нас две вещи. Во-первых, мы никогда не просим пароль, seed-фразу, коды 2FA или удалённый доступ к вашему устройству; ни одна легальная работа по восстановлению их не требует, и тот, кто просит, вас обкрадывает. Во-вторых, каждый результат на этой странице опубликован со скриншотом от самой биржи. Откройте любой кейс и посмотрите доказательства ещё до обращения.",
      },
      {
        num: "02",
        title: "Что именно вам от меня нужно?",
        desc: "Сообщения от биржи, история ваших транзакций и подтверждение происхождения средств. Именно из этого строится апелляция. Мы работаем с тем, к чему у вас уже есть доступ, — ничего, что позволило бы нам распоряжаться вашими активами, и ничего, что навредило бы аккаунту, если бы наши системы взломали.",
      },
      {
        num: "03",
        title: "А если вернуть не получится?",
        desc: "Часть дел выиграть невозможно — подтверждённое санкционное совпадение или средства, изъятые по решению правоохранительных органов. Мы скажем об этом на первом разборе, а не после оплаты. Если возврат действительно невозможен — так и скажем; если реалистичный результат частичный (ручной вывод средств перед закрытием аккаунта вместо полного восстановления) — скажем и об этом.",
      },
      {
        num: "04",
        title: "Почему я не могу подать апелляцию сам?",
        desc: "Можете, и если случай простой — стоит. Мы добавляем знание того, какой канал конкретная биржа реально читает, какой формат доказательств закрывает запрос о происхождении средств за один раунд вместо шести, и как эскалировать, когда на первой линии работает скрипт. Большинство дел доходят до нас после месяцев обращений в поддержку, которые ничем не закончились.",
      },
    ],
  },
  why: {
    eyebrow: "Что мы обещаем — и чего не обещаем",
    headline: "Каждый сервис восстановления гарантирует результат. Мы лучше скажем правду.",
    items: [
      { num: "01", title: "Мы не гарантируем возврат", desc: "Результат зависит от биржи, причины блокировки и обстоятельств дела. Тот, кто обещает конкретный результат, не прочитав ваше дело, вам что-то продаёт. Мы даём честную оценку на первом разборе — в том числе тогда, когда дело выиграть нельзя." },
      { num: "02", title: "Мы никогда не просим доступы", desc: "Ни пароль, ни seed-фразу, ни коды 2FA, ни удалённый доступ. Легальное восстановление их не требует. Если кто-то от нашего имени их просит — это не мы." },
      { num: "03", title: "Мы не берём безнадёжные дела", desc: "Подтверждённое санкционное совпадение или средства, изъятые по решению суда, оспорить не удастся. Такие дела мы отклоняем, а не выставляем счёт за попытку." },
      { num: "04", title: "Доказательства, а не отзывы", desc: "Результаты на этой странице опубликованы со скриншотами от самих бирж. Никаких стоковых фото, выдуманных цитат клиентов и цифр, которые невозможно сверить с доказательствами." },
      { num: "05", title: "Один менеджер, прямая линия", desc: "Вы общаетесь с человеком, который ведёт ваше дело, а не с очередью поддержки — на русском, английском или украинском." },
      { num: "06", title: "Строгая конфиденциальность", desc: "Детали дел не передаются третьим лицам, а заявки не перепродаются. В опубликованных кейсах идентифицирующие данные скрыты по просьбе клиента." },
    ],
  },
  process: {
    eyebrow: "Как это работает",
    headline: "От заявки до результата",
    steps: [
      { num: "01", title: "Бесплатный разбор — 24 часа", desc: "Пришлите сообщения от биржи и короткое описание. Мы скажем, с какой из шести причин вы столкнулись, можно ли выиграть дело и что для этого нужно. Бесплатно и без обязательств продолжать." },
      { num: "02", title: "Поиск настоящей причины", desc: "Заявленная причина и реальная часто не совпадают. Мы сверяем уведомление о блокировке с историей операций, чтобы понять, что именно пометила риск-система, — потому что апелляция не на ту причину и есть главная причина провала самостоятельных обращений." },
      { num: "03", title: "Пакет доказательств", desc: "Подтверждение происхождения средств, чейн-анализ спорных депозитов, непрерывность личности и переписка самой биржи — собранные в формате, который принимает комплаенс именно этой биржи." },
      { num: "04", title: "Подача и эскалация", desc: "Апелляция идёт по каналу, который реально читают, а не в общую очередь тикетов. Если дело стоит — эскалируем, и знаем, когда эскалация помогает, а когда обнуляет вашу очередь." },
      { num: "05", title: "Вы в курсе на каждом этапе", desc: "Вы общаетесь с одним менеджером, а не с очередью. Знаете, что подано, что ответили и какие реальные сроки — в том числе тогда, когда честный ответ звучит как «биржа просто медленная»." },
      { num: "06", title: "Результат", desc: "Доступ восстановлен, баланс разблокирован — или, если аккаунт спасти невозможно, средства выведены вручную на кошелёк, который контролируете вы. Полный файл дела остаётся у вас в любом случае." },
    ],
  },
  form: {
    eyebrow: "Начните",
    headline: "Подайте заявку",
    sub: "Все заявки рассматриваются в течение 24 часов. Ваша информация обрабатывается с полной конфиденциальностью.",
    name: "Полное имя",
    email: "Электронная почта",
    telegram: "Telegram",
    phone: "Номер телефона",
    exchange: "Биржа или кошелёк",
    situation: "Опишите вашу ситуацию",
    submit: "Отправить заявку",
    submitting: "Отправляем...",
    ph_name: "Иван Петров",
    ph_email: "ivan@example.com",
    ph_telegram: "@username",
    ph_phone: "+00 000 000 0000",
    ph_exchange: "Binance, Coinbase, MetaMask...",
    ph_situation: "Когда был заморожен аккаунт? Какие сообщения пришли от биржи?",
    privacy: "Ваши данные защищены. Мы соблюдаем строгую конфиденциальность по всем деталям дела.",
    success_title: "Заявка получена",
    success_body: "Мы свяжемся с вами в течение 24 часов.",
    error: "Что-то пошло не так. Попробуйте ещё раз или свяжитесь с нами напрямую.",
  },
  contacts: {
    eyebrow: "Связаться",
    headline: "Свяжитесь с нами",
    sub: "Пишите нам любым удобным каналом ниже. Мы отвечаем на каждое сообщение.",
    email_label: "Почта",
    telegram_label: "Telegram",
    instagram_label: "Instagram",
  },
  cases: {
    eyebrow: "Результаты клиентов",
    headline: "Дела, которые мы решили",
    sub: "Каждое дело подтверждается перепиской с биржей или скриншотом аккаунта, который оно описывает. Нажмите на карточку, чтобы увидеть доказательство. Идентифицирующие данные скрыты по просьбе клиента.",
    view_proof: "Смотреть доказательство",
    disclaimer:
      "Результат зависит от биржи, причины блокировки и обстоятельств конкретного дела. Прошлые результаты не гарантируют аналогичного исхода.",
    items: {
      appeal: {
        body: "Баланс был изолирован по политике Bybit «Abnormal Asset Origin», фандинг-аккаунт остался на нуле. Мы определили причину пометки, подготовили документы и подали апелляцию. Пометка снята, активы разблокированы.",
        label: "Bybit",
        meta: "Аномальное происхождение активов · апелляция",
        outcome: "Апелляция удовлетворена · 21 267 USDT разблокировано",
        proof: "Фандинг-аккаунт Bybit, Pending Assets: 21 267 USDT (TRON TRC-20), статус «Appeal Successful».",
      },
      withdrawal: {
        body: "Вывод был задержан во время комплаенс-проверки. После нашего обращения к бирже перевод одобрен и отправлен в сеть.",
        label: "Bybit",
        meta: "Вывод задержан на проверке",
        outcome: "Разблокировано · 27 576,98 USDT отправлено",
        proof: "Письмо-подтверждение Bybit: статус вывода изменён на «отправлено» — 27 576,9793 USDT через Ethereum (ERC-20).",
      },
      manual_transfer: {
        body: "Когда верификацию завершить невозможно, аккаунт закрывают навсегда. Мы обеспечили выход, сохраняющий баланс — единоразовый ручной перевод всей суммы на кошелёк, который контролирует клиент.",
        label: "Bybit",
        meta: "Верификацию завершить невозможно",
        outcome: "Средства возвращены на кошелёк клиента",
        proof: "Служба поддержки Bybit согласует единоразовый ручной перевод доступных активов на внешний кошелёк перед окончательным закрытием аккаунта.",
      },
      binance_withdrawal: {
        body: "Как только аккаунт разблокировали, клиент вывел средства. Запрос на вывод принят и отправлен в сеть — 171 867 USDT вернулись под контроль клиента.",
        label: "Binance",
        meta: "Средства разблокированы · вывод",
        outcome: "Вывод подтверждён · 171 867 USDT",
        proof: "Binance Withdraw Crypto — «Withdrawal Request Submitted»: получатель получит 171 867,37 USDT через Tron (TRC-20), со Spot-кошелька.",
      },
    },
  },
  caseStudies: {
    index: {
      title: "Документированные кейсы разблокировки криптоаккаунтов — Bybit и Binance",
      description:
        "Четыре решённых дела со скриншотами от самих бирж: апелляция по Abnormal Asset Origin, вывод на комплаенс-проверке, ручной перевод перед закрытием и разблокированный баланс Binance.",
      heading: "Документированные кейсы",
      intro:
        "Четыре решённых дела, каждое опубликовано с перепиской биржи или скриншотом аккаунта, который его подтверждает. Каждый кейс расписан так, чтобы механика была полезна вам независимо от того, обратитесь ли вы к нам, — что именно пометила система биржи и что нужно, чтобы на это ответить. Идентифицирующие данные скрыты по просьбе клиента.",
    },
    labels: {
      breadcrumb: "Кейсы",
      exchange: "Биржа",
      trigger: "Причина",
      outcome: "Результат",
      evidence: "Доказательство",
      read: "Читать кейс полностью",
      back: "Все документированные кейсы",
      related: "Другие документированные кейсы",
    },
    cta: {
      headline: "Ваша ситуация похожа?",
      sub: "Отправьте сообщения от биржи и краткое описание. В течение 24 часов получите честную оценку: с какой причиной вы столкнулись и можно ли выиграть дело — бесплатно и без обязательств продолжать.",
      button: "Бесплатный разбор",
    },
    items: {
      appeal: {
        title: "Bybit «Abnormal Asset Origin»: 21 267 USDT разблокировано по апелляции",
        description:
          "Баланс на Bybit изолирован по политике Abnormal Asset Origin и разблокирован после апелляции. Что на самом деле означает эта пометка и что должна содержать апелляция.",
        heading: "Bybit «Abnormal Asset Origin»: 21 267 USDT разблокировано после апелляции",
        intro:
          "Фандинг-аккаунт Bybit показывает ноль, а 21 267 USDT удерживаются по политике биржи «Abnormal Asset Origin». Пометка снята, активы разблокированы. Ниже — что это за политика на самом деле и что должна содержать апелляция против неё.",
        sections: [
          {
            title: "Что произошло",
            body: "Баланс был изолирован по политике Bybit «Abnormal Asset Origin», из-за чего фандинг-аккаунт не показывал ничего доступного. Мы определили, какой именно депозит вызвал пометку, собрали документы по нему и подали апелляцию по каналу, который доходит до комплаенса, а не до первой линии поддержки. Пометка снята, активы разблокированы.",
          },
          {
            title: "Что на самом деле означает «Abnormal Asset Origin»",
            body: "Это не обвинение в ваш адрес. Bybit оценивает входящие депозиты по базам чейн-аналитики, и эта пометка означает, что полученные вами монеты имеют ончейн-историю с контактом с чем-то высокорисковым — миксером, санкционным адресом, кластером, отнесённым к взломанной бирже, иногда P2P-площадкой. Этот контакт мог случиться за несколько переводов до того, как монеты вообще дошли до вас. Поскольку оценка привязана к монетам, а не к вашему поведению, удержание происходит автоматически, и первой линии поддержки попросту нечего обсуждать. Баланс остаётся в изолированном состоянии: виден в интерфейсе, недоступен для торговли и вывода, без каких-либо заявленных сроков.",
          },
          {
            title: "Почему самостоятельные апелляции здесь обычно проваливаются",
            body: "Инстинктивная реакция — объяснить, что лично вы ничего не нарушали — не отвечает на заданный вопрос, поэтому дело не двигает. Двигает его документированная цепочка от понятного источника до помеченного депозита: выписки с бирж, записи P2P-сделок, счета или подтверждение зарплаты, с хешами транзакций, связывающими каждый шаг, и пояснением по контрагенту. Всё это должно быть собрано так, чтобы проверяющий прошёл цепочку без единого уточняющего вопроса, потому что каждый такой обмен добавляет очередное ожидание без всяких сроков. Определить, какой именно депозит был помечен, ещё до того как что-то писать, — как раз тот шаг, который пропускают.",
          },
        ],
      },
      withdrawal: {
        title: "Вывод на Bybit задержан комплаенсом — 27 576,98 USDT разблокировано",
        description:
          "Вывод на Bybit заморожен на комплаенс-проверке и разблокирован после обращения. Почему выводы задерживают, когда с аккаунтом всё в порядке, и что действительно сдвигает дело.",
        heading: "Вывод на Bybit задержан комплаенсом: 27 576,98 USDT разблокировано",
        intro:
          "Вывод остановили на комплаенс-проверке, тогда как сам аккаунт работал нормально. После нашего обращения перевод одобрили и отправили в сеть. Это другая механика, чем блокировка аккаунта, и проваливается она по другой причине.",
        sections: [
          {
            title: "Что произошло",
            body: "Вывод был задержан во время комплаенс-проверки. Мы обратились к бирже от имени клиента, перевод одобрили и отправили в сеть — 27 576,9793 USDT через Ethereum (ERC-20), что подтверждает смена статуса на «отправлено» в письме самой Bybit.",
          },
          {
            title: "Почему вывод задерживают, когда с аккаунтом всё в порядке",
            body: "Задержка на этапе вывода — это не блокировка аккаунта. Вы входите в аккаунт, торгуете, видите весь баланс — на ручную проверку уходит только перевод наружу. Типичные причины: адрес назначения с собственным риск-рейтингом, первый вывод на адрес, которым аккаунт никогда не пользовался, сумма, нетипичная для истории этого аккаунта, смена устройства или страны незадолго до этого, либо обычная выборочная проверка. Поскольку с аккаунтом ничего не выглядит сломанным, именно здесь люди чаще всего решают просто подождать. В этом и ошибка: комплаенс-задержка не имеет встроенного срока, и без ответа она может длиться сколь угодно долго.",
          },
          {
            title: "Что действительно сдвигает задержанный перевод",
            body: "Обращение должно быть о транзакции, а не об аккаунте — именно это решает, попадёт ли оно к тем, кто может что-то сделать. На практике это значит подтвердить, что это за адрес назначения и что он ваш, задокументировать происхождение именно той суммы, которая выводится, и подать всё в очередь, занимающуюся проверкой транзакций, а не в общую поддержку. Подать это как жалобу на аккаунт — самый распространённый способ превратить простую задержку в месяцы переписки.",
          },
        ],
      },
      manual_transfer: {
        title: "Верификацию завершить невозможно — полный баланс возвращён до закрытия",
        description:
          "Если биржа не может завершить верификацию, аккаунт закрывают навсегда. Возврат баланса — отдельный процесс с ограниченным окном; вот как обеспечивается этот выход.",
        heading: "Верификацию завершить невозможно: полный баланс возвращён до закрытия",
        intro:
          "Если верификацию завершить невозможно, аккаунт закрывают навсегда — и сам аккаунт уже не вернуть. Вернуть можно баланс: через отдельный процесс, в ограниченное окно, которое большинство людей тратит на споры о документах.",
        sections: [
          {
            title: "Что произошло",
            body: "Верификацию завершить не удалось, что означало окончательное закрытие аккаунта. Мы обеспечили выход, сохраняющий баланс: единоразовый ручной перевод всей суммы на кошелёк, который контролирует клиент, согласованный службой поддержки Bybit до закрытия аккаунта.",
          },
          {
            title: "Почему это дедлайн, а не спор",
            body: "Этот сценарий понимают неверно чаще остальных. Это не наказание и не обвинение — так бывает, когда документы просто не могут удовлетворить проверку: тип документа, который биржа не принимает из вашей юрисдикции, имя, не совпадающее с подтверждающей записью, резидентство, которое биржа больше не обслуживает, проверка «живого» присутствия, которая раз за разом не проходит. Как только биржа пришла к такому выводу, аккаунт не восстановят, как бы ни была сформулирована апелляция. Важно другое: закрытие аккаунта и возврат баланса — это два отдельных процесса, и окно, в которое ещё можно запросить ручной перевод, ограничено.",
          },
          {
            title: "Просьба должна измениться",
            body: "Правильный шаг — перестать оспаривать верификацию и начать запрашивать выход. Это другое обращение, к другой команде, с другими требованиями: подтверждение непрерывности владения, внешний адрес под вашим контролем и прямое признание того, что аккаунт будет закрыт. Продолжать спорить о верификации, пока это окно истекает, — именно так балансы и остаются запертыми в закрытых аккаунтах. Вовремя понять, в какой из двух ситуаций вы находитесь, значит больше, чем любые аргументы о документах.",
          },
        ],
      },
      binance_withdrawal: {
        title: "Баланс Binance разблокирован — 171 867 USDT выведено после снятия ограничений",
        description:
          "Разблокированный аккаунт Binance и вывод 171 867 USDT, принятый в сеть. Почему снять ограничение и вывести средства — это две разные задачи.",
        heading: "Баланс Binance разблокирован: 171 867 USDT выведено после снятия ограничений",
        intro:
          "Как только аккаунт разблокировали, клиент вывел баланс, и запрос на вывод приняли и отправили в сеть. Снятие ограничения — ещё не конец дела: выход является отдельным этапом, и именно на нём возвращённые балансы чаще всего застревают во второй раз.",
        sections: [
          {
            title: "Что произошло",
            body: "После разблокировки аккаунта клиент подал запрос на вывод, и его приняли — 171 867,37 USDT на адрес получателя через Tron (TRC-20) со Spot-кошелька, что подтверждает экран Binance «Withdrawal Request Submitted».",
          },
          {
            title: "Разблокировать аккаунт и вывести средства — две разные задачи",
            body: "Разблокированный аккаунт — ещё не завершённое дело. С точки зрения риск-системы аккаунт, который только что имел ограничения и теперь выводит весь баланс, — это хрестоматийный паттерн, и крупный вывод сразу после снятия ограничений нередко сам по себе возвращается на проверку. Поэтому момент разблокировки баланса — это момент, когда выход нужно спланировать осознанно, а не вывести всё сразу и обнаружить, что те же доказательства нужны снова, на этот раз уже без инерции открытого дела.",
          },
          {
            title: "Что это значит на практике",
            body: "Держите пакет подтверждений происхождения средств собранным, а не убранным: повторная проверка попросит те же материалы. Закладывайте задержку на внесение адреса в белый список и начинайте это заранее. Выбирайте сеть осознанно: цепочка с меньшей комиссией не является автоматически той, которую биржа считает менее рискованной для крупного перевода. Ничего драматичного в этом нет — и всё это значительно легче сделать до разблокировки баланса, чем после того, как уже наступила вторая задержка.",
          },
        ],
      },
    },
  },
  faq: {
    eyebrow: "Вопросы",
    headline: "Часто задаваемые",
    items: [
      { q: "Сколько времени занимает разблокировка криптоаккаунта?", a: "Зависит от причины блокировки и от того, как быстро отвечает комплаенс биржи, — ни один из этих факторов не контролирует ни один сервис. Запрос о происхождении средств, ответ на который составлен правильно, может закрыться за несколько дней; дело, лежащее у регулятора, идёт значительно дольше. Реалистичные сроки по вашему делу называем после первого разбора — в том числе тогда, когда честный ответ звучит как «биржа просто медленная»." },
      { q: "Гарантируете ли вы возврат аккаунта?", a: "Нет, и к тем, кто гарантирует, стоит отнестись настороженно. Результат зависит от политики биржи, причины блокировки и обстоятельств дела. Мы обязуемся дать честную оценку на первом разборе — в том числе сказать, что дело выиграть нельзя, а не выставить счёт за попытку." },
      { q: "С какими биржами вы работаете?", a: "Кейсы, опубликованные на этой странице со скриншотами от самих бирж, — это Bybit и Binance. Берём дела и на других крупных централизованных биржах, так как механика апелляции там схожая, но заявляем о подтверждённом опыте только там, где можем показать доказательства. Напишите, с какой биржей имеете дело, — скажем прямо, работали ли мы с ней." },
      { q: "Попросите ли вы пароль, seed-фразу или коды 2FA?", a: "Никогда. Ни один этап подготовки апелляции их не требует, а тот, кто их просит, вас обкрадывает — в том числе если утверждает, что действует от нашего имени. Мы работаем с сообщениями биржи к вам, историей ваших транзакций и подтверждением происхождения средств. Ничто из того, что мы просим, не даёт доступа к вашим активам." },
      { q: "Сколько это стоит?", a: "Первый разбор бесплатный и ни к чему не обязывает. Стоимость дальнейшей работы определяется индивидуально — по сложности и объёму того, что требует апелляция, — и согласовывается с вами письменно до начала платной работы. Без вашего согласия мы её не начинаем." },
      { q: "Сохраняется ли конфиденциальность моих данных?", a: "Да. Детали дел не передаются третьим лицам, а обращения не перепродаются. Заявки поступают в приватный чат, используемый исключительно для их обработки, — сайт не ведёт базу данных заявок. Если результат публикуется как кейс, идентифицирующие данные скрываются, и только с согласия клиента." },
      { q: "Как начать?", a: "Отправьте сообщения от биржи и краткое описание ситуации через форму на этой странице. В течение 24 часов получите ответ: с какой из типичных причин вы вероятнее всего столкнулись, выглядит ли дело выигрышным и что для этого нужно. Бесплатно и без обязательств продолжать." },
    ],
  },
  closing: {
    headline: "Узнайте, можно ли выиграть ваше дело",
    sub: "Бесплатный разбор с ответом в течение 24 часов. Мы назовём вероятную причину блокировки, реалистичный результат и то, что для него нужно — без каких-либо обязательств.",
    cta: "Бесплатный разбор",
    reassurance: "Мы никогда не просим пароли, seed-фразы или коды 2FA.",
  },
  legal: {
    privacy: {
      title: "Политика конфиденциальности — CORESEC FINANCE",
      description:
        "Как CORESEC FINANCE собирает, использует и хранит информацию, которую вы отправляете при обращении по заблокированному криптоаккаунту.",
      heading: "Политика конфиденциальности",
      intro:
        "Эта политика объясняет, что мы собираем, когда вы обращаетесь по заблокированному аккаунту, зачем мы это собираем и чего с этими данными не делаем.",
      sections: [
        { title: "Что мы собираем", body: "Только то, что вы вводите в форму на этом сайте: имя, email и по желанию — Telegram, номер телефона, название биржи или кошелька и описание ситуации. Если вы пришли по партнёрской ссылке, мы также фиксируем этот реферальный код и страницу, с которой вы перешли." },
        { title: "Чего мы никогда не просим", body: "Мы никогда не просим пароли от бирж, seed-фразы, приватные ключи, коды 2FA или удалённый доступ к вашему устройству. Ни один этап восстановления их не требует. Не отправляйте их ни нам, ни кому-либо, кто утверждает, что действует от нашего имени." },
        { title: "Кто ещё это видит", body: "Детали дел не продаются, не сдаются в аренду и не передаются третьим лицам для маркетинга. Информация раскрывается бирже или профильному консультанту только тогда, когда это необходимо для продвижения вашего дела и вы попросили нас действовать. Telegram выступает провайдером доставки сообщений." },
        { title: "Ваши права", body: "Вы можете запросить, какие данные мы храним, потребовать их исправления или удаления. Напишите на адрес в футере — мы выполним запрос. Удаление может означать завершение открытого дела, поскольку у нас больше не будет материалов для работы." },
        { title: "Файлы cookie и аналитика", body: "Сайт не устанавливает рекламных или трекинговых cookie. Выбранный язык и реферальный код хранятся в session storage вашего браузера, чтобы форма могла их передать, и очищаются при закрытии вкладки." },
      ],
    },
    terms: {
      title: "Условия использования — CORESEC FINANCE",
      description:
        "Условия, на которых CORESEC FINANCE оказывает консультации по восстановлению криптоаккаунтов: объём услуг, оплата и ограничения.",
      heading: "Условия использования",
      intro:
        "Эти условия описывают, что мы делаем, чего не делаем и какие пределы есть у любого обещания сервиса по восстановлению доступа.",
      sections: [
        { title: "Что такое эта услуга", body: "Мы оказываем консультации и готовим дела для людей, чьи аккаунты на биржах или кошельки заблокированы, ограничены или отправлены на проверку. Это анализ причины, сбор доказательств, подготовка апелляции и переписка с биржей от вашего имени." },
        { title: "Чем эта услуга не является", body: "Мы не юридическая фирма, и ничто здесь не является юридической консультацией; если делу нужен адвокат, мы об этом скажем. Мы не взламываем аккаунты, не обходим защиту, не восстанавливаем утерянные seed-фразы и не отменяем подтверждённые транзакции. Тот, кто это предлагает, не оказывает реальной услуги." },
        { title: "Результат не гарантируется", body: "Восстановление зависит от политики биржи, причины блокировки и обстоятельств дела — мы не контролируем ни один из этих факторов. Мы не гарантируем восстановление доступа или разблокировку средств. Результаты, показанные на сайте, не предсказывают подобного результата в вашем деле." },
        { title: "Первый разбор бесплатный", body: "Первичный разбор дела бесплатен и ни к чему не обязывает. Стоимость дальнейшей работы согласовывается с вами письменно до её начала и определяется индивидуально по сложности. Мы не начинаем платную работу без вашего согласия." },
        { title: "Что нужно от вас", body: "Достоверная информация и переписка с биржей в том виде, как вы её получили. Дела проигрываются тогда, когда существенные факты скрывают. Если предоставленная вами информация окажется недостоверной или существенно неполной, мы можем прекратить работу." },
        { title: "Ограничение ответственности", body: "Наша ответственность ограничена суммой, которую вы оплатили за соответствующее дело. Мы не отвечаем за решения биржи, за изменение стоимости активов в течение разбирательства и за убытки, вызванные предоставленной вами недостоверной информацией." },
        { title: "Конфиденциальность", body: "Мы сохраняем конфиденциальность деталей дел. Если результат публикуется как кейс, идентифицирующие данные скрываются, и делаем мы это только с согласия клиента." },
      ],
    },
  },
  footer: {
    tagline:
      "Апелляции и подготовка дел по заблокированным аккаунтам на биржах — AML-метки, незавершённая верификация, комплаенс-проверки.",
    language: "Язык",
    legal: "Правовая информация",
    privacy: "Политика конфиденциальности",
    terms: "Условия использования",
    contact: "Контакты",
    email: "core.sec.finance@gmail.com",
    telegram: "@coresec_finance",
    instagram: "coresec.finance",
    rights: "Все права защищены.",
  },
};

export const dictionaries: Record<Lang, Dictionary> = { en, uk, ru };
