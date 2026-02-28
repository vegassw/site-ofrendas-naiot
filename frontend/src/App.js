import { useState, useEffect, useRef } from "react";
import "@/App.css";
import { Toaster, toast } from "sonner";
import { Copy, Check, Instagram, Facebook, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

// TikTok Icon component (not available in lucide-react)
const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// Bank data
const bankData = {
  holder: "Carlos Toro",
  bank: "Banco de Chile",
  accountType: "Cuenta Corriente",
  accountNumber: "16-43667-09",
  rut: "12.483.549-6"
};

// Full account text for copy all
const fullAccountText = `Carlos Toro
12.483.549-6
Banco de Chile
Cuenta Corriente
16-43667-09`;

// Social links
const socialLinks = {
  instagram: "https://www.instagram.com/naiot_ministeriocristiano?igsh=Z3YwZXZlbXByNXRv",
  facebook: "https://www.facebook.com/share/1AtxhH3xxZ/?mibextid=wwXIfr",
  tiktok: "https://www.tiktok.com/@ministerionaiot?_r=1&_t=ZS-94Hc7on39Ue"
};

// Logo URLs
const logoTransparent = "https://customer-assets.emergentagent.com/job_d2edaac8-a499-4f65-b268-280f8c89e569/artifacts/wensd3tp_Logo_sin_fondo.jpg.png";

// Copy Button Component
const CopyButton = ({ text, label }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(`${label} copiado al portapapeles`);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Error al copiar");
    }
  };

  return (
    <button
      data-testid={`copy-${label.toLowerCase().replace(/\s/g, '-')}`}
      onClick={handleCopy}
      className={`copy-btn ${copied ? 'copied' : ''}`}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      <span>{copied ? 'Copiado' : 'Copiar'}</span>
    </button>
  );
};

// Data Row Component
const DataRow = ({ label, value, copyLabel }) => (
  <div className="data-row flex flex-col sm:flex-row sm:items-center justify-between gap-3">
    <div className="flex-1">
      <p className="text-xs uppercase tracking-widest text-zinc-400 mb-1 font-body">{label}</p>
      <p className="text-lg sm:text-xl font-medium text-zinc-900 font-body tracking-wide">{value}</p>
    </div>
    {copyLabel && <CopyButton text={value} label={copyLabel} />}
  </div>
);

// Copy All Button Component
const CopyAllButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Todos los datos copiados al portapapeles");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Error al copiar");
    }
  };

  return (
    <button
      data-testid="copy-all-data"
      onClick={handleCopy}
      className={`w-full py-4 px-6 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-3 ${
        copied 
          ? 'bg-green-500 text-white' 
          : 'bg-zinc-900 text-white hover:bg-zinc-800 hover:scale-[1.01]'
      }`}
    >
      {copied ? <Check size={18} /> : <Copy size={18} />}
      <span>{copied ? 'Datos Copiados' : 'Copiar Todos los Datos'}</span>
    </button>
  );
};

// Bank Card Component
const BankCard = () => (
  <div data-testid="bank-card" className="bank-card p-6 sm:p-8 md:p-10 max-w-lg w-full mx-auto">
    {/* Card Header */}
    <div className="mb-8">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 mb-2 font-body">Datos de Transferencia</p>
      <h3 className="text-2xl sm:text-3xl font-display font-medium text-zinc-900">
        {bankData.holder}
      </h3>
      <p className="text-base text-[#0A1F5C] font-semibold font-body mt-2">{bankData.bank}</p>
    </div>

    {/* Divider */}
    <div className="divider mb-6"></div>

    {/* Data Fields */}
    <div className="space-y-4">
      <DataRow 
        label="Tipo de Cuenta" 
        value={bankData.accountType} 
      />
      <DataRow 
        label="Número de Cuenta" 
        value={bankData.accountNumber} 
        copyLabel="Cuenta"
      />
      <DataRow 
        label="RUT" 
        value={bankData.rut} 
        copyLabel="RUT"
      />
    </div>

    {/* Copy All Button */}
    <div className="mt-8 pt-6 border-t border-zinc-100">
      <CopyAllButton text={fullAccountText} />
    </div>
  </div>
);

