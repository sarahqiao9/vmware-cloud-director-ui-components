/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import {
    GridDataFetchResult,
    GridColumn,
    GridState,
    ButtonConfig,
    GridSelectionType,
    ContextualButtonPosition,
} from '@vcd/ui-components';

interface Data {
    value: string;
    paused: boolean;
}

/**
 * A component that holds an example of the show/hide columns capability.
 */
@Component({
    selector: 'vcd-datagrid-link-example',
    template: `
        <button (click)="this.changeButtonLocation()" class="btn btn-primary">Change Link Location</button><br />
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
        contextualButtons: {
            buttons: [
                {
                    label: 'Start',
                    handler: (rec: Data[]) => {
                        console.log('Starting ' + rec[0].value);
                        rec[0].paused = false;
                    },
                    shouldDisplay: (rec: Data[]) => rec.length === 1 && rec[0].paused,
                    id: 'a',
                    icon: 'play',
                },
                {
                    label: 'Stop',
                    handler: (rec: Data[]) => {
                        console.log('Stopping ' + rec[0].value);
                        rec[0].paused = true;
                    },
                    shouldDisplay: (rec: Data[]) => rec.length === 1 && !rec[0].paused,
                    id: 'b',
                    icon: 'pause',
                },
                {
                    label: 'Anythign',
                    handler: (rec: Data[]) => {
                        console.log('Adding ' + rec[0].value);
                    },
                    shouldDisplay: (rec: Data[]) => rec.length === 1 && rec[0].value === 'a',
                    id: 'c',
                    icon: 'warn',
                },
            ],
            featuredCount: 3,
            featured: ['a', 'b'],
            position: ContextualButtonPosition.TOP,
        },
    };

    // Always disable for both options
    // Featured buttons display as icons
    // Hpw many featured should display?
    // Global buttons | context (actions dropdown)
    // Dont feature disabled buttons (fallback to list)
    // Start stop example

    selectionType = GridSelectionType.Single;

    changeButtonLocation(): void {
        if (this.buttonConfig.contextualButtons.position === ContextualButtonPosition.TOP) {
            this.buttonConfig.contextualButtons.position = ContextualButtonPosition.ROW;
            this.selectionType = GridSelectionType.None;
        } else {
            this.buttonConfig.contextualButtons.position = ContextualButtonPosition.TOP;
            this.selectionType = GridSelectionType.Single;
        }
    }

    refresh(eventData: GridState<Data>): void {
        this.gridData = {
            items: [{ value: 'a', paused: false }, { value: 'b', paused: true }],
            totalItems: 2,
            pageSize: 2,
            page: 1,
        };
    }
}
