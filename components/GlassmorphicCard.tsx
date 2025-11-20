
import React from 'react';

// Fix: Extend React.HTMLAttributes<HTMLDivElement> to accept standard HTML div attributes like 'id'
interface GlassmorphicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  // className and onClick are already covered by React.HTMLAttributes<HTMLDivElement>,
  // but className is kept explicit for merging with component's internal styles.
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({ children, className, ...restProps }) => {
  return (
    <div
      className={`relative p-4 rounded-xl shadow-lg backdrop-filter backdrop-blur-md bg-white/10 border border-white/20 overflow-hidden ${className}`}
      {...restProps} // Fix: Spread all remaining props to the div
    >
      {children}
    </div>
  );
};

export default GlassmorphicCard;
