import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-secondary text-secondary-foreground">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="text-secondary-foreground hover:bg-secondary-light/20"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-2xl font-bold">
                {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </h1>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {language === 'ar' ? 'سياسة الخصوصية - تطبيق بوصلة النور' : 'Privacy Policy - An-Nur Compass App'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Data Collection */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  {language === 'ar' ? 'جمع البيانات' : 'Data Collection'}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {language === 'ar' 
                    ? 'يجمع تطبيق بوصلة النور البيانات التالية لتقديم الخدمات:'
                    : 'An-Nur Compass collects the following data to provide services:'
                  }
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                  <li>{language === 'ar' ? 'بيانات الموقع (GPS) لحساب أوقات الصلاة واتجاه القبلة' : 'Location data (GPS) for prayer times and Qibla direction'}</li>
                  <li>{language === 'ar' ? 'بيانات المستشعرات (البوصلة) لتحديد الاتجاه' : 'Sensor data (compass) for direction determination'}</li>
                  <li>{language === 'ar' ? 'تفضيلات التطبيق والإعدادات المحلية' : 'App preferences and local settings'}</li>
                </ul>
              </div>

              {/* Data Usage */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  {language === 'ar' ? 'استخدام البيانات' : 'Data Usage'}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {language === 'ar' 
                    ? 'جميع البيانات تُحفظ محلياً على جهازك ولا تُرسل إلى خوادم خارجية. نستخدم البيانات لـ:'
                    : 'All data is stored locally on your device and not sent to external servers. We use data for:'
                  }
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                  <li>{language === 'ar' ? 'حساب أوقات الصلاة بدقة' : 'Accurate prayer time calculations'}</li>
                  <li>{language === 'ar' ? 'تحديد اتجاه القبلة' : 'Qibla direction determination'}</li>
                  <li>{language === 'ar' ? 'إرسال تذكيرات الصلاة' : 'Prayer time notifications'}</li>
                  <li>{language === 'ar' ? 'حفظ تقدم قراءة القرآن' : 'Saving Quran reading progress'}</li>
                </ul>
              </div>

              {/* Third Party Services */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  {language === 'ar' ? 'الخدمات الخارجية' : 'Third-Party Services'}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {language === 'ar' 
                    ? 'يستخدم التطبيق خدمات خارجية لجلب البيانات:'
                    : 'The app uses external services to fetch data:'
                  }
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                  <li>{language === 'ar' ? 'API القرآن الكريم - لنص القرآن' : 'Al-Quran API - for Quran text'}</li>
                  <li>{language === 'ar' ? 'خدمة تحديد الموقع - لأسماء المدن' : 'Geocoding service - for city names'}</li>
                </ul>
              </div>

              {/* Children's Privacy */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  {language === 'ar' ? 'خصوصية الأطفال' : "Children's Privacy"}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {language === 'ar' 
                    ? 'التطبيق آمن للاستخدام من قبل الأطفال ولا يجمع أي معلومات شخصية.'
                    : 'The app is safe for children and does not collect any personal information.'
                  }
                </p>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  {language === 'ar' ? 'التواصل' : 'Contact'}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {language === 'ar' 
                    ? 'لأي استفسارات حول الخصوصية، يرجى التواصل معنا من خلال التطبيق.'
                    : 'For any privacy concerns, please contact us through the app.'
                  }
                </p>
              </div>

              {/* Disclaimer */}
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  {language === 'ar' 
                    ? 'آخر تحديث: ديسمبر 2024. هذا التطبيق للأغراض التعليمية والشخصية فقط.'
                    : 'Last updated: December 2024. This app is for educational and personal use only.'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;