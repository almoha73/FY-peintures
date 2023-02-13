import { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png"
import { NavLink } from "react-router-dom";
import uuid from "react-uuid";

const menu = [
  { name: "Accueil", href: "/" },
  { name: "Mon parcours", href: "/parcours" },
  { name: "Gallerie", href: "/gallery" },
  { name: "Contact", href: "/contact" },
  { name: "Livre d'Or", href: "/commentaires" },
  

];

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-white shadow w-full">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-16 sm:h-20 w-auto lg:hidden"
                    src={logo}
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-16 sm:h-20 w-auto lg:block"
                    src={logo}
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:items-center ">
                  {menu.map((elt) => (
                    <div key={uuid()}>
                      <NavLink
                        to={elt.href}
                        className={({ isActive }) =>
                      isActive
                        ? "block border-b-4 border-yellow-500 bg-yellow-50 py-2 pl-3 pr-4 text-base font-medium text-yellow-700 "
                        : "hover:bg-yellow-50 hover:text-yellow-700 text-gray-700 py-2 pl-3 pr-4 text-base font-medium"
                    }
                    end
                      >
                        {elt.name}
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-4">
              {menu.map((elt) => (
                <div key={uuid()}>
                  <NavLink
                    to={elt.href}
                    className={({ isActive }) =>
                      isActive
                        ? "block border-l-4 border-yellow-500 bg-yellow-50 py-2 pl-3 pr-4 text-base font-medium text-yellow-700 "
                        : "hover:bg-yellow-50 hover:text-yellow-700 text-gray-700 py-2 pl-3 pr-4 text-base font-medium"
                    }
                    end
                  >
                    {elt.name}
                  </NavLink>
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
