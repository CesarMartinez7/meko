interface VoiceActor {
  person: {
    mal_id: number;
    url: string;
    images?: {
      jpg: {
        image_url: string;
      };
    };
    name: string;
  };
  language: string;
}

export interface Character {
  character: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url?: string;
      };
      webp: {
        image_url?: string;
        small_image_url?: string;
      };
    };
    name: string;
  };
  role: string;
  favorites: number;
  voice_actor: Array<VoiceActor>;
}
