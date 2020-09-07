/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input, TrackByFunction } from '@angular/core';
import { TextIcon } from '../common/interfaces';
import { CliptextConfig, TooltipSize } from '../lib/directives';

/**
 * Object representing an item of the dropdown
 */
interface DropdownItem<T extends DropdownItem<T>> {
    /**
     * The i18n key or a translated string for contents of a action button
     */
    textKey?: string;
    /**
     * List of items that will be grouped under this item
     */
    children?: T[];
    /**
     * The Clarity icon of the contextual button that is displayed if the button is featured.
     */
    icon?: string;
    /**
     * To mark if the {@link #ActionItem.textKey} has to be translated or not
     */
    isTranslatable?: boolean;
    /**
     * Css class of the dropdown item. Must be unique among all dropdown items within the dropdown items list
     */
    class?: string;
    /**
     * To add separators between groups of dropdown items
     */
    isSeparator?: boolean;
    /**
     * This is the busy state for the menu item. Used by extension actions of plugins
     */
    busy?: boolean;
}

/**
 * Dumb component used for displaying nested drop downs
 */
@Component({
    selector: 'vcd-dropdown',
    templateUrl: 'dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent<T extends DropdownItem<T>> {
    /**
     * If a icon should be displayed inside contextual buttons
     */
    shouldShowIcon: boolean = (TextIcon.ICON & this.dropdownItemContents) === TextIcon.ICON;

    /**
     * If a text should be displayed inside contextual buttons
     */
    shouldShowText: boolean = (TextIcon.TEXT & this.dropdownItemContents) === TextIcon.TEXT;

    /**
     * If the contextual buttons with icons should have a tooltip
     */
    shouldShowTooltip: boolean = this.dropdownItemContents === TextIcon.ICON;

    /**
     * Default configuration for vcdShowClippedText directive
     */
    clipTextConfig: CliptextConfig = {
        mouseoutDelay: 0,
        size: TooltipSize.md,
        disabled: false,
    };

    /**
     * Text Content of the button that opens the root dropdown when clicked
     */
    @Input() dropdownTriggerBtnTxt: string = 'vcd.cc.action.menu.actions';

    /**
     * Icon shown in the button that opens the root dropdown when clicked
     */
    @Input() dropdownTriggerBtnIcon: string = 'ellipsis-horizontal';

    /**
     * The {@link ngForTrackBy} method used for rendering of a dropdown actions or for rendering nested drop downs
     * NOTE: Without this, nested drop downs don't get rendered on the screen
     */
    @Input() trackByFunction: TrackByFunction<T>;

    /**
     * The position the root dropdown with respect to root dropdown trigger button. Refer to {@link clrPosition} for it's values
     */
    @Input() dropdownPosition: string;

    /**
     * The position of all the nested dropdowns {@link clrPosition}. Default is 'bottom-left'
     */
    @Input() nestedDropdownPosition: string = 'right-top';

    /**
     * Dropdown item click handler
     */
    @Input() onItemClickedCb: (item: T) => void;

    /**
     * Method to calculate disabled state of an item
     */
    @Input() isItemDisabledCb: (item: T) => boolean;

    /**
     * Used for displaying different button contents in the root dropdown trigger button vs nested dropdown trigger button
     */
    @Input() isNestedDropdown = false;

    @Input() isDropdownDisabled: boolean;

    private _dropdownItemContents: TextIcon = TextIcon.TEXT;
    /**
     * Decides what goes into the action buttons
     * @param textIcon An enum that describes the possible ways to display the button title
     */
    @Input() set dropdownItemContents(textIcon: TextIcon) {
        this.shouldShowIcon = (TextIcon.ICON & textIcon) === TextIcon.ICON;
        this.shouldShowText = (TextIcon.TEXT & textIcon) === TextIcon.TEXT;
        this.shouldShowTooltip = textIcon === TextIcon.ICON;
    }
    get dropdownItemContents(): TextIcon {
        return this._dropdownItemContents;
    }

    private _items: T[];
    /**
     * Nested list of dropdown objects
     */
    @Input() set items(items: T[]) {
        this._items = this.flattenNestedItemsWithSingleChild(items);
    }
    get items(): T[] {
        return this._items;
    }

    /**
     * Css class name added to the dropdown trigger buttons
     */
    @Input() dropdownTriggerButtonClassName: string;

    private flattenNestedItemsWithSingleChild(items: T[]): T[] {
        items.forEach(item => {
            // Flatten out the dropdowns with single children at each level of dropdown
            this.flattenItemsWithSingleChild(items);
            if (item.children) {
                // Repeat the same for other nested levels
                this.flattenNestedItemsWithSingleChild(item.children);
            }
        });
        return items;
    }

    private flattenItemsWithSingleChild(items: T[]): void {
        const singleChildItemIndices: number[] = [];
        items.forEach((item, index) => {
            // Collect the indices of single child items
            if (item.children && item.children.length === 1) {
                singleChildItemIndices.push(index);
            }
        });
        singleChildItemIndices.forEach(singleChildItemIndex => {
            // Delete them from the original list and add their children to the beginning of the current list
            const singleChildItem = items.splice(singleChildItemIndex, 1).pop();
            items.unshift(singleChildItem.children[0]);
        });
    }

    /**
     * To check in the HTML, if a dropdown item of separator type should be used to add a separator item in the dropdown
     * This is required because,
     * 1. As each item decides its own availability, some groups may become empty and we collapse separators before them
     * 2. A separator is not required if it is the first item in the dropdown list
     * @param index Position of the dropdown item in the dropdown list
     * @param currentItem The current item in the list that is being iterated over
     */
    shouldRenderAsSeparator(index: number, currentItem: DropdownItem<T>): boolean {
        const nextItem = this.items[index + 1];
        return index > 0 && currentItem.isSeparator && !!nextItem && !nextItem.isSeparator;
    }
}
