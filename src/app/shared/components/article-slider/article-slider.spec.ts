import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSlider } from './article-slider';

describe('HeroSlider', () => {
  let component: ArticleSlider;
  let fixture: ComponentFixture<ArticleSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleSlider],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleSlider);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
