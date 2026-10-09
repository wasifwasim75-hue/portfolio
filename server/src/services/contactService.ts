import { Contact } from '../models/Contact';
import { IContact } from '../types';

export class ContactService {
  public static async createContact(data: Partial<IContact>): Promise<IContact> {
    const contact = new Contact(data);
    return await contact.save();
  }

  public static async getAllContacts(): Promise<IContact[]> {
    return await Contact.find().sort({ createdAt: -1 });
  }

  public static async getContactById(id: string): Promise<IContact | null> {
    return await Contact.findById(id);
  }

  public static async markAsRead(id: string): Promise<IContact | null> {
    return await Contact.findByIdAndUpdate(id, { read: true }, { new: true });
  }

  public static async deleteContact(id: string): Promise<IContact | null> {
    return await Contact.findByIdAndDelete(id);
  }
}
