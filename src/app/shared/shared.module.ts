import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { COMPONENTS } from './components';
import { DIRECTIVES } from './directives';
import { PIPES } from './pipes';



@NgModule({
  declarations: [
    ...PIPES,
    ...DIRECTIVES,
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    TranslateModule
  ],
  exports: [
    ...PIPES,
    ...DIRECTIVES,
    ...COMPONENTS
  ]
})
export class SharedModule { }
