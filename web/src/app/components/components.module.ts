import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { UserDropdownComponent } from './user-dropdown/user-dropdown.component';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    BarChartComponent,
    LineChartComponent,
    UserDropdownComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    BarChartComponent,
    LineChartComponent,
    UserDropdownComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class ComponentsModule { }
