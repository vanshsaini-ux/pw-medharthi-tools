const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || 'PW Medharthi';
const PRIVACY_URL = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL || '#';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-navy-700/10 bg-navy-950 text-white/70">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm">
        <p className="max-w-2xl">
          These tools provide data-informed guidance and are not a substitute for personalised counselling.
          For a detailed discussion of your specific situation, {BRAND}&rsquo;s program counsellors are
          available via chat, call, or WhatsApp.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-white/50">
          <span>© {new Date().getFullYear()} {BRAND}</span>
          <a href={PRIVACY_URL} className="underline hover:text-white">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
