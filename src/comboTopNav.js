import './styles/top-nav.css';

/** Creates a top navigation and mobile navigation menu
 * Returns 2 elements [topNav, mobileNav]
 */
export function comboTopNav(
  menuItems = [
    { href: '#choice-1', label: 'Choice 1' },
    { href: '#choice-2', label: 'Choice 2' },
    { href: '#choice-3', label: 'Choice 3' },
  ]
) {
  menuItems = menuItems.map((item) => {
    if (typeof item === 'string') {
      return { href: '#', label: item };
    }
    return item;
  });

  // <nav>
  //   <div class="logo">Logo</div>
  //   <ul>
  //     <li><a href="#">Home</a></li>
  //     <li><a href="#">Team</a></li>
  //     <li><a href="#">Work</a></li>
  //     <li><a href="#">Contact Us</a></li>
  //     <li><a href="#">Another Link</a></li>
  //   </ul>
  //   <div class="container">
  //     <div class="bar1"></div>
  //     <div class="bar2"></div>
  //     <div class="bar3"></div>
  //   </div>
  // </nav>
  // <div class="mobile-dropdown-menu">
  //   <ul>
  //     <li><a href="#">Home</a></li>
  //     <li><a href="#">Team</a></li>
  //     <li><a href="#">Work</a></li>
  //     <li><a href="#">Contact Us</a></li>
  //     <li><a href="#">Another Link</a></li>
  //   </ul>
  // </div>

  const topNav = document.createElement('nav');

  const logoDiv = document.createElement('div');
  logoDiv.textContent = 'Logo';
  logoDiv.className = 'logo';
  topNav.appendChild(logoDiv);

  const topNavUl = document.createElement('ul');
  topNav.appendChild(topNavUl);

  // menu icon container
  const menuIconContainer = document.createElement('div');
  menuIconContainer.className = 'container';
  menuIconContainer.onclick = () => {
    menuIconContainer.classList.toggle('change');
    mobileNav.classList.toggle('visible');
  };
  topNav.appendChild(menuIconContainer);

  const bar1 = document.createElement('div');
  bar1.className = 'bar1';
  menuIconContainer.appendChild(bar1);
  const bar2 = document.createElement('div');
  bar2.className = 'bar2';
  menuIconContainer.appendChild(bar2);
  const bar3 = document.createElement('div');
  bar3.className = 'bar3';
  menuIconContainer.appendChild(bar3);

  // mobile nav
  const mobileNav = document.createElement('div');
  mobileNav.className = 'mobile-dropdown-menu';

  const mobileNavUl = document.createElement('ul');
  mobileNav.appendChild(mobileNavUl);

  for (const menuItem of menuItems) {
    // top nav elements
    const menuItemLi = document.createElement('li');
    topNavUl.appendChild(menuItemLi);

    const menuItemA = document.createElement('a');
    menuItemA.href = menuItem.href;
    menuItemA.textContent = menuItem.label;
    menuItemLi.appendChild(menuItemA);

    // mobile nav elements
    const mobileMenuItemLi = document.createElement('li');
    mobileNavUl.appendChild(mobileMenuItemLi);

    const mobileMenuItemA = document.createElement('a');
    mobileMenuItemA.href = menuItem.href;
    mobileMenuItemA.textContent = menuItem.label;
    mobileMenuItemLi.appendChild(mobileMenuItemA);
  }

  return [topNav, mobileNav];
}
