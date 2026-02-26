import { useState, useEffect } from 'react';
import { Clock, Save, CheckCircle, XCircle } from 'lucide-react';
import { useOpeningHours, OpeningHour } from '../../hooks/useOpeningHours';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../../components/Button';
import { LoadingSpinner } from '../../components/LoadingSpinner';

interface PeriodData {
  id: string;
  openingTime: string;
  closingTime: string;
  isOpen: boolean;
  customMessage: string;
}

export default function OpeningHoursManagement() {
  const { openingHours, loading, updateOpeningHours } = useOpeningHours();
  const { t } = useLanguage();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [weekdays, setWeekdays] = useState<PeriodData>({
    id: '',
    openingTime: '09:00',
    closingTime: '18:00',
    isOpen: true,
    customMessage: '',
  });

  const [saturday, setSaturday] = useState<PeriodData>({
    id: '',
    openingTime: '10:00',
    closingTime: '14:00',
    isOpen: true,
    customMessage: '',
  });

  const [sunday, setSunday] = useState<PeriodData>({
    id: '',
    openingTime: '10:00',
    closingTime: '14:00',
    isOpen: false,
    customMessage: '',
  });

  useEffect(() => {
    if (openingHours.length > 0) {
      const weekdaysData = openingHours.find((h) => h.period_type === 'weekdays');
      const saturdayData = openingHours.find((h) => h.period_type === 'saturday');
      const sundayData = openingHours.find((h) => h.period_type === 'sunday');

      if (weekdaysData) {
        setWeekdays({
          id: weekdaysData.id,
          openingTime: weekdaysData.opening_time?.substring(0, 5) || '09:00',
          closingTime: weekdaysData.closing_time?.substring(0, 5) || '18:00',
          isOpen: weekdaysData.is_open,
          customMessage: weekdaysData.custom_message || '',
        });
      }

      if (saturdayData) {
        setSaturday({
          id: saturdayData.id,
          openingTime: saturdayData.opening_time?.substring(0, 5) || '10:00',
          closingTime: saturdayData.closing_time?.substring(0, 5) || '14:00',
          isOpen: saturdayData.is_open,
          customMessage: saturdayData.custom_message || '',
        });
      }

      if (sundayData) {
        setSunday({
          id: sundayData.id,
          openingTime: sundayData.opening_time?.substring(0, 5) || '10:00',
          closingTime: sundayData.closing_time?.substring(0, 5) || '14:00',
          isOpen: sundayData.is_open,
          customMessage: sundayData.custom_message || '',
        });
      }
    }
  }, [openingHours]);

  const validateTime = (opening: string, closing: string): boolean => {
    if (!opening || !closing) return false;
    return opening < closing;
  };

  const handleSave = async () => {
    if (weekdays.isOpen && !validateTime(weekdays.openingTime, weekdays.closingTime)) {
      setMessage({ type: 'error', text: t.openingHours.validation.invalidTime });
      return;
    }

    if (saturday.isOpen && !validateTime(saturday.openingTime, saturday.closingTime)) {
      setMessage({ type: 'error', text: t.openingHours.validation.invalidTime });
      return;
    }

    if (sunday.isOpen && !validateTime(sunday.openingTime, sunday.closingTime)) {
      setMessage({ type: 'error', text: t.openingHours.validation.invalidTime });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const updates = [
        {
          id: weekdays.id,
          opening_time: weekdays.isOpen ? weekdays.openingTime : null,
          closing_time: weekdays.isOpen ? weekdays.closingTime : null,
          is_open: weekdays.isOpen,
          custom_message: weekdays.customMessage || null,
        },
        {
          id: saturday.id,
          opening_time: saturday.isOpen ? saturday.openingTime : null,
          closing_time: saturday.isOpen ? saturday.closingTime : null,
          is_open: saturday.isOpen,
          custom_message: saturday.customMessage || null,
        },
        {
          id: sunday.id,
          opening_time: sunday.isOpen ? sunday.openingTime : null,
          closing_time: sunday.isOpen ? sunday.closingTime : null,
          is_open: sunday.isOpen,
          custom_message: sunday.customMessage || null,
        },
      ];

      const results = await Promise.all(updates.map((update) => updateOpeningHours(update)));

      const hasError = results.some((result) => !result.success);

      if (hasError) {
        setMessage({ type: 'error', text: t.openingHours.messages.updateError });
      } else {
        setMessage({ type: 'success', text: t.openingHours.messages.updateSuccess });
      }
    } catch (error) {
      setMessage({ type: 'error', text: t.openingHours.messages.updateError });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const renderPeriodSection = (
    title: string,
    data: PeriodData,
    setter: React.Dispatch<React.SetStateAction<PeriodData>>
  ) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5" />
        {title}
      </h3>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={data.isOpen}
              onChange={(e) => setter({ ...data, isOpen: e.target.checked })}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="font-medium">
              {data.isOpen ? t.openingHours.open : t.openingHours.closed}
            </span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.openingHours.customMessage}
          </label>
          <input
            type="text"
            value={data.customMessage}
            onChange={(e) => setter({ ...data, customMessage: e.target.value })}
            placeholder={t.openingHours.customMessagePlaceholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {data.isOpen && !data.customMessage && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.openingHours.openingTime}
              </label>
              <input
                type="time"
                value={data.openingTime}
                onChange={(e) => setter({ ...data, openingTime: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.openingHours.closingTime}
              </label>
              <input
                type="time"
                value={data.closingTime}
                onChange={(e) => setter({ ...data, closingTime: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t.openingHours.management.title}
          </h1>
          <p className="text-gray-600">{t.openingHours.management.description}</p>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <div className="space-y-6 mb-8">
          {renderPeriodSection(t.openingHours.weekdays, weekdays, setWeekdays)}
          {renderPeriodSection(t.openingHours.saturday, saturday, setSaturday)}
          {renderPeriodSection(t.openingHours.sunday, sunday, setSunday)}
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2">
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                {t.openingHours.saving}
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                {t.openingHours.save}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
