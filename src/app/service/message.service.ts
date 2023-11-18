import { Injectable } from '@angular/core';
import { SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { Message } from '../model/message.model';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private client: SupabaseClient;

  constructor() {
    this.client = createClient(environment.supabase.domain, environment.supabase.key);
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

}
