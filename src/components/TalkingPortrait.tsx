import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const CHAR_MS = 30;
const HOLD_MS = 1600;

type TalkingPortraitProps = {
  name: string;
  photo?: string;
  lines: string[];
  /** Speak out loud, not just in the bubble. Only ever true for deliberate hover/click. */
  voice?: boolean;
  /** Bumping this number makes the portrait mutter to itself, silently. */
  ambientToken?: number;
  frameClassName?: string;
  frameStyle?: CSSProperties;
  initialsClassName?: string;
  /**
   * Where the bubble hangs. 'center' suits a centred portrait; 'start' keeps the
   * bubble inside the viewport when the portrait sits near the left edge.
   */
  bubbleAlign?: 'center' | 'start';
  onSpeakingChange?: (speaking: boolean) => void;
};

export function TalkingPortrait({
  name,
  photo,
  lines,
  voice = false,
  ambientToken = 0,
  frameClassName = '',
  frameStyle,
  initialsClassName = 'text-lg',
  bubbleAlign = 'center',
  onSpeakingChange,
}: TalkingPortraitProps) {
  const reduceMotion = useReducedMotion();
  const [speaking, setSpeaking] = useState(false);
  const [line, setLine] = useState('');
  const [revealed, setRevealed] = useState(0);

  const speakingRef = useRef(false);
  const nextLine = useRef(0);
  const typerRef = useRef<number | null>(null);
  const holdRef = useRef<number | null>(null);
  const spokeAloudRef = useRef(false);

  const photoSrc = photo ? `${import.meta.env.BASE_URL}${photo}` : undefined;
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('');

  const clearTimers = useCallback(() => {
    if (typerRef.current !== null) {
      window.clearInterval(typerRef.current);
      typerRef.current = null;
    }
    if (holdRef.current !== null) {
      window.clearTimeout(holdRef.current);
      holdRef.current = null;
    }
  }, []);

  const cancelVoice = useCallback(() => {
    if (spokeAloudRef.current && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    spokeAloudRef.current = false;
  }, []);

  const finish = useCallback(() => {
    clearTimers();
    cancelVoice();
    speakingRef.current = false;
    setSpeaking(false);
    setLine('');
    setRevealed(0);
    onSpeakingChange?.(false);
  }, [cancelVoice, clearTimers, onSpeakingChange]);

  const speak = useCallback(
    (aloud: boolean) => {
      if (speakingRef.current || lines.length === 0) return;

      const text = lines[nextLine.current % lines.length];
      nextLine.current += 1;

      clearTimers();
      speakingRef.current = true;
      setSpeaking(true);
      setLine(text);
      setRevealed(reduceMotion ? text.length : 0);
      onSpeakingChange?.(true);

      if (aloud && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.volume = 0.9;
        window.speechSynthesis.speak(utterance);
        spokeAloudRef.current = true;
      }

      const settle = () => {
        holdRef.current = window.setTimeout(finish, HOLD_MS);
      };

      if (reduceMotion) {
        settle();
        return;
      }

      let index = 0;
      typerRef.current = window.setInterval(() => {
        index += 1;
        setRevealed(index);
        if (index >= text.length) {
          if (typerRef.current !== null) {
            window.clearInterval(typerRef.current);
            typerRef.current = null;
          }
          settle();
        }
      }, CHAR_MS);
    },
    [clearTimers, finish, lines, onSpeakingChange, reduceMotion],
  );

  // Ambient muttering, requested by the section. Never out loud.
  const lastAmbient = useRef(0);
  useEffect(() => {
    if (ambientToken > 0 && ambientToken !== lastAmbient.current) {
      lastAmbient.current = ambientToken;
      speak(false);
    }
  }, [ambientToken, speak]);

  useEffect(
    () => () => {
      clearTimers();
      cancelVoice();
    },
    [cancelVoice, clearTimers],
  );

  const handleSpeak = () => speak(voice);
  const typing = revealed < line.length;

  return (
    <div className="relative">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.94 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            // Grow out of the portrait's mouth rather than out of thin air.
            style={{ transformOrigin: bubbleAlign === 'start' ? '2.5rem 100%' : '50% 100%' }}
            className={`pointer-events-none absolute bottom-full z-40 mb-8 w-[15rem] max-w-[70vw] ${
              bubbleAlign === 'start' ? 'left-0' : 'left-1/2 -translate-x-1/2'
            }`}
          >
            <p className={`portrait-speech ${bubbleAlign === 'start' ? 'portrait-speech--start' : ''}`}>
              {line.slice(0, revealed)}
              {typing && <span className="portrait-speech-caret" aria-hidden="true" />}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        role="button"
        tabIndex={0}
        aria-label={`Portrait of ${name}. Activate to hear a line from them.`}
        onMouseEnter={handleSpeak}
        onClick={handleSpeak}
        onFocus={handleSpeak}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleSpeak();
          }
        }}
        className={`ai-avatar-frame is-interactive ${frameClassName}`}
        style={frameStyle}
      >
        <div className={`ai-portrait-stage ${speaking ? 'is-speaking' : ''}`}>
          {photoSrc ? (
            <>
              <img src={photoSrc} alt={name} className="ai-avatar-image" />
              <img src={photoSrc} alt="" aria-hidden="true" className="ai-avatar-jaw" />
            </>
          ) : (
            <span className={`ai-avatar-initials ${initialsClassName}`}>{initials}</span>
          )}
        </div>
        <span className="ai-avatar-shimmer" />
      </div>

      {/* Screen readers get the line as text rather than as an animation. */}
      <span className="sr-only" aria-live="polite">
        {speaking ? `${name} says: ${line}` : ''}
      </span>
    </div>
  );
}
