export interface Project {
  id: string;
  name: string;
  category: 'Systems' | 'Backend and Web' | 'Security and Tools' | 'Experiments';
  shortDescription: string;
  detailedDescription: string;
  technologies: string[];
  repositoryUrl: string;
  featured: boolean;
  isCoursework?: boolean;
  statusBadge?: string;
}

export interface SocialLinkItem {
  id: 'github' | 'linkedin' | 'instagram' | 'x';
  label: string;
  url: string;
  username: string;
}

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/xloudysage',
    username: 'xloudysage',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/shessaanand/',
    username: 'shessaanand',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/_.sheshu12._/',
    username: '_.sheshu12._',
  },
  {
    id: 'x',
    label: 'X',
    url: 'https://x.com/xloudysage',
    username: 'xloudysage',
  },
];

export const DEVELOPER_PROFILE = {
  name: 'Sage',
  handle: 's4ge',
  aliases: ['s4ge', 'sage', 'berryy', 'xloudysage', 'b3rryy'],
  headline: "Hi, I'm Sage.",
  subheadline: 'I build software to understand how things work.',
  supportingText:
    'Computer Science student exploring systems programming, cybersecurity, reverse engineering, and practical software engineering.',
  internshipBadge: 'Open to internship opportunities',
  aboutText:
    'I learn best by implementing systems from scratch. Rather than treating operating systems, runtimes, and protocols as black boxes, I like deconstructing them to understand memory boundaries, execution cycles, and data layout. Building tools—whether a search index, an in-browser VM, or an emulator—turns theoretical concepts into software I can test, profile, and verify.',
  opportunityRoles: [
    {
      title: 'Software Engineering',
      description: 'Building practical tools, clean abstractions, and maintainable services.',
    },
    {
      title: 'Systems Programming',
      description: 'Low-level Linux software, memory management, and native development in Rust and C++.',
    },
    {
      title: 'Backend Engineering',
      description: 'Data processing pipelines, inverted index search engines, and structured REST APIs.',
    },
    {
      title: 'Security Tooling',
      description: 'Binary analysis utilities, protocol inspection, and exploratory security experiments.',
    },
  ],
};

