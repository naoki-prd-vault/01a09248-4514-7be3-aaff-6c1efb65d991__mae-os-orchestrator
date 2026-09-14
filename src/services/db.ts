import { supabase } from '@/lib/supabase';
import { Database, Tables } from '@/types/db';

type TableName = keyof Database['public']['Tables'];

export const db = {
  supabase,

  async findMany<T extends TableName>(table: T): Promise<Tables<T>[]> {
    const { data, error } = await supabase.from(table).select('*');
    if (error) throw error;
    return data as Tables<T>[];
  },

  async findOne<T extends TableName>(table: T, id: string): Promise<Tables<T> | null> {
    const { data, error } = await supabase.from(table).select('*').eq('id', id).single();
    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data as Tables<T>;
  },

  async insert<T extends TableName>(table: T, values: Partial<Tables<T>>): Promise<Tables<T>> {
    const { data, error } = await supabase.from(table).insert(values).select().single();
    if (error) throw error;
    return data as Tables<T>;
  },

  async update<T extends TableName>(table: T, id: string, values: Partial<Tables<T>>): Promise<Tables<T>> {
    const { data, error } = await supabase.from(table).update(values).eq('id', id).select().single();
    if (error) throw error;
    return data as Tables<T>;
  },

  async delete<T extends TableName>(table: T, id: string): Promise<void> {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) throw error;
  },
};
