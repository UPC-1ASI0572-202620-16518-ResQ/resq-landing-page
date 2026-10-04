import { Component } from '@angular/core';
import { SolutionsSectionComponent } from './solutions';
import { TeamSection } from './team';
import { WhyResqSection } from './why-resq';
import { BenefitsSection } from './benefits';
import { HeroCarousel } from './hero';
import { ProductSection } from './product-section';
import { FinalCtaSection } from './final-cta';
import { AlliesSection } from './allies';
@Component({
  selector: 'resq-landing',
  imports: [
    HeroCarousel,
    WhyResqSection,
    BenefitsSection,
    ProductSection,
    SolutionsSectionComponent,
    TeamSection,
    AlliesSection,
    FinalCtaSection,
  ],
  templateUrl: './landing.html',
})
export class Landing {}
