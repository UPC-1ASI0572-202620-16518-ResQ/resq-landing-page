import { Component, inject } from '@angular/core';
import { LanguageService } from './language';
import { VideoSection } from './video';
import { RESQ_TEAM, RESQ_INSTITUTIONAL } from './team.config';
@Component({
  selector: 'resq-team',
  imports: [VideoSection],
  templateUrl: './team.html',
  styleUrl: './team.scss',
})
export class TeamSection {
  language = inject(LanguageService);
  members = RESQ_TEAM;
  institutional = RESQ_INSTITUTIONAL;
  t(es: string, en: string) {
    return this.language.t(es, en);
  }
}
