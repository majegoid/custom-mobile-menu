import { comboTopNav } from './comboTopNav';
import './styles/index.css';

const rootElem = document.querySelector('div#root');

const [topNav, mobileNav] = comboTopNav([
  { href: '#home', label: 'Home' },
  { href: '#team', label: 'Team' },
  { href: '#work', label: 'Work' },
  { href: '#contact-us', label: 'Contact Us' },
  { href: '#another-link', label: 'Another Link' },
]);

rootElem.appendChild(topNav);
rootElem.appendChild(mobileNav);
