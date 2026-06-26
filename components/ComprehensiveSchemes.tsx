'use client';

import { useTranslations, useLocale } from 'next-intl';

export default function ComprehensiveSchemes() {
  const t = useTranslations();
  const locale = useLocale();

  // Helper function to get text based on locale
  const getLocalizedText = (hi: string, en: string, kn: string) => {
    if (locale === 'en') return en;
    if (locale === 'kn') return kn;
    return hi; // default to Hindi
  };

  const getLocalizedTextWithFallback = (hi: string, en: string, kn?: string) => {
    if (locale === 'en') return en;
    if (locale === 'kn' && kn) return kn;
    return hi; // default to Hindi
  };

  const schemeCategories = [
    {
      id: 'kisan',
      icon: '🌾',
      title: 'किसान कल्याण',
      titleEn: 'Farmers Welfare',
      titleKn: 'ಕೃಷಿಕರ ಕಲ್ಯಾಣ',
      color: 'from-green-600 to-green-700',
      schemes: [
        { name: 'पीएम-किसान सम्मान निधि', nameEn: 'PM-Kisan Samman Nidhi', nameKn: 'ಪಿಎಂ-ಕಿಸಾನ್ ಸನ್ಮಾನ್ ನಿಧಿ', status: 'एक्टिव', statusEn: 'Active', statusKn: 'ಸಕ್ರಿಯ', beneficiaries: '842', beneficiariesEn: '842', beneficiariesKn: '842' },
        { name: 'फसल बीमा योजना', nameEn: 'Crop Insurance Scheme', nameKn: 'ಬೆಳೆ ವಿಮಾ ಯೋಜನೆ', status: 'चल रहा', statusEn: 'Ongoing', statusKn: 'ಚಾಲ್ಜಿದೆ', beneficiaries: '356', beneficiariesEn: '356', beneficiariesKn: '356' },
        { name: 'कृषि उपकरण अनुदान', nameEn: 'Farm Equipment Grant', nameKn: 'ಕೃಷಿ ಸಲಕರಣೆಗಳ ಅನುದಾನ', status: 'आवेदन खुला', statusEn: 'Open', statusKn: 'ತೆರೆದಿದೆ', beneficiaries: '124', beneficiariesEn: '124', beneficiariesKn: '124' },
      ]
    },
    {
      id: 'sadak',
      icon: '🛣️',
      title: 'सड़क व पूर्वाधरार',
      titleEn: 'Roads & Infrastructure',
      titleKn: 'ರಸ್ತೆಗಳು ಮತ್ತು ಮೂಲಸೌಕರ್ಯಗಳು',
      color: 'from-amber-600 to-amber-700',
      schemes: [
        { name: 'मनरेगा जॉब कार्ड', nameEn: 'MNREGA Job Card', nameKn: 'ನರೇಗಾ ಜಾಬ್ ಕಾರ್ಡ್', status: 'एक्टिव', statusEn: 'Active', statusKn: 'ಸಕ್ರಿಯ', beneficiaries: '1,247', beneficiariesEn: '1,247', beneficiariesKn: '1,247' },
        { name: 'पीएम ग्राम सड़क योजना', nameEn: 'PM Gram Sadak Yojana', nameKn: 'ಪಿಎಂ ಗ್ರಾಮ ಸಡಕ್ ಯೋಜನೆ', status: 'चल रहा', statusEn: 'Ongoing', statusKn: 'ಚಾಲ್ಜಿದೆ', beneficiaries: '12 किमी', beneficiariesEn: '12 km', beneficiariesKn: '12 ಕಿಮೀ' },
        { name: 'नाली निर्माण अभियान', nameEn: 'Drainage Construction', nameKn: 'ಒಳಚರಂಡಿ ನಿರ್ಮಾಣ', status: '85% पूर्ण', statusEn: '85% Complete', statusKn: '85% ಪೂರ್ಣ', beneficiaries: '8 वार्ड', beneficiariesEn: '8 wards', beneficiariesKn: '8 ವಾರ್ಡ್' },
      ]
    },
    {
      id: 'shiksha',
      icon: '📚',
      title: 'शिक्षा व स्वास्थ्य',
      titleEn: 'Education & Health',
      titleKn: 'ಶಿಕ್ಷಣ ಮತ್ತು ಆರೋಗ್ಯ',
      color: 'from-blue-600 to-blue-700',
      schemes: [
        { name: 'आयुष्मान कार्ड', nameEn: 'Ayushman Card', nameKn: 'ಆಯುಷ್ಮಾನ್ ಕಾರ್ಡ್', status: 'एक्टिव', statusEn: 'Active', statusKn: 'ಸಕ್ರಿಯ', beneficiaries: '2,456', beneficiariesEn: '2,456', beneficiariesKn: '2,456' },
        { name: 'मध्याह्न भोजन', nameEn: 'Mid-Day Meal', nameKn: 'ಮಧ್ಯಾಹ್ನ ಊಟ', status: 'चल रहा', statusEn: 'Ongoing', statusKn: 'ಚಾಲ್ಜಿದೆ', beneficiaries: '345 बच्चे', beneficiariesEn: '345 children', beneficiariesKn: '345 ಮಕ್ಕಳು' },
        { name: 'टीकाकरण अभियान', nameEn: 'Vaccination Drive', nameKn: 'ಲಸಿಕೆ ಅಭಿಯಾನ', status: 'संपन्न', statusEn: 'Completed', statusKn: 'ಪೂರ್ಣಗೊಂಡಿದೆ', beneficiaries: '98%', beneficiariesEn: '98%', beneficiariesKn: '98%' },
      ]
    },
    {
      id: 'panchayat',
      icon: '🏛️',
      title: 'पंचायत सेवाएं',
      titleEn: 'Panchayat Services',
      titleKn: 'ಪಂಚಾಯತ್ ಸೇವೆಗಳು',
      color: 'from-purple-600 to-purple-700',
      schemes: [
        { name: 'ई-पहचान पत्र', nameEn: 'E-Pehchan Card', nameKn: 'ಇ-ಗುರುತಿನ ಚೀಟಿ', status: 'नया', statusEn: 'New', statusKn: 'ಹೊಸದು', beneficiaries: 'डाउनलोड करें', beneficiariesEn: 'Download', beneficiariesKn: 'ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ' },
        { name: 'प्रमाण पत्र सेवा', nameEn: 'Certificate Service', nameKn: 'ಪ್ರಮಾಣಪತ್ರ ಸೇವೆ', status: 'एक्टिव', statusEn: 'Active', statusKn: 'ಸಕ್ರಿಯ', beneficiaries: 'ऑनलाइन', beneficiariesEn: 'Online', beneficiariesKn: 'ಆನ್‌ಲೈನ್' },
        { name: 'जन-शिकायत', nameEn: 'Grievance Redressal', nameKn: 'ಕುಂದುಕೊರತೆ ನಿರ್ದಾನಕಾರ', status: '24/7', statusEn: '24/7', statusKn: '24/7', beneficiaries: 'हेल्पलाइन', beneficiariesEn: 'Helpline', beneficiariesKn: 'ಸಹಾಯವಾಣಿ' },
      ]
    },
    {
      id: 'digital',
      icon: '📱',
      title: 'डिजिटल पहचान',
      titleEn: 'Digital Identity',
      titleKn: 'ಡಿಜಿಟಲ್ ಗುರುತು',
      color: 'from-teal-600 to-teal-700',
      schemes: [
        { name: 'डिजिटल ग्राम प्रोफाइल', nameEn: 'Digital Village Profile', nameKn: 'ಡಿಜಿಟಲ್ ಗ್ರಾಮ ಪ್ರೊಫೈಲ್', status: 'लॉन्च', statusEn: 'Launch', statusKn: 'ಪ್ರಾರಂಭ', beneficiaries: 'पूरा गाँव', beneficiariesEn: 'Full Village', beneficiariesKn: 'ಪೂರ್ಣ ಗ್ರಾಮ' },
        { name: 'आधार लिंकिंग', nameEn: 'Aadhaar Linking', nameKn: 'ಆಧಾರ್ ಲಿಂಕಿಂಗ್', status: 'वैकल्पिक', statusEn: 'Optional', statusKn: 'ಐಚ್ಛಿಕ', beneficiaries: '95%', beneficiariesEn: '95%', beneficiariesKn: '95%' },
        { name: 'मोबाइल ऐप', nameEn: 'Mobile App', nameKn: 'ಮೊಬೈಲ್ ಆ್ಯಪ್', status: 'जल्द आ रहा', statusEn: 'Coming Soon', statusKn: 'ಶೀಘ್ರವೇ', beneficiaries: 'जल्द आ रहा', beneficiariesEn: 'Coming Soon', beneficiariesKn: 'ಶೀಘ್ರವೇ' },
      ]
    },
    {
      id: 'vikas',
      icon: '🏘️',
      title: 'ग्राम विकास',
      titleEn: 'Village Development',
      titleKn: 'ಗ್ರಾಮ ಅಭಿವೃದ್ಧಿ',
      color: 'from-rose-600 to-rose-700',
      schemes: [
        { name: 'पीएम आवास योजना', nameEn: 'PM Awas Yojana', nameKn: 'ಪಿಎಂ ಆವಾಸ್ ಯೋಜನೆ', status: 'चल रहा', statusEn: 'Ongoing', statusKn: 'ಚಾಲ್ಜಿದೆ', beneficiaries: '45 घर', beneficiariesEn: '45 houses', beneficiariesKn: '45 ಮನೆಗಳು' },
        { name: 'स्वच्छ भारत', nameEn: 'Swachh Bharat', nameKn: 'ಸ್ವಚ್ಛ್ ಭಾರತ್', status: 'ओडीएफ', statusEn: 'ODF', statusKn: 'ಒಡಿಎಫ್', beneficiaries: '92%', beneficiariesEn: '92%', beneficiariesKn: '92%' },
        { name: 'जल जीवन मिशन', nameEn: 'Jal Jeevan Mission', nameKn: 'ಜಲ್ ಜೀವನ್ ಮಿಷನ್', status: 'चल रहा', statusEn: 'Ongoing', statusKn: 'ಚಾಲ್ಜಿದೆ', beneficiaries: '7 टैंकी', beneficiariesEn: '7 tanks', beneficiariesKn: '7 ಟ್ಯಾಂಕ್‌ಗಳು' },
      ]
    },
  ];

  return (
    <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 bg-white">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-brand-saffron rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-forest ink-underline">
              {t('schemes_title')}
            </h3>
            <p className="text-brand-earth/80 mt-1 font-medium">{t('schemes_sub')}</p>
          </div>
        </div>
        <p className="text-gray-600 max-w-2xl">
          {t('schemes_desc')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {schemeCategories.map((category) => (
          <div
            key={category.id}
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-brand-saffron/50 transition-all duration-300"
          >
            {/* Header */}
            <div className={`bg-gradient-to-r ${category.color} p-4 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{category.icon}</span>
                  <div>
                    <h4 className="font-bold text-lg">{getLocalizedText(category.title, category.titleEn, category.titleKn)}</h4>
                    <p className="text-xs opacity-80">{getLocalizedText(category.titleEn, category.title, category.titleKn)}</p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Schemes List */}
            <div className="p-4 space-y-3">
              {category.schemes.map((scheme, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center shadow-sm">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-800">{getLocalizedText(scheme.name, scheme.nameEn, scheme.nameKn)}</p>
                      <p className="text-xs text-gray-500">{getLocalizedText(scheme.status, scheme.statusEn, scheme.statusKn)}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-brand-saffron bg-brand-saffron/10 px-2 py-1 rounded">
                    {getLocalizedText(scheme.beneficiaries, scheme.beneficiariesEn, scheme.beneficiariesKn)}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="px-4 pb-4">
              <button className="w-full py-2.5 text-sm font-semibold text-brand-forest border border-brand-forest/20 rounded-lg hover:bg-brand-forest hover:text-white transition">
                {getLocalizedText(t('schemes_btn_en'), t('schemes_btn'), t('schemes_btn_kn'))}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
