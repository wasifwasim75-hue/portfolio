import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Profile } from '../types';
import { profileAPI } from '../services/api';

interface ProfileContextType {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  refetchProfile: () => Promise<void>;
  updateProfileState: (updated: Partial<Profile>) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await profileAPI.get();
      setProfile(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfileState = (updated: Partial<Profile>) => {
    setProfile((prev) => (prev ? { ...prev, ...updated } : (updated as Profile)));
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        error,
        refetchProfile: fetchProfile,
        updateProfileState,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
