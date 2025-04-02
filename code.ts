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

async function createMUIComponent(componentType: string, position: { x: number; y: number }) {
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

  // Helper function to create darker version of a color
  function darkerColor(color: RGB): RGB {
    return {
      r: color.r * 0.8,
      g: color.g * 0.8,
      b: color.b * 0.8
    };
  }

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

// Helper function to create RGB color
function rgb(r: number, g: number, b: number): RGB {
  return { r, g, b };
}

async function createMUIButton(position: { x: number; y: number }, colors: any) {
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
  hoverButton.fills = [{ type: 'SOLID', color: darkerColor(colors.primary) }];
  
  const hoverText = text.clone();
  hoverButton.appendChild(hoverText);
  
  // Create component set
  const buttonSet = figma.combineAsVariants([button, hoverButton], figma.currentPage);
  buttonSet.name = "MUI Button";
  
  return buttonSet;
}

async function createMUITextField(position: { x: number; y: number }, colors: any) {
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
  placeholder.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
  
  input.appendChild(placeholder);
  textField.appendChild(label);
  textField.appendChild(input);
  
  // Create variants
  const focusedVariant = textField.clone();
  focusedVariant.x = textField.x + textField.width + 20;
  focusedVariant.y = textField.y;
  const focusedInput = focusedVariant.findOne(n => n.name === "Input") as FrameNode;
  focusedInput.strokes = [{ type: 'SOLID', color: colors.primary }];
  focusedInput.strokeWeight = 2;
  
  // Create component set
  const textFieldSet = figma.combineAsVariants([textField, focusedVariant], figma.currentPage);
  textFieldSet.name = "MUI Text Field";
  
  return textFieldSet;
}

async function createMUISelect(position: { x: number; y: number }, colors: any) {
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
  value.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];

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
  icon.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
  icon.strokeWeight = 1;

  frame.appendChild(select);
  frame.appendChild(label);
  frame.appendChild(value);
  frame.appendChild(icon);

  return frame;
}

async function createMUICheckbox(position: { x: number; y: number }, colors: any) {
  const checkbox = figma.createComponent();
  checkbox.name = "MUI Checkbox";
  checkbox.x = position.x - 12;
  checkbox.y = position.y - 12;
  checkbox.resize(24, 24);
  checkbox.cornerRadius = 2;
  checkbox.fills = [{ type: 'SOLID', color: colors.paper }];
  checkbox.strokes = [{ type: 'SOLID', color: colors.divider }];
  checkbox.strokeWeight = 1;

  return checkbox;
}

async function createMUIAppBar(position: { x: number; y: number }, colors: any) {
  const appBar = figma.createComponent();
  appBar.name = "MUI AppBar";
  appBar.x = position.x - 300;
  appBar.y = position.y - 32;
  appBar.resize(600, 64);
  appBar.fills = [{ type: 'SOLID', color: colors.primary }];
  
  // Create toolbar
  const toolbar = figma.createFrame();
  toolbar.name = "Toolbar";
  toolbar.layoutMode = "HORIZONTAL";
  toolbar.primaryAxisAlignItems = "SPACE_BETWEEN";
  toolbar.counterAxisAlignItems = "CENTER";
  toolbar.resize(600, 64);
  toolbar.fills = [];
  toolbar.paddingLeft = toolbar.paddingRight = 24;
  
  // Create title
  const title = figma.createText();
  title.characters = "App Title";
  title.fontSize = 20;
  title.fontName = { family: "Inter", style: "Medium" };
  title.fills = [{ type: 'SOLID', color: colors.paper }];
  
  toolbar.appendChild(title);
  appBar.appendChild(toolbar);
  
  return appBar;
}

