import { createClient } from '@supabase/supabase-js'

class SupabaseClient {
  constructor(supabaseUrl, supabaseServiceRoleKey) {
    this.supabase = createClient(supabaseUrl, supabaseServiceRoleKey)
  }

  async getQueuedMessages() {
    const { data, error } = await this.supabase.from('messages').select('*').eq('status', 'pending')
    if (error) {
      console.error('Error querying data:', error)
      return []
    }
    return data
  }

  subscribeToChanges(callback) {
    this.supabase.channel('message_listener').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, callback).subscribe()
  }

  async markPrinted(message_id) {
    return this.supabase.from('messages').update({ status: 'printed' }).eq('id', message_id)
  }
}

export default SupabaseClient