// Floating Social Buttons Component
const FloatingSocial = () => (
  <div data-testid="floating-social" className="floating-social">
    <a 
      href={socialLinks.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="social-btn instagram animate-floatIn animation-delay-100"
      data-testid="social-instagram"
      aria-label="Instagram"
    >
      <Instagram size={22} />
    </a>
    <a 
      href={socialLinks.facebook}
      target="_blank"
      rel="noopener noreferrer"
      className="social-btn facebook animate-floatIn animation-delay-200"
      data-testid="social-facebook"
      aria-label="Facebook"
    >
      <Facebook size={22} />
    </a>
    <a 
      href={socialLinks.tiktok}
      target="_blank"
      rel="noopener noreferrer"
      className="social-btn tiktok animate-floatIn animation-delay-300"
      data-testid="social-tiktok"
      aria-label="TikTok"
    >
      <TikTokIcon />
    </a>
  </div>
);

// Navigation Button Component - REMOVED per user request
// const NavButton = () => { ... };

// Home Page Component
const HomePage = () => (
  <div data-testid="naiot-landing" className="min-h-screen">
    {/* Split Layout Container */}
    <div className="flex flex-col md:flex-row min-h-screen">
      
      {/* Hero Section - Dark */}
      <section 
        data-testid="hero-section"
        className="hero-section noise-texture flex-1 flex flex-col items-center justify-center section-padding relative"
      >
        {/* Logo */}
        <div className="logo-container mb-8 md:mb-12 z-10">
          <img 
            src={logoTransparent}
            alt="Naiot Ministerio Cristiano"
            className="w-48 sm:w-56 md:w-72 lg:w-80 h-auto"
            data-testid="logo"
          />
        </div>

        {/* Hero Text */}
        <div className="text-center z-10 max-w-lg px-4">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 md:mb-6 animate-fadeInUp tracking-tight">
            Unidos en <span className="accent-text italic">Propósito</span>
          </h1>
          <p className="font-body text-zinc-300 text-sm md:text-base leading-relaxed animate-fadeInUp animation-delay-200 italic">
            "...alabando a Dios, y teniendo favor con todo el pueblo. Y el Señor añadía cada día a la iglesia los que habían de ser salvos."
          </p>
          <p className="font-body text-[#D4C5A5] text-xs md:text-sm mt-3 animate-fadeInUp animation-delay-300 tracking-wide">
            — Hechos 2:47 RVR1960
          </p>
        </div>

        {/* Scroll indicator for mobile */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 md:hidden z-10">
          <div className="w-6 h-10 border-2 border-zinc-600 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-zinc-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Content Section - Light */}
      <section 
        data-testid="content-section"
        className="content-section flex-1 flex flex-col items-center justify-center section-padding"
      >
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 max-w-md">
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-400 mb-3 font-body animate-fadeInUp">
            Para ofrendas y diezmos
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-zinc-900 animate-fadeInUp animation-delay-100">
            Datos de Transferencia
          </h2>
        </div>

        {/* Bank Card */}
        <div className="w-full max-w-lg px-4 animate-fadeInUp animation-delay-200">
          <BankCard />
        </div>

        {/* Footer */}
        <div className="mt-10 md:mt-16 text-center">
          <p className="text-xs text-zinc-400 font-body tracking-wide">
            © {new Date().getFullYear()} Naiot Ministerio Cristiano
          </p>
        </div>
      </section>
    </div>

    {/* Floating Social Media Buttons */}
    <FloatingSocial />
  </div>
);

// QR Page Component for projection
const QRPage = () => {
  const [qrSize, setQrSize] = useState(350);
  const qrUrl = "https://vegassw.github.io/site-ofrendas-naiot/";

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= 1024) {
        setQrSize(450);
      } else if (window.innerWidth >= 768) {
        setQrSize(380);
      } else {
        setQrSize(280);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div data-testid="qr-page" className="qr-page min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#1a1a1a] flex flex-col items-center justify-center p-8 text-center">
      {/* Logo */}
      <img 
        src={logoTransparent}
        alt="Naiot Ministerio Cristiano"
        className="w-52 md:w-72 lg:w-80 h-auto mb-8 md:mb-12 animate-fadeInUp"
        data-testid="qr-logo"
      />

      {/* Title */}
      <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-white mb-2 md:mb-4 animate-fadeInUp animation-delay-100">
        Ofrendas y Diezmos
      </h1>
      <p className="text-lg md:text-2xl lg:text-3xl text-[#D4C5A5] mb-8 md:mb-12 animate-fadeInUp animation-delay-200 font-body">
        Escanea el código QR con tu celular
      </p>

      {/* QR Container */}
      <div className="relative bg-white p-6 md:p-8 lg:p-10 rounded-3xl shadow-2xl animate-fadeInUp animation-delay-300">
        <QRCodeSVG 
          value={qrUrl}
          size={qrSize}
          level="H"
          includeMargin={false}
          bgColor="#FFFFFF"
          fgColor="#0A0A0A"
        />
        {/* Logo overlay in center of QR */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 md:p-4 rounded-2xl shadow-lg border border-zinc-100">
          <img 
            src={logoTransparent}
            alt="Naiot"
            className="w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
            style={{ filter: 'invert(1)' }}
          />
        </div>
      </div>

      {/* Instruction */}
      <p className="mt-8 md:mt-12 text-zinc-400 text-base md:text-xl lg:text-2xl animate-fadeInUp animation-delay-400 font-body">
        Accede a los <span className="text-white font-medium">datos de transferencia</span> desde tu dispositivo
      </p>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Toaster 
          position="top-center" 
          richColors 
          toastOptions={{
            style: {
              fontFamily: 'Manrope, sans-serif',
            },
          }}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/qr" element={<QRPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
