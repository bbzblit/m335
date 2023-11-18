import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';
import { env } from 'process';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private client: SupabaseClient;

  constructor() { 
    this.client = new SupabaseClient(environment.supabase.domain, environment.supabase.key);
  }


  public async getAllChatsOfUser(userId: number){
    let {data} = await this.client.from('chat').select('*,user_a(*),user_b(*)').or("user_a.eq."+userId+",user_b.eq."+userId);
    return data
  }

  public async getChatById(id: number){
    let {data} = await this.client.from('chat').select('*,user_a(*),user_b(*)').eq('id',id);

    if(data && data.length > 0){
      return data[0]
    }
    return null
  }

}
