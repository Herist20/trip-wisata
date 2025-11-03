import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Calendar, Users, Mail, Phone, User, MessageSquare, CheckCircle } from 'lucide-react';
import { tourPackages } from '../data/mockData';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Booking() {
  const [searchParams] = useSearchParams();
  const tourId = searchParams.get('tour');
  const [selectedTour, setSelectedTour] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    if (tourId) {
      const tour = tourPackages.find((t) => t.id === parseInt(tourId));
      setSelectedTour(tour);
    }
  }, [tourId]);

  const onSubmit = (data) => {
    console.log('Booking Data:', data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-custom text-white py-20">
        <div className="section-container text-center" data-aos="fade-up">
          <h1 className="heading-primary text-white mb-4">Booking Paket Tour</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Isi formulir di bawah untuk memulai petualangan Anda
          </p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-xl shadow-md" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-secondary mb-6">Informasi Pemesanan</h2>

                {isSubmitted && (
                  <div className="mb-6 p-4 bg-primary/20 border-2 border-primary rounded-lg flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-primary" />
                    <p className="text-secondary font-semibold">
                      Terima kasih! Booking Anda telah diterima. Kami akan menghubungi Anda segera.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Tour Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-secondary mb-2">
                      Pilih Paket Tour *
                    </label>
                    <select
                      {...register('tour', { required: 'Pilih paket tour' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      defaultValue={tourId || ''}
                    >
                      <option value="">-- Pilih Paket Tour --</option>
                      {tourPackages.map((tour) => (
                        <option key={tour.id} value={tour.id}>
                          {tour.title} - Rp {tour.price.toLocaleString('id-ID')}
                        </option>
                      ))}
                    </select>
                    {errors.tour && (
                      <p className="text-red-500 text-sm mt-1">{errors.tour.message}</p>
                    )}
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-secondary mb-2">
                      <User className="inline w-4 h-4 mr-1 mb-1" />
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      {...register('fullName', { required: 'Nama lengkap wajib diisi' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Masukkan nama lengkap"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-secondary mb-2">
                        <Mail className="inline w-4 h-4 mr-1 mb-1" />
                        Email *
                      </label>
                      <input
                        type="email"
                        {...register('email', {
                          required: 'Email wajib diisi',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Format email tidak valid',
                          },
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="email@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-secondary mb-2">
                        <Phone className="inline w-4 h-4 mr-1 mb-1" />
                        No. Telepon *
                      </label>
                      <input
                        type="tel"
                        {...register('phone', { required: 'No. telepon wajib diisi' })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="08123456789"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Date & Participants */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-secondary mb-2">
                        <Calendar className="inline w-4 h-4 mr-1 mb-1" />
                        Tanggal Keberangkatan *
                      </label>
                      <input
                        type="date"
                        {...register('departureDate', { required: 'Tanggal wajib diisi' })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      {errors.departureDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.departureDate.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-secondary mb-2">
                        <Users className="inline w-4 h-4 mr-1 mb-1" />
                        Jumlah Peserta *
                      </label>
                      <input
                        type="number"
                        {...register('participants', {
                          required: 'Jumlah peserta wajib diisi',
                          min: { value: 1, message: 'Minimal 1 peserta' },
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="1"
                        min="1"
                      />
                      {errors.participants && (
                        <p className="text-red-500 text-sm mt-1">{errors.participants.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-secondary mb-2">
                      <MessageSquare className="inline w-4 h-4 mr-1 mb-1" />
                      Pesan Tambahan
                    </label>
                    <textarea
                      {...register('message')}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Tuliskan pertanyaan atau permintaan khusus Anda..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="w-full btn-primary">
                    Kirim Booking
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar - Selected Tour Info */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-md sticky top-24" data-aos="fade-up">
                <h3 className="text-xl font-bold text-secondary mb-4">Ringkasan Booking</h3>
                {selectedTour ? (
                  <div>
                    <img
                      src={selectedTour.image}
                      alt={selectedTour.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h4 className="font-semibold text-secondary mb-2">{selectedTour.title}</h4>
                    <p className="text-sm text-text-light mb-1">{selectedTour.destination}</p>
                    <p className="text-sm text-text-light mb-4">{selectedTour.duration}</p>
                    <div className="border-t pt-4">
                      <p className="text-sm text-text-light mb-1">Harga per orang:</p>
                      <p className="text-2xl font-bold text-primary mb-4">
                        Rp {selectedTour.price.toLocaleString('id-ID')}
                      </p>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-semibold text-secondary mb-2">Termasuk:</p>
                        <ul className="text-xs text-text-light space-y-1">
                          {selectedTour.features.map((feature, idx) => (
                            <li key={idx}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-text-light text-center py-8">Pilih paket tour terlebih dahulu</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Booking;
