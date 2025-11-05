import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Handshake, Star, Leaf, Heart, TrendingUp, Users, MapPin, Award,
  Mail, Linkedin, Calendar, CheckCircle, ArrowRight, Shield, Target
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import 'aos/dist/aos.css';

function About() {
  const { t } = useTranslation('about');
  const [counts, setCounts] = useState({
    travelers: 0,
    destinations: 0,
    guides: 0,
    rating: 0,
  });
  const [hasCounted, setHasCounted] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasCounted) {
          setHasCounted(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasCounted]);

  const animateCounters = () => {
    const targets = {
      travelers: 500,
      destinations: 20,
      guides: 15,
      rating: 4.9,
    };

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts({
        travelers: Math.floor(targets.travelers * progress),
        destinations: Math.floor(targets.destinations * progress),
        guides: Math.floor(targets.guides * progress),
        rating: parseFloat((targets.rating * progress).toFixed(1)),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, interval);
  };

  const timeline = t('timeline', { returnObjects: true });

  const valuesIcons = [
    { icon: Handshake, color: 'from-blue-500 to-blue-600' },
    { icon: Star, color: 'from-yellow-500 to-yellow-600' },
    { icon: Leaf, color: 'from-green-500 to-green-600' },
    { icon: Heart, color: 'from-red-500 to-red-600' },
  ];

  const valuesTranslations = t('values.items', { returnObjects: true });
  const values = valuesIcons.map((iconData, index) => ({
    ...iconData,
    ...valuesTranslations[index],
  }));

  const teamImages = [
    { image: 'https://i.pravatar.cc/400?img=12', linkedin: 'https://linkedin.com', email: 'andi@tripwisata.com' },
    { image: 'https://i.pravatar.cc/400?img=45', linkedin: 'https://linkedin.com', email: 'siti@tripwisata.com' },
    { image: 'https://i.pravatar.cc/400?img=33', linkedin: 'https://linkedin.com', email: 'made@tripwisata.com' },
    { image: 'https://i.pravatar.cc/400?img=25', linkedin: 'https://linkedin.com', email: 'dewi@tripwisata.com' },
  ];

  const teamTranslations = t('team.members', { returnObjects: true });
  const team = teamImages.map((imageData, index) => ({
    ...imageData,
    ...teamTranslations[index],
  }));

  const partnerLogos = ['🏛️', '🌏', '✓', '🌿', '🦉', '🛡️'];
  const partnerNames = t('certifications.partners', { returnObjects: true });
  const partners = partnerLogos.map((logo, index) => ({
    logo,
    name: partnerNames[index],
  }));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#024F83]/95 via-[#024F83]/90 to-[#01395d]/95"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            data-aos="fade-up"
          >
            {t('hero.title')}
          </h1>
          <p
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Image */}
            <div className="order-2 lg:order-1" data-aos="fade-right">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"
                  alt="Our Story"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"></div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2" data-aos="fade-left">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-secondary uppercase tracking-wide">
                  {t('ourStory.badge')}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6 leading-tight">
                {t('ourStory.title')}
              </h2>

              <div className="space-y-4 text-text-light leading-relaxed">
                {t('ourStory.paragraphs', { returnObjects: true }).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-20" data-aos="fade-up">
            <h3 className="text-2xl md:text-3xl font-bold text-secondary text-center mb-12">
              {t('ourStory.timelineTitle')}
            </h3>
            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-primary to-transparent"></div>

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-8 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    {/* Content */}
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-100 hover:border-primary transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-5 h-5 text-primary" />
                          <span className="text-2xl font-bold text-primary">{item.year}</span>
                        </div>
                        <h4 className="text-xl font-bold text-secondary mb-2">{item.event}</h4>
                        <p className="text-text-light">{item.description}</p>
                      </div>
                    </div>

                    {/* Circle */}
                    <div className="relative">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg z-10 relative">
                        <CheckCircle className="w-8 h-8 text-secondary" />
                      </div>
                    </div>

                    {/* Spacer for alignment */}
                    <div className="flex-1 hidden md:block"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              {t('values.title')}
            </h2>
            <p className="text-lg text-text-light max-w-2xl mx-auto">
              {t('values.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <IconComponent className="w-10 h-10 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary mb-4">{value.title}</h3>
                  <p className="text-text-light leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              {t('team.title')}
            </h2>
            <p className="text-lg text-text-light max-w-2xl mx-auto">
              {t('team.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  {/* Social Links - Show on hover */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary hover:text-secondary transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary hover:text-secondary transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold mb-3">{member.position}</p>
                  <p className="text-sm text-text-light leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements/Stats Section */}
      <section ref={statsRef} className="py-20 bg-gradient-to-br from-secondary to-secondary-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center" data-aos="fade-up" data-aos-delay="0">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-secondary" />
              </div>
              <p className="text-5xl font-bold text-white mb-2">{counts.travelers}+</p>
              <p className="text-lg text-white/90">{t('stats.travelers')}</p>
            </div>

            <div className="text-center" data-aos="fade-up" data-aos-delay="100">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-10 h-10 text-secondary" />
              </div>
              <p className="text-5xl font-bold text-white mb-2">{counts.destinations}+</p>
              <p className="text-lg text-white/90">{t('stats.destinations')}</p>
            </div>

            <div className="text-center" data-aos="fade-up" data-aos-delay="200">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-secondary" />
              </div>
              <p className="text-5xl font-bold text-white mb-2">{counts.guides}</p>
              <p className="text-lg text-white/90">{t('stats.guides')}</p>
            </div>

            <div className="text-center" data-aos="fade-up" data-aos-delay="300">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-10 h-10 text-secondary" />
              </div>
              <p className="text-5xl font-bold text-white mb-2">{counts.rating}/5</p>
              <p className="text-lg text-white/90">{t('stats.rating')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Partners */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              {t('certifications.title')}
            </h2>
            <p className="text-lg text-text-light max-w-2xl mx-auto">
              {t('certifications.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-center"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <div className="text-6xl mb-4 grayscale group-hover:grayscale-0 transition-all">
                  {partner.logo}
                </div>
                <p className="text-sm font-semibold text-secondary group-hover:text-primary transition-colors">
                  {partner.name}
                </p>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up">
            {t('certifications.badges', { returnObjects: true }).map((badge, index) => {
              const icons = [Shield, Target, TrendingUp];
              const colors = ['green', 'blue', 'purple'];
              const IconComponent = icons[index];
              const color = colors[index];

              return (
                <div key={index} className={`bg-white p-6 rounded-xl border-2 border-${color}-200`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 bg-${color}-100 rounded-full flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 text-${color}-600`} />
                    </div>
                    <h3 className="font-bold text-secondary">{badge.title}</h3>
                  </div>
                  <p className="text-sm text-text-light">
                    {badge.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary-light to-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-secondary mb-6"
            data-aos="fade-up"
          >
            {t('cta.title')}
          </h2>
          <p
            className="text-lg text-secondary/80 max-w-2xl mx-auto mb-10"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {t('cta.subtitle')}
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Link
              to="/booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary hover:bg-secondary-light text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-xl"
            >
              {t('cta.contactButton')}
              <Mail className="w-5 h-5" />
            </Link>
            <Link
              to="/tours"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-secondary font-bold rounded-xl transition-all transform hover:scale-105 shadow-xl"
            >
              {t('cta.toursButton')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
