import { Request, Response } from 'express';
import { profileService } from '../services/profileService';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await profileService.getProfile();
    sendSuccess(res, 'Profile retrieved successfully', profile);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to retrieve profile');
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await profileService.updateProfile(req.body);
    sendSuccess(res, 'Profile updated successfully', profile);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to update profile');
  }
};

export const uploadFile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      sendError(res, 'No file uploaded', 400);
      return;
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    sendSuccess(
      res,
      'File uploaded successfully',
      {
        url: fileUrl,
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
      }
    );
  } catch (error: any) {
    sendError(res, error.message || 'Failed to upload file');
  }
};
