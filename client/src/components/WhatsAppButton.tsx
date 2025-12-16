import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export default function WhatsAppButton({
  phoneNumber = "5511999999999",
  message = "Olá! Gostaria de saber mais sobre energia solar.",
}: WhatsAppButtonProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Mostrar tooltip após 3 segundos
  useState(() => {
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setIsTooltipVisible(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip */}
      {isTooltipVisible && !isDismissed && (
        <div className="relative bg-white rounded-lg shadow-lg p-4 max-w-[280px] animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={() => {
              setIsTooltipVisible(false);
              setIsDismissed(true);
            }}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="text-sm text-gray-700 pr-4">
            <span className="font-semibold">Precisa de ajuda?</span>
            <br />
            Fale conosco pelo WhatsApp e tire suas dúvidas sobre energia solar!
          </p>
          <div className="absolute bottom-0 right-8 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white shadow-lg"></div>
        </div>
      )}

      {/* Botão WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA5C] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Conversar pelo WhatsApp"
        onClick={() => {
          setIsTooltipVisible(false);
          setIsDismissed(true);
        }}
      >
        <MessageCircle className="h-7 w-7 text-white" fill="white" />
        
        {/* Pulse animation */}
        <span className="absolute w-14 h-14 bg-[#25D366] rounded-full animate-ping opacity-30"></span>
      </a>
    </div>
  );
}
