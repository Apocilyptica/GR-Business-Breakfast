import { ButtonStyles } from "../buttonStyles";

export const navLinksData = [
  {
    id: "events",
    styles: ButtonStyles.primary,
    menu: "Events",
    label: "events",
    URL: "",
    menuItems: [
      {
        menuItem: "Upcoming Events",
        URL: "/upcomingevents",
      },
      {
        menuItem: "Past Events",
        URL: "/pastevents",
      },
    ],
  },
  {
    id: "membership",
    styles: ButtonStyles.primary,
    menu: "Membership",
    label: "about our membership",
    URL: "",
    menuItems: [
      {
        menuItem: "Membership Benifits",
        URL: "/membership",
      },
      {
        menuItem: "Our Members",
        URL: "/ourmembers",
      },
    ],
  },
  {
    id: "about",
    styles: ButtonStyles.primary,
    menu: "About",
    label: "about grand rapids business breakfast",
    URL: "",
    menuItems: [
      {
        menuItem: "About GRBB",
        URL: "/about",
      },
      {
        menuItem: "Sponsors",
        URL: "/sponsors",
      },
      {
        menuItem: "Testimonials",
        URL: "/testimonials",
      },
    ],
  },
  {
    id: "contact",
    styles: ButtonStyles.primary,
    menu: "Contact",
    label: "contact info",
    URL: "/contact",
    menuItems: [],
  },
  {
    id: "become-a-member",
    styles: ButtonStyles.secondary,
    menu: "Become A Member",
    label: "become a member",
    URL: "/membership",
    menuItems: [],
  },
];
