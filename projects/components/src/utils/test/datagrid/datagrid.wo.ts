/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { WidgetObject } from '../widget-object';
import { DebugElement } from '@angular/core';
import { ClrDatagrid } from '@clr/angular';

const ROW_TAG = 'clr-dg-row';
const CELL_TAG = 'clr-dg-cell';
const COLUMN_CSS_SELECTOR = '.datagrid-column';

export class ClrDatagridWidgetObject extends WidgetObject<ClrDatagrid> {
    static tagName = `clr-datagrid`;

    private getCell(row: number, column: number): Element {
        return this.root.nativeElement.querySelectorAll(ROW_TAG)[row].querySelectorAll(CELL_TAG)[column];
    }

    getCellText(row: number, column: number): string {
        return this.getText(this.getCell(row, column));
    }

    isCellHavingStrongElement(row: number, column: number): boolean {
        const cellElement = this.getCell(row, column);
        return !!cellElement.querySelector('strong');
    }

    private get columns(): DebugElement[] {
        return this.findElements(COLUMN_CSS_SELECTOR, this.root);
    }

    get columnCount(): number {
        return this.component.columns ? this.component.columns.length : this.columns.length;
    }

    get columnHeaders(): string[] {
        return this.columns.map(col => this.getText(col));
    }

    private get rows(): DebugElement[] {
        return this.root.nativeElement.querySelectorAll(ROW_TAG);
    }

    get rowCount(): number {
        return this.rows.length;
    }
}
