export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string | null
          email: string
          id: string
          password: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          password: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          password?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          checkin_date: string
          checkout_date: string
          created_at: string | null
          email: string
          guests: string
          id: string
          name: string
          phone: string | null
          room_type: string | null
          special_requests: string | null
          status: string | null
        }
        Insert: {
          checkin_date: string
          checkout_date: string
          created_at?: string | null
          email: string
          guests: string
          id?: string
          name: string
          phone?: string | null
          room_type?: string | null
          special_requests?: string | null
          status?: string | null
        }
        Update: {
          checkin_date?: string
          checkout_date?: string
          created_at?: string | null
          email?: string
          guests?: string
          id?: string
          name?: string
          phone?: string | null
          room_type?: string | null
          special_requests?: string | null
          status?: string | null
        }
        Relationships: []
      }
      gallery: {
        Row: {
          category: string
          created_at: string | null
          id: string
          title: string
          title_pt: string
          url: string
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          title: string
          title_pt: string
          url: string
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          title?: string
          title_pt?: string
          url?: string
        }
        Relationships: []
      }
      rooms: {
        Row: {
          amenities: Json
          amenities_pt: Json
          capacity: string
          capacity_pt: string
          created_at: string | null
          description: string
          description_pt: string
          id: string
          image: string
          media: Json | null
          price: number
          title: string
          title_pt: string
          updated_at: string | null
          videos: Json | null
        }
        Insert: {
          amenities: Json
          amenities_pt: Json
          capacity: string
          capacity_pt: string
          created_at?: string | null
          description: string
          description_pt: string
          id?: string
          image: string
          media?: Json | null
          price: number
          title: string
          title_pt: string
          updated_at?: string | null
          videos?: Json | null
        }
        Update: {
          amenities?: Json
          amenities_pt?: Json
          capacity?: string
          capacity_pt?: string
          created_at?: string | null
          description?: string
          description_pt?: string
          id?: string
          image?: string
          media?: Json | null
          price?: number
          title?: string
          title_pt?: string
          updated_at?: string | null
          videos?: Json | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description: string
          description_pt: string
          icon: string
          id: string
          media: Json | null
          price: number | null
          title: string
          title_pt: string
          updated_at: string | null
          videos: Json | null
        }
        Insert: {
          created_at?: string | null
          description: string
          description_pt: string
          icon: string
          id?: string
          media?: Json | null
          price?: number | null
          title: string
          title_pt: string
          updated_at?: string | null
          videos?: Json | null
        }
        Update: {
          created_at?: string | null
          description?: string
          description_pt?: string
          icon?: string
          id?: string
          media?: Json | null
          price?: number | null
          title?: string
          title_pt?: string
          updated_at?: string | null
          videos?: Json | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
