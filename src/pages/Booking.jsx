import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  Check, ChevronLeft, ChevronRight, ChevronDown, Calendar, Users, User, Mail, Phone, Globe,
  Cake, AlertCircle, MapPin, Clock, Star, Shield, RotateCcw, CreditCard,
  Building2, Wallet, Tag, FileText, CheckCircle, Download, Home as HomeIcon,
  Loader2, Plus, Minus, X
} from 'lucide-react';
import { tourPackages } from '../data/mockData';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Booking() {
  const { t } = useTranslation('booking');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tourIdParam = searchParams.get('tour');
  const adultsParam = searchParams.get('adults');
  const childrenParam = searchParams.get('children');
  const dateParam = searchParams.get('date');

  // Multi-step state
  const [bookingType, setBookingType] = useState(null); // 'individual' or 'group'
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingNumber, setBookingNumber] = useState('');

  // Form data state
  const [formData, setFormData] = useState({
    // Step 1
    tourId: tourIdParam || '',
    departureDate: dateParam || '',
    adults: parseInt(adultsParam) || 2,
    children: parseInt(childrenParam) || 0,
    infants: 0,
    specialRequests: '',

    // Step 2
    fullName: '',
    email: '',
    phone: '',
    nationality: 'Indonesia',
    dateOfBirth: '',
    emergencyContactName: '',
    emergencyContactPhone: '',

    // Step 3
    travelInsurance: false,
    airportPickup: false,
    extraNight: false,
    photographyService: false,
    privateTour: false,
    promoCode: '',

    // Step 4
    paymentMethod: 'credit-card',
    agreeTerms: false,
    agreePrivacy: false,
  });

  const [errors, setErrors] = useState({});
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  const selectedTour = tourPackages.find(t => t.id === parseInt(formData.tourId));

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    window.scrollTo(0, 0);
  }, [currentStep]);

  // Price calculations
  const basePrice = selectedTour ? selectedTour.priceUSD : 0;
  const childPrice = basePrice * 0.7;
  const infantPrice = 0;

  const subtotal = (formData.adults * basePrice) + (formData.children * childPrice) + (formData.infants * infantPrice);

  const additionalServices = {
    travelInsurance: formData.travelInsurance ? 30 : 0,
    airportPickup: formData.airportPickup ? 25 : 0,
    extraNight: formData.extraNight ? 50 : 0,
    photographyService: formData.photographyService ? 100 : 0,
    privateTour: formData.privateTour ? 150 : 0,
  };

  const additionalTotal = Object.values(additionalServices).reduce((a, b) => a + b, 0);
  const discountAmount = promoApplied ? subtotal * (promoDiscount / 100) : 0;
  const taxableAmount = subtotal + additionalTotal - discountAmount;
  const tax = taxableAmount * 0.11;
  const grandTotal = taxableAmount + tax;

  // Validation functions
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.tourId) newErrors.tourId = t('step1.errors.selectTour');
    if (!formData.departureDate) newErrors.departureDate = t('step1.errors.departureDate');
    if (formData.adults < 1) newErrors.adults = t('step1.errors.adults');

    const selectedDate = new Date(formData.departureDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) newErrors.departureDate = t('step1.errors.datePast');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = t('step2.errors.fullName');
    if (!formData.email.trim()) newErrors.email = t('step2.errors.email');
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = t('step2.errors.invalidEmail');
    }
    if (!formData.phone.trim()) newErrors.phone = t('step2.errors.phone');
    else if (!/^[+\d][\d\s-]{8,}$/.test(formData.phone)) {
      newErrors.phone = t('step2.errors.invalidPhone');
    }
    if (!formData.dateOfBirth) newErrors.dateOfBirth = t('step2.errors.dateOfBirth');
    if (!formData.emergencyContactName.trim()) newErrors.emergencyContactName = t('step2.errors.emergencyContactName');
    if (!formData.emergencyContactPhone.trim()) newErrors.emergencyContactPhone = t('step2.errors.emergencyContactPhone');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors = {};
    if (!formData.agreeTerms) newErrors.agreeTerms = t('step4.errors.agreeTerms');
    if (!formData.agreePrivacy) newErrors.agreePrivacy = t('step4.errors.agreePrivacy');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;

    if (currentStep === 1) isValid = validateStep1();
    else if (currentStep === 2) isValid = validateStep2();
    else if (currentStep === 3) isValid = true; // Optional step
    else if (currentStep === 4) isValid = validateStep4();

    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else if (isValid && currentStep === 4) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSelectBookingType = (type) => {
    setBookingType(type);
    // Auto set participants based on type
    if (type === 'group') {
      handleInputChange('adults', 10);
    }
  };

  const handleApplyPromo = () => {
    const validPromoCodes = {
      'WELCOME20': 20,
      'SAVE10': 10,
      'HOLIDAY15': 15,
    };

    const discount = validPromoCodes[formData.promoCode.toUpperCase()];
    if (discount) {
      setPromoApplied(true);
      setPromoDiscount(discount);
    } else {
      alert(t('step3.invalidPromo'));
      setPromoApplied(false);
      setPromoDiscount(0);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const randomBookingNumber = 'BK' + Date.now().toString().slice(-8);
      setBookingNumber(randomBookingNumber);
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  const steps = [
    { number: 1, title: t('steps.tourSelection'), icon: MapPin },
    { number: 2, title: t('steps.personalInfo'), icon: User },
    { number: 3, title: t('steps.addOns'), icon: Plus },
    { number: 4, title: t('steps.payment'), icon: CreditCard },
  ];

  // If booking type not selected, show selection screen
  if (!bookingType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-white to-primary/10 flex items-center justify-center py-12 px-4">
        <div className="max-w-5xl w-full">
          {/* Header */}
          <div className="text-center mb-12" data-aos="fade-down">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              {t('bookingType.title')}
            </h1>
            <p className="text-lg text-text-light max-w-2xl mx-auto">
              {t('bookingType.subtitle')}
            </p>
          </div>

          {/* Booking Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Individual Booking */}
            <div
              onClick={() => handleSelectBookingType('individual')}
              className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-2 border-transparent hover:border-primary transform hover:-translate-y-2"
              data-aos="fade-right"
            >
              <div className="p-8">
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <User className="w-10 h-10 text-secondary" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
                  {t('bookingType.individual.title')}
                </h3>

                {/* Description */}
                <p className="text-text-light mb-6 leading-relaxed">
                  {t('bookingType.individual.description')}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-text-light">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{t('bookingType.individual.features.participants')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-light">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{t('bookingType.individual.features.flexible')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-light">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{t('bookingType.individual.features.guide')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-light">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{t('bookingType.individual.features.customizable')}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl group-hover:from-primary group-hover:to-primary-light transition-all duration-300">
                  <span className="font-bold text-secondary group-hover:text-white">{t('bookingType.individual.cta')}</span>
                  <ChevronRight className="w-6 h-6 text-primary group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>

            {/* Group Booking */}
            <div
              onClick={() => handleSelectBookingType('group')}
              className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-2 border-transparent hover:border-secondary transform hover:-translate-y-2"
              data-aos="fade-left"
            >
              <div className="p-8">
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-secondary to-secondary-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="w-10 h-10 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-secondary mb-3 group-hover:text-secondary-light transition-colors">
                  {t('bookingType.group.title')}
                </h3>

                {/* Description */}
                <p className="text-text-light mb-6 leading-relaxed">
                  {t('bookingType.group.description')}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-text-light">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span>{t('bookingType.group.features.participants')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-light">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span>{t('bookingType.group.features.discount')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-light">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span>{t('bookingType.group.features.guides')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-light">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span>{t('bookingType.group.features.coordinator')}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-xl group-hover:from-secondary group-hover:to-secondary-light transition-all duration-300">
                  <span className="font-bold text-secondary group-hover:text-white">{t('bookingType.group.cta')}</span>
                  <ChevronRight className="w-6 h-6 text-secondary group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          </div>

          {/* Back to Home Link */}
          <div className="text-center" data-aos="fade-up">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-text-light hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              {t('bookingType.backToHome')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Indicator */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
          {/* Booking Type Badge */}
          <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4 gap-2">
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full ${
                bookingType === 'individual'
                  ? 'bg-primary/10 text-primary'
                  : 'bg-secondary/10 text-secondary'
              }`}>
                {bookingType === 'individual' ? (
                  <>
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-semibold">{t('bookingType.individual.title')}</span>
                  </>
                ) : (
                  <>
                    <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-semibold">{t('bookingType.group.title')}</span>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={() => setBookingType(null)}
              className="text-xs sm:text-sm text-text-light hover:text-primary transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{t('changeType')}</span>
            </button>
          </div>

          <div className="flex items-center justify-center overflow-x-auto px-2">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = currentStep > step.number;
              const isCurrent = currentStep === step.number;

              return (
                <div key={step.number} className="flex items-center">
                  {/* Step Circle and Label */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        isCompleted
                          ? 'bg-primary border-primary'
                          : isCurrent
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-secondary" />
                      ) : (
                        <StepIcon
                          className={`w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 ${
                            isCurrent ? 'text-primary' : 'text-gray-400'
                          }`}
                        />
                      )}
                    </div>
                    <p
                      className={`mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm font-medium whitespace-nowrap ${
                        isCurrent ? 'text-primary' : 'text-text-light'
                      }`}
                    >
                      {/* Show short version on mobile, full on desktop */}
                      <span className="hidden md:inline">{step.title}</span>
                      <span className="md:hidden">
                        {step.number === 1 && t('stepLabels.tour')}
                        {step.number === 2 && t('stepLabels.info')}
                        {step.number === 3 && t('stepLabels.addOns')}
                        {step.number === 4 && t('stepLabels.pay')}
                      </span>
                    </p>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 w-8 sm:w-12 md:w-16 lg:w-24 mx-1.5 sm:mx-2 md:mx-3 lg:mx-4 transition-all ${
                        isCompleted ? 'bg-primary' : 'bg-gray-300'
                      }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Form Area - Left (2/3) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8" data-aos="fade-right">
              {/* Step 1: Tour Selection */}
              {currentStep === 1 && (
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary mb-2">
                      {t('step1.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-text-light">
                      {t('step1.selectTour')}
                    </p>
                  </div>

                  {/* Tour Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-secondary mb-2">
                      {t('step1.selectTour')} *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.tourId}
                        onChange={(e) => handleInputChange('tourId', e.target.value)}
                        className={`w-full px-4 py-3 pr-10 border-2 rounded-xl focus:outline-none focus:border-primary transition-colors appearance-none bg-white ${
                          errors.tourId ? 'border-red-500' : 'border-gray-200'
                        }`}
                      >
                        <option value="">{t('step1.selectTourPlaceholder')}</option>
                        {tourPackages.map((tour) => (
                          <option key={tour.id} value={tour.id}>
                            {tour.title} - ${tour.priceUSD} ({tour.durationShort})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.tourId && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.tourId}
                      </p>
                    )}
                  </div>

                  {/* Departure Date */}
                  <div>
                    <label className="block text-sm font-semibold text-secondary mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      {t('step1.departureDate')} *
                    </label>
                    <input
                      type="date"
                      value={formData.departureDate}
                      onChange={(e) => handleInputChange('departureDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-primary transition-colors ${
                        errors.departureDate ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {errors.departureDate && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.departureDate}
                      </p>
                    )}
                  </div>

                  {/* Participants */}
                  <div className="space-y-4 bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-semibold text-secondary flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      {t('step1.participants')}
                    </h3>

                    {/* Adults */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-secondary">{t('step1.adults')}</p>
                        <p className="text-sm text-text-light">{t('ageIndicator')}</p>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button
                          type="button"
                          onClick={() => handleInputChange('adults', Math.max(1, formData.adults - 1))}
                          className="w-7 h-7 sm:w-10 sm:h-10 border border-gray-300 sm:border-2 rounded-md sm:rounded-lg hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
                        >
                          <Minus className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                        </button>
                        <span className="text-base sm:text-xl font-bold text-secondary w-8 sm:w-12 text-center">
                          {formData.adults}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleInputChange('adults', formData.adults + 1)}
                          className="w-7 h-7 sm:w-10 sm:h-10 border border-gray-300 sm:border-2 rounded-md sm:rounded-lg hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
                        >
                          <Plus className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-secondary">{t('step1.children')}</p>
                        <p className="text-sm text-text-light">{t('step1.childrenAge')}</p>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button
                          type="button"
                          onClick={() => handleInputChange('children', Math.max(0, formData.children - 1))}
                          className="w-7 h-7 sm:w-10 sm:h-10 border border-gray-300 sm:border-2 rounded-md sm:rounded-lg hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
                        >
                          <Minus className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                        </button>
                        <span className="text-base sm:text-xl font-bold text-secondary w-8 sm:w-12 text-center">
                          {formData.children}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleInputChange('children', formData.children + 1)}
                          className="w-7 h-7 sm:w-10 sm:h-10 border border-gray-300 sm:border-2 rounded-md sm:rounded-lg hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
                        >
                          <Plus className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Infants */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-secondary">{t('step1.infants')}</p>
                        <p className="text-sm text-text-light">{t('step1.infantsAge')}</p>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button
                          type="button"
                          onClick={() => handleInputChange('infants', Math.max(0, formData.infants - 1))}
                          className="w-7 h-7 sm:w-10 sm:h-10 border border-gray-300 sm:border-2 rounded-md sm:rounded-lg hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
                        >
                          <Minus className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                        </button>
                        <span className="text-base sm:text-xl font-bold text-secondary w-8 sm:w-12 text-center">
                          {formData.infants}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleInputChange('infants', formData.infants + 1)}
                          className="w-7 h-7 sm:w-10 sm:h-10 border border-gray-300 sm:border-2 rounded-md sm:rounded-lg hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
                        >
                          <Plus className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>

                    {errors.adults && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.adults}
                      </p>
                    )}
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-sm font-semibold text-secondary mb-2">
                      {t('step1.specialRequests')}
                    </label>
                    <textarea
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                      rows="4"
                      placeholder={t('step1.specialRequestsPlaceholder')}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors resize-none"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Step 2: Personal Information */}
              {currentStep === 2 && (
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary mb-2">
                      {t('step2.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-text-light">
                      {t('step2.fullName')}
                    </p>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-secondary mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      {t('step2.fullName')} *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder={t('step2.fullNamePlaceholder')}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-primary transition-colors ${
                        errors.fullName ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-secondary mb-2">
                        <Mail className="w-4 h-4 inline mr-1" />
                        {t('step2.email')} *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder={t('step2.emailPlaceholder')}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-primary transition-colors ${
                          errors.email ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-secondary mb-2">
                        <Phone className="w-4 h-4 inline mr-1" />
                        {t('step2.phone')} *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder={t('step2.phonePlaceholder')}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-primary transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Nationality & Date of Birth */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-secondary mb-2">
                        <Globe className="w-4 h-4 inline mr-1" />
                        {t('step2.nationality')} *
                      </label>
                      <div className="relative">
                        <select
                          value={formData.nationality}
                          onChange={(e) => handleInputChange('nationality', e.target.value)}
                          className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors appearance-none bg-white"
                        >
                          <option value="Indonesia">{t('step2.countries.indonesia')}</option>
                          <option value="Malaysia">{t('step2.countries.malaysia')}</option>
                          <option value="Singapore">{t('step2.countries.singapore')}</option>
                          <option value="United States">{t('step2.countries.unitedStates')}</option>
                          <option value="United Kingdom">{t('step2.countries.unitedKingdom')}</option>
                          <option value="Australia">{t('step2.countries.australia')}</option>
                          <option value="Other">{t('step2.countries.other')}</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-secondary mb-2">
                        <Cake className="w-4 h-4 inline mr-1" />
                        {t('step2.dateOfBirth')} *
                      </label>
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-primary transition-colors ${
                          errors.dateOfBirth ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      {errors.dateOfBirth && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.dateOfBirth}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 space-y-4">
                    <h3 className="font-semibold text-secondary flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      {t('step2.emergencyContact')}
                    </h3>

                    <div>
                      <label className="block text-sm font-semibold text-secondary mb-2">
                        {t('step2.emergencyContactName')} *
                      </label>
                      <input
                        type="text"
                        value={formData.emergencyContactName}
                        onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                        placeholder={t('step2.emergencyContactNamePlaceholder')}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-primary transition-colors bg-white ${
                          errors.emergencyContactName ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      {errors.emergencyContactName && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.emergencyContactName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-secondary mb-2">
                        {t('step2.emergencyContactPhone')} *
                      </label>
                      <input
                        type="tel"
                        value={formData.emergencyContactPhone}
                        onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                        placeholder={t('step2.emergencyContactPhonePlaceholder')}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-primary transition-colors bg-white ${
                          errors.emergencyContactPhone ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      {errors.emergencyContactPhone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.emergencyContactPhone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Additional Services */}
              {currentStep === 3 && (
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary mb-2">
                      {t('step3.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-text-light">
                      {t('step3.subtitle')}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { id: 'travelInsurance', labelKey: 'travelInsurance.title', descKey: 'travelInsurance.description', priceKey: 'travelInsurance.price' },
                      { id: 'airportPickup', labelKey: 'airportPickup.title', descKey: 'airportPickup.description', priceKey: 'airportPickup.price' },
                      { id: 'extraNight', labelKey: 'extraNight.title', descKey: 'extraNight.description', priceKey: 'extraNight.price' },
                      { id: 'photographyService', labelKey: 'photographyService.title', descKey: 'photographyService.description', priceKey: 'photographyService.price' },
                      { id: 'privateTour', labelKey: 'privateTour.title', descKey: 'privateTour.description', priceKey: 'privateTour.price' },
                    ].map((service) => (
                      <label
                        key={service.id}
                        className="flex items-start gap-2 sm:gap-4 p-3 sm:p-4 border border-gray-200 sm:border-2 rounded-lg sm:rounded-xl cursor-pointer hover:border-primary transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData[service.id]}
                          onChange={(e) => handleInputChange(service.id, e.target.checked)}
                          className="mt-0.5 sm:mt-1 w-3.5 h-3.5 sm:w-5 sm:h-5 text-primary rounded focus:ring-primary flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5 sm:mb-1 gap-2">
                            <p className="font-semibold text-secondary text-xs sm:text-base">{t(`step3.${service.labelKey}`)}</p>
                            <p className="font-bold text-primary text-xs sm:text-base whitespace-nowrap">{t(`step3.${service.priceKey}`)}</p>
                          </div>
                          <p className="text-[10px] sm:text-sm text-text-light">{t(`step3.${service.descKey}`)}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Promo Code */}
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 sm:p-6 rounded-xl">
                    <h3 className="font-semibold text-secondary mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                      <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      {t('step3.promoCode')}
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <input
                        type="text"
                        value={formData.promoCode}
                        onChange={(e) => handleInputChange('promoCode', e.target.value.toUpperCase())}
                        placeholder={t('step3.promoCodePlaceholder')}
                        className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-primary transition-colors bg-white text-sm sm:text-base"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-secondary hover:bg-secondary-light text-white font-semibold rounded-lg sm:rounded-xl transition-colors text-sm sm:text-base whitespace-nowrap"
                      >
                        {t('step3.applyPromo')}
                      </button>
                    </div>
                    {promoApplied && (
                      <p className="text-green-600 text-xs sm:text-sm mt-2 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {t('step3.discountApplied', { percent: promoDiscount })}
                      </p>
                    )}
                    <p className="text-[10px] sm:text-xs text-text-light mt-2 sm:mt-3">
                      {t('promoHint')} {t('step3.promoHintExamples')}
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Payment & Confirmation */}
              {currentStep === 4 && (
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary mb-2">
                      {t('step4.title')}
                    </h2>
                    <p className="text-sm sm:text-base text-text-light">
                      {t('step4.title')}
                    </p>
                  </div>

                  {/* Order Summary Recap */}
                  <div className="bg-gray-50 p-6 rounded-xl space-y-3">
                    <h3 className="font-bold text-secondary mb-4">{t('priceSummary.title')}</h3>
                    {selectedTour && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-text-light">{t('labels.tour')}</span>
                          <span className="font-medium text-secondary">{selectedTour.title}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-text-light">{t('labels.date')}</span>
                          <span className="font-medium text-secondary">
                            {new Date(formData.departureDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-text-light">{t('labels.participants')}</span>
                          <span className="font-medium text-secondary">
                            {t('priceSummary.participantsSummary', {
                              adults: formData.adults,
                              children: formData.children,
                              infants: formData.infants
                            })}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="font-semibold text-secondary mb-4">{t('step4.paymentMethod')}</h3>
                    <div className="space-y-3">
                      {[
                        { id: 'credit-card', labelKey: 'creditCard', icon: CreditCard },
                        { id: 'bank-transfer', labelKey: 'bankTransfer', icon: Building2 },
                        { id: 'e-wallet', labelKey: 'eWallet', icon: Wallet },
                      ].map((method) => {
                        const MethodIcon = method.icon;
                        return (
                          <label
                            key={method.id}
                            className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border border-gray-200 sm:border-2 rounded-lg sm:rounded-xl cursor-pointer hover:border-primary transition-colors"
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              checked={formData.paymentMethod === method.id}
                              onChange={() => handleInputChange('paymentMethod', method.id)}
                              className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-primary focus:ring-primary flex-shrink-0"
                            />
                            <MethodIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                            <span className="font-medium text-secondary text-xs sm:text-base">{t(`step4.${method.labelKey}`)}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="space-y-3 border-t pt-6">
                    <label className="flex items-start gap-2 sm:gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                        className="mt-0.5 sm:mt-1 w-3.5 h-3.5 sm:w-5 sm:h-5 text-primary rounded focus:ring-primary flex-shrink-0"
                      />
                      <span className="text-xs sm:text-sm text-text-light">
                        {t('step4.agreeTerms')} <Link to="/terms" className="text-primary hover:underline">{t('step4.termsConditions')}</Link>
                      </span>
                    </label>
                    {errors.agreeTerms && (
                      <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1 ml-6 sm:ml-8">
                        <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {errors.agreeTerms}
                      </p>
                    )}

                    <label className="flex items-start gap-2 sm:gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreePrivacy}
                        onChange={(e) => handleInputChange('agreePrivacy', e.target.checked)}
                        className="mt-0.5 sm:mt-1 w-3.5 h-3.5 sm:w-5 sm:h-5 text-primary rounded focus:ring-primary flex-shrink-0"
                      />
                      <span className="text-xs sm:text-sm text-text-light">
                        {t('step4.agreePrivacy')} <Link to="/privacy" className="text-primary hover:underline">{t('step4.privacyPolicy')}</Link>
                      </span>
                    </label>
                    {errors.agreePrivacy && (
                      <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1 ml-6 sm:ml-8">
                        <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {errors.agreePrivacy}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 sm:pt-8 border-t mt-6 sm:mt-8">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={isSubmitting}
                    className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 text-secondary font-semibold rounded-lg sm:rounded-xl hover:border-secondary transition-colors disabled:opacity-50 text-sm sm:text-base"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    {t('buttons.back')}
                  </button>
                ) : (
                  <div></div>
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 sm:gap-2 px-5 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary-light text-secondary font-bold rounded-lg sm:rounded-xl transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:transform-none text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      {t('buttons.processing')}
                    </>
                  ) : currentStep === 4 ? (
                    <>
                      {t('buttons.submit')}
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    </>
                  ) : (
                    <>
                      {t('buttons.next')}
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar - Right (1/3) */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-4" data-aos="fade-left">
              <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100">
                <h3 className="text-xl font-bold text-secondary mb-6">{t('priceSummary.title')}</h3>

                {selectedTour ? (
                  <>
                    {/* Tour Info */}
                    <div className="mb-6">
                      <img
                        src={selectedTour.image}
                        alt={selectedTour.title}
                        className="w-full h-40 object-cover rounded-xl mb-4"
                      />
                      <h4 className="font-bold text-secondary mb-1">{selectedTour.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-text-light mb-1">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedTour.destination}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-light">
                        <Clock className="w-4 h-4" />
                        <span>{selectedTour.duration}</span>
                      </div>
                    </div>

                    {/* Participants */}
                    {(formData.adults > 0 || formData.children > 0 || formData.infants > 0) && (
                      <div className="mb-6 space-y-2">
                        {formData.adults > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-text-light">{t('priceSummary.adultsLine', { count: formData.adults, price: basePrice })}</span>
                            <span className="font-semibold text-secondary">${(formData.adults * basePrice).toFixed(2)}</span>
                          </div>
                        )}
                        {formData.children > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-text-light">{t('priceSummary.childrenLine', { count: formData.children, price: childPrice.toFixed(2) })}</span>
                            <span className="font-semibold text-secondary">${(formData.children * childPrice).toFixed(2)}</span>
                          </div>
                        )}
                        {formData.infants > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-text-light">{t('priceSummary.infantsLine', { count: formData.infants })}</span>
                            <span className="font-semibold text-green-600">{t('labels.free')}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Additional Services */}
                    {additionalTotal > 0 && (
                      <div className="mb-6 space-y-2 border-t pt-4">
                        <p className="text-sm font-semibold text-secondary mb-2">{t('labels.addOns')}</p>
                        {formData.travelInsurance && (
                          <div className="flex justify-between text-sm">
                            <span className="text-text-light">{t('step3.travelInsurance.title')}</span>
                            <span className="font-semibold text-secondary">$30.00</span>
                          </div>
                        )}
                        {formData.airportPickup && (
                          <div className="flex justify-between text-sm">
                            <span className="text-text-light">{t('step3.airportPickup.title')}</span>
                            <span className="font-semibold text-secondary">$25.00</span>
                          </div>
                        )}
                        {formData.extraNight && (
                          <div className="flex justify-between text-sm">
                            <span className="text-text-light">{t('step3.extraNight.title')}</span>
                            <span className="font-semibold text-secondary">$50.00</span>
                          </div>
                        )}
                        {formData.photographyService && (
                          <div className="flex justify-between text-sm">
                            <span className="text-text-light">{t('step3.photographyService.title')}</span>
                            <span className="font-semibold text-secondary">$100.00</span>
                          </div>
                        )}
                        {formData.privateTour && (
                          <div className="flex justify-between text-sm">
                            <span className="text-text-light">{t('step3.privateTour.title')}</span>
                            <span className="font-semibold text-secondary">$150.00</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Price Breakdown */}
                    <div className="space-y-3 mb-6 border-t pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-light">{t('priceSummary.subtotal')}</span>
                        <span className="font-semibold text-secondary">${subtotal.toFixed(2)}</span>
                      </div>

                      {additionalTotal > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-text-light">{t('priceSummary.additionalServices')}</span>
                          <span className="font-semibold text-secondary">${additionalTotal.toFixed(2)}</span>
                        </div>
                      )}

                      {promoApplied && discountAmount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-green-600">{t('priceSummary.discount', { percent: promoDiscount })}</span>
                          <span className="font-semibold text-green-600">-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-sm">
                        <span className="text-text-light">{t('priceSummary.tax')}</span>
                        <span className="font-semibold text-secondary">${tax.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Grand Total */}
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-xl mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-secondary">{t('priceSummary.total')}</span>
                        <span className="text-3xl font-bold text-primary">${grandTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-text-light text-center py-8">{t('step1.selectTourPlaceholder')}</p>
                )}

                {/* Trust Badges */}
                <div className="space-y-3 pt-6 border-t">
                  <div className="flex items-center gap-2 text-sm text-text-light">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>{t('trustBadges.securePayment')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-light">
                    <RotateCcw className="w-4 h-4 text-blue-600" />
                    <span>{t('trustBadges.moneyBack')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-light">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>{t('trustBadges.instantConfirm')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl" data-aos="zoom-in">
            {/* Success Animation */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h2 className="text-3xl font-bold text-secondary text-center mb-4">
              {t('success.title')}
            </h2>

            <p className="text-text-light text-center mb-6">
              {t('success.message')}
            </p>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl mb-6 text-center">
              <p className="text-sm text-text-light mb-2">{t('success.bookingNumber')}</p>
              <p className="text-3xl font-bold text-primary tracking-wider">{bookingNumber}</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => alert(t('downloadReceiptDemo'))}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary/5 transition-colors"
              >
                <Download className="w-5 h-5" />
                {t('buttons.downloadReceipt')}
              </button>

              <Link
                to="/"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-secondary font-bold rounded-xl transition-all"
              >
                <HomeIcon className="w-5 h-5" />
                {t('buttons.backToHome')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Booking;
