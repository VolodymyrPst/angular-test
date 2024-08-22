import { Component } from '@angular/core';
import { CurrencyDataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  response: any = [];

  uahToUSD = 0;
  uahToEUR = 0;

  ngOnInit() {
    this.getBaseRates();
  }

  constructor(private currency: CurrencyDataService) {}

  getBaseRates() {
    this.currency.getCurrencyData().subscribe((response) => {
      this.response = response;
      this.uahToEUR = +this.response['eur']['uah'].toFixed(2);
      this.uahToUSD = +(
        this.response['eur']['uah'] / this.response['eur']['usd']
      ).toFixed(2);
    });
  }
}
