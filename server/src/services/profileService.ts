import { Profile } from '../models/Profile';
import { IProfile } from '../types';

export const profileService = {
  getProfile: async (): Promise<IProfile> => {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({});
    }
    return profile;
  },

  updateProfile: async (data: Partial<IProfile>): Promise<IProfile> => {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(data);
    } else {
      Object.assign(profile, data);
      await profile.save();
    }
    return profile;
  },
};
