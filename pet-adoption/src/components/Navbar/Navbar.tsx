'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  IconHome,
  IconVocabulary,
  IconDog,
  IconLogin2,
  IconUserEdit
} from '@tabler/icons-react';
import { Code, Group } from '@mantine/core';
import classes from './Navbar.module.css';

const navItems = [
  { href: '/', label: 'Home', icon: IconHome },
  { href: '/about', label: 'About', icon: IconVocabulary },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          <Group className={classes.header}>
            <IconDog size={28} />
            <Code fw={700}>v0.0.1</Code>
          </Group>

          {navItems.map(({ href, label, icon: Icon }) => (
              <Link key={label} href={href} className={`${classes.link} ${pathname === href ? classes.active : ''}`} prefetch={false}>
                <Icon className={classes.linkIcon} stroke={1.5} />
                <span>{label}</span>
              </Link>
          ))}
        </div>

        <div className={classes.footer}>
          <Link href={'/auth/login'} className={classes.link} prefetch={false} target="_blank"
                rel="noopener noreferrer">
            <IconLogin2 className={classes.linkIcon} stroke={1.5} />
            <span>Login</span>
          </Link>

          <Link href={'/auth/register'} className={classes.link} prefetch={false} target="_blank"
                rel="noopener noreferrer">
            <IconUserEdit className={classes.linkIcon} stroke={1.5} />
            <span>Register</span>
          </Link>
        </div>
      </nav>
  );
}
