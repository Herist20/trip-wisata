import { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Phone, Mail, MapPin, Clock, Package, DollarSign, Calendar } from 'lucide-react';
import { contactInfo } from '../../data/mockData';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial bot message
      setTimeout(() => {
        setMessages([
          {
            id: 1,
            type: 'bot',
            text: 'Halo! 👋 Selamat datang di Tour Bali.',
            timestamp: new Date(),
          },
          {
            id: 2,
            type: 'bot',
            text: 'Saya adalah asisten virtual Tour Bali. Saya siap membantu Anda merencanakan liburan impian ke destinasi indah di Bali! ✈️',
            timestamp: new Date(),
          },
          {
            id: 3,
            type: 'bot',
            text: 'Ada yang bisa saya bantu hari ini?',
            timestamp: new Date(),
          },
        ]);
      }, 500);
    }
  }, [isOpen]);

  const quickReplies = [
    {
      id: 1,
      icon: Package,
      text: 'Paket Tour',
      response: 'Kami menyediakan berbagai paket tour menarik ke destinasi populer seperti Bali, Bromo, Raja Ampat, dan banyak lagi! 🏝️\n\nApakah Anda ingin melihat daftar paket tour kami?',
      followUp: [
        { text: 'Ya, lihat paket tour', action: 'tours' },
        { text: 'Info harga', action: 'price' },
      ],
    },
    {
      id: 2,
      icon: DollarSign,
      text: 'Info Harga',
      response: 'Harga paket tour kami mulai dari Rp 1.500.000 per orang! 💰\n\nHarga sudah termasuk:\n✓ Akomodasi\n✓ Transportasi\n✓ Tour Guide\n✓ Makan\n✓ Tiket masuk wisata',
      followUp: [
        { text: 'Booking sekarang', action: 'booking' },
        { text: 'Chat dengan CS', action: 'whatsapp' },
      ],
    },
    {
      id: 3,
      icon: MapPin,
      text: 'Lokasi & Kontak',
      response: `📍 Alamat Kantor:\n${contactInfo.address}\n\n📞 Telepon: ${contactInfo.phone}\n📧 Email: ${contactInfo.email}\n⏰ ${contactInfo.workingHours}`,
      followUp: [
        { text: 'Hubungi via WhatsApp', action: 'whatsapp' },
        { text: 'Lihat di maps', action: 'maps' },
      ],
    },
    {
      id: 4,
      icon: Calendar,
      text: 'Cara Booking',
      response: 'Booking paket tour sangat mudah! 😊\n\n1️⃣ Pilih paket tour\n2️⃣ Tentukan tanggal keberangkatan\n3️⃣ Isi data peserta\n4️⃣ Pilih metode pembayaran\n5️⃣ Konfirmasi booking\n\nApakah Anda siap untuk booking?',
      followUp: [
        { text: 'Ya, booking sekarang', action: 'booking' },
        { text: 'Tanya CS dulu', action: 'whatsapp' },
      ],
    },
  ];

  const handleQuickReply = (reply) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: reply.text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setShowQuickReplies(false);

    // Add bot response after delay
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: reply.response,
        timestamp: new Date(),
        followUp: reply.followUp,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  const handleFollowUp = (action) => {
    if (action === 'whatsapp') {
      window.open(contactInfo.social.whatsapp, '_blank');
    } else if (action === 'tours') {
      window.location.href = '/tours';
    } else if (action === 'booking') {
      window.location.href = '/booking';
    } else if (action === 'price') {
      const userMessage = {
        id: Date.now(),
        type: 'user',
        text: 'Info harga',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      setTimeout(() => {
        const priceReply = quickReplies.find((r) => r.id === 2);
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          text: priceReply.response,
          timestamp: new Date(),
          followUp: priceReply.followUp,
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 800);
    } else if (action === 'maps') {
      window.open('https://maps.google.com/?q=' + encodeURIComponent(contactInfo.address), '_blank');
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: Date.now(),
        type: 'bot',
        text: 'Terima kasih! Ada yang bisa saya bantu lagi? 😊',
        timestamp: new Date(),
      },
    ]);
    setShowQuickReplies(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div
          className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden mb-4 animate-fade-in-up"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Tour Bali Bot</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-xs text-white/90">Online - Siap Membantu</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-gradient-to-b from-gray-50 to-white h-96 overflow-y-auto">
            <div className="space-y-3">
              {/* Bot Messages */}
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    {message.type === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div>
                      <div
                        className={`rounded-2xl px-4 py-2.5 shadow-sm ${
                          message.type === 'bot'
                            ? 'bg-white border border-gray-200 rounded-tl-none'
                            : 'bg-gradient-to-r from-primary to-secondary text-white rounded-tr-none'
                        }`}
                      >
                        <p className={`text-sm leading-relaxed whitespace-pre-line ${message.type === 'bot' ? 'text-secondary' : 'text-white'}`}>
                          {message.text}
                        </p>
                      </div>

                      {/* Follow-up buttons */}
                      {message.followUp && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {message.followUp.map((btn, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleFollowUp(btn.action)}
                              className="text-xs bg-white hover:bg-primary/10 border border-primary text-primary font-semibold px-3 py-1.5 rounded-full transition-all duration-200 hover:shadow-md"
                            >
                              {btn.text}
                            </button>
                          ))}
                          <button
                            onClick={handleReset}
                            className="text-xs bg-gray-100 hover:bg-gray-200 text-text-light px-3 py-1.5 rounded-full transition-all duration-200"
                          >
                            Menu Utama
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Quick Replies */}
              {showQuickReplies && messages.length > 0 && (
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-semibold text-text-light text-center mb-2">Pilih topik:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickReplies.map((reply) => {
                      const Icon = reply.icon;
                      return (
                        <button
                          key={reply.id}
                          onClick={() => handleQuickReply(reply)}
                          className="bg-white hover:bg-primary/5 border-2 border-gray-200 hover:border-primary rounded-xl p-3 text-center transition-all duration-200 group"
                        >
                          <div className="w-10 h-10 bg-primary/10 group-hover:bg-primary rounded-lg flex items-center justify-center mx-auto mb-2 transition-colors">
                            <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                          </div>
                          <p className="text-xs font-semibold text-secondary group-hover:text-primary transition-colors">
                            {reply.text}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
                <p className="text-xs text-text-light text-center">
                  Ketik pesan di WhatsApp
                </p>
              </div>
              <button
                onClick={() => window.open(contactInfo.social.whatsapp, '_blank')}
                className="w-10 h-10 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20BD5A] hover:to-[#0F7A6E] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                aria-label="Open WhatsApp"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {/* Pulsing Ring Animation - only when closed */}
        {!isOpen && (
          <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"></div>
        )}

        {/* Main Button */}
        <div className="relative bg-gradient-to-br from-primary to-secondary text-white p-4 rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300 transform hover:scale-110 hover:rotate-12">
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Bot className="w-6 h-6" />
          )}
        </div>

        {/* Notification Badge */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        )}
      </button>

      {/* Tooltip - only when closed */}
      {!isOpen && (
        <div className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white text-sm font-medium rounded-xl shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            <span>Halo! Ada yang bisa dibantu?</span>
          </div>
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary"></div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
