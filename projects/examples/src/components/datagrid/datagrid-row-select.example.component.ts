/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { GridDataFetchResult, GridState, GridColumn, GridSelectionType } from '@vcd/ui-components';

interface Data {
    href: string;
}

/**
 * A component that holds an example of the grid selection capability.
 */
@Component({
    selector: 'vcd-datagrid-row-select-example',
    templateUrl: 'datagrid-row-select.example.component.html',
})
export class RowSelectDatagridExampleComponent {
    selectionType = GridSelectionType.Multi;
    GridSelectionType = GridSelectionType;

    gridData: GridDataFetchResult<Data> = {
        items: [],
    };

    columns: GridColumn<Data>[] = [
        {
            displayName: 'Some Column',
            renderer: 'href',
        },
    ];

    selectionChanged(selected: Data[]): void {
        console.log(selected);
    }

    refresh(eventData: GridState<Data>): void {
        this.gridData = {
            items: [{ href: 'a' }, { href: 'b' }],
            totalItems: 2,
            pageSize: 2,
            page: 1,
        };
    }

    newData(): void {
        this.gridData = {
            items: [{ href: 'b' }, { href: 'a' }],
            totalItems: 2,
            pageSize: 2,
            page: 1,
        };
    }
}
