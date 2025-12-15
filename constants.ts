import { Translation } from './types';

export const translations: Record<'fa' | 'en', Translation> = {
  fa: {
    nav: {
      brand: 'Alihsnnzhd',
      home: 'خانه',
      experience: 'تجربه',
      projects: 'پروژه‌ها',
      skills: 'مهارت‌ها',
      contact: 'ارتباط',
    },
    hero: {
      title: 'توسعه‌دهنده اندروید',
      roles: [
        'علی اصغر حسن‌نژاد',
        'توسعه‌دهنده اندروید',
        'برنامه‌نویس جاوا',
        'طراح تجربه کاربری موبایل',
      ],
      description: 'اپلیکیشن‌های بومی اندروید با جاوا و XML می‌سازم، رابط‌های وب واکنش‌گرا طراحی می‌کنم و روی اصول مهندسی نرم‌افزار و تجربه کاربری تمرکز دارم.',
      stats: {
        experience: 'سال تجربه',
        projects: 'پروژه‌ی عملی',
      },
      cta: 'دانلود رزومه',
    },
    experience: {
      title: 'تجربه‌های حرفه‌ای',
      items: [
        {
          date: '1403 - اکنون',
          title: 'توسعه‌دهنده اندروید',
          description: 'توسعه و نگهداشت اپلیکیشن‌های بومی با جاوا و XML، پیاده‌سازی UI/UX واکنش‌گرا، مدیریت ذخیره‌سازی داده و بهینه‌سازی عملکرد. تسلط به Android SDK، متریال دیزاین و معماری‌های مدرن اندروید.',
          tags: ['Java', 'XML', 'Android SDK', 'Material Design'],
        },
        {
          date: '1403 - اکنون',
          title: 'شبیه‌سازی شبکه‌های کامپیوتری',
          description: 'طراحی، پیاده‌سازی و شبیه‌سازی زیرساخت‌های شبکه‌ای چندلایه با استفاده از Cisco Packet Tracer. پیکربندی شبکه‌های LAN/WAN، Subnetting و Supernetting، و تسلط بر پروتکل‌های Routing و Switching.',
          tags: ['Cisco Packet Tracer', 'IoT', 'Routing', 'Switching'],
        },
        {
          date: '1401 - 1402',
          title: 'توسعه‌دهنده وب (یادگیری)',
          description: 'ساخت رابط‌های وب واکنش‌گرا با HTML، CSS و JavaScript. یادگیری الگوهای بهینه فرانت‌اند و ایجاد تجربه‌های کاربری مدرن.',
          tags: ['HTML', 'CSS', 'JavaScript'],
        },
      ],
    },
    projects: {
      title: 'پروژه‌ها',
      items: [
        {
          title: 'Tourismo',
          description: 'همراه سفر هوشمند برای ایران با دسترسی آفلاین به جاذبه‌ها و بناهای تاریخی، راهنمای جامع شهرها، مسیر‌یابی و رابط کاربری ساده برای گردشگر.',
          tags: ['Java', 'XML', 'Room DB'],
          link: 'https://cafebazaar.ir/app/com.example.tourismo',
          codeSnippet: {
            file: 'MainActivity.java',
            code: `public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        // Initialize views and setup
    }
}`
          }
        },
        {
          title: 'NeuroBeats',
          description: 'پخش‌کننده موسیقی مینیمال و سریع با رابط بصری چشم‌نواز، جست‌وجوی آنی، مدیریت کتابخانه محلی و کنترل‌های پخش روان.',
          tags: ['Java', 'XML', 'Media API'],
          link: 'https://cafebazaar.ir/app/com.example.neurobeats',
        },
        {
          title: 'Photo Studio',
          description: 'وب‌سایت نمونه‌کار مدرن و واکنش‌گرا برای نمایش پروژه‌ها و مهارت‌ها با انیمیشن‌های تعاملی و طراحی تمیز.',
          tags: ['HTML', 'CSS', 'JS'],
          link: 'http://alihsnnzhd.ir/PhotoArt/',
        },
      ],
    },
    skills: {
      title: 'مهارت‌ها',
      categories: {
        mobile: 'توسعه موبایل',
        web: 'توسعه وب',
        programming: 'زبان‌های برنامه‌نویسی',
        Design: 'طراحی',
      },
    },
    footer: {
      text: '۱۴۰۳ | ساخته شده با عشق و کد',
    },
  },
  en: {
    nav: {
      brand: 'Alihsnnzhd',
      home: 'Home',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
    },
    hero: {
      title: 'Android Developer',
      roles: [
        'Aliasghar Hassannezhad',
        'Android Developer',
        'Java Programmer',
        'Mobile UX Designer',
      ],
      description: 'Building native Android apps with Java & XML, crafting responsive web interfaces, focused on software engineering fundamentals and user experience.',
      stats: {
        experience: 'Years Experience',
        projects: 'Shipped Projects',
      },
      cta: 'Download Resume',
    },
    experience: {
      title: 'Professional Experience',
      items: [
        {
          date: '2025 - Present',
          title: 'Android Developer',
          description: 'Develop and maintain native apps with Java & XML, implement responsive UI/UX, manage data persistence, and optimize performance using Android SDK.',
          tags: ['Java', 'XML', 'Android SDK', 'Material Design'],
        },
        {
          date: '2025 - Present',
          title: 'Computer Network Simulation',
          description: 'Designing and simulating multi-layered network infrastructures using Cisco Packet Tracer. LAN/WAN config, Subnetting, Routing and Switching protocols.',
          tags: ['Cisco Packet Tracer', 'IoT', 'Routing', 'Switching'],
        },
        {
          date: '2022 - 2023',
          title: 'Web Developer (Learning)',
          description: 'Build responsive web UIs with HTML, CSS, and JavaScript, learning best practices and modern interactive experiences.',
          tags: ['HTML', 'CSS', 'JavaScript'],
        },
      ],
    },
    projects: {
      title: 'Projects',
      items: [
        {
          title: 'Tourismo',
          description: 'Smart travel companion for Iran with offline access to attractions, full city guides, navigation, and a friendly interface.',
          tags: ['Java', 'XML', 'Room DB'],
          link: 'https://cafebazaar.ir/app/com.example.tourismo',
        },
        {
          title: 'NeuroBeats',
          description: 'Minimal, fast music player with striking UI, instant search, local library management, and smooth playback controls.',
          tags: ['Java', 'XML', 'Media API'],
          link: 'https://cafebazaar.ir/app/com.example.neurobeats',
        },
        {
          title: 'Photo Studio',
          description: 'Modern responsive portfolio to showcase projects and skills with interactive animations and a clean, professional design.',
          tags: ['HTML', 'CSS', 'JS'],
          link: 'http://alihsnnzhd.ir/PhotoArt/',
        },
      ],
    },
    skills: {
      title: 'Skills & Stack',
      categories: {
        mobile: 'Mobile Development',
        web: 'Web Development',
        programming: 'Programming Languages',
        Design: 'Design'
      },
    },
    footer: {
      text: '2025 | Built with love & code',
    },
  },
};
