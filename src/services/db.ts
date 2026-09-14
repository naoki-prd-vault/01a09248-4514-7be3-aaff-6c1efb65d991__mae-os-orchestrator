import { supabase } from '@/lib/supabase';
import { Database } from '@/types/db';

type TableName = keyof Database['public']['Tables'];

export const db = {
  async findMany<T extends TableName>(table: T, select?: string) {
    const { data, error } = await supabase.from(table).select(select || '*');
    if (error) throw error;
    return data as Database['public']['Tables'][T]['Row'][];
  },

  async findOne<T extends TableName>(table: T, id: string, select?: string) {
    const { data, error } = await supabase.from(table).select(select || '*').eq('id', id).single();
    if (error) throw error;
    return data as Database['public']['Tables'][T]['Row'];
  },

  async insert<T extends TableName>(table: T, values: Database['public']['Tables'][T]['Insert']) {
    const { data, error } = await supabase.from(table).insert(values).select().single();
    if (error) throw error;
    return data as Database['public']['Tables'][T]['Row'];
  },

  async update<T extends TableName>(table: T, id: string, values: Database['public']['Tables'][T]['Update']) {
    const { data, error } = await supabase.from(table).update(values).eq('id', id).select().single();
    if (error) throw error;
    return data as Database['public']['Tables'][T]['Row'];
  },

  async delete<T extends TableName>(table: T, id: string) {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) throw error;
    return true;
  },
};
