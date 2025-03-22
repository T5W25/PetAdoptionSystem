'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  IconHome,
  IconVocabulary,
  IconDog,
  IconLogin2,
  IconUserEdit,
  IconDogBowl,
  IconLogout,
  IconHeart
} from '@tabler/icons-react';
import { Code, Group, Button, Text, Card, Badge} from '@mantine/core';
import classes from './Navbar.module.css';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: IconHome },
  { href: '/about', label: 'About', icon: IconVocabulary },
  { href: '/shelters', label: 'Shelters', icon: IconDogBowl },
  { href: '/favorite', label: 'Favorite', icon: IconHeart}
];

export default function Navbar({ userID }: { userID: string| null }) {
  const pathname = usePathname();
  const [user, setUser] = useState<{ email: string; userType: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (!userID) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user-info/${userID}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          console.error('Error fetching user');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };

    fetchUser();
  }, [userID]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    setUser(null);
  };


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
          {user ? (
              <Card shadow="sm" padding="md" radius="md" withBorder className={classes.userCard}>
                <Text size="sm" fw={600} className={classes.emailText}>
                  {user.email}
                </Text>
                <Badge color="blue" variant="filled" className={classes.userBadge}>
                  {user.userType}
                </Badge>
                <Button
                    variant="light"
                    color="red"
                    leftSection={<IconLogout size={18} />}
                    onClick={handleLogout}
                    fullWidth
                    className={classes.logoutButton}
                >
                  Log out
                </Button>
              </Card>
          ) : (
              <>
                <Link href={'/auth/login'} className={classes.link} prefetch={false}>
                  <IconLogin2 className={classes.linkIcon} stroke={1.5}/>
                  <span>Login</span>
                </Link>

                <Link href={'/auth/register'} className={classes.link} prefetch={false}>
                  <IconUserEdit className={classes.linkIcon} stroke={1.5}/>
                  <span>Register</span>
                </Link>
              </>
          )}
        </div>
      </nav>
  );
}
