import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    imports: [
        MatToolbarModule,
        MatTabsModule
    ],
    exports: [
        MatToolbarModule,
        MatTabsModule
    ]
})
export class MaterialModule {}