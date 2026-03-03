// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Tiny justify commands for Moodle.
 *
 * Registers the alignjustify toolbar button and menu item.
 *
 * @module     tiny_justify/commands
 * @copyright  2026 CTE-ZL IFRN
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {get_string as getString} from 'core/str';

export const COMMAND_ALIGNJUSTIFY = 'alignjustify';

// Icon SVG for justify button (Bootstrap text-justify).
const ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">' +
    '<path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>' +
    '<path fill-rule="evenodd" d="M2 9.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>' +
    '<path fill-rule="evenodd" d="M2 6.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>' +
    '<path fill-rule="evenodd" d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>' +
    '</svg>';

const ICON_NAME = 'tiny_justify_icon';

/**
 * Set up the commands for this plugin.
 *
 * @returns {Function} Setup function for each TinyMCE editor instance.
 */
export const getSetup = async() => {
    const tooltip = await getString('alignjustify', 'tiny_justify');
    const menutext = await getString('alignjustifymenu', 'tiny_justify');
    const onAction = (editor) => () => editor.execCommand('JustifyFull');
    const onSetup = (editor) => (api) => {
        editor.on('NodeChange', () => {
            api.setActive(editor.queryCommandState('JustifyFull'));
        });
    };

    return (editor) => {
        // Register the custom icon.
        editor.ui.registry.addIcon(ICON_NAME, ICON_SVG);

        // Register a toggle button for the toolbar.
        editor.ui.registry.addToggleButton(COMMAND_ALIGNJUSTIFY, {
            tooltip,
            icon: ICON_NAME,
            onAction: onAction(editor),
            onSetup: onSetup(editor),
        });

        // Register a toggle menu item for the menu (will appear via configuration).
        editor.ui.registry.addToggleMenuItem(COMMAND_ALIGNJUSTIFY, {
            text: menutext,
            icon: ICON_NAME,
            onAction: onAction(editor),
            onSetup: onSetup(editor),
        });
    };
};
