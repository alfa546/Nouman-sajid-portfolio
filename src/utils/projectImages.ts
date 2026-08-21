export const getFallbackImage = (projectId: number): string => {
  const fallbacks: Record<number, string> = {
    1: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80", // ThinkSpace (Writing/collaboration desk)
    2: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80", // Limo Agent (AI Neural net)
    3: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80", // Pak Job Portal (Professional interview/hiring)
    4: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80", // Diabetes Prediction (Medical workspace screen)
    5: "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?w=800&auto=format&fit=crop&q=80", // AI Maze Solver (Illuminated coordinate paths)
    6: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&auto=format&fit=crop&q=80", // Vet Management (Veterinary room workspace)
    7: "https://images.unsplash.com/photo-1614720993189-cf6da2b75fb9?w=800&auto=format&fit=crop&q=80", // Auto-Apply AI (Automation dashboard)
  };

  return fallbacks[projectId] || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80";
};
