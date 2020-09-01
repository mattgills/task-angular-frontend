import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';  

@NgModule({
    imports: [
        MatToolbarModule,
        MatTabsModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule
    ],
    exports: [
        MatToolbarModule,
        MatTabsModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule
    ]
})
export class MaterialModule {}