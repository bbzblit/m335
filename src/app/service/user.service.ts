import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';
import { first } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private client: SupabaseClient;

  constructor() {
    this.client = createClient(environment.supabase.domain, environment.supabase.key);
  }

  public async register(username: string) {
    let { data: user, error } = await this.client
      .from('user')
      .insert([
        { username: username }
      ])
    return user;
  }

  public async login(username: string) {
    let { data: user, error } = await this.client
      .from('user')
      .select('*')
      .eq('username', username)

    if (user === null || user.length === 0){
      let user =  await this.register(username);
      if (user) {
        return user[0];
      }
    }
    else {
      return user[0];
    }
  }

  public async findUserByUsername(username: string) {
    let { data, error } = await this.client
      .from('user')
      .select('*')
      .ilike('username', '%' + username.toLowerCase() + '%')
      .limit(10)
    return data;
  }
}
