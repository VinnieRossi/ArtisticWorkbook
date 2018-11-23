import { Component } from '@angular/core';
import readXlsxFile from 'read-excel-file'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Artistic Workbook Helper';

  rawWorkbookData: Array<Array<string>> = [];
  pumps: Array<string> = [];
  nameMap: Map<string, string> = new Map<string, string>();
  ignoreSet: Set<String> = new Set<string>();

  constructor() {

    this.createNameMap();
    this.createIgnoreSet();
  }

  readFile(event: any): any {

    const selectedFile = event.target.files[0];

    readXlsxFile(selectedFile, { sheet: 1 }).then(rows => {

      this.rawWorkbookData = rows;

      this.getEquipmentList();
    });

  }

  private getEquipmentList(): void {
    if (!this.rawWorkbookData) { return; }

    const equipmentInformation = this.rawWorkbookData.slice(190, 340);

    equipmentInformation.forEach((row, index) => {

      const properEquipmentName = this.getEquipmentName(row);

      if (this.ignoreSet.has(properEquipmentName)) { return; }

      const cost = parseFloat(row[7]);
      const chargedAmount = parseFloat(row[8]);

      // If we charged them the cost for the part, it means it was included
      const itemWasIncluded = (cost && cost === chargedAmount);
      const multipleItemsIncluded = (cost && chargedAmount > cost)

      if (itemWasIncluded) {

        this.pumps.push(`(1) ${properEquipmentName}`);

      } else if (multipleItemsIncluded) {

        const quantity = this.determineQuantityOfItem(cost, chargedAmount);

        this.pumps.push(`(${quantity}) ${properEquipmentName}`);
      }

    });
  }

  private getEquipmentName(row: Array<string>): string {

    const probableName = row[2] ? row[2] : row[3];

    const mappedName = this.nameMap.get(probableName);

    const properName = mappedName ? mappedName : probableName;

    return properName;
  }

  private determineQuantityOfItem(cost: number, chargedAmount: number): number {

    const mod = Math.abs(chargedAmount % cost);

    if (mod !== 0 && mod > 1) {
      console.log(`Item found with improper cost/charge: Cost: ${cost}, Charged: ${chargedAmount}, Leftover Amount: ${mod}`);
    }

    const amount: number = mod === 0 ? chargedAmount / cost : Math.floor(chargedAmount / cost);

    return amount;

  }


  private createNameMap(): void {
    this.nameMap.set('Polaris 360 Head only', 'Polaris 360 automatic pool cleaner with Jandy energy bowl filter');
  }

  private createIgnoreSet(): void {
    this.ignoreSet.add('Labor installation');
    this.ignoreSet.add('Energy Bowl');
  }

}
