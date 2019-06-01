import { Injectable } from '@angular/core';
import { VatCategory, VatCategoriesService } from './vat-categories.service';

export interface InvoiceLine {
  product: string;
  vatCategory: VatCategory;
  priceInclusiveVat: number;
}

export interface InvoiceLineComplete extends InvoiceLine {
  priceExclusiveVat: number;
}

export interface Invoice {
  invoiceLines: InvoiceLineComplete[];
  totalPriceInclusiveVat: number;
  totalPriceExclusiveVat: number;
  totalVat: number;
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceCalculatorService {

  constructor(private vatCategoriesService: VatCategoriesService) { }

  public CalculatePriceExclusiveVat(priceInclusiveVat: number, vatPercentage: number): number {
    return priceInclusiveVat / (1 + vatPercentage / 100);
  }

  public CalculateInvoice(invoiceLines: InvoiceLine[]): Invoice {
    const invoice: Invoice = {
      invoiceLines: [],
      totalPriceInclusiveVat: 0,
      totalPriceExclusiveVat: 0,
      totalVat: 0,
    };

    invoiceLines.forEach(invoiceLine => {
      const priceInclusiveVat = invoiceLine.priceInclusiveVat;
      const priceExclusiveVat =
        this.CalculatePriceExclusiveVat(invoiceLine.priceInclusiveVat, this.vatCategoriesService.getVat(invoiceLine.vatCategory));

      invoice.invoiceLines.push({
        priceExclusiveVat
      } as InvoiceLineComplete);
      invoice.totalPriceInclusiveVat += priceInclusiveVat;
      invoice.totalPriceExclusiveVat += priceExclusiveVat;
      invoice.totalVat += priceInclusiveVat - priceExclusiveVat;
    });

    return invoice;
  }
}
