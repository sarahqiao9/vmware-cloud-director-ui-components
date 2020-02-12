/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DatagridModule } from '@vcd/ui-components';
import { RowSelectDatagridExampleComponent } from './datagrid-row-select.example.component';

@NgModule({
    declarations: [RowSelectDatagridExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, DatagridModule],
    exports: [RowSelectDatagridExampleComponent],
    entryComponents: [RowSelectDatagridExampleComponent],
})
export class DatagrigRowSelectExampleModule {}