async function createMUICard(position: { x: number; y: number }, colors: any) {
  const card = figma.createComponent();
  card.name = "MUI Card";
  card.x = position.x - 150;
  card.y = position.y - 100;
  card.resize(300, 200);
  card.fills = [{ type: 'SOLID', color: colors.paper }];
  card.effects = [
    {
      type: "DROP_SHADOW",
      color: { ...colors.text, a: 0.2 },
      offset: { x: 0, y: 2 },
      radius: 1,
      spread: 0,
      visible: true,
      blendMode: "NORMAL"
    }
  ];
  card.cornerRadius = 4;
  
  // Create card content
  const content = figma.createFrame();
  content.name = "Content";
  content.layoutMode = "VERTICAL";
  content.primaryAxisAlignItems = "MIN";
  content.counterAxisAlignItems = "MIN";
  content.itemSpacing = 8;
  content.resize(300, 200);
  content.fills = [];
  
  // Create header
  const header = figma.createFrame();
  header.name = "Header";
  header.layoutMode = "VERTICAL";
  header.primaryAxisAlignItems = "MIN";
  header.counterAxisAlignItems = "MIN";
  header.itemSpacing = 4;
  header.paddingLeft = header.paddingRight = 16;
  header.paddingTop = header.paddingBottom = 16;
  header.fills = [];
  
  const title = figma.createText();
  title.characters = "Card Title";
  title.fontSize = 24;
  title.fontName = { family: "Inter", style: "Medium" };
  title.fills = [{ type: 'SOLID', color: colors.text }];
  
  const subtitle = figma.createText();
  subtitle.characters = "Card Subtitle";
  subtitle.fontSize = 14;
  subtitle.fills = [{ type: 'SOLID', color: { ...colors.text, a: 0.6 } }];
  
  header.appendChild(title);
  header.appendChild(subtitle);
  
  // Create media
  const media = figma.createFrame();
  media.name = "Media";
  media.resize(300, 140);
  media.fills = [{ type: 'SOLID', color: colors.primary }];
  
  content.appendChild(media);
  content.appendChild(header);
  card.appendChild(content);
  
  return card;
}

async function createMUIPaper(position: { x: number; y: number }, colors: any) {
  const paper = figma.createComponent();
  paper.name = "MUI Paper";
  paper.x = position.x - 150;
  paper.y = position.y - 100;
  paper.resize(300, 200);
  paper.fills = [{ type: 'SOLID', color: colors.paper }];
  paper.effects = [
    {
      type: "DROP_SHADOW",
      color: { ...colors.text, a: 0.2 },
      offset: { x: 0, y: 2 },
      radius: 1,
      spread: 0,
      visible: true,
      blendMode: "NORMAL"
    }
  ];
  paper.cornerRadius = 4;
  
  return paper;
}

