interface Preferences {
  SiteMarketGroupCD?: string;
  about_inst_id: string;
  intro_inst_id: string;
  fps_inst_id: string;
  featured_video_inst_id: string;
  editorial_feed_inst_id: string;
  newsletter_inst_id: string;
  social_network_feed_inst_id: string;
  width: string;
  height: string;
  designer_pages: string;
  news_page_name: string;
  main_zone_id: string;
  POTDGlobalSchedule: string;
}

export interface TemplatePreference {
  applicationId: number;
  preference_list: Preferences;
}
