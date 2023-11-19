import { IMAGE_CONFIG } from '@angular/common';
import { Injectable } from '@angular/core';
import { SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { decode } from 'base64-arraybuffer'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private client: SupabaseClient;

  constructor() {
    this.client = createClient(environment.supabase.domain, environment.supabase.key);
  }

  private uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // eslint-disable-next-line one-var
      var r = (Math.random() * 16) | 0,
        // eslint-disable-next-line one-var
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  async getMessages(chat: number) {
    let { data, error } = await this.client
      .from('message')
      .select('*,author(*)')
      .eq('chat', chat);

    return data
  }

  subscribeMessages(chat: number, callback: (payload: any) => void) {
    let cachedUsers = new Map<number, User>()
    return this.client.channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'message' },
        (payload) => {

          if (cachedUsers.has((payload.new as any)["author"])) {
            (payload.new as any)["author"] = cachedUsers.get((payload.new as any)["author"])
            callback(payload)
            return
          }

          let user = this.client.from('user').select('*').eq('id', (payload.new as any)["author"]).single()
          user.then((data) => {
            cachedUsers.set((payload.new as any)["author"], data.data);
            (payload.new as any)["author"] = data.data
            callback(payload)
          })
        }
      )
      .subscribe()
  }

  async sendMessage(message: any) {
    let { data, error } = await this.client
      .from('message')
      .insert(message);

    return data
  }

  async sendImageMessage(chatId: number, userId: number, fileContent: any) {
    let id = this.uuidv4();
    let file = `public/${id}.png`;
    await this.client
      .storage
      .from('images')
      .upload(file, decode(fileContent.data), {
        contentType: 'image/png'
      });

    let { data: url } = this.client
      .storage
      .from('images')
      .getPublicUrl(file);

    let { data, error } = await this.client.from('message').insert({
      chat: chatId,
      author: userId,
      text: url.publicUrl,
      isImage: true
    });

    return data
  }

  async deleteMessage(message: any) {
    let { data, error } = await this.client
      .from('message')
      .delete()
      .eq('id', message.id);

    return data
  }

  async editMessage(id: number, text: string) {
    let { data, error } = await this.client
      .from('message')
      .update({ text: text })
      .eq('id', id);

    return data
  }
}
