import { Component } from '@angular/core';
import readXlsxFile from 'read-excel-file'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Artistic Workbook Helper';

  rawWorkbookData: Array<Array<string>>;

  equipmentInformation: Array<Array<string>>;
  equipmentList: Array<string> = [];

  lightingInformation: Array<Array<string>>;
  lightingList: Array<string> = [];

  waterAndExtraInformation: Array<Array<string>>;
  waterAndExtraList: Array<string> = [];

  copingInformation: Array<Array<string>>;
  copingList: Array<string> = []

  fasciaInformation: Array<Array<string>>;
  fasciaList: Array<string> = []

  tileInformation: Array<Array<string>>;
  tileList: Array<string> = []

  deckingInformation: Array<Array<string>>;
  deckingList: Array<string> = []

  plasterInformation: Array<Array<string>>;
  plasterList: Array<string> = []


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

    // Pool Equipment
    // Pumps
    // Booster pump
    // Filters
    // Heat Pumps
    // Heaters
    // Controls/Automation
    // Sanitation System
    // Mechanical Timer
    // Lighting (subsection)
    // Valves
    // Automatic CLeaner
    // Auto Fill [RPZ Flag lives here]
    // Air BLower
    // Start-up kit
    // Additional Items (subsection extras)
    // 56

    // Coping [LN 413-473] (X)

    // Tile [LN 502-516] (X)

    // Lighting [LN 307-338] (X)

    // Fascia [LN 474-501] (X)

    // Decking {SHEET 3} [LN 11-25]

    // Plaster {SHEET 2} [LN 85-200?]

    // Extras [LN 390-412] ()

    // Electric Services
    // Always the same?
    // Start up and chemicals
    // Always the same?


    // first one included, not second
    this.equipmentInformation = [...this.rawWorkbookData.slice(190, 251), ...this.rawWorkbookData.slice(274, 322)];

    this.lightingInformation = this.rawWorkbookData.slice(251, 274);

    this.waterAndExtraInformation = this.rawWorkbookData.slice(322, 340);

    this.copingInformation = this.rawWorkbookData.slice(340, 384);

    this.fasciaInformation = this.rawWorkbookData.slice(384, 398);

    this.tileInformation = this.rawWorkbookData.slice(398, 418);







    this.equipmentInformation.forEach((row, index) => {

      const properEquipmentName = this.getEquipmentName(row);

      if (this.ignoreSet.has(properEquipmentName)) { return; }

      const cost = parseFloat(row[7]);
      const chargedAmount = parseFloat(row[8]);

      // If we charged them the cost for the part, it means it was included
      const itemWasIncluded = (cost && cost === chargedAmount);
      const multipleItemsIncluded = (cost && chargedAmount > cost)

      if (itemWasIncluded) {

        this.equipmentList.push(`(1) ${properEquipmentName}`);

      } else if (multipleItemsIncluded) {

        const quantity = this.determineQuantityOfItem(cost, chargedAmount);

        this.equipmentList.push(`(${quantity}) ${properEquipmentName}`);
      }

    });

    this.waterAndExtraInformation.forEach(row => {
      const properEquipmentName = this.getEquipmentName(row);

      if (this.ignoreSet.has(properEquipmentName)) { return; }

      const cost = parseFloat(row[6]);
      const chargedAmount = parseFloat(row[8]);

      // If we charged them the cost for the part, it means it was included
      const itemWasIncluded = (cost && cost === chargedAmount);
      const multipleItemsIncluded = (cost && chargedAmount > cost)

      if (itemWasIncluded) {

        this.equipmentList.push(`(1) ${properEquipmentName}`);

      } else if (multipleItemsIncluded) {

        const quantity = this.determineQuantityOfItem(cost, chargedAmount);

        this.equipmentList.push(`(${quantity}) ${properEquipmentName}`);
      }
    });

    this.copingInformation.forEach(row => {

      const properCopingName = this.getCopingName(row);

      if (this.ignoreSet.has(properCopingName)) { return; }

      const cost = parseFloat(row[8]);

      const itemWasIncluded = (cost);

      if (properCopingName && itemWasIncluded) {
        this.copingList.push(properCopingName);
      }

    });

    this.equipmentList.push('Two entrance steps into pool');
    this.equipmentList.push('Does not include RPZ');
    this.equipmentList.push('Start-up balancing chemicals for pool');

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

  private getCopingName(row: Array<string>): string {

    const probableName = row[0];

    const possibleName = row[2];

    const result = possibleName ? possibleName : probableName;

    const mappedResult = this.nameMap.get(result);

    return mappedResult ? mappedResult : result;
  }

  private createNameMap(): void {
    this.nameMap.set(`Polaris 360 Head only`, `Polaris 360 automatic pool cleaner with Jandy energy bowl filter`);
    this.nameMap.set(`Sheer decents 4 ft`, `4' long Sheer descent to be installed in center of raised beam wall`);
    this.nameMap.set(`Labor installation`, `Installation of Autofill and Drain. 
    (Schedule 40 PVC water supply line stubbed out of house below grade by others. 
      Sub out is reuqired to meet all building codes and contain installation of backflow device, if necessary, to meet code.)`);
    this.nameMap.set(`3'x8' concrete pad`, `3’ X 8’ concrete equipment pad for equipment set.`);
    this.nameMap.set(`12"x12" Bullnose`, `Pool will have bullnose travertine Coping (1 ¼” thick).`);
  }

  private createIgnoreSet(): void {
    // this.ignoreSet.add('Labor installation');
    this.ignoreSet.add('Energy Bowl');
    this.ignoreSet.add('Shipping');
    this.ignoreSet.add('12"x18" DBL BULL'); //?
  }

}
