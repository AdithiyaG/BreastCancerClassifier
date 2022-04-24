import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  useColorModeValue,
  useDisclosure,
  Spacer,
  Image
} from "@chakra-ui/react";
import { FaClipboardCheck, FaRss } from "react-icons/fa";

import { FiMenu } from "react-icons/fi";
import { HiCollection } from "react-icons/hi";
import { MdHome } from "react-icons/md";
import React from "react";
import medium from '../media/4.png'
import Navlink from './Navlink'
import { useAuth } from '../contexts/AuthContext'
import { NavLink as Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const sidebar = useDisclosure();

  const { currentUser, logout } = useAuth()
  const color = useColorModeValue("gray.600", "gray.300");

  const NavItem = (props) => {
    const { icon, to, children, ...rest } = props;
    const location = useLocation()

    const isActive = location.pathname === to
    console.log('active',isActive)
    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color={useColorModeValue("inherit", "gray.400")}
        _hover={{
          bg: useColorModeValue("teal.100", "teal.100"),
          color: useColorModeValue("gray.900", "gray.200"),
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        
        {...rest}
      >
        <Link to={to} >
          {icon && (
            <Icon 
              mx="2"
              boxSize="4"
              _groupHover={{
                color: color,
              }}
              as={icon}
            />
          )}
          {children}
        </Link>
      </Flex>
    );
  };

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={useColorModeValue("white", "gray.800")}
      borderColor={useColorModeValue("inherit", "gray.700")}
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Image
          src={medium} />

      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavItem  icon={MdHome} to='/'>Home</NavItem>
        <NavItem icon={FaRss} to='/uploader'>Classifier</NavItem>
        <NavItem icon={HiCollection} to='/features/calculator'>BSA Calculator</NavItem>
        <NavItem icon={FaClipboardCheck} to='/table'>Patient Database</NavItem>

      </Flex>
    </Box>
  );
  return (


    <Box
      as="section"
      bg={useColorModeValue("red.50", "gray.700")}

    >
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"

      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease" >
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg={useColorModeValue("white", "gray.800")}
          borderBottomWidth="1px"
          borderColor={useColorModeValue("inherit", "gray.700")}
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "inline-flex" }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <Spacer />

          <Flex align="center">
            {!currentUser && <Navlink to='/login' name='Login' />}
            {!currentUser && <Navlink to='/register' name='SignUp' />}
            {currentUser && (
              <Navlink
                to='/logout'
                name='Logout'
                onClick={async e => {
                  e.preventDefault()
                  await logout()
                }}
              />
            )}
          </Flex>
        </Flex>
      </Box>
    </Box>

  );
}
