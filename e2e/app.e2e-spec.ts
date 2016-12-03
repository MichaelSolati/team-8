import { Team8Page } from './app.po';

describe('team-8 App', function() {
  let page: Team8Page;

  beforeEach(() => {
    page = new Team8Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
