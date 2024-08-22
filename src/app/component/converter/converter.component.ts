import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyDataService } from '../../services/data.service';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css',
})
export class ConverterComponent {
  amount1: any = [];
  amount2: any = [];

  selectValue1 = 'UAH';
  selectValue2 = 'USD';

  response: any = [];

  uahToUSD = 0;
  uahToEUR = 0;
  usdToEUR = 0;

  ngOnInit() {
    this.getBaseRates();
  }

  constructor(private currency: CurrencyDataService) {}

  getBaseRates() {
    this.currency.getCurrencyData().subscribe((response) => {
      this.response = response;
      this.usdToEUR = +this.response['eur']['usd'].toFixed(2);
      this.uahToEUR = +this.response['eur']['uah'].toFixed(2);
      this.uahToUSD = +(
        this.response['eur']['uah'] / this.response['eur']['usd']
      ).toFixed(2);
    });
  }

  convertFirst() {
    if (!this.amount1) {
      this.amount2 = [];
      return;
    }

    if (this.selectValue1 === 'UAH' && this.selectValue2 === 'USD') {
      this.amount2 = (this.amount1 / this.uahToUSD).toFixed(2);
    }
    if (this.selectValue1 === 'UAH' && this.selectValue2 === 'EUR') {
      this.amount2 = (this.amount1 / this.uahToEUR).toFixed(2);
    }
    if (
      (this.selectValue1 === 'UAH' && this.selectValue2 === 'UAH') ||
      (this.selectValue1 === 'USD' && this.selectValue2 === 'USD') ||
      (this.selectValue1 === 'EUR' && this.selectValue2 === 'EUR')
    ) {
      this.amount1 = this.amount1;
      this.amount2 = this.amount1;
    }

    if (this.selectValue1 === 'USD' && this.selectValue2 === 'EUR') {
      this.amount2 = this.amount1 / this.usdToEUR;
    }
    if (this.selectValue1 === 'USD' && this.selectValue2 === 'UAH') {
      this.amount2 = this.amount1 * this.uahToUSD;
    }

    if (this.selectValue1 === 'EUR' && this.selectValue2 === 'USD') {
      this.amount2 = (this.amount1 * this.usdToEUR).toFixed(2);
    }

    if (this.selectValue1 === 'EUR' && this.selectValue2 === 'UAH') {
      this.amount2 = (this.amount1 * this.uahToEUR).toFixed(2);
    }
  }

  convertSecond() {
    if (this.selectValue1 === 'UAH' && this.selectValue2 === 'USD') {
      this.amount1 = this.amount2 * this.uahToUSD;
    }
    if (this.selectValue1 === 'UAH' && this.selectValue2 === 'EUR') {
      this.amount1 = this.amount2 * this.uahToEUR;
    }
    if (
      (this.selectValue1 === 'UAH' && this.selectValue2 === 'UAH') ||
      (this.selectValue1 === 'USD' && this.selectValue2 === 'USD') ||
      (this.selectValue1 === 'EUR' && this.selectValue2 === 'EUR')
    ) {
      this.amount1 = this.amount2;
    }

    if (this.selectValue1 === 'USD' && this.selectValue2 === 'EUR') {
      this.amount1 = this.amount2 / this.usdToEUR;
    }
    if (this.selectValue1 === 'USD' && this.selectValue2 === 'UAH') {
      this.amount1 = this.amount2 * this.uahToUSD;
    }

    if (this.selectValue1 === 'EUR' && this.selectValue2 === 'USD') {
      this.amount1 = (this.amount2 * this.usdToEUR).toFixed(2);
    }

    if (this.selectValue1 === 'EUR' && this.selectValue2 === 'UAH') {
      this.amount1 = (this.amount2 * this.uahToEUR).toFixed(2);
    }
  }
}
