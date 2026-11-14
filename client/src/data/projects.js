export const projectsData = [
  {
    id: "auction-hub",
    title: "Auction Hub",
    category: "Real-time Platform",
    categoryKey: "realtime",
    tagline: "Real-time bidding platform with background worker queues",
    description: "Real-time bidding logic with Celery background task processing, multi-user auction sessions, OTP verification and automated notification workflows.",
    longDescription: "Auction Hub is engineered for high-concurrency bidding environments. It utilizes Celery task queues backed by Redis to manage time-sensitive auction closings, dynamic bid increments, and real-time state synchronization across active bidders. Security layers include multi-step OTP phone verification and asynchronous email notification pipelines.",
    technologies: ["Django", "Celery", "Redis", "PostgreSQL"],
    architecture: {
      backend: "Django with Celery worker pool",
      database: "PostgreSQL with connection pooling",
      caching: "Redis for pub/sub and state caching",
      security: "OTP verification & audit log tracking"
    },
    metrics: [
      { label: "Task Processing", value: "Sub-second async queue" },
      { label: "Data Integrity", value: "ACID compliant bids" },
      { label: "Verification", value: "Two-step OTP pipeline" }
    ]
  },
  {
    id: "smart-rfid-hospital",
    title: "Smart RFID Hospital System",
    category: "Healthcare / IoT",
    categoryKey: "iot",
    tagline: "Embedded hardware integrated with healthcare management API",
    description: "A full-stack hospital management system integrating web technologies with embedded hardware for faster patient identification. RFID smart cards communicate through microcontrollers with a Django REST API.",
    longDescription: "Designed to bridge physical hospital workflows with modern cloud systems. Patients and medical staff interact with contactless RFID cards scanned at hardware kiosks powered by ESP32 microcontrollers. The firmware dispatches authenticated HTTP payloads to a Django REST API connected to Supabase for instant patient chart retrieval and visit logging.",
    technologies: ["Django", "ESP32", "Supabase", "RFID"],
    architecture: {
      hardware: "ESP32 microcontrollers with RC522 RFID modules",
      api: "Django REST Framework with JWT authentication",
      cloud: "Supabase PostgreSQL with real-time subscriptions",
      frontend: "Responsive medical staff monitoring dashboard"
    },
    metrics: [
      { label: "Identification Time", value: "< 250ms per scan" },
      { label: "Protocol", value: "Hardware HTTP REST sync" },
      { label: "Hardware Support", value: "ESP32 / RC522" }
    ]
  },
  {
    id: "bike-tracker",
    title: "BikeTracker",
    category: "Mobile Application",
    categoryKey: "mobile",
    tagline: "Cross-platform mobile GPS & telemetry monitoring",
    description: "A real-time GPS tracking application with speed monitoring and battery telemetry, built around a clean and responsive mobile interface.",
    longDescription: "BikeTracker provides real-time location streaming and hardware telemetry for micro-mobility devices. Built using React Native and Expo, the application consumes geolocation coordinates, maps ride trajectories in real-time, monitors device battery level, and calculates instant and average velocity metrics.",
    technologies: ["React Native", "Expo", "Firebase", "Redux"],
    architecture: {
      client: "React Native via Expo managed workflow",
      state: "Redux Toolkit for localized ride telemetry cache",
      backend: "Firebase Realtime Database & Auth",
      sensors: "Native Geolocation & Battery Telemetry APIs"
    },
    metrics: [
      { label: "Telemetry Stream", value: "Real-time coordinate updates" },
      { label: "State Layer", value: "Predictable Redux flow" },
      { label: "Portability", value: "iOS & Android parity" }
    ]
  },
  {
    id: "asset-guard",
    title: "AssetGuard",
    category: "Enterprise / AI",
    categoryKey: "ai",
    tagline: "Digital asset management & automated approval workflows",
    description: "An enterprise solution combining digital asset management with streamlined real estate workflows. Features secure document storage, multi-party automated approvals and custom dual-OTP authentication.",
    longDescription: "AssetGuard was constructed to handle sensitive real estate documentation and ownership verification. Built on advanced Django with hand-crafted raw SQL queries for performant analytics across large transaction tables. Incorporates automated AI document extraction, Twilio SMS dual-OTP verification, and tiered hierarchical approval chains.",
    technologies: ["Advanced Django", "Raw SQL", "AI", "Twilio"],
    architecture: {
      core: "Django with hand-optimized raw SQL querysets",
      aiModule: "Document parsing and entity verification",
      auth: "Custom dual-OTP multi-party approval pipeline",
      telecom: "Twilio SMS notification & verification gateway"
    },
    metrics: [
      { label: "Query Execution", value: "Raw SQL optimized" },
      { label: "Auth Model", value: "Dual-party OTP verification" },
      { label: "Workflow", value: "Multi-tier asset audit" }
    ]
  },
  {
    id: "tour-ease",
    title: "TourEase",
    category: "Web Application",
    categoryKey: "web",
    tagline: "Multi-role tour & booking platform with secure transactions",
    description: "A multi-role platform for administrators, vendors and users, with Django REST Framework, Razorpay payment gateway integration, secure transactions and optimized database queries.",
    longDescription: "TourEase orchestrates multi-vendor travel inventories, itinerary booking flows, and commission reconciliation. It features distinct role permissions for platform admins, travel vendors, and end customers. Financial transactions are securely settled via Razorpay Webhooks with cryptographic signature verification.",
    technologies: ["Django", "DRF", "MySQL", "Razorpay"],
    architecture: {
      backend: "Django REST Framework with role-based permission classes",
      database: "MySQL with indexed relational schemas",
      payments: "Razorpay Checkout with webhook signature validation",
      transactions: "Atomic database transactions for order safety"
    },
    metrics: [
      { label: "Roles", value: "Admin, Vendor & Customer" },
      { label: "Payment Gateway", value: "Razorpay Webhook verified" },
      { label: "Transactions", value: "Database atomic isolation" }
    ]
  },
  {
    id: "micro-rentals",
    title: "Micro Rentals",
    category: "Management System",
    categoryKey: "web",
    tagline: "Multi-tenant laboratory equipment management",
    description: "A laboratory equipment rental platform featuring independent branches with data isolation, real-time inventory tracking and automated maintenance scheduling.",
    longDescription: "Micro Rentals addresses the operational complexity of distributed laboratory equipment logistics. Engineered with Flask using multi-tenant architecture to ensure strict data isolation between research labs and rental branches. Implements calendar scheduling, inventory state machines, and preventive maintenance triggers.",
    technologies: ["Flask", "Multi-tenancy", "Secure Authentication"],
    architecture: {
      framework: "Flask application factory pattern",
      tenancy: "Scoped multi-branch data isolation model",
      scheduling: "Automated maintenance recurrence algorithms",
      security: "Session-based secure cookie & CSRF protection"
    },
    metrics: [
      { label: "Tenancy Model", value: "Strict branch-level isolation" },
      { label: "Inventory", value: "State machine tracking" },
      { label: "Maintenance", value: "Automated lifecycle triggers" }
    ]
  },
  {
    id: "custom-yolo-models",
    title: "Custom Object Detection Models",
    category: "Artificial Intelligence",
    categoryKey: "ai",
    tagline: "Ultralytics YOLOv8 domain-specific vision inference",
    description: "Custom object detection models developed using Ultralytics YOLOv8, with application-specific training, model experimentation and inference workflows.",
    longDescription: "Developed specialized computer vision models tailored to unique visual inspection and detection tasks. The workflow involves custom dataset annotation, hyperparameter tuning, model training using Ultralytics YOLOv8, evaluation of mAP (mean Average Precision) curves, and deployment into low-latency inference endpoints.",
    technologies: ["Python", "Ultralytics", "YOLOv8", "Computer Vision"],
    architecture: {
      core: "Ultralytics YOLOv8 neural network architecture",
      pipeline: "Custom image labeling, augmentation & validation",
      training: "PyTorch GPU accelerated transfer learning",
      inference: "Optimized ONNX / Python inference runtime"
    },
    metrics: [
      { label: "Model Architecture", value: "YOLOv8 Nano / Small / Medium" },
      { label: "Metrics Evaluated", value: "Precision, Recall & mAP@50-95" },
      { label: "Deployment", value: "Real-time webcam & video stream" }
    ]
  }
];

export const projectCategories = [
  { key: "all", label: "All Projects" },
  { key: "realtime", label: "Real-time & Distributed" },
  { key: "iot", label: "Healthcare & IoT" },
  { key: "mobile", label: "Mobile Apps" },
  { key: "ai", label: "AI & Machine Learning" },
  { key: "web", label: "Web Applications" }
];
