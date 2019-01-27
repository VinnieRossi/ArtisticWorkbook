import { StartupChemicalService } from './providers/startup-chemicals.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';

// Services
import { EquipmentService } from './components/equipment-section/providers/equipment.service'
import { CopingService } from './components/coping-section/providers/coping.service';
import { FasciaService } from './components/fascia-section/providers/fascia.service';
import { LightingService } from './components/lighting-section/providers/lighting.service';
import { WaterAndExtrasService } from './providers/water-and-extras.service';
import { TileService } from './providers/tile.service';
import { DeckingService } from './providers/decking.service';
import { ElectricalServicesService } from './components/electrical-services-section/providers/electrical-services.service';

import { WorkbookService } from './providers/workbook.service';
import { EquipmentSectionComponent } from './components/equipment-section/equipment-section.component';
import { CopingSectionComponent } from './components/coping-section/coping-section.component';
import { TileSectionComponent } from './components/tile-section/tile-section.component';
import { LightingSectionComponent } from './components/lighting-section/lighting-section.component';
import { FasciaSectionComponent } from './components/fascia-section/fascia-section.component';
import { PlasterSectionComponent } from './components/plaster-section/plaster-section.component';
import { WaterAndExtrasSectionComponent } from './components/water-and-extras-section/water-and-extras-section.component';
import { ElectricalServicesSectionComponent } from './components/electrical-services-section/electrical-services-section.component';
import { StartupChemicalsSectionComponent } from './components/startup-chemicals-section/startup-chemicals-section.component';
import { DeckingSectionComponent } from './components/decking-section/decking-section.component';


@NgModule({
  declarations: [
    AppComponent,
    EquipmentSectionComponent,
    CopingSectionComponent,
    TileSectionComponent,
    LightingSectionComponent,
    FasciaSectionComponent,
    PlasterSectionComponent,
    WaterAndExtrasSectionComponent,
    ElectricalServicesSectionComponent,
    StartupChemicalsSectionComponent,
    DeckingSectionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    EquipmentService,
    CopingService,
    LightingService,
    FasciaService,
    WaterAndExtrasService,
    TileService,
    WorkbookService,
    DeckingService,
    StartupChemicalService,
    ElectricalServicesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
