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
  IconHeart,
  IconPaw,
  IconHeartHandshake,
} from '@tabler/icons-react';
import { Code, Group, Button, Text, Card, Badge } from '@mantine/core';
import classes from './Navbar.module.css';
import { useEffect, useState } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
  userType: string;
  createdAt: string;
  updatedAt: string;
  favoritePetIds: number[];
}

const navItems = [
  { href: '/', label: 'Home', icon: IconHome },
  { href: '/shelters', label: 'Shelters', icon: IconDogBowl },
  { href: '/favorite', label: 'Favorite', icon: IconHeart },
  { href: '/staff', label: 'Staff', icon: IconHeartHandshake },
  { href: '/adoption', label: 'Adoption', icon: IconPaw },
  { href: '/about', label: 'About', icon: IconVocabulary },
];

export default function Navbar({ userID }: { userID: string | null }) {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

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

          const filteredData: User = {
            id: data.id,
            email: data.email,
            name: data.name,
            userType: data.userType,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            favoritePetIds: Array.isArray(data.favoritePetIds) ? data.favoritePetIds : [],
          };

          setUser(filteredData);
          localStorage.setItem('user', JSON.stringify(filteredData));
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

  let filteredNavItems = navItems.filter(({ href }) => {
    const hideForShelter = ['/shelters', '/favorite', '/adoption'];
    if (user?.userType === 'SHELTER' && hideForShelter.includes(href)) {
      return false;
    }
    return true;
  });

  if (user?.userType === 'SHELTER') {
    filteredNavItems = [
      ...filteredNavItems,
      { href: '/management', label: 'Management', icon: IconUserEdit },
      { href: `/staff/${user.id}`, label: 'Staff Management', icon: IconUserEdit },
    ];
  }

  // ✅ 排序：把 '/about' 放最后
  filteredNavItems.sort((a, b) => {
    if (a.href === '/about') return 1;
    if (b.href === '/about') return -1;
    return 0;
  });

  return (
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          <Group className={classes.header}>
            <IconDog size={28} />
            <Code fw={700}>v0.0.1</Code>
          </Group>

          {filteredNavItems.map(({ href, label, icon: Icon }) => (
              <Link
                  key={label}
                  href={href}
                  className={`${classes.link} ${pathname === href ? classes.active : ''}`}
                  prefetch={false}
              >
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
                  <IconLogin2 className={classes.linkIcon} stroke={1.5} />
                  <span>Login</span>
                </Link>

                <Link href={'/auth/register'} className={classes.link} prefetch={false}>
                  <IconUserEdit className={classes.linkIcon} stroke={1.5} />
                  <span>Register</span>
                </Link>
              </>
          )}
        </div>
      </nav>
  );
}
