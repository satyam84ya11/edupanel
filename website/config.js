/**
 * Kids Academy Website Configuration
 * Edit this file to customize the website
 */

const config = {
    // Brand Information
    brand: {
        name: "Kids Academy",
        tagline: "School Management Made Simple",
        logo: "🎓",
        email: "support@kidsacademy.com",
        phone: "+91 (11) 1234-5678",
    },

    // Colors (CSS Variables)
    colors: {
        primary: "#1E4FFF",
        secondary: "#2563EB",
        accent: "#F97316",
        dark: "#1E293B",
        light: "#F4F7FC",
        card: "#FFFFFF",
        text: "#475569",
        border: "#E2E8F0",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
    },

    // Social Media Links
    social: {
        facebook: "https://facebook.com/kidsacademy",
        twitter: "https://twitter.com/kidsacademy",
        linkedin: "https://linkedin.com/company/kidsacademy",
        instagram: "https://instagram.com/kidsacademy",
    },

    // Contact Information
    contact: {
        address: "123 Education Street, Delhi, India 110001",
        phone: "+91 (11) 1234-5678",
        email: "support@kidsacademy.com",
        hours: {
            weekday: "9 AM - 6 PM IST",
            saturday: "10 AM - 2 PM IST",
            sunday: "Closed",
        },
    },

    // Pricing Plans
    pricing: [
        {
            name: "Single School",
            price: 99,
            currency: "$",
            period: "/month",
            features: [
                "1 School",
                "Up to 500 Students",
                "Up to 50 Teachers",
                "Basic Reports",
                "Email Support"
            ],
            buttonText: "Get Started",
            highlighted: false,
        },
        {
            name: "Multi-School",
            price: 299,
            currency: "$",
            period: "/month",
            features: [
                "Unlimited Schools",
                "Unlimited Students",
                "Unlimited Teachers",
                "Advanced Reports",
                "Priority Support",
                "API Access"
            ],
            buttonText: "Get Started",
            highlighted: true,
            badge: "Most Popular",
        },
        {
            name: "Enterprise",
            price: "Custom",
            currency: "$",
            period: "/month",
            features: [
                "Custom Infrastructure",
                "Dedicated Support",
                "Custom Features",
                "SLA Guarantee",
                "On-Premise Option"
            ],
            buttonText: "Contact Sales",
            highlighted: false,
        }
    ],

    // Features List
    features: [
        {
            icon: "shield-alt",
            title: "Admin Control",
            description: "Only administrators can create and manage teacher accounts with secure password management"
        },
        {
            icon: "building",
            title: "Multi-School Support",
            description: "Manage unlimited schools from a single platform with complete data isolation"
        },
        {
            icon: "clipboard-list",
            title: "Attendance Tracking",
            description: "Mark and track daily attendance for students and teachers with detailed history"
        },
        {
            icon: "file-invoice-dollar",
            title: "Fees Management",
            description: "Track student fees, payments, and generate reports automatically"
        },
        {
            icon: "money-bill-wave",
            title: "Salary Management",
            description: "Calculate and manage teacher salaries with automated calculations"
        },
        {
            icon: "chart-bar",
            title: "Reports & Analytics",
            description: "Generate comprehensive reports and export data to Excel with one click"
        },
        {
            icon: "users",
            title: "Student Management",
            description: "Complete student information system with profile management and history"
        },
        {
            icon: "mobile-alt",
            title: "Responsive Design",
            description: "Works perfectly on desktop, tablet, and mobile devices"
        },
        {
            icon: "lock",
            title: "Enterprise Security",
            description: "JWT authentication, HTTPS encryption, and role-based access control"
        }
    ],

    // Technology Stack
    technologies: [
        {
            name: "Backend",
            value: "Laravel 11",
            description: "Elegant PHP Framework",
            icon: "server",
            gradient: "667EEA-764BA2"
        },
        {
            name: "Frontend",
            value: "Next.js & React",
            description: "Modern React Framework",
            icon: "laptop",
            gradient: "F093FB-F5576C"
        },
        {
            name: "Database",
            value: "MySQL",
            description: "Reliable & Fast",
            icon: "database",
            gradient: "4FACFE-00F2FE"
        },
        {
            name: "Authentication",
            value: "JWT + Sanctum",
            description: "Secure Token-Based Auth",
            icon: "key",
            gradient: "43E97B-38F9D7"
        },
        {
            name: "Styling",
            value: "TailwindCSS",
            description: "Utility-First CSS",
            icon: "palette",
            gradient: "FA709A-FEE140"
        },
        {
            name: "Deployment",
            value: "Multi-Cloud Ready",
            description: "VPS, Shared Hosting, AWS",
            icon: "cloud",
            gradient: "30CFD0-330867"
        }
    ],

    // Statistics
    stats: [
        {
            number: "26",
            label: "API Endpoints"
        },
        {
            number: "8",
            label: "Frontend Pages"
        },
        {
            number: "5000+",
            label: "Lines of Code"
        },
        {
            number: "99.5%",
            label: "Uptime"
        }
    ],

    // FAQ Items
    faq: [
        {
            question: "Is Kids Academy secure?",
            answer: "Yes! Kids Academy uses enterprise-grade security including JWT authentication, HTTPS encryption, role-based access control, and strict data isolation for multi-school support."
        },
        {
            question: "Can I manage multiple schools?",
            answer: "Absolutely! The Multi-School plan allows you to manage unlimited schools with complete data isolation. Each school has its own separate data, users, and administrators."
        },
        {
            question: "How do teachers get their login credentials?",
            answer: "Only administrators can create teacher accounts and set passwords. Teachers cannot create their own accounts or modify login credentials. Admins can reset passwords at any time."
        },
        {
            question: "Can I export reports to Excel?",
            answer: "Yes! You can export attendance reports, fee records, and salary information to Excel with a single click. Reports are automatically formatted and ready for analysis."
        },
        {
            question: "What about data backups?",
            answer: "We provide automatic daily backups and you can download backups anytime. Enterprise plans include on-premise backup options and custom retention policies."
        },
        {
            question: "Is there a mobile app?",
            answer: "The web application is fully responsive and works great on mobile devices. Native mobile apps are coming in 2025 as part of our roadmap."
        }
    ],

    // Testimonials
    testimonials: [
        {
            name: "Dr. Rajesh Kumar",
            title: "Principal, St. Mary's School",
            avatar: "DR",
            rating: 5,
            text: "Kids Academy has transformed how we manage our school. The automated reports save us hours every week!"
        },
        {
            name: "Ms. Priya Sharma",
            title: "Director, EduChain Group",
            avatar: "MP",
            rating: 5,
            text: "The multi-school support is perfect for our chain. Managing 5 schools from one dashboard is incredibly efficient."
        },
        {
            name: "Mr. Arun Patel",
            title: "Admin Head, Delhi Public School",
            avatar: "AP",
            rating: 5,
            text: "Security and data privacy are our top concerns. Kids Academy's implementation is exactly what we needed."
        }
    ],

    // Navigation Menu Items
    navigation: [
        { text: "Features", href: "#features" },
        { text: "Screenshots", href: "#screenshots" },
        { text: "Technology", href: "#tech" },
        { text: "Pricing", href: "#pricing" },
        { text: "Contact", href: "#contact" }
    ],

    // Footer Links
    footerLinks: {
        Product: [
            { text: "Features", href: "#features" },
            { text: "Pricing", href: "#pricing" },
            { text: "Screenshots", href: "#screenshots" },
            { text: "Technology", href: "#tech" }
        ],
        Company: [
            { text: "About Us", href: "#" },
            { text: "Blog", href: "#" },
            { text: "Careers", href: "#" },
            { text: "News", href: "#" }
        ],
        Resources: [
            { text: "Documentation", href: "#" },
            { text: "API Docs", href: "#" },
            { text: "Support", href: "#" },
            { text: "Status", href: "#" }
        ]
    },

    // Legal Links
    legal: [
        { text: "Privacy Policy", href: "#" },
        { text: "Terms of Service", href: "#" },
        { text: "Cookie Policy", href: "#" }
    ],

    // Analytics
    analytics: {
        enabled: false,
        googleAnalyticsId: "G-XXXXXXXXXX",
    },

    // SEO
    seo: {
        title: "Kids Academy - School Management System",
        description: "Complete school management solution with attendance tracking, fees management, salaries, and automated reporting.",
        keywords: "school management, attendance tracking, fees management, teacher management, student management",
    },

    // API Configuration
    api: {
        baseUrl: "http://localhost:8000/api",
        demoUrl: "https://demo.kidsacademy.com",
    },

    // Feature Flags
    features_enabled: {
        darkMode: false,
        newsletter: true,
        chat: false,
        videoTutorials: false,
        documentation: true,
    }
};

// Export for use in JavaScript
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
}
