import { FlightDealModule } from './flight-deal.module';

describe('FlightDealModule', () => {
  let flightDealModule: FlightDealModule;

  beforeEach(() => {
    flightDealModule = new FlightDealModule();
  });

  it('should create an instance', () => {
    expect(flightDealModule).toBeTruthy();
  });
});
