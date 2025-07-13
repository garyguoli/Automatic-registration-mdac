# Automatic-registration-mdac

An intelligent automation tool for filling out the Malaysia Digital Arrival Card. This tool provides a streamlined experience with multi-user support, beautiful interface, and robust error handling.

## ✨ Features

- 🔄 **Multi-User Support**: Select from multiple user data files at startup
- 🎨 **Beautiful Interface**: Professional confirmation dialog with emoji and clear layout
- 🚀 **Fast Development**: Multiple startup options for different use cases
- 🛡️ **Robust Error Handling**: Smart retry mechanisms and fallback options
- 📱 **Region Code Support**: Automatic mobile region code selection
- 📅 **Smart Date Navigation**: Intelligent year navigation with timeout protection
- 🔍 **Precise Element Selection**: Avoids strict mode violations with exact selectors
- 🌐 **Internationalized**: English interface for global accessibility

## 🏃‍♂️ Quick Start

### Installation

```bash
git clone https://github.com/garyguoli/Automatic-registration-mdac.git
cd Automatic-registration-mdac
npm install
```

### Usage

Choose your preferred startup method:

```bash
# 🚀 Fastest startup (recommended)
npm start

# 📝 Standard development mode
npm run dev

# 👀 Auto-reload on file changes
npm run dev:watch

# 🏗️ Production build and run
npm run build
npm run start:prod
```

## 📁 Project Structure

```
Automatic-registration-mdac/
├── data/                    # User data files
│   ├── user1.ts            # User profile 1
│   ├── user2.ts            # User profile 2
│   └── ...                 # Add more profiles
├── UserData.ts             # TypeScript interfaces
├── index.ts                # Main application
└── README.md              # This file
```

## 🔧 Configuration

### Adding User Profiles

Create new user data files in the `data/` directory:

```typescript
// data/your-name.ts
import { UserData } from "../UserData.js";

export const userData: UserData = {
    name: "JOHN DOE",
    passportNo: "A12345678",
    nationality: "USA", // or other nationality codes
    dateOfBirth: {
        year: "1990",
        month: "Jan", // Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
        day: "15"
    },
    gender: "1", // 1 for Male, 2 for Female
    passportExpiry: {
        year: "2030",
        month: "Dec",
        day: "31"
    },
    email: "example@email.com",
    RegionCode: "1", // Mobile region code (1 for USA)
    mobile: "5551234567",
    vesselNumber: "ABC123",
    travelMode: "1", // 1 for AIR, 2 for LAND, 3 for SEA
    embarkation: "USA", // Departure location code
    accommodation: {
        stay: "1", // 1 for hotel, 2 for residential, 99 for other
        address: "123 Hotel Street, City Center",
        state: "01", // Johor is 01
        postcode: "12345"
    }
};
```

### Travel Date Options

When running the application, you can choose:
- **Today**: Arrive today, depart tomorrow
- **Tomorrow**: Arrive tomorrow, depart day after
- **Other**: Specify custom dates (1-31)
- **Exit**: Cancel the operation

## 🎨 Interface Preview

```
┌─────────────────────────────────────────┐
│  🎯 Malaysia Digital Arrival Card       │
│     Auto-Fill Confirmation              │
├─────────────────────────────────────────┤
│  👤 User Profile: JOHN                  │
│  📅 Arrival Date: 13                    │
│  🛫 Departure Date: 14                  │
└─────────────────────────────────────────┘

✨ Ready to start auto-filling the form. Continue?
```

## 🚀 Performance Optimizations

### Development Scripts

| Command | Description | Use Case |
|---------|-------------|----------|
| `npm start` | Uses tsx for fastest startup | Quick testing & daily use |
| `npm run dev` | Uses ts-node with ESM support | Standard development |
| `npm run dev:watch` | Auto-reloads on file changes | Active development |
| `npm run build` | Compiles TypeScript to JavaScript | Production build |
| `npm run start:prod` | Runs compiled JavaScript | Production deployment |

### Speed Comparison

- **Before**: `npm run dev` took ~8-10 seconds (tsc + node)
- **After**: `npm start` takes ~2-3 seconds (tsx direct execution)
- **Improvement**: 3-4x faster startup time

## 🛡️ Error Handling

### Smart Date Navigation
- Maximum 20 attempts to find target year
- Automatic fallback to available dates
- Detailed logging for debugging

### Robust Element Selection
- Exact text matching with regex patterns
- Exclusion of disabled/irrelevant elements
- Timeout protection for all interactions

### Graceful Degradation
- Continues execution even if some steps fail
- Provides clear error messages
- Maintains form completion flow

## 📱 Supported Regions

The application supports automatic region code selection for mobile numbers:

- 🇨🇳 China: 86
- 🇸🇬 Singapore: 65
- 🇺🇸 USA: 1
- 🇲🇾 Malaysia: 60
- And many more...

## 🔄 Workflow

1. **Select User Profile**: Choose from available data files
2. **Choose Travel Dates**: Select arrival and departure dates
3. **Confirm Details**: Review information in beautiful interface
4. **Auto-Fill Form**: Watch as the form is automatically completed
5. **Manual Review**: Verify and submit the form manually

## 🛠️ Development

### Adding New Features

```bash
# Generate new selectors
npx playwright codegen 'https://imigresen-online.imi.gov.my/mdac/main'

# Run tests
npm test

# Debug mode
npm run dev:watch
```

### Code Structure

- **`navigateToYear()`**: Reusable year navigation function
- **`askFileSelection()`**: Interactive file selection
- **`fillRegistrationForm()`**: Main form filling logic
- **Error handling**: Comprehensive try-catch blocks

## 📋 Requirements

- Node.js 16+ 
- npm 7+
- Modern browser (Chrome/Edge recommended)

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

ISC License - see LICENSE file for details

## ⚠️ Disclaimer

This tool is for educational and personal use only. Please:
- Ensure all information is accurate before submission
- Comply with Malaysian Immigration Department regulations
- Use responsibly and ethically
- Verify all details manually before final submission

## 🎉 Recent Updates

- ✅ Multi-user data file selection
- ✅ Performance optimization (3-4x faster)
- ✅ Beautiful confirmation interface
- ✅ Smart error handling and retry logic
- ✅ Region code auto-selection
- ✅ Internationalized interface
- ✅ Improved date navigation stability

---

**Happy travels to Malaysia! 🇲🇾**

