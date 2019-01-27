
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';
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

// Services
import { EquipmentService } from './components/equipment-section/providers/equipment.service'
import { CopingService } from './components/coping-section/providers/coping.service';
import { FasciaService } from './components/fascia-section/providers/fascia.service';
import { LightingService } from './components/lighting-section/providers/lighting.service';
import { ElectricalServicesService } from './components/electrical-services-section/providers/electrical-services.service';
import { WaterAndExtrasService } from './components/water-and-extras-section/providers/water-and-extras.service';
import { TileService } from './components/tile-section/providers/tile.service';
import { DeckingService } from './components/decking-section/providers/decking.service';
import { StartupChemicalService } from './components/startup-chemicals-section/providers/startup-chemicals.service';

// Shared services
import { WorkbookService } from './shared/providers/workbook.service';


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
