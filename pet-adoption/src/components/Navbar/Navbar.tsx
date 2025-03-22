'use client';

import { useState } from 'react';
import {
  IconHome,
  IconVocabulary,
  IconDog,
  IconLogin2,
  IconUserEdit,
  IconDogBowl
} from '@tabler/icons-react';
import { Code, Group } from '@mantine/core';
import classes from './Navbar.module.css';
import Link from 'next/link';

const data = [
  { link: '/', label: 'Home', icon: IconHome },
  { link: '/about', label: 'About', icon: IconVocabulary },
  { link: '/shelters', label: 'Shelters', icon: IconDogBowl }
];

export default function Navbar() {
  const [active, setActive] = useState('Home');

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header}>
          <IconDog size={28} />
          <Code fw={700}>v0.0.1</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogin2 className={classes.linkIcon} stroke={1.5} />
          <span>Login</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconUserEdit className={classes.linkIcon} stroke={1.5} />
          <span>Register</span>
        </a>
      </div>
    </nav>
  );
}