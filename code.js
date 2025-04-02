"use strict";
figma.showUI(__html__, { width: 320, height: 480 });
figma.ui.onmessage = async (msg) => {
    if (msg.type === 'create-component') {
        const { componentType, framework } = msg;
        // Get the center of the viewport
        const center = figma.viewport.center;
        if (framework === 'mui5') {
            const component = await createMUIComponent(componentType, center);
            if (component) {
                figma.viewport.scrollAndZoomIntoView([component]);
            }
        }
    }
};
async function createMUIComponent(componentType, position) {
    // Load fonts
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    await figma.loadFontAsync({ family: "Inter", style: "Medium" });
    // MUI theme colors
    const colors = {
        primary: { r: 0.098, g: 0.462, b: 0.823 },
        secondary: { r: 0.929, g: 0.109, b: 0.513 },
        text: { r: 0, g: 0, b: 0 },
        paper: { r: 1, g: 1, b: 1 },
        divider: { r: 0.878, g: 0.878, b: 0.878 },
        error: { r: 0.956, g: 0.258, b: 0.266 }
    };
    let component;
    switch (componentType) {
        case 'button':
            component = await createMUIButton(position, colors);
            break;
        case 'textField':
            component = await createMUITextField(position, colors);
            break;
        case 'select':
            component = await createMUISelect(position, colors);
            break;
        case 'checkbox':
            component = await createMUICheckbox(position, colors);
            break;
        case 'navbar':
            component = await createMUIAppBar(position, colors);
            break;
        case 'drawer':
            component = await createMUIDrawer(position, colors);
            break;
        case 'tabs':
            component = await createMUITabs(position, colors);
            break;
        case 'breadcrumbs':
            component = await createMUIBreadcrumbs(position, colors);
            break;
        case 'card':
            component = await createMUICard(position, colors);
            break;
        case 'paper':
            component = await createMUIPaper(position, colors);
            break;
        case 'accordion':
            component = await createMUIAccordion(position, colors);
            break;
        case 'dialog':
            component = await createMUIDialog(position, colors);
            break;
    }
    if (component) {
        figma.notify(`Created MUI ${componentType} component`);
    }
    return component;
}
// Helper function to create RGBA color
function rgba(r, g, b, a) {
    return { r, g, b, a };
}
async function createMUIButton(position, colors) {
    // Create main component
    const button = figma.createComponent();
    button.name = "MUI Button/Default";
    button.x = position.x - 60;
    button.y = position.y - 20;
    // Set up auto layout
    button.layoutMode = "HORIZONTAL";
    button.primaryAxisAlignItems = "CENTER";
    button.counterAxisAlignItems = "CENTER";
    button.paddingLeft = button.paddingRight = 16;
    button.paddingTop = button.paddingBottom = 8;
    button.cornerRadius = 4;
    button.fills = [{ type: 'SOLID', color: colors.primary }];
    const text = figma.createText();
    text.characters = "BUTTON";
    text.fontSize = 14;
    text.fontName = { family: "Inter", style: "Medium" };
    text.fills = [{ type: 'SOLID', color: colors.paper }];
    text.letterSpacing = { value: 0.4, unit: 'PIXELS' };
    button.appendChild(text);
    // Create hover variant as a new component
    const hoverButton = figma.createComponent();
    hoverButton.name = "MUI Button/Hover";
    hoverButton.x = button.x + button.width + 20;
    hoverButton.y = button.y;
    // Copy properties from default button
    hoverButton.layoutMode = "HORIZONTAL";
    hoverButton.primaryAxisAlignItems = "CENTER";
    hoverButton.counterAxisAlignItems = "CENTER";
    hoverButton.paddingLeft = hoverButton.paddingRight = 16;
    hoverButton.paddingTop = hoverButton.paddingBottom = 8;
    hoverButton.cornerRadius = 4;
    hoverButton.fills = [{ type: 'SOLID', color: { ...colors.primary, a: 0.8 } }];
    const hoverText = text.clone();
    hoverButton.appendChild(hoverText);
    // Create component set
    const buttonSet = figma.combineAsVariants([button, hoverButton], figma.currentPage);
    buttonSet.name = "MUI Button";
    return buttonSet;
}
async function createMUITextField(position, colors) {
    // Create main component
    const textField = figma.createComponent();
    textField.name = "MUI Text Field";
    textField.x = position.x - 100;
    textField.y = position.y - 28;
    // Set up auto layout
    textField.layoutMode = "VERTICAL";
    textField.primaryAxisAlignItems = "CENTER";
    textField.itemSpacing = 4;
    textField.fills = [];
    const label = figma.createText();
    label.characters = "Label";
    label.fontSize = 12;
    label.fills = [{ type: 'SOLID', color: colors.primary }];
    const input = figma.createFrame();
    input.name = "Input";
    input.layoutMode = "HORIZONTAL";
    input.primaryAxisAlignItems = "MIN";
    input.counterAxisAlignItems = "CENTER";
    input.paddingLeft = input.paddingRight = 12;
    input.paddingTop = input.paddingBottom = 10;
    input.fills = [{ type: 'SOLID', color: colors.paper }];
    input.strokes = [{ type: 'SOLID', color: colors.divider }];
    input.strokeWeight = 1;
    input.cornerRadius = 4;
    const placeholder = figma.createText();
    placeholder.characters = "Placeholder";
    placeholder.fontSize = 16;
    placeholder.fills = [{ type: 'SOLID', color: rgba(0, 0, 0, 0.38) }];
    input.appendChild(placeholder);
    textField.appendChild(label);
    textField.appendChild(input);
    // Create variants
    const focusedVariant = textField.clone();
    focusedVariant.x = textField.x + textField.width + 20;
    focusedVariant.y = textField.y;
    const focusedInput = focusedVariant.findOne(n => n.name === "Input");
    focusedInput.strokes = [{ type: 'SOLID', color: colors.primary }];
    focusedInput.strokeWeight = 2;
    // Create component set
    const textFieldSet = figma.combineAsVariants([textField, focusedVariant], figma.currentPage);
    textFieldSet.name = "MUI Text Field";
    return textFieldSet;
}
async function createMUISelect(position, colors) {
    const frame = figma.createFrame();
    frame.name = "MUI Select";
    frame.x = position.x - 100;
    frame.y = position.y - 28;
    frame.resize(200, 56);
    frame.fills = [];
    const select = figma.createFrame();
    select.name = "Select";
    select.x = frame.x;
    select.y = frame.y + 16;
    select.resize(200, 40);
    select.fills = [{ type: 'SOLID', color: colors.paper }];
    select.strokes = [{ type: 'SOLID', color: colors.divider }];
    select.strokeWeight = 1;
    select.cornerRadius = 4;
    const label = figma.createText();
    label.characters = "Label";
    label.fontSize = 12;
    label.x = select.x;
    label.y = frame.y;
    label.fills = [{ type: 'SOLID', color: colors.primary }];
    const value = figma.createText();
    value.characters = "Select option";
    value.fontSize = 16;
    value.x = select.x + 12;
    value.y = select.y + 10;
    value.fills = [{ type: 'SOLID', color: rgba(0, 0, 0, 0.38) }];
    // Create dropdown icon
    const icon = figma.createVector();
    icon.x = select.x + select.width - 24;
    icon.y = select.y + 12;
    icon.resize(10, 5);
    icon.vectorNetwork = {
        vertices: [
            { x: 0, y: 0 },
            { x: 5, y: 5 },
            { x: 10, y: 0 }
        ],
        segments: [
            { start: 0, end: 1 },
            { start: 1, end: 2 }
        ],
        regions: []
    };
    icon.strokes = [{ type: 'SOLID', color: rgba(0, 0, 0, 0.54) }];
    icon.strokeWeight = 1;
    const selectGroup = figma.group([frame, select, label, value, icon], figma.currentPage);
    selectGroup.name = "MUI Select";
    return selectGroup;
}
async function createMUICheckbox(position, colors) {
    const frame = figma.createFrame();
    frame.name = "MUI Checkbox";
    frame.x = position.x - 12;
    frame.y = position.y - 12;
    frame.resize(24, 24);
    frame.fills = [];
    const box = figma.createRectangle();
    box.x = frame.x;
    box.y = frame.y;
    box.resize(24, 24);
    box.cornerRadius = 2;
    box.strokes = [{ type: 'SOLID', color: rgba(0, 0, 0, 0.54) }];
    box.strokeWeight = 2;
    box.fills = [];
    const checkGroup = figma.group([frame, box], figma.currentPage);
    checkGroup.name = "MUI Checkbox";
    return checkGroup;
}
async function createMUIAppBar(position, colors) {
    const appBar = figma.createFrame();
    appBar.name = "MUI App Bar";
    appBar.x = position.x - 400;
    appBar.y = position.y - 32;
    appBar.resize(800, 64);
    appBar.fills = [{ type: 'SOLID', color: colors.primary }];
    appBar.effects = [
        {
            type: 'DROP_SHADOW',
            color: rgba(0, 0, 0, 0.2),
            offset: { x: 0, y: 2 },
            radius: 4,
            spread: 0,
            visible: true,
            blendMode: 'NORMAL'
        }
    ];
    // Create logo/title
    const title = figma.createText();
    title.characters = "App Bar";
    title.fontSize = 20;
    title.x = appBar.x + 24;
    title.y = appBar.y + 20;
    title.fills = [{ type: 'SOLID', color: colors.paper }];
    const appBarGroup = figma.group([appBar, title], figma.currentPage);
    appBarGroup.name = "MUI App Bar";
    return appBarGroup;
}
async function createMUICard(position, colors) {
    const card = figma.createFrame();
    card.name = "MUI Card";
    card.x = position.x - 160;
    card.y = position.y - 100;
    card.resize(320, 200);
    card.fills = [{ type: 'SOLID', color: colors.paper }];
    card.effects = [
        {
            type: 'DROP_SHADOW',
            color: rgba(0, 0, 0, 0.2),
            offset: { x: 0, y: 2 },
            radius: 4,
            spread: 0,
            visible: true,
            blendMode: 'NORMAL'
        }
    ];
    card.cornerRadius = 4;
    // Create card content
    const content = figma.createFrame();
    content.name = "Content";
    content.resize(320, 200);
    content.layoutMode = "VERTICAL";
    content.fills = [];
    // Create header
    const header = figma.createFrame();
    header.name = "Header";
    header.layoutMode = "VERTICAL";
    header.paddingLeft = header.paddingRight = 16;
    header.paddingTop = header.paddingBottom = 16;
    header.fills = [];
    const title = figma.createText();
    title.characters = "Card Title";
    title.fontSize = 20;
    title.fills = [{ type: 'SOLID', color: rgba(0, 0, 0, 0.87) }];
    const subtitle = figma.createText();
    subtitle.characters = "Card Subtitle";
    subtitle.fontSize = 14;
    subtitle.fills = [{ type: 'SOLID', color: rgba(0, 0, 0, 0.6) }];
    header.appendChild(title);
    header.appendChild(subtitle);
    // Create media
    const media = figma.createRectangle();
    media.name = "Media";
    media.resize(320, 140);
    media.fills = [{ type: 'SOLID', color: rgba(0, 0, 0, 0.08) }];
    // Add all elements to card
    content.appendChild(media);
    content.appendChild(header);
    card.appendChild(content);
    return card;
}
async function createMUIPaper(position, colors) {
    const paper = figma.createFrame();
    paper.name = "MUI Paper";
    paper.x = position.x - 100;
    paper.y = position.y - 100;
    paper.resize(200, 200);
    paper.fills = [{ type: 'SOLID', color: colors.paper }];
    paper.effects = [
        {
            type: 'DROP_SHADOW',
            color: rgba(0, 0, 0, 0.2),
            offset: { x: 0, y: 2 },
            radius: 4,
            spread: 0,
            visible: true,
            blendMode: 'NORMAL'
        }
    ];
    paper.cornerRadius = 4;
    return paper;
}
async function createMUIDialog(position, colors) {
    const dialog = figma.createFrame();
    dialog.name = "MUI Dialog";
    dialog.x = position.x - 200;
    dialog.y = position.y - 150;
    dialog.resize(400, 300);
    dialog.fills = [{ type: 'SOLID', color: colors.paper }];
    dialog.effects = [
        {
            type: 'DROP_SHADOW',
            color: rgba(0, 0, 0, 0.2),
            offset: { x: 0, y: 24 },
            radius: 24,
            spread: -1,
            visible: true,
            blendMode: 'NORMAL'
        }
    ];
    dialog.cornerRadius = 4;
    // Create dialog content
    const content = figma.createFrame();
    content.name = "Content";
    content.resize(400, 300);
    content.layoutMode = "VERTICAL";
    content.fills = [];
    // Create header
    const header = figma.createFrame();
    header.name = "Header";
    header.layoutMode = "VERTICAL";
    header.paddingLeft = header.paddingRight = 24;
    header.paddingTop = header.paddingBottom = 16;
    header.fills = [];
    const title = figma.createText();
    title.characters = "Dialog Title";
    title.fontSize = 20;
    title.fills = [{ type: 'SOLID', color: rgba(0, 0, 0, 0.87) }];
    header.appendChild(title);
    // Create body
    const body = figma.createFrame();
    body.name = "Body";
    body.layoutMode = "VERTICAL";
    body.paddingLeft = body.paddingRight = 24;
    body.paddingTop = body.paddingBottom = 16;
    body.fills = [];
    const text = figma.createText();
    text.characters = "Dialog content goes here. You can add any content you want in this area.";
    text.fontSize = 16;
    text.fills = [{ type: 'SOLID', color: rgba(0, 0, 0, 0.6) }];
    body.appendChild(text);
    // Create actions
    const actions = figma.createFrame();
    actions.name = "Actions";
    actions.layoutMode = "HORIZONTAL";
    actions.primaryAxisAlignItems = "END";
    actions.counterAxisAlignItems = "CENTER";
    actions.paddingLeft = actions.paddingRight = 24;
    actions.paddingTop = actions.paddingBottom = 16;
    actions.itemSpacing = 8;
    actions.fills = [];
    // Create buttons
    const cancelButton = figma.createComponent();
    cancelButton.name = "Cancel";
    cancelButton.layoutMode = "HORIZONTAL";
    cancelButton.primaryAxisAlignItems = "CENTER";
    cancelButton.counterAxisAlignItems = "CENTER";
    cancelButton.paddingLeft = cancelButton.paddingRight = 16;
    cancelButton.paddingTop = cancelButton.paddingBottom = 8;
    cancelButton.fills = [];
    const cancelText = figma.createText();
    cancelText.characters = "CANCEL";
    cancelText.fontSize = 14;
    cancelText.fills = [{ type: 'SOLID', color: colors.primary }];
    cancelButton.appendChild(cancelText);
    const confirmButton = figma.createComponent();
    confirmButton.name = "Confirm";
    confirmButton.layoutMode = "HORIZONTAL";
    confirmButton.primaryAxisAlignItems = "CENTER";
    confirmButton.counterAxisAlignItems = "CENTER";
    confirmButton.paddingLeft = confirmButton.paddingRight = 16;
    confirmButton.paddingTop = confirmButton.paddingBottom = 8;
    confirmButton.fills = [{ type: 'SOLID', color: colors.primary }];
    confirmButton.cornerRadius = 4;
    const confirmText = figma.createText();
    confirmText.characters = "CONFIRM";
    confirmText.fontSize = 14;
    confirmText.fills = [{ type: 'SOLID', color: colors.paper }];
    confirmButton.appendChild(confirmText);
    actions.appendChild(cancelButton);
    actions.appendChild(confirmButton);
    // Add all elements to dialog
    content.appendChild(header);
    content.appendChild(body);
    content.appendChild(actions);
    dialog.appendChild(content);
    return dialog;
}
async function createMUIAccordion(position, colors) {
    const accordion = figma.createFrame();
    accordion.name = "MUI Accordion";
    accordion.x = position.x - 200;
    accordion.y = position.y - 28;
    accordion.resize(400, 56);
    accordion.fills = [{ type: 'SOLID', color: colors.paper }];
    accordion.effects = [
        {
            type: 'DROP_SHADOW',
            color: rgba(0, 0, 0, 0.08),
            offset: { x: 0, y: 1 },
            radius: 1,
            spread: 0,
            visible: true,
            blendMode: 'NORMAL'
        }
    ];
    // Create header
    const header = figma.createFrame();
    header.name = "Header";
    header.resize(400, 56);
    header.layoutMode = "HORIZONTAL";
    header.primaryAxisAlignItems = "SPACE_BETWEEN";
    header.counterAxisAlignItems = "CENTER";
    header.paddingLeft = header.paddingRight = 16;
    header.fills = [];
    const title = figma.createText();
    title.characters = "Accordion Title";
    title.fontSize = 16;
    title.fills = [{ type: 'SOLID', color: rgba(0, 0, 0, 0.87) }];
    header.appendChild(title);
    // Create expand icon
    const icon = figma.createVector();
    icon.resize(12, 8);
    icon.vectorNetwork = {
        vertices: [
            { x: 0, y: 0 },
            { x: 6, y: 8 },
            { x: 12, y: 0 }
        ],
        segments: [
            { start: 0, end: 1 },
            { start: 1, end: 2 }
        ],
        regions: []
    };
    icon.strokes = [{ type: 'SOLID', color: rgba(0, 0, 0, 0.54) }];
    icon.strokeWeight = 2;
    header.appendChild(icon);
    accordion.appendChild(header);
    return accordion;
}
async function createMUITabs(position, colors) {
    const tabs = figma.createFrame();
    tabs.name = "MUI Tabs";
    tabs.x = position.x - 300;
    tabs.y = position.y - 24;
    tabs.resize(600, 48);
    tabs.fills = [{ type: 'SOLID', color: colors.paper }];
    tabs.layoutMode = "HORIZONTAL";
    // Create individual tabs
    const tabLabels = ["Tab One", "Tab Two", "Tab Three"];
    tabLabels.forEach((label, index) => {
        const tab = figma.createFrame();
        tab.name = label;
        tab.layoutMode = "HORIZONTAL";
        tab.primaryAxisAlignItems = "CENTER";
        tab.counterAxisAlignItems = "CENTER";
        tab.paddingLeft = tab.paddingRight = 24;
        tab.fills = [];
        const text = figma.createText();
        text.characters = label;
        text.fontSize = 14;
        text.fills = [{ type: 'SOLID', color: index === 0 ? colors.primary : rgba(0, 0, 0, 0.6) }];
        tab.appendChild(text);
        tabs.appendChild(tab);
    });
    // Create indicator
    const indicator = figma.createRectangle();
    indicator.name = "Indicator";
    indicator.resize(98, 2);
    indicator.y = 46;
    indicator.fills = [{ type: 'SOLID', color: colors.primary }];
    tabs.appendChild(indicator);
    return tabs;
}
async function createMUIBreadcrumbs(position, colors) {
    const breadcrumbs = figma.createFrame();
    breadcrumbs.name = "MUI Breadcrumbs";
    breadcrumbs.x = position.x - 200;
    breadcrumbs.y = position.y - 12;
    breadcrumbs.layoutMode = "HORIZONTAL";
    breadcrumbs.primaryAxisAlignItems = "CENTER";
    breadcrumbs.counterAxisAlignItems = "CENTER";
    breadcrumbs.itemSpacing = 8;
    breadcrumbs.fills = [];
    // Create breadcrumb items
    const items = ["Home", "Category", "Current Page"];
    items.forEach((item, index) => {
        if (index > 0) {
            const separator = figma.createText();
            separator.characters = "/";
            separator.fontSize = 14;
            separator.fills = [{ type: 'SOLID', color: rgba(0, 0, 0, 0.6) }];
            breadcrumbs.appendChild(separator);
        }
        const text = figma.createText();
        text.characters = item;
        text.fontSize = 14;
        text.fills = [{ type: 'SOLID', color: index === items.length - 1 ? rgba(0, 0, 0, 0.87) : rgba(0, 0, 0, 0.6) }];
        breadcrumbs.appendChild(text);
    });
    return breadcrumbs;
}
async function createMUIDrawer(position, colors) {
    const drawer = figma.createFrame();
    drawer.name = "MUI Drawer";
    drawer.x = position.x - 120;
    drawer.y = position.y - 300;
    drawer.resize(240, 600);
    drawer.fills = [{ type: 'SOLID', color: colors.paper }];
    drawer.effects = [
        {
            type: 'DROP_SHADOW',
            color: rgba(0, 0, 0, 0.2),
            offset: { x: 2, y: 0 },
            radius: 4,
            spread: 0,
            visible: true,
            blendMode: 'NORMAL'
        }
    ];
    // Create list items
    const items = ["Item 1", "Item 2", "Item 3", "Item 4"];
    items.forEach((item, index) => {
        const listItem = figma.createFrame();
        listItem.name = item;
        listItem.resize(240, 48);
        listItem.y = index * 48;
        listItem.layoutMode = "HORIZONTAL";
        listItem.primaryAxisAlignItems = "START";
        listItem.counterAxisAlignItems = "CENTER";
        listItem.paddingLeft = listItem.paddingRight = 16;
        listItem.fills = [];
        const text = figma.createText();
        text.characters = item;
        text.fontSize = 14;
        text.fills = [{ type: 'SOLID', color: rgba(0, 0, 0, 0.87) }];
        listItem.appendChild(text);
        drawer.appendChild(listItem);
    });
    return drawer;
}