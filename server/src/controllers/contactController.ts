import { Request, Response, NextFunction } from 'express';
import { ContactService } from '../services/contactService';
import { sendSuccess, sendError } from '../utils/apiResponse';

export class ContactController {
  public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const contact = await ContactService.createContact(req.body);
      sendSuccess(
        res,
        'Thank you! Your message has been received successfully. I will get back to you shortly.',
        contact,
        201
      );
    } catch (error) {
      next(error);
    }
  }

  public static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const messages = await ContactService.getAllContacts();
      sendSuccess(res, 'Contact messages retrieved successfully', messages, 200, { count: messages.length });
    } catch (error) {
      next(error);
    }
  }

  public static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const message = await ContactService.getContactById(req.params.id);
      if (!message) {
        sendError(res, 'Contact message not found', 404);
        return;
      }
      sendSuccess(res, 'Contact message retrieved successfully', message);
    } catch (error) {
      next(error);
    }
  }

  public static async markAsRead(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await ContactService.markAsRead(req.params.id);
      if (!updated) {
        sendError(res, 'Contact message not found', 404);
        return;
      }
      sendSuccess(res, 'Message marked as read', updated);
    } catch (error) {
      next(error);
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deleted = await ContactService.deleteContact(req.params.id);
      if (!deleted) {
        sendError(res, 'Contact message not found', 404);
        return;
      }
      sendSuccess(res, 'Contact message deleted successfully', deleted);
    } catch (error) {
      next(error);
    }
  }
}
