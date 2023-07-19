export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bazaar_categories: {
        Row: {
          created_at: string | null
          id: number
          title: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          title?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          title?: string | null
        }
        Relationships: []
      }
      bazaar_items: {
        Row: {
          bazaar_categories_id: number
          bonus_effects: string[] | null
          cost: number
          created_at: string | null
          description: string
          id: number
          name: string
          tech_tier: string
          weight: number | null
        }
        Insert: {
          bazaar_categories_id: number
          bonus_effects?: string[] | null
          cost: number
          created_at?: string | null
          description: string
          id?: number
          name: string
          tech_tier?: string
          weight?: number | null
        }
        Update: {
          bazaar_categories_id?: number
          bonus_effects?: string[] | null
          cost?: number
          created_at?: string | null
          description?: string
          id?: number
          name?: string
          tech_tier?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bazaar_items_bazaar_categories_id_fkey"
            columns: ["bazaar_categories_id"]
            referencedRelation: "bazaar_categories"
            referencedColumns: ["id"]
          }
        ]
      }
      open_ai_images: {
        Row: {
          base64: string | null
          category: number | null
          created_at: string | null
          id: string
        }
        Insert: {
          base64?: string | null
          category?: number | null
          created_at?: string | null
          id?: string
        }
        Update: {
          base64?: string | null
          category?: number | null
          created_at?: string | null
          id?: string
        }
        Relationships: []
      }
      systems: {
        Row: {
          created_at: string
          id: string
          latitude: number
          longitude: number
          name: string
          planet_count: number
        }
        Insert: {
          created_at?: string
          id?: string
          latitude?: number
          longitude?: number
          name: string
          planet_count: number
        }
        Update: {
          created_at?: string
          id?: string
          latitude?: number
          longitude?: number
          name?: string
          planet_count?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