async function createMUIDialog(position: { x: number; y: number }, colors: any) {
  const dialog = figma.createComponent();
  dialog.name = "MUI Dialog";
  dialog.x = position.x - 200;
  dialog.y = position.y - 150;
  dialog.resize(400, 300);
  dialog.fills = [{ type: 'SOLID', color: colors.paper }];
  dialog.effects = [
    {
      type: "DROP_SHADOW",
      color: { ...colors.text, a: 0.2 },
      offset: { x: 0, y: 2 },
      radius: 1,
      spread: 0,
      visible: true,
      blendMode: "NORMAL"
    }
  ];
  dialog.cornerRadius = 4;
  
  // Create dialog content
  const content = figma.createFrame();
  content.name = "Content";
  content.layoutMode = "VERTICAL";
  content.primaryAxisAlignItems = "MIN";
  content.counterAxisAlignItems = "MIN";
  content.itemSpacing = 16;
  content.resize(400, 300);
  content.fills = [];
  
  // Create header
  const header = figma.createFrame();
  header.name = "Header";
  header.layoutMode = "VERTICAL";
  header.primaryAxisAlignItems = "MIN";
  header.counterAxisAlignItems = "MIN";
  header.paddingLeft = header.paddingRight = 24;
  header.paddingTop = header.paddingBottom = 16;
  header.fills = [];
  
  const title = figma.createText();
  title.characters = "Dialog Title";
  title.fontSize = 20;
  title.fontName = { family: "Inter", style: "Medium" };
  title.fills = [{ type: 'SOLID', color: colors.text }];
  
  header.appendChild(title);
  
  // Create body
  const body = figma.createFrame();
  body.name = "Body";
  body.layoutMode = "VERTICAL";
  body.primaryAxisAlignItems = "MIN";
  body.counterAxisAlignItems = "MIN";
  body.paddingLeft = body.paddingRight = 24;
  body.paddingBottom = 24;
  body.fills = [];
  
  const text = figma.createText();
  text.characters = "Dialog content goes here. You can add any content you want in this area.";
  text.fontSize = 16;
  text.fills = [{ type: 'SOLID', color: colors.text }];
  
  body.appendChild(text);
  
  // Create actions
  const actions = figma.createFrame();
  actions.name = "Actions";
  actions.layoutMode = "HORIZONTAL";
  actions.primaryAxisAlignItems = "END";
  actions.counterAxisAlignItems = "CENTER";
  actions.itemSpacing = 8;
  actions.paddingLeft = actions.paddingRight = 24;
  actions.paddingBottom = 24;
  actions.fills = [];
  
  const cancelButton = await createMUIButton({ x: 0, y: 0 }, colors);
  const okButton = await createMUIButton({ x: 0, y: 0 }, colors);
  
  actions.appendChild(cancelButton);
  actions.appendChild(okButton);
  
  content.appendChild(header);
  content.appendChild(body);
  content.appendChild(actions);
  dialog.appendChild(content);
  
  return dialog;
}

async function createMUIAccordion(position: { x: number; y: number }, colors: any) {
  const accordion = figma.createComponent();
  accordion.name = "MUI Accordion";
  accordion.x = position.x - 200;
  accordion.y = position.y - 30;
  accordion.resize(400, 60);
  accordion.fills = [{ type: 'SOLID', color: colors.paper }];
  accordion.strokes = [{ type: 'SOLID', color: colors.divider }];
  accordion.strokeWeight = 1;
  
  // Create header
  const header = figma.createFrame();
  header.name = "Header";
  header.layoutMode = "HORIZONTAL";
  header.primaryAxisAlignItems = "SPACE_BETWEEN";
  header.counterAxisAlignItems = "CENTER";
  header.paddingLeft = header.paddingRight = 16;
  header.paddingTop = header.paddingBottom = 8;
  header.resize(400, 60);
  header.fills = [];
  
  const title = figma.createText();
  title.characters = "Accordion Title";
  title.fontSize = 16;
  title.fontName = { family: "Inter", style: "Medium" };
  title.fills = [{ type: 'SOLID', color: colors.text }];
  
  header.appendChild(title);
  accordion.appendChild(header);
  
  return accordion;
}

async function createMUITabs(position: { x: number; y: number }, colors: any) {
  const tabs = figma.createComponent();
  tabs.name = "MUI Tabs";
  tabs.x = position.x - 300;
  tabs.y = position.y - 24;
  tabs.resize(600, 48);
  tabs.fills = [{ type: 'SOLID', color: colors.paper }];
  
  // Create tab list
  const tabList = figma.createFrame();
  tabList.name = "Tab List";
  tabList.layoutMode = "HORIZONTAL";
  tabList.primaryAxisAlignItems = "MIN";
  tabList.counterAxisAlignItems = "CENTER";
  tabList.resize(600, 48);
  tabList.fills = [];
  
  // Create tabs
  const tab1 = figma.createFrame();
  tab1.name = "Tab 1";
  tab1.layoutMode = "HORIZONTAL";
  tab1.primaryAxisAlignItems = "CENTER";
  tab1.counterAxisAlignItems = "CENTER";
  tab1.paddingLeft = tab1.paddingRight = 16;
  tab1.resize(120, 48);
  tab1.fills = [];
  
  const tab1Text = figma.createText();
  tab1Text.characters = "TAB ONE";
  tab1Text.fontSize = 14;
  tab1Text.fontName = { family: "Inter", style: "Medium" };
  tab1Text.fills = [{ type: 'SOLID', color: colors.primary }];
  tab1Text.letterSpacing = { value: 0.4, unit: 'PIXELS' };
  
  tab1.appendChild(tab1Text);
  tabList.appendChild(tab1);
  tabs.appendChild(tabList);
  
  return tabs;
}

