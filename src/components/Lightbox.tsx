import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface LightboxProps {
  images: string[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.5;

export default function Lightbox({ images, index, onClose, onIndexChange }: LightboxProps) {
  const [zoom, setZoom] = useState(1);
  const [hasDragged, setHasDragged] = useState(false);
  const dragAreaRef = useRef<HTMLDivElement>(null);

  const goPrev = useCallback(() => {
    setZoom(1);
    onIndexChange((index - 1 + images.length) % images.length);
  }, [index, images.length, onIndexChange]);

  const goNext = useCallback(() => {
    setZoom(1);
    onIndexChange((index + 1) % images.length);
  }, [index, images.length, onIndexChange]);

  const zoomIn = useCallback(() => setZoom((z) => Math.min(z + ZOOM_STEP, MAX_ZOOM)), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(z - ZOOM_STEP, MIN_ZOOM)), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === '+' || e.key === '=') zoomIn();
      else if (e.key === '-') zoomOut();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, goPrev, goNext, zoomIn, zoomOut]);

  useEffect(() => {
    // Plain `overflow: hidden` on body is enough on most browsers, but Safari
    // (especially iOS) can fail to re-enable scrolling afterwards, particularly
    // once a fixed-position overlay with an active drag/transform has been on
    // top of the page. Locking body position and explicitly restoring the
    // scroll offset on cleanup avoids relying on that toggle working correctly.
    const scrollY = window.scrollY;
    const { style } = document.body;
    const original = {
      position: style.position,
      top: style.top,
      left: style.left,
      right: style.right,
      width: style.width,
      overflow: style.overflow,
    };

    style.position = 'fixed';
    style.top = `-${scrollY}px`;
    style.left = '0';
    style.right = '0';
    style.width = '100%';
    style.overflow = 'hidden';

    return () => {
      style.position = original.position;
      style.top = original.top;
      style.left = original.left;
      style.right = original.right;
      style.width = original.width;
      style.overflow = original.overflow;
      style.cursor = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => Math.min(Math.max(z - e.deltaY * 0.0015, MIN_ZOOM), MAX_ZOOM));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] bg-gray-100/95 flex items-center justify-center select-none"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
        className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-[#6b0f45] hover:bg-[#ffe0f2] transition-colors"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Zoom controls */}
      <div
        className="absolute top-5 left-5 flex items-center gap-1 bg-[#ffe0f2]/60 rounded-full px-2 py-1"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={zoomOut}
          disabled={zoom <= MIN_ZOOM}
          aria-label="Zoom out"
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#6b0f45] hover:bg-[#ffe0f2] disabled:opacity-30 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <span className="text-gray-600 text-xs w-10 text-center">{Math.round(zoom * 100)}%</span>
        <button
          onClick={zoomIn}
          disabled={zoom >= MAX_ZOOM}
          aria-label="Zoom in"
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#6b0f45] hover:bg-[#ffe0f2] disabled:opacity-30 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Index indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-gray-500 text-sm">
        {index + 1} / {images.length}
      </div>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous picture"
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-[#6b0f45] hover:bg-[#ffe0f2] transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Image — clicking the backdrop area here (outside the picture) closes the modal */}
      <div
        ref={dragAreaRef}
        className="w-full h-full flex items-center justify-center overflow-hidden px-16 py-16"
        onWheel={handleWheel}
      >
        <motion.img
          key={`${images[index]}-${zoom > 1 ? 'zoomed' : 'reset'}`}
          src={images[index]}
          alt=""
          initial={{ opacity: 0, scale: 0.97 * zoom }}
          animate={{ opacity: 1, scale: zoom }}
          transition={{ duration: 0.2 }}
          drag={zoom > 1}
          dragMomentum={false}
          onDragStart={() => {
            setHasDragged(false);
            document.body.style.cursor = 'grabbing';
          }}
          onDrag={() => setHasDragged(true)}
          onDragEnd={() => {
            document.body.style.cursor = '';
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (hasDragged) {
              setHasDragged(false);
              return;
            }
            setZoom((z) => (z > 1 ? 1 : 2));
          }}
          style={{ cursor: zoom > 1 ? 'grab' : 'zoom-in' }}
          whileDrag={{ cursor: 'grabbing' }}
          className="max-w-full max-h-full object-contain rounded-lg shadow-soft-lg"
        />
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next picture"
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-[#6b0f45] hover:bg-[#ffe0f2] transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </motion.div>
  );
}
