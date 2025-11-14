import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './timepicker.css';

const ITEM_HEIGHT = 40;

// Hours 1–12
const hours = [...Array(12)].map((_, i) => String(i + 1).padStart(2, '0'));
// 15-minute intervals
const minutes = ['00', '15', '30', '45'];
const periods = ['AM', 'PM'];

export default function TimePicker({ disabledHours = [], onChange }) {
  const [hour, setHour] = useState('01');
  const [minute, setMinute] = useState('00');
  const [period, setPeriod] = useState('AM');

  const containerRef = useRef(null);
  const hourRef = useRef(null);
  const minRef = useRef(null);
  const periodRef = useRef(null);

  // Check if hour is disabled
  function isHourDisabled(h) {
    return disabledHours.includes(Number(h));
  }

  // Snap function for smooth GSAP scroll
  function snap(ref, items, setter, type) {
    if (!ref.current) return;

    const scrollTop = ref.current.scrollTop;
    const index = Math.round(scrollTop / ITEM_HEIGHT);
    const selected = items[index];

    if (type === 'hour' && isHourDisabled(selected)) return;

    setter(selected);
  }

  // AM/PM auto-set & call onChange
  useEffect(() => {
    const h = Number(hour);
    setPeriod(h >= 1 && h <= 11 ? 'AM' : 'PM');
    onChange?.(`${hour}:${minute} ${period}`);
  }, [hour, minute, period, onChange]);

  // GSAP smooth snapping
  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Hour wheel
      if (hourRef.current) {
        const handleHourScroll = () => snap(hourRef, hours, setHour, 'hour');
        hourRef.current.addEventListener('scroll', handleHourScroll);
        return () =>
          hourRef.current.removeEventListener('scroll', handleHourScroll);
      }
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Minute wheel
      if (minRef.current) {
        const handleMinScroll = () =>
          snap(minRef, minutes, setMinute, 'minute');
        minRef.current.addEventListener('scroll', handleMinScroll);
        return () =>
          minRef.current.removeEventListener('scroll', handleMinScroll);
      }
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="tp-container">
      {/* HOURS */}
      <div className="tp-wheel" ref={hourRef}>
        {hours.map((h) => (
          <div
            key={h}
            className={`tp-item ${h === hour ? 'tp-active' : ''} ${
              isHourDisabled(h) ? 'tp-disabled' : ''
            }`}
          >
            {h}
          </div>
        ))}
      </div>

      {/* MINUTES */}
      <div className="tp-wheel" ref={minRef}>
        {minutes.map((m) => (
          <div
            key={m}
            className={`tp-item ${m === minute ? 'tp-active' : ''} ${
              isHourDisabled(hour) ? 'tp-disabled' : ''
            }`}
          >
            {m}
          </div>
        ))}
      </div>

      {/* PERIOD */}
      <div className="tp-wheel" ref={periodRef}>
        {periods.map((p) => (
          <div key={p} className={`tp-item ${p === period ? 'tp-active' : ''}`}>
            {p}
          </div>
        ))}
      </div>

      {/* Highlight */}
      <div className="tp-highlight" />
    </div>
  );
}