async function createMUIBreadcrumbs(position: { x: number; y: number }, colors: any) {
  const breadcrumbs = figma.createComponent();
  breadcrumbs.name = "MUI Breadcrumbs";
  breadcrumbs.x = position.x - 200;
  breadcrumbs.y = position.y - 12;
  breadcrumbs.layoutMode = "HORIZONTAL";
  breadcrumbs.primaryAxisAlignItems = "MIN";
  breadcrumbs.counterAxisAlignItems = "CENTER";
  breadcrumbs.itemSpacing = 8;
  breadcrumbs.fills = [];
  
  // Create breadcrumb items
  const item1 = figma.createText();
  item1.characters = "Home";
  item1.fontSize = 14;
  item1.fills = [{ type: 'SOLID', color: { ...colors.text, a: 0.6 } }];
  
  const separator1 = figma.createText();
  separator1.characters = "/";
  separator1.fontSize = 14;
  separator1.fills = [{ type: 'SOLID', color: { ...colors.text, a: 0.6 } }];
  
  const item2 = figma.createText();
  item2.characters = "Category";
  item2.fontSize = 14;
  item2.fills = [{ type: 'SOLID', color: { ...colors.text, a: 0.6 } }];
  
  const separator2 = figma.createText();
  separator2.characters = "/";
  separator2.fontSize = 14;
  separator2.fills = [{ type: 'SOLID', color: { ...colors.text, a: 0.6 } }];
  
  const item3 = figma.createText();
  item3.characters = "Current Page";
  item3.fontSize = 14;
  item3.fills = [{ type: 'SOLID', color: colors.text }];
  
  breadcrumbs.appendChild(item1);
  breadcrumbs.appendChild(separator1);
  breadcrumbs.appendChild(item2);
  breadcrumbs.appendChild(separator2);
  breadcrumbs.appendChild(item3);
  
  return breadcrumbs;
}

async function createMUIDrawer(position: { x: number; y: number }, colors: any) {
  const drawer = figma.createComponent();
  drawer.name = "MUI Drawer";
  drawer.x = position.x - 120;
  drawer.y = position.y - 300;
  drawer.resize(240, 600);
  drawer.fills = [{ type: 'SOLID', color: colors.paper }];
  drawer.effects = [
    {
      type: "DROP_SHADOW",
      color: { ...colors.text, a: 0.2 },
      offset: { x: 2, y: 0 },
      radius: 1,
      spread: 0,
      visible: true,
      blendMode: "NORMAL"
    }
  ];
  
  // Create drawer content
  const content = figma.createFrame();
  content.name = "Content";
  content.layoutMode = "VERTICAL";
  content.primaryAxisAlignItems = "MIN";
  content.counterAxisAlignItems = "MIN";
  content.itemSpacing = 8;
  content.paddingTop = 8;
  content.resize(240, 600);
  content.fills = [];
  
  // Create list items
  for (let i = 1; i <= 5; i++) {
    const item = figma.createFrame();
    item.name = `List Item ${i}`;
    item.layoutMode = "HORIZONTAL";
    item.primaryAxisAlignItems = "MIN";
    item.counterAxisAlignItems = "CENTER";
    item.paddingLeft = item.paddingRight = 16;
    item.paddingTop = item.paddingBottom = 8;
    item.fills = [];
    
    const text = figma.createText();
    text.characters = `List Item ${i}`;
    text.fontSize = 14;
    text.fills = [{ type: 'SOLID', color: colors.text }];
    
    item.appendChild(text);
    content.appendChild(item);
  }
  
  drawer.appendChild(content);
  
  return drawer;
}