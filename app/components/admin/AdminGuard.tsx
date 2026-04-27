'use client';

import { useEffect, useState } from 'react';

interface AdminGuardProps {
  children: React.ReactNode;
}

// Simple client-side check - real protection is in middleware
export default function AdminGuard({ children }: AdminGuardProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Small delay for smooth transition
    setIsReady(true);
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#7C3AED]/30 border-t-[#7C3AED] rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