export const APPROVED_PROJECTS: Project[] = [
  // --- FEATURED PROJECTS ---
  {
    id: 'winweb-vm',
    name: 'winweb-vm',
    category: 'Experiments',
    shortDescription:
      'An in-browser virtual machine experiment using WebAssembly and JavaScript to test bytecode execution and memory sandboxing in the browser.',
    detailedDescription:
      'Explores client-side virtual machine emulation without native hypervisors, compiling WebAssembly modules and orchestrating browser memory to test sandboxed execution.',
    technologies: ['JavaScript', 'WebAssembly', 'HTML5'],
    repositoryUrl: 'https://github.com/xloudysage/winweb-vm',
    featured: true,
    statusBadge: 'Experimental VM',
  },
  {
    id: 'music-search-engine',
    name: 'Music Search Engine',
    category: 'Experiments',
    shortDescription:
      'A full-stack music search tool featuring a native C++ inverted index with term frequency scoring, exposed via a FastAPI service and a Vite frontend.',
    detailedDescription:
      'Parses large track datasets, tokenises query terms, and scores results using an inverted index in C++. Exposes search endpoints via FastAPI and renders interactive genre, artist, and year filters in Vite.',
    technologies: ['C++', 'Python', 'FastAPI', 'JavaScript', 'Vite'],
    repositoryUrl: 'https://github.com/xloudysage/music-search-engine',
    featured: true,
    statusBadge: 'Full-Stack Engine',
  },
  {
    id: 'kartoffelpure',
    name: 'KartoffelPure',
    category: 'Systems',
    shortDescription:
      'A minimalist desktop Linux web browser written in Rust with GTK4 and WebKitGTK, using WebKit multi-process execution for isolated tab rendering.',
    detailedDescription:
      'Interfaces with native Linux desktop environments using Rust bindings for GTK4 and WebKitGTK, leveraging WebKit multi-process model for isolated tab execution.',
    technologies: ['Rust', 'GTK', 'WebKit', 'Linux'],
    repositoryUrl: 'https://github.com/xloudysage/kartoffelpure',
    featured: true,
    statusBadge: 'Desktop Systems',
  },
  {
    id: 'stego-tool',
    name: 'Stego Tool',
    category: 'Security and Tools',
    shortDescription:
      'A Python utility for encoding and extracting secret payloads within image files through least-significant-bit manipulation and header validation.',
    detailedDescription:
      'Manipulates least-significant bits in image raster data to embed arbitrary payloads while preserving image container validity and extracting data through magic-byte headers.',
    technologies: ['Python', 'Steganography', 'File Formats'],
    repositoryUrl: 'https://github.com/xloudysage/stego-tool',
    featured: true,
    statusBadge: 'Security Tool',
  },

  // --- SECONDARY PROJECTS ---
  {
    id: 'musicdna',
    name: 'MusicDNA',
    category: 'Backend and Web',
    shortDescription:
      'A C++ tool that parses listening histories from two Last.fm profiles to calculate artist overlap and listening taste similarity.',
    detailedDescription:
      'Fetches and compares scrobble datasets between two Last.fm accounts in C++, calculating shared artist frequencies and musical compatibility metrics.',
    technologies: ['C++', 'Data Analysis', 'Music Metadata'],
    repositoryUrl: 'https://github.com/xloudysage/musicdna',
    featured: false,
  },
  {
    id: 'last-sync',
    name: 'Last Sync',
    category: 'Experiments',
    shortDescription:
      'A Python daemon that polls a target Last.fm account for active scrobbles and synchronises local Spotify playback via the Spotify Web API.',
    detailedDescription:
      'Continuously monitors a friend Last.fm scrobble feed and triggers playback state transitions on a linked Spotify account using OAuth2 credentials.',
    technologies: ['Python', 'Spotify API', 'Last.fm API'],
    repositoryUrl: 'https://github.com/xloudysage/last-sync',
    featured: false,
  },
  {
    id: 'snowflak3',
    name: 'Snowflak3',
    category: 'Security and Tools',
    shortDescription:
      'A Python reconnaissance utility that parses Discord 64-bit snowflake IDs to extract account creation timestamps and public API flags.',
    detailedDescription:
      'Decodes Discord 64-bit snowflakes into millisecond epoch timestamps through bitwise extraction, querying public endpoint flags without elevated privileges.',
    technologies: ['Python', 'Discord API', 'OSINT'],
    repositoryUrl: 'https://github.com/xloudysage/snowflak3',
    featured: false,
  },
  {
    id: 'risc-v-assembler-simulator',
    name: 'RISC-V Assembler Simulator',
    category: 'Systems',
    shortDescription:
      'A Computer Organization coursework project in Python featuring a two-pass assembler and execution simulator for a subset of the RISC-V ISA.',
    detailedDescription:
      'Converts RISC-V assembly source code into binary machine code and simulates clock cycles, stepping through instruction execution and register file states.',
    technologies: ['Python', 'RISC-V', 'Computer Architecture', 'Assembly'],
    repositoryUrl: 'https://github.com/xloudysage/risc-v-assembler-simulator',
    featured: false,
    isCoursework: true,
  },
  {
    id: 'delhi-metro-route-simulator',
    name: 'Delhi Metro Route Simulator',
    category: 'Systems',
    shortDescription:
      'An Introduction to Programming coursework assignment modeling the Delhi Metro rail network as an adjacency graph to compute shortest paths and route interchanges.',
    detailedDescription:
      'Represents metro transit stations and line transfers as a graph data structure in Python, calculating shortest route connections and interchange stops.',
    technologies: ['Python', 'Graph Algorithms', 'Simulation'],
    repositoryUrl: 'https://github.com/xloudysage/delhi-metro-route-simulator',
    featured: false,
    isCoursework: true,
  },
  {
    id: 'bash-breakout',
    name: 'Bash Breakout',
    category: 'Systems',
    shortDescription:
      'A terminal Breakout game written entirely in Bash, using ANSI escape sequences for rendering and raw terminal mode for non-blocking key capture.',
    detailedDescription:
      'Implements paddle physics, ball collision vectors, and brick states within a shell script loop using ANSI screen buffers and stty input polling.',
    technologies: ['Shell Scripting', 'Bash', 'ANSI Escapes'],
    repositoryUrl: 'https://github.com/xloudysage/bash-breakout',
    featured: false,
  },
  {
    id: 'numbergg',
    name: 'NumberGG',
    category: 'Systems',
    shortDescription:
      'A terminal number guessing game implemented in pure Bash, exercising shell arithmetic, random number generation, and input validation loops.',
    detailedDescription:
      'A compact shell script exercising input sanitisation, pseudo-random integer boundaries, and game state loops without external binaries.',
    technologies: ['Bash', 'Shell Scripting'],
    repositoryUrl: 'https://github.com/xloudysage/numbergg',
    featured: false,
  },
  {
    id: 'press-code',
    name: 'Press Code',
    category: 'Backend and Web',
    shortDescription:
      'A browser-based QR code generator with customizable colors, adjustable output size, and optional center logos. Includes a live preview, light and dark themes, and PNG export, with QR generation handled locally in the browser.',
    detailedDescription:
      'A browser-based QR code generator with customizable colors, adjustable output size, and optional center logos. Includes a live preview, light and dark themes, and PNG export, with QR generation handled locally in the browser.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    repositoryUrl: 'https://github.com/xloudysage/press-code',
    featured: false,
  },
];

export interface TechGroup {
  name: string;
  items: {
    name: string;
    detail: string;
  }[];
}

export const TECH_GROUPS: TechGroup[] = [
  {
    name: 'Languages',
    items: [
      { name: 'Rust', detail: 'KartoffelPure browser' },
      { name: 'C++', detail: 'Music Search Engine indexer, MusicDNA' },
      { name: 'Python', detail: 'FastAPI service, Stego Tool, Last Sync, RISC-V Simulator' },
      { name: 'JavaScript', detail: 'winweb-vm WebAssembly orchestration, Vite UI' },
      { name: 'Bash / Shell', detail: 'Bash Breakout, NumberGG' },
      { name: 'HTML & CSS', detail: 'Interface markup, styling tokens, Press Code' },
    ],
  },
  {
    name: 'Frameworks & Runtimes',
    items: [
      { name: 'FastAPI', detail: 'REST API service in Music Search Engine' },
      { name: 'Vite', detail: 'Frontend build tooling and single-page apps' },
      { name: 'WebAssembly', detail: 'In-browser bytecode execution in winweb-vm' },
      { name: 'GTK4 & WebKitGTK', detail: 'Desktop Linux GUI and browser engine integration' },
    ],
  },
  {
    name: 'Developer Tools',
    items: [
      { name: 'Linux', detail: 'Primary development and target environment' },
      { name: 'Git', detail: 'Version control and repository maintenance' },
      { name: 'CMake', detail: 'Native C++ build configuration' },
    ],
  },
];
