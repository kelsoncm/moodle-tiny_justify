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
 * Registers the alignjustify toolbar button and applies text-align: justify.
 *
 * @module     tiny_justify/commands
 * @copyright  2026 CTE-ZL IFRN
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {get_string as getString} from 'core/str';

export const COMMAND_ALIGNJUSTIFY = 'alignjustify';

// SVG icon path data for the justify button (Bootstrap text-justify icon, 16×16).
const ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">' +
    '<path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>' +
    '<path fill-rule="evenodd" d="M2 9.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>' +
    '<path fill-rule="evenodd" d="M2 6.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>' +
    '<path fill-rule="evenodd" d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>' +
    '</svg>';

/**
 * Register the alignjustify formatter and toolbar button.
 *
 * @param {object} editor The TinyMCE editor instance.
 */
const registerButton = async(editor) => {
    const tooltip = await getString('alignjustify', 'tiny_justify');

    // Register a custom formatter so we can apply text-align: justify.
    editor.formatter.register(COMMAND_ALIGNJUSTIFY, {
        block: 'p',
        styles: {'text-align': 'justify'},
        remove: 'all',
    });

    // Register the icon.
    editor.ui.registry.addIcon('tinyjustify', ICON_SVG);

    // Register a toggle button so it shows the active state when the caret is inside justified text.
    editor.ui.registry.addToggleButton(COMMAND_ALIGNJUSTIFY, {
        icon: 'tinyjustify',
        tooltip,
        onAction: () => {
            editor.execCommand('JustifyFull');
        },
        onSetup: (api) => {
            const nodeChangeHandler = () => {
                api.setActive(editor.formatter.match(COMMAND_ALIGNJUSTIFY));
            };
            editor.on('NodeChange', nodeChangeHandler);
            return () => {
                editor.off('NodeChange', nodeChangeHandler);
            };
        },
    });
};

/**
 * Set up the commands for this plugin.
 *
 * @param {object} editor The TinyMCE editor instance.
 */
export const getSetup = (editor) => {
    registerButton(editor);
};
