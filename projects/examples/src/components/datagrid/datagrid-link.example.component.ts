/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { GridDataFetchResult, GridColumn, GridState, ButtonConfig, GridSelectionType } from '@vcd/ui-components';

interface Data {
    value: string;
}

/**
 * A component that holds an example of the show/hide columns capability.
 */
@Component({
    selector: 'vcd-datagrid-link-example',
    template: `
        <vcd-datagrid
            [gridData]="gridData"
            (gridRefresh)="refresh($event)"
            [columns]="columns"
            [buttonConfig]="buttonConfig"
            [selectionType]="selectionType"
        ></vcd-datagrid>
    `,
})
export class DatagridLinkExampleComponent {
    gridData: GridDataFetchResult<Data> = {
        items: [],
    };

    columns: GridColumn<Data>[] = [
        {
            displayName: 'Some Value',
            renderer: 'value',
        },
    ];

    buttonConfig: ButtonConfig<Data> = {
        globalButtons: [
            {
                label: 'Add',
                handler: () => {
                    console.log('Adding stuff!');
                },
                shouldDisplay: () => true,
            },
        ],
        conditionalButtons: [
            {
                label: 'Change da Entity',
                handler: (rec: Data[]) => {
                    console.log('Adding ' + rec[0].value);
                },
                shouldDisplay: (rec: Data[]) => rec.length === 1 && rec[0].value === 'a',
            },
        ],
    };

    selectionType = GridSelectionType.Single;

    refresh(eventData: GridState<Data>): void {
        this.gridData = {
            items: [{ value: 'a' }, { value: 'b' }],
            totalItems: 2,
            pageSize: 2,
            page: 1,
        };
    }
}
