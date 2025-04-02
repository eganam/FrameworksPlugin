# Frameworks Plugin for Figma

A powerful Figma plugin that provides a comprehensive library of UI components from popular frameworks and design systems for rapid prototyping and design implementation.

![Figma Plugin](https://img.shields.io/badge/Figma-Plugin-orange)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- 🎨 Drag-and-drop UI components from popular frameworks
- 📱 Responsive design components with framework-specific styles
- 🎯 Precise component positioning and alignment
- 🔍 Component inspection capabilities
- 🎭 Support for both Figma and FigJam
- 🛠 Multiple framework support

## Supported Frameworks

- Material Design
- Bootstrap
- Tailwind CSS
- Custom components

## Installation

1. Open Figma desktop app
2. Go to `Plugins > Development > Import plugin from manifest`
3. Select the `manifest.json` file from this project
4. The plugin will appear in your plugins list as "Frameworks Plugin"

## Development Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Figma desktop app
- TypeScript knowledge

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/eganam/FrameworksPlugin.git
   cd FrameworksPlugin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the plugin:
   ```bash
   npm run build
   ```

4. Watch for changes during development:
   ```bash
   npm run watch
   ```

### Project Structure

```
FrameworksPlugin/
├── code.ts          # Main plugin logic
├── code.js          # Compiled JavaScript
├── ui.html          # Plugin UI
├── manifest.json    # Plugin configuration
├── package.json     # Project dependencies
└── tsconfig.json    # TypeScript configuration
```

## Usage

1. Open Figma and select the Frameworks Plugin
2. Choose your preferred UI framework
3. Browse through available components
4. Drag desired components onto your canvas
5. Customize components as needed
6. Use the inspection feature to examine component properties

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any problems or have suggestions, please [open an issue](https://github.com/eganam/FrameworksPlugin/issues) on GitHub.

## Acknowledgments

- Figma Plugin API Documentation
- TypeScript Community
- All contributors who help improve this plugin