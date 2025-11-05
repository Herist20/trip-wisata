import { useState } from 'react';
import { Mail, Shield, Gift, CheckCircle, Loader2, Sparkles, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';
import AOS from 'aos';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation('common');
  const { currentLanguage } = useLanguage();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email) {
      setError(t('newsletter.errorEmpty'));
      return;
    }

    if (!validateEmail(email)) {
      setError(t('newsletter.errorInvalid'));
      return;
    }

    // Simulate API call
    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      setIsSuccess(true);
      setEmail('');

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      setError(t('newsletter.errorGeneric'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#024F83] via-[#01395d] to-[#012840]"></div>

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2386efac' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center" data-aos="fade-up">
          {/* Icon with Glow Effect */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-primary rounded-full blur-2xl opacity-50 animate-pulse"></div>

              {/* Icon Container */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-secondary" strokeWidth={2.5} />

                {/* Sparkle Animation */}
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-primary animate-pulse" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {t('newsletter.title')}
          </h2>

          {/* Subheading */}
          <p
            className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
            dangerouslySetInnerHTML={{
              __html: t('newsletter.subtitle').replace('20%', '<span class="text-primary font-bold">20%</span>')
            }}
          >

          {/* Trust Badge */}
          <div
            className="flex justify-center items-center gap-2 mb-10"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <Users className="w-4 h-4 text-primary" />
            <p className="text-sm text-white/80 font-medium">
              {t('newsletter.subscribersCount', { count: '5000' })}
            </p>
          </div>

          {/* Form */}
          {!isSuccess ? (
            <form
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto mb-8"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Email Input */}
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder={t('newsletter.emailPlaceholder')}
                    className={`w-full px-6 py-4 sm:py-5 text-base sm:text-lg rounded-full bg-white/95 backdrop-blur-sm text-secondary placeholder-text-light focus:outline-none focus:ring-4 focus:ring-primary/50 transition-all duration-300 shadow-lg ${
                      error ? 'ring-4 ring-red-500/50' : ''
                    }`}
                    disabled={isLoading}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group px-8 py-4 sm:py-5 bg-primary hover:bg-primary-light text-secondary font-bold rounded-full text-base sm:text-lg shadow-2xl hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2 justify-center">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t('newsletter.loading')}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 justify-center">
                      {t('newsletter.subscribeButton')}
                      <Gift className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </span>
                  )}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-4 flex items-center justify-center gap-2 text-red-300 text-sm animate-shake">
                  <span className="w-2 h-2 bg-red-300 rounded-full animate-pulse"></span>
                  {error}
                </div>
              )}
            </form>
          ) : (
            // Success Message
            <div
              className="max-w-2xl mx-auto mb-8 bg-white/10 backdrop-blur-md border-2 border-primary rounded-2xl p-8 animate-fadeIn"
              data-aos="zoom-in"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 animate-bounce">
                  <CheckCircle className="w-10 h-10 text-secondary" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{t('newsletter.successTitle')}</h3>
                <p className="text-white/90 text-center">
                  {t('newsletter.successMessage')}
                </p>
              </div>
            </div>
          )}

          {/* Trust Elements */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            {/* Privacy Note */}
            <div className="flex items-center gap-2 text-white/80">
              <Shield className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-sm">{t('newsletter.privacyNote')}</p>
            </div>

            {/* Special Offer */}
            <div className="flex items-center gap-2 text-white/80">
              <Gift className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-sm">{t('newsletter.exclusiveOffers')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
