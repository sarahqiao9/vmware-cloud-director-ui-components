/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CssClassesDatagridExampleComponent } from './css-classes-datagrid.example.component';
import { ShowHideDatagridExampleComponent } from './show-hide-datagrid.example.component';
import { DatagridModule } from '@vmw/vcd-ui-components';

/**
 * A module that contains components that are various examples of features of the datagrid.
 */
@NgModule({
    declarations: [ShowHideDatagridExampleComponent, CssClassesDatagridExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, DatagridModule],
    exports: [ShowHideDatagridExampleComponent, CssClassesDatagridExampleComponent],
    entryComponents: [ShowHideDatagridExampleComponent, CssClassesDatagridExampleComponent],
})
export class DatagridExamplesModule {}