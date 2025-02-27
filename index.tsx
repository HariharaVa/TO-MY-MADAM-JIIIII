import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import CandleButton from "../components/CandleButton";
import BalloonButton from "../components/BalloonButton";
import WishMessage from "../components/WishMessage";

const Index = () => {
  // State management for interactions
  const [isReady, setIsReady] = useState(false);
  const [extinguishedCandles, setExtinguishedCandles] = useState(0);
  const [releasedBalloons, setReleasedBalloons] = useState(0);
  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Constants
  const totalCandles = 3;
  const totalBalloons = 3;
  const totalWishes = 5;

  // Refs for scroll sections
  const welcomeRef = useRef<HTMLDivElement>(null);
  const candlesSectionRef = useRef<HTMLDivElement>(null);
  const balloonsSectionRef = useRef<HTMLDivElement>(null);
  const wishesSectionRef = useRef<HTMLDivElement>(null);
  const finalMessageRef = useRef<HTMLDivElement>(null);

  // Scroll effects
  const { scrollYProgress } = useScroll();
  const welcomeOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const candlesOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.4], [0, 1, 0]);
  const balloonsOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.65], [0, 1, 0]);
  const wishesOpacity = useTransform(scrollYProgress, [0.6, 0.7, 0.9], [0, 1, 0]);
  const finalOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);

  const wishMessages = [
    "On this special day, I wish you joy, happiness, and all the love in the world.",
    "May your day be filled with wonderful memories and beautiful moments.",
    "Wishing you a year ahead filled with exciting adventures and beautiful surprises.",
    "May all your dreams come true and your heart be filled with happiness.",
    "You are amazing in every way. Happy Birthday to someone truly special!"
  ];

  const balloonColors = [
    "#FF719A", // Medium Pink
    "#9b87f5", // Purple
    "#FF9AA2", // Light Pink
  ];

  const handleReady = () => {
    setLoading(true);
    
    setTimeout(() => {
      setIsReady(true);
      setLoading(false);
      
      // Scroll to candles section
      if (candlesSectionRef.current) {
        candlesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 800);
  };

  const handleCandleExtinguish = () => {
    setExtinguishedCandles(prev => prev + 1);
  };

  const handleBalloonRelease = () => {
    setReleasedBalloons(prev => prev + 1);
  };

  useEffect(() => {
    if (extinguishedCandles === totalCandles) {
      setTimeout(() => {
        // Scroll to balloons section
        if (balloonsSectionRef.current) {
          balloonsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000);
    }
  }, [extinguishedCandles]);

  useEffect(() => {
    if (releasedBalloons === totalBalloons) {
      setTimeout(() => {
        // Scroll to wishes section
        if (wishesSectionRef.current) {
          wishesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000);
    }
  }, [releasedBalloons]);

  const handleNextWish = () => {
    if (currentWishIndex < totalWishes - 1) {
      setCurrentWishIndex(prev => prev + 1);
    } else {
      setShowFinalMessage(true);
      // Scroll to final message
      setTimeout(() => {
        if (finalMessageRef.current) {
          finalMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-birthday-light to-white overflow-x-hidden">
      {/* Welcome Section */}
      <motion.div 
        ref={welcomeRef}
        className="min-h-screen flex flex-col items-center justify-center p-6 snap-start"
        style={{ opacity: welcomeOpacity }}
      >
        <motion.div 
          className="glass-card max-w-md w-full text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-2 text-birthday-dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            To My Madam jii❤️
          </motion.h1>
          
          <motion.div 
            className="my-10 text-2xl md:text-3xl text-birthday-text font-medium"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.7 }}
          >
            Are you ready?
          </motion.div>
          
          <motion.button
            className="button-3d px-8 py-3 text-lg md:text-xl"
            onClick={handleReady}
            disabled={loading || isReady}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : isReady ? (
              "Let's go!"
            ) : (
              "Yes!"
            )}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Candles Section */}
      <motion.div 
        ref={candlesSectionRef}
        className="min-h-screen flex flex-col items-center justify-center p-6 snap-start"
        style={{ opacity: candlesOpacity }}
      >
        <motion.div 
          className="glass-card max-w-4xl w-full text-center py-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-birthday-dark mb-8">Blow out the candles!</h2>
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {[...Array(totalCandles)].map((_, index) => (
              <CandleButton key={index} id={index} onExtinguish={handleCandleExtinguish} />
            ))}
          </div>
          <p className="text-birthday-text text-lg mt-4">
            {extinguishedCandles === totalCandles 
              ? "All candles blown out! Keep scrolling or click below!" 
              : `${extinguishedCandles} of ${totalCandles} candles blown out`}
          </p>

          {extinguishedCandles === totalCandles && (
            <motion.button
              className="button-3d px-8 py-3 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              onClick={() => {
                if (balloonsSectionRef.current) {
                  balloonsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Continue to Balloons
            </motion.button>
          )}
        </motion.div>
      </motion.div>

      {/* Balloons Section */}
      <motion.div 
        ref={balloonsSectionRef}
        className="min-h-screen flex flex-col items-center justify-center p-6 snap-start"
        style={{ opacity: balloonsOpacity }}
      >
        <motion.div 
          className="glass-card max-w-4xl w-full text-center py-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-birthday-dark mb-8">Release the balloons!</h2>
          <div className="flex flex-wrap justify-center gap-10 mb-10">
            {balloonColors.map((color, index) => (
              <BalloonButton key={index} id={index} color={color} onRelease={handleBalloonRelease} />
            ))}
          </div>
          <p className="text-birthday-text text-lg mt-4">
            {releasedBalloons === totalBalloons 
              ? "All balloons released! Keep scrolling or click below!" 
              : `${releasedBalloons} of ${totalBalloons} balloons released`}
          </p>

          {releasedBalloons === totalBalloons && (
            <motion.button
              className="button-3d px-8 py-3 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              onClick={() => {
                if (wishesSectionRef.current) {
                  wishesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Continue to Wishes
            </motion.button>
          )}
        </motion.div>
      </motion.div>

      {/* Wishes Section */}
      <motion.div 
        ref={wishesSectionRef}
        className="min-h-screen flex flex-col items-center justify-center p-6 snap-start"
        style={{ opacity: wishesOpacity }}
      >
        <motion.div 
          className="max-w-4xl w-full flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {wishMessages.map((message, index) => (
            <WishMessage 
              key={index} 
              message={message} 
              isVisible={currentWishIndex === index}
              index={index}
            />
          ))}
          
          <motion.button
            className="button-3d px-8 py-3 mt-10"
            onClick={handleNextWish}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {currentWishIndex < totalWishes - 1 ? "Next Wish" : "See Final Message"}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Final Message Section */}
      <motion.div 
        ref={finalMessageRef}
        className="min-h-screen flex flex-col items-center justify-center p-6 snap-start"
        style={{ opacity: finalOpacity }}
      >
        <motion.div 
          className="glass-card max-w-xl w-full text-center px-6 py-10"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={showFinalMessage ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-6 text-birthday-dark"
            initial={{ opacity: 0, y: -10 }}
            animate={showFinalMessage ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Happy Birthday!
          </motion.h1>
          
          <motion.div 
            className="space-y-6 text-birthday-text"
            initial={{ opacity: 0 }}
            animate={showFinalMessage ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <p className="text-xl md:text-2xl leading-relaxed">
              On this special day, I want you to know how much you mean to me. Your kindness, your smile, and your presence make my world brighter every day.
            </p>
            
            <p className="text-xl md:text-2xl leading-relaxed">
              May this new year of your life bring you endless joy, success in all your endeavors, and moments that take your breath away.
            </p>
            
            <p className="text-xl md:text-2xl leading-relaxed">
              You deserve all the happiness in the world, today and always.
            </p>
          </motion.div>
          
          <motion.div 
            className="mt-10 text-birthday-dark text-2xl md:text-3xl font-bold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={showFinalMessage ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 1.8, duration: 0.7, type: "spring" }}
          >
            With love,
          </motion.div>
          
          <motion.div 
            className="mt-2 text-birthday-medium text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={showFinalMessage ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 2.2, duration: 0.7 }}
          >
            HARII
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Navigation Dots */}
      <div className="fixed right-5 top-1/2 transform -translate-y-1/2 z-10 space-y-3">
        <button 
          onClick={() => welcomeRef.current?.scrollIntoView({ behavior: 'smooth' })}
          className={`w-3 h-3 rounded-full transition-colors duration-300 ${scrollYProgress.get() < 0.2 ? 'bg-birthday-medium' : 'bg-gray-300'}`}
          aria-label="Go to welcome section"
        />
        <button 
          onClick={() => candlesSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
          className={`w-3 h-3 rounded-full transition-colors duration-300 ${scrollYProgress.get() >= 0.2 && scrollYProgress.get() < 0.4 ? 'bg-birthday-medium' : 'bg-gray-300'}`}
          aria-label="Go to candles section"
        />
        <button 
          onClick={() => balloonsSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
          className={`w-3 h-3 rounded-full transition-colors duration-300 ${scrollYProgress.get() >= 0.4 && scrollYProgress.get() < 0.6 ? 'bg-birthday-medium' : 'bg-gray-300'}`}
          aria-label="Go to balloons section"
        />
        <button 
          onClick={() => wishesSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
          className={`w-3 h-3 rounded-full transition-colors duration-300 ${scrollYProgress.get() >= 0.6 && scrollYProgress.get() < 0.8 ? 'bg-birthday-medium' : 'bg-gray-300'}`}
          aria-label="Go to wishes section"
        />
        <button 
          onClick={() => finalMessageRef.current?.scrollIntoView({ behavior: 'smooth' })}
          className={`w-3 h-3 rounded-full transition-colors duration-300 ${scrollYProgress.get() >= 0.8 ? 'bg-birthday-medium' : 'bg-gray-300'}`}
          aria-label="Go to final message section"
        />
      </div>

      {/* Scroll Indicator */}
      {isReady && (
        <motion.div 
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <p className="text-birthday-dark mb-2">Scroll down</p>
            <motion.div 
              className="w-6 h-10 border-2 border-birthday-dark rounded-full flex justify-center"
              initial={{ y: 0 }}
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <motion.div 
                className="w-1.5 h-1.5 bg-birthday-dark rounded-full mt-2"
                initial={{ y: 0 }}
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Index;
