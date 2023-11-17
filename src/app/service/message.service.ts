import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
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
      .select('*')
      .eq('chat', chat);

    return data
  }

  subscribeMessages(chat: number, callback: (payload: any) => void) {
    return this.client.channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'message' },
        callback
      )
      .subscribe()
  }

}
