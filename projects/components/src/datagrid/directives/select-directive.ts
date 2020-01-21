/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { OnChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Directive, Input } from '@angular/core';
import { ClrDatagrid } from '@clr/angular';
import { Host } from '@angular/core';
import { GridSelectionType } from '../datagrid.component';

@Directive({
    selector: '[vcdComponentGridSelection]',
})
export class ComponentGridSelectionDirective<R> implements OnChanges {
    @Input() gridSelectionType: GridSelectionType;

    @Input() gridSelectionChanged: EventEmitter<R[]>;

    /**
     * The value of the single selection.
     */
    singleSelected: R;

    /**
     * The value of the multi selection.
     */
    multiSelection: R[] = [];

    constructor(@Host() private datagrid: ClrDatagrid) {}

    ngOnChanges(): void {
        if (this.gridSelectionType === GridSelectionType.Single) {
            this.datagrid.singleSelected = this.singleSelected;
            this.datagrid.singleSelectedChanged.subscribe(selection => {
                this.gridSelectionChanged.emit([selection]);
            });
        } else if (this.gridSelectionType === GridSelectionType.Multi) {
            this.datagrid.selected = this.multiSelection;
            this.datagrid.selectedChanged.subscribe(selection => {
                this.gridSelectionChanged.emit(selection);
            });
        }
    }
}
