/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CliptextDatagridExampleComponent } from './cliptext-datagrid.example.component';
import { CliptextDynamicInlineExampleComponent } from './cliptext-dynamic-inline.example.component';
import { ClarityModule } from '@clr/angular';
import { CliptextModule } from '../../../../components/src/cliptext';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CliptextDatagridExampleComponent, CliptextDynamicInlineExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, CliptextModule],
    exports: [CliptextDatagridExampleComponent, CliptextDynamicInlineExampleComponent],
    entryComponents: [CliptextDatagridExampleComponent, CliptextDynamicInlineExampleComponent],
})
export class CliptexExamplestModule {}