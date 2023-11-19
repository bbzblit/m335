import { Injectable } from '@angular/core';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';
import { env } from 'process';
import { environment } from 'src/environments/environment';
import { Chat } from '../model/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private client: SupabaseClient;

  constructor() {
    this.client = new SupabaseClient(environment.supabase.domain, environment.supabase.key);
  }


  public async getAllChatsOfUser(userId: number) {
    let { data } = await this.client.from('chat').select('*,user_a(*),user_b(*)').or("user_a.eq." + userId + ",user_b.eq." + userId);
    return data
  }

  public async getChatById(id: number) {
    let { data } = await this.client.from('chat').select('*,user_a(*),user_b(*)').eq('id', id).single();
    return data;
  }

  public async createChat(userA: number, userB: number) {
    let { data } = await this.client.from('chat').insert([{ user_a: userA, user_b: userB }]).select('*,user_a(*),user_b(*)').single();
    return data
  }

  public subscribeChatsOfUser(userId: number, callback: (data: any) => void) {

    const channels = this.client.channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat' },
        (payload) => {
          let { new: content, eventType, old } = payload;
          let data = content as Chat;

          if(eventType === 'DELETE'){
            callback({chat: old, isDelete: true});
          } else {
            this.getChatById(data.id).then((chat) => {
              if (chat) {
                callback({chat: chat, isDelete: false});
              }
            });  
          }
        }
      )
      .subscribe()

    return channels;
  }

}
