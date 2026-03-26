import { useEffect, useState } from 'react';
import { Anchor } from 'lucide-react';

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [stage, setStage] = useState<'initial' | 'shifted' | 'gradient'>('initial');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStage('shifted');
    }, 1000);

    const timer2 = setTimeout(() => {
      setStage('gradient');
    }, 2500);

    const timer3 = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center transition-all duration-[2000ms] ease-in-out"
      style={{
        background: stage === 'gradient'
          ? 'linear-gradient(to bottom, #00072D, #0A2472, #0E6BA8)'
          : '#A6E1FA'
      }}
    >
      <div
        className={`flex items-center gap-6 transition-all duration-700 ${
          stage === 'initial' ? 'justify-center' : 'justify-start'
        }`}
      >
        <div
          className="transition-all duration-[2000ms] ease-in-out animate-float"
          style={{
            color: stage === 'gradient' ? '#A6E1FA' : '#00072D'
          }}
        >
          <Anchor
            size={80}
            strokeWidth={1.5}
          />
        </div>

        <h1
          className={`font-bold text-5xl transition-all duration-700 overflow-hidden ${
            stage === 'initial' ? 'max-w-0 opacity-0' : 'max-w-xl opacity-100'
          }`}
          style={{
            color: stage === 'gradient' ? '#A6E1FA' : '#00072D',
            transition: 'color 2000ms ease-in-out, max-width 700ms, opacity 700ms'
          }}
        >
          OCEANIC
        </h1>
      </div>
    </div>
  );
}
