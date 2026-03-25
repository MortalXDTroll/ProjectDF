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
      className="fixed inset-0 flex items-center justify-center"
      style={{
        background: stage === 'gradient'
          ? 'linear-gradient(to bottom, #00072D, #0A2472, #0E6BA8)'
          : '#A6E1FA',
        transition: 'background 2000ms ease-in-out',
      }}
    >
      <div
        className={`flex items-center gap-6 transition-all duration-700 ${
          stage === 'initial' ? 'justify-center' : 'justify-start'
        }`}
      >
        <div
          className={`transition-all duration-700 ${
            stage === 'gradient' ? 'text-[#A6E1FA]' : 'text-[#00072D]'
          }`}
        >
          <Anchor
            size={80}
            strokeWidth={1.5}
            className="animate-float"
          />
        </div>

        <h1
          className={`font-bold text-5xl transition-all duration-700 overflow-hidden ${
            stage === 'initial' ? 'max-w-0 opacity-0' : 'max-w-xl opacity-100'
          } ${
            stage === 'gradient' ? 'text-[#A6E1FA]' : 'text-[#00072D]'
          }`}
        >
          OCEANIC
        </h1>
      </div>
    </div>
  );
}
