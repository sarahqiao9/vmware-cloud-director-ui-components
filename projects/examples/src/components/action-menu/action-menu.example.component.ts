/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { ActionDisplayConfig, ActionItem, ActionStyling, ActionType, TextIcon } from '@vcd/ui-components';

interface Record {
    value: string;
    paused: boolean;
}

interface HandlerData {
    foo: string;
    bar: string;
}

@Component({
    selector: 'vcd-datagrid-link-example',
    template: `
        <div>
            <button (click)="changeStaticActionStyling()" class="btn btn-primary">
                Display static actions
                {{ actionDisplayConfig.staticActionStyling === 'INLINE' ? 'dropdown' : 'inline' }}
            </button>
            <br />
            <vcd-action-menu
                [actions]="staticActions"
                [actionDisplayConfig]="actionDisplayConfig"
                [selectedEntities]="selectedEntities"
                [dropdownTriggerBtnText]="'vcd.cc.action.menu.actions'"
            >
            </vcd-action-menu>
        </div>

        <br />

        <div>
            <button (click)="changeContextualActionStyling()" class="btn btn-primary">
                Display contextual actions
                {{ actionDisplayConfig.contextual.styling === 'INLINE' ? 'dropdown' : 'inline' }}
            </button>
            <button (click)="toggleDropdownDisable()" class="btn btn-primary">
                {{ isDropdownDisabled ? 'Enable dropdown' : 'Disable dropdown' }}
            </button>
            <br />
            <vcd-action-menu
                [actions]="contextualActions"
                [actionDisplayConfig]="actionDisplayConfig"
                [selectedEntities]="selectedEntities"
                [dropdownTriggerBtnText]="'vcd.cc.action.menu.actions'"
                [disabled]="isDropdownDisabled"
            >
            </vcd-action-menu>
        </div>
    `,
})
export class ActionMenuExampleComponent<R extends Record, T extends HandlerData> {
    actions: ActionItem<R, T>[] = [
        {
            textKey: 'Static Featured 1',
            handler: () => console.log('Static Featured 1'),
            availability: () => true,
            actionType: ActionType.STATIC_FEATURED,
            isTranslatable: false,
        },
        {
            textKey: 'Static 1',
            handler: (rec: R[], data: T) => console.log('Static 1 with custom handler data: ', JSON.stringify(data)),
            handlerData: { foo: 'foo', bar: 'bar' } as T,
            availability: () => true,
            actionType: ActionType.STATIC,
            isTranslatable: false,
        },
        {
            textKey: 'Static 2',
            handler: () => console.log('Static 2'),
            availability: () => false,
            disabled: () => true,
            actionType: ActionType.STATIC,
            isTranslatable: false,
        },
        {
            textKey: 'Contextual 1',
            availability: (rec: R[]) => rec.length === 1,
            handler: () => console.log('Contextual 1'),
            isTranslatable: false,
        },
        {
            textKey: 'power.actions',
            children: [
                {
                    textKey: 'Start',
                    handler: (rec: R[]) => {
                        console.log('Starting ' + rec[0].value);
                        rec[0].paused = false;
                    },
                    availability: (rec: R[]) => rec.length === 1 && rec[0].paused,
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                    isTranslatable: false,
                },
                {
                    textKey: 'Stop',
                    handler: (rec: R[]) => {
                        console.log('Stopping ' + (rec as R[])[0].value);
                        rec[0].paused = true;
                    },
                    availability: (rec: R[]) => rec.length === 1 && !rec[0].paused,
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                    isTranslatable: false,
                },
            ],
        },
        {
            textKey: 'grouped.actions',
            children: [
                {
                    textKey: 'Contextual featured',
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                    handler: () => console.log('Contextual featured'),
                    isTranslatable: false,
                },
                {
                    textKey: 'Contextual 2',
                    handler: () => console.log('Contextual action 2'),
                    isTranslatable: false,
                },
                {
                    textKey: 'grouped.actions.with.single.child',
                    children: [
                        {
                            textKey: 'Single child',
                            handler: () => null,
                            availability: () => true,
                            isTranslatable: false,
                        },
                    ],
                },
            ],
        },
    ];

    isDropdownDisabled: boolean = false;

    get staticActions(): ActionItem<R, T>[] {
        return this.actions.filter(
            action => action.actionType === ActionType.STATIC || action.actionType === ActionType.STATIC_FEATURED
        );
    }

    get contextualActions(): ActionItem<R, T>[] {
        return this.actions.filter(
            action => action.actionType !== ActionType.STATIC && action.actionType !== ActionType.STATIC_FEATURED
        );
    }

    actionDisplayConfig: ActionDisplayConfig = {
        contextual: {
            featuredCount: 3,
            styling: ActionStyling.DROPDOWN,
            buttonContents: TextIcon.TEXT,
        },
        staticActionStyling: ActionStyling.INLINE,
    };

    selectedEntities = [{ value: 'Selected entity', paused: false }];

    changeContextualActionStyling(): void {
        this.actionDisplayConfig = {
            ...this.actionDisplayConfig,
            contextual: {
                ...this.actionDisplayConfig.contextual,
                styling:
                    this.actionDisplayConfig.contextual.styling === ActionStyling.DROPDOWN
                        ? ActionStyling.INLINE
                        : ActionStyling.DROPDOWN,
            },
        };
    }

    changeStaticActionStyling(): void {
        this.actionDisplayConfig = {
            ...this.actionDisplayConfig,
            staticActionStyling:
                this.actionDisplayConfig.staticActionStyling === ActionStyling.INLINE
                    ? ActionStyling.DROPDOWN
                    : ActionStyling.INLINE,
        };
    }

    toggleDropdownDisable(): void {
        this.isDropdownDisabled = !this.isDropdownDisabled;
    }
}
