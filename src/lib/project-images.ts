import type { StaticImageData } from 'next/image';

// Static imports (not string paths) so next/image prefixes the basePath on GitHub Pages.
import amDashboard from '@/assets/projects/am-dashboard.webp';
import amAnalytics from '@/assets/projects/am-analytics.webp';
import amWordcloud from '@/assets/projects/am-wordcloud.webp';
import amProfile from '@/assets/projects/am-profile.webp';
import amCases from '@/assets/projects/am-cases.webp';
import amAlerts from '@/assets/projects/am-alerts.webp';
import amStudentForm from '@/assets/projects/am-student-form.webp';
import amwebHome from '@/assets/projects/amweb-home.webp';
import amwebSociogram from '@/assets/projects/amweb-sociogram.webp';
import amwebProtocols from '@/assets/projects/amweb-protocols.webp';
import amwebBank from '@/assets/projects/amweb-bank.webp';
import ugEsRuin from '@/assets/projects/ug-es-ruin.webp';
import ugEsOdds from '@/assets/projects/ug-es-odds.webp';
import ugEsMarket from '@/assets/projects/ug-es-market.webp';
import ugEsSlots from '@/assets/projects/ug-es-slots.webp';
import npResultsEs from '@/assets/projects/np-results-es.webp';
import npTimelineEs from '@/assets/projects/np-timeline-es.webp';
import npSavedEs from '@/assets/projects/np-saved-es.webp';
import npSetupEs from '@/assets/projects/np-setup-es.webp';
import brPromoEs from '@/assets/projects/br-promo-es.webp';
import brLandingEs from '@/assets/projects/br-landing-es.webp';
import ugEnRuin from '@/assets/projects/ug-en-ruin.webp';
import ugEnOdds from '@/assets/projects/ug-en-odds.webp';
import ugEnMarket from '@/assets/projects/ug-en-market.webp';
import ugEnSlots from '@/assets/projects/ug-en-slots.webp';
import npResultsEn from '@/assets/projects/np-results-en.webp';
import npTimelineEn from '@/assets/projects/np-timeline-en.webp';
import npSavedEn from '@/assets/projects/np-saved-en.webp';
import npSetupEn from '@/assets/projects/np-setup-en.webp';
import brPromoEn from '@/assets/projects/br-promo-en.webp';
import brLandingEn from '@/assets/projects/br-landing-en.webp';

export const projectImages: Record<string, StaticImageData> = {
  'am-dashboard': amDashboard,
  'am-analytics': amAnalytics,
  'am-wordcloud': amWordcloud,
  'am-profile': amProfile,
  'am-cases': amCases,
  'am-alerts': amAlerts,
  'am-student-form': amStudentForm,
  'amweb-home': amwebHome,
  'amweb-sociogram': amwebSociogram,
  'amweb-protocols': amwebProtocols,
  'amweb-bank': amwebBank,
  'ug-es-ruin': ugEsRuin,
  'ug-es-odds': ugEsOdds,
  'ug-es-market': ugEsMarket,
  'ug-es-slots': ugEsSlots,
  'np-results-es': npResultsEs,
  'np-timeline-es': npTimelineEs,
  'np-saved-es': npSavedEs,
  'np-setup-es': npSetupEs,
  'br-promo-es': brPromoEs,
  'br-landing-es': brLandingEs,
  'ug-en-ruin': ugEnRuin,
  'ug-en-odds': ugEnOdds,
  'ug-en-market': ugEnMarket,
  'ug-en-slots': ugEnSlots,
  'np-results-en': npResultsEn,
  'np-timeline-en': npTimelineEn,
  'np-saved-en': npSavedEn,
  'np-setup-en': npSetupEn,
  'br-promo-en': brPromoEn,
  'br-landing-en': brLandingEn,
};
