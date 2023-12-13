import { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import uuid from "react-uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import { AuthContext } from "../context/AuthContext";

import { useContext } from "react";

const menu = [
  { name: "Accueil", href: "/" },
  { name: "Mon parcours", href: "/parcours" },
  { name: "Galerie", href: "/gallery" },
  { name: "Contact", href: "/contact" },
  { name: "Livre d'Or", href: "/commentaires" },
  { name: "Messages de FY", href: "/admincomment" },
  { name: "Admin", href: "/login" },
];

export default function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <Disclosure as="nav" className="bg-white shadow w-full">
      {({ open, close }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className=" flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex items-center mx-auto lg:mr-8">
                  <img
                    className="block h-16 sm:h-20 w-auto  "
                    src={logo}
                    alt="Your Company"
                  />
                 
                </div>
                <div className="hidden lg:flex sm:space-x-8 sm:items-center ">
                  {menu.map((elt) => (
                    <div key={uuid()}>
                      <NavLink
                        to={elt.href}
                        className={({ isActive }) =>
                          isActive
                            ? "block border-b-4 border-yellow-500 bg-yellow-50 py-2 pl-3 pr-4 text-base  font-medium text-yellow-700 "
                            : "hover:bg-yellow-50 hover:text-yellow-700 text-gray-700 py-2 pl-3 pr-4 lg:pr-2 text-base font-medium"
                        }
                        end
                      >
                        {/**Si elt.name = Admin alors on affiche un icone fontawasome de connection */}

                        {elt.name === "Admin" ? (
                          <button className="text-orange-900 text-lg font-bold hover:text-orange-700">
                            {currentUser ? (
                              <FontAwesomeIcon
                                icon={solid("right-from-bracket")}
                                className="text-orange-500 h-6"
                                onClick={logout}
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={solid("right-to-bracket")}
                                className="text-orange-500 h-6"
                              />
                            )}
                          </button>
                        ) : (
                          elt.name
                        )}
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="lg:hidden absolute top-18 z-10 bg-orange-100 w-3/5 sm:w-1/3 border-2">
            <div className="space-y-1 pt-2 pb-4">
              {menu.map((elt) => (
                <div key={uuid()}>
                  <NavLink
                    to={elt.href}
                    onClick={close}
                    className={({ isActive }) =>
                      isActive
                        ? "block border-l-4 border-yellow-500 bg-yellow-50 py-2 pl-3 pr-4 text-base font-medium text-yellow-700 "
                        : "hover:bg-yellow-50 hover:text-yellow-700 text-gray-700 py-2 pl-3 pr-4 text-base font-medium"
                    }
                    end
                  >
                    {elt.name === "Admin" ? (
                      <button
                        onClick={close}
                        className="text-orange-900 text-lg font-bold hover:text-orange-700"
                      >
                        {currentUser ? (
                          <FontAwesomeIcon
                            icon={solid("right-from-bracket")}
                            className="text-orange-500 h-6"
                            onClick={logout}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={solid("right-to-bracket")}
                            className="text-orange-500 h-6"
                          />
                        )}
                      </button>
                    ) : (
                      elt.name
                    )}
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
